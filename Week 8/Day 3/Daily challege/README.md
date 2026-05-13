# Enhanced Task Manager - Daily Challenge

## 📋 Features

- ✅ **Add Tasks** — Create new tasks with a clean form
- ✅ **Edit Tasks** — Click "Edit" to modify task text with save/cancel
- ✅ **Toggle Completion** — Click checkbox to mark tasks complete
- ✅ **Remove Tasks** — Delete tasks you no longer need
- ✅ **Filter by Status** — View all, active, or completed tasks
- ✅ **Task Counters** — See counts for each filter type
- ✅ **useRef for Editing** — Auto-focus input field when editing

## 🗂️ File Structure

```
Daily challege/
├── TaskContext.jsx          # Context for task state
├── TaskProvider.jsx         # Reducer & provider
├── useTask.js              # Custom hook to access context
├── AddTask.jsx             # Form to add new tasks
├── TaskItem.jsx            # Individual task with edit/delete
├── TaskList.jsx            # Display filtered tasks
├── FilterTabs.jsx          # Filter buttons
└── EnhancedTaskManager.jsx # Main app component
```

## 🎯 Key Implementation Details

### useReducer Actions
- `add` — Add a new task
- `toggle` — Mark task complete/incomplete
- `edit` — Update task text
- `remove` — Delete a task
- `filter` — Change filter (all, active, completed)

### useRef Usage
- Auto-focus input field when entering edit mode
- Enables quick keyboard shortcuts (Enter to save, Escape to cancel)

### Filtering Logic
- **All** — Shows all tasks
- **Active** — Shows only incomplete tasks
- **Completed** — Shows only completed tasks

## 🚀 Usage

Import and use the `EnhancedTaskManager` component in your React app:

```jsx
import EnhancedTaskManager from './EnhancedTaskManager';

export default EnhancedTaskManager;
```

## 💡 Code Highlights

- Clean component separation
- Inline styling for portability
- Smooth transitions and hover effects
- Keyboard shortcuts for editing
- Task counters for each filter
- No external dependencies (pure React)
