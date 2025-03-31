import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Pencil, Trash2, CheckCircle, Clock, Tag as TagIcon } from 'lucide-react';

export const TaskList = ({ onEditTask }) => {
  const { state, dispatch } = useTaskContext();

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(state.tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch({ type: 'REORDER_TASKS', payload: items });
  };

  const filteredTasks = state.tasks.filter((task) => {
    // Status filter
    const statusMatch =
      state.filter.status === 'all' || task.status === state.filter.status;
    
    // Priority filter
    const priorityMatch =
      state.filter.priority === 'all' || task.priority === state.filter.priority;
    
    // Search filter
    const searchMatch = task.title.toLowerCase().includes(state.filter.searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(state.filter.searchQuery.toLowerCase());
    
    // Tags filter
    const tagsMatch = state.filter.tags.length === 0 || 
      (task.tags && state.filter.tags.every(tag => task.tags.includes(tag)));
    
    return statusMatch && priorityMatch && searchMatch && tagsMatch;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (state.filter.sortBy === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (state.filter.sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'inProgress':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const isDueSoon = (dueDate) => {
    if (!dueDate) return false;
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const due = new Date(dueDate);
    const today = new Date();
    return due < today && !isDueSoon(dueDate);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {sortedTasks.length === 0 ? (
              <div className={`text-center py-8 rounded-lg ${state.darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'}`}>
                No tasks found. Create a new task to get started!
              </div>
            ) : (
              sortedTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`rounded-lg shadow-md p-4 hover:shadow-lg transition-all ${
                        state.darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`text-lg font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {task.title}
                          </h3>
                          <p className={`mt-1 ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {task.description}
                          </p>
                        </div>
                        <div className="flex space-x-2 ml-2">
                          <button
                            onClick={() => onEditTask(task)}
                            className={`p-2 rounded-full ${state.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              dispatch({ type: 'DELETE_TASK', payload: task.id })
                            }
                            className={`p-2 rounded-full ${state.darkMode ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-100 text-red-600'}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          {task.status !== 'completed' && (
                            <button
                              onClick={() =>
                                dispatch({
                                  type: 'UPDATE_TASK',
                                  payload: { ...task, status: 'completed' },
                                })
                              }
                              className={`p-2 rounded-full ${state.darkMode ? 'hover:bg-gray-700 text-green-400' : 'hover:bg-gray-100 text-green-600'}`}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {task.dueDate && (
                        <div className={`mt-2 flex items-center text-sm ${
                          isOverdue(task.dueDate)
                            ? 'text-red-500'
                            : isDueSoon(task.dueDate)
                            ? 'text-yellow-500'
                            : state.darkMode
                            ? 'text-gray-400'
                            : 'text-gray-500'
                        }`}>
                          <Clock className="w-4 h-4 mr-1" />
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                          {isOverdue(task.dueDate) && ' (Overdue)'}
                          {isDueSoon(task.dueDate) && !isOverdue(task.dueDate) && ' (Due soon)'}
                        </div>
                      )}

                      {task.tags && task.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {task.tags.map(tag => (
                            <span
                              key={tag}
                              className={`px-2 py-1 rounded-full text-xs flex items-center ${
                                state.darkMode
                                  ? 'bg-gray-700 text-gray-300'
                                  : 'bg-gray-200 text-gray-700'
                              }`}
                            >
                              <TagIcon className="w-3 h-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center space-x-2 mt-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {task.status}
                        </span>
                        <span className={`text-xs ${
                          state.darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          Created: {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};