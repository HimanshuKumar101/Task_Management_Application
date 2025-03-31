import React, { createContext, useContext, useEffect, useReducer } from 'react';

const initialState = {
  tasks: [],
  filter: {
    status: 'all',
    priority: 'all',
    sortBy: 'date',
    searchQuery: '',
    tags: [],
  },
  darkMode: false,
};

// Helper function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('taskManagerState');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Failed to load state:', err);
    return initialState;
  }
};

const taskReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case 'ADD_TASK':
      newState = {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
      break;
    case 'UPDATE_TASK':
      newState = {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
      break;
    case 'DELETE_TASK':
      newState = {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
      break;
    case 'REORDER_TASKS':
      newState = {
        ...state,
        tasks: action.payload,
      };
      break;
    case 'SET_FILTER':
      newState = {
        ...state,
        filter: { ...state.filter, ...action.payload },
      };
      break;
    case 'TOGGLE_DARK_MODE':
      newState = {
        ...state,
        darkMode: !state.darkMode,
      };
      break;
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }

  // Save to localStorage after each state change
  try {
    localStorage.setItem('taskManagerState', JSON.stringify(newState));
  } catch (err) {
    console.error('Failed to save state:', err);
  }

  return newState;
};

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load state from localStorage on initial render
  useEffect(() => {
    const savedState = loadState();
    if (savedState) {
      dispatch({ type: 'LOAD_STATE', payload: savedState });
    }
  }, []);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};