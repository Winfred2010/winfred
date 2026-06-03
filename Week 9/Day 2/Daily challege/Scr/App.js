import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import plannerReducer from './redux/reducer';
import DatePicker from './components/DatePicker';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const store = createStore(
  plannerReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function App() {
  return (
    <Provider store={store}>
      <div className="planner-layout">
        <h1 className="main-header">Personal Daily Planner</h1>
        <DatePicker />
        <TaskForm />
        <TaskList />
      </div>
    </Provider>
  );
}
