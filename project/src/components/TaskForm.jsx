import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { X, Calendar, Tag as TagIcon } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const TaskForm = ({ task, onClose }) => {
  const { state, dispatch } = useTaskContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    dueDate: null,
    tags: [],
  });

  const availableTags = ['work', 'personal', 'urgent', 'shopping'];

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
        tags: task.tags || [],
      });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date().toISOString();
    
    const payload = {
      ...formData,
      dueDate: formData.dueDate ? formData.dueDate.toISOString() : undefined,
      updatedAt: now,
    };

    if (task) {
      dispatch({
        type: 'UPDATE_TASK',
        payload: {
          ...task,
          ...payload,
        },
      });
    } else {
      dispatch({
        type: 'ADD_TASK',
        payload: {
          id: crypto.randomUUID(),
          ...payload,
          createdAt: now,
        },
      });
    }
    onClose();
  };

  const toggleTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {task ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full ${state.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`mt-1 block w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 ${state.darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              required
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`mt-1 block w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 ${state.darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className={`mt-1 block w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 ${state.darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className={`mt-1 block w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 ${state.darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              >
                <option value="todo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Due Date
            </label>
            <div className="relative mt-1">
              <DatePicker
                selected={formData.dueDate}
                onChange={(date) => setFormData({ ...formData, dueDate: date })}
                className={`pl-10 w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 ${state.darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                placeholderText="Select due date"
                minDate={new Date()}
                dateFormat="MMMM d, yyyy"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Tags
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                    formData.tags.includes(tag)
                      ? 'bg-blue-500 text-white'
                      : state.darkMode
                      ? 'bg-gray-700 text-gray-200'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {tag}
                  {formData.tags.includes(tag) && (
                    <TagIcon className="ml-1 w-3 h-3" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 border rounded-md text-sm font-medium ${
                state.darkMode
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};