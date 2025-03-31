import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Filter, SortAsc, Search, Tag, Moon, Sun } from 'lucide-react';

export const TaskFilters = () => {
  const { state, dispatch } = useTaskContext();
  const availableTags = ['work', 'personal', 'urgent', 'shopping'];

  const toggleTag = (tag) => {
    const updatedTags = state.filter.tags.includes(tag)
      ? state.filter.tags.filter((t) => t !== tag)
      : [...state.filter.tags, tag];
    
    dispatch({
      type: 'SET_FILTER',
      payload: { tags: updatedTags },
    });
  };

  return (
    <div className={`rounded-lg shadow-md p-6 mb-6 transition-colors ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={state.filter.status}
              onChange={(e) =>
                dispatch({
                  type: 'SET_FILTER',
                  payload: { status: e.target.value },
                })
              }
              className={`rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 ${state.darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={state.filter.priority}
              onChange={(e) =>
                dispatch({
                  type: 'SET_FILTER',
                  payload: { priority: e.target.value },
                })
              }
              className={`rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 ${state.darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
            >
              <option value="all">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <SortAsc className="w-5 h-5 text-gray-500" />
            <select
              value={state.filter.sortBy}
              onChange={(e) =>
                dispatch({
                  type: 'SET_FILTER',
                  payload: { sortBy: e.target.value },
                })
              }
              className={`rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 ${state.darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={state.filter.searchQuery}
              onChange={(e) =>
                dispatch({
                  type: 'SET_FILTER',
                  payload: { searchQuery: e.target.value },
                })
              }
              className={`pl-10 pr-4 py-2 rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 ${state.darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
            />
          </div>

          <button
            onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {state.darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Tag className="w-5 h-5 text-gray-500" />
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              state.filter.tags.includes(tag)
                ? 'bg-blue-500 text-white'
                : state.darkMode
                ? 'bg-gray-700 text-gray-200'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};