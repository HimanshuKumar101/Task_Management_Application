# Task Management Application

A feature-rich task management application built with React, providing functionalities such as task creation, editing, filtering, sorting, and drag-and-drop reordering. The application also supports dark mode and persistent state storage using `localStorage`.

## Features

- **Task Management**: Create, edit, delete, and mark tasks as completed.
- **Drag-and-Drop**: Reorder tasks using drag-and-drop functionality.
- **Filters and Sorting**:
  - Filter tasks by status, priority, tags, and search query.
  - Sort tasks by creation date or priority.
- **Dark Mode**: Toggle between light and dark themes.
- **Persistent State**: Automatically saves tasks and settings to `localStorage`.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd Task-Management-Application/project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
project/
├── src/
│   ├── components/
│   │   ├── TaskList.jsx       # Displays the list of tasks with drag-and-drop functionality
│   │   ├── TaskForm.jsx       # Form for creating and editing tasks
│   │   ├── TaskFilters.jsx    # Filters and sorting options for tasks
│   ├── context/
│   │   ├── TaskContext.jsx    # Global state management using React Context and Reducer
│   ├── App.jsx                # Main application component
├── README.md                  # Project documentation
```

## Usage

1. **Create a Task**:
   - Click the "New Task" button.
   - Fill in the task details and click "Create Task".

2. **Edit a Task**:
   - Click the pencil icon on a task to edit its details.

3. **Delete a Task**:
   - Click the trash icon on a task to delete it.

4. **Reorder Tasks**:
   - Drag and drop tasks to reorder them.

5. **Filter and Sort Tasks**:
   - Use the filter and sort options to customize the task view.

6. **Toggle Dark Mode**:
   - Click the sun/moon icon to switch between light and dark themes.

## Technologies Used

- **React**: Component-based UI library.
- **React Context**: For global state management.
- **React DnD**: Drag-and-drop functionality.
- **Lucide Icons**: Icon library for UI elements.
- **React DatePicker**: For selecting due dates.
- **Tailwind CSS**: Utility-first CSS framework for styling.


## Acknowledgments

- Icons provided by [Lucide Icons](https://lucide.dev/).
- Drag-and-drop powered by [@hello-pangea/dnd](https://github.com/hello-pangea/dnd).
- Date picker by [React DatePicker](https://reactdatepicker.com/).

---
Happy task managing! 🎉