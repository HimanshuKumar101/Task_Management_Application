import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { TaskFilters } from './components/TaskFilters';
import { Plus } from 'lucide-react';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  return (
    <TaskProvider>
      <div className=" bg-cover bg-bottom bg-[url(https://media.istockphoto.com/id/2155475257/photo/checklist.webp?a=1&b=1&s=612x612&w=0&k=20&c=YlxZhwyqzGHkYrCY_egOZH-5udMeiqr6n_pJ4fg1UKo=)] min-h-screen p-4 md:p-8 transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Task Manager
            </h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>New Task</span>
            </button>
          </div>

          <TaskFilters />
          <TaskList onEditTask={handleEditTask} />

          {isFormOpen && (
            <TaskForm task={editingTask} onClose={handleCloseForm} />
          )}
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;