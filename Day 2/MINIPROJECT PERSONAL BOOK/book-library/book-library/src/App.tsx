import { Provider } from 'react-redux';
import { store } from './app/store';
import { BookInput } from './components/BookInput';
import { BookList } from './components/BookList';
import { StatsDashboard } from './components/StatsDashboard';
import { Library } from 'lucide-react';
import './styles/App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <Library size={32} />
            <h1>Personal Book Library</h1>
          </div>
        </header>

        <main className="app-main">
          <div className="sidebar">
            <BookInput />
            <StatsDashboard />
          </div>
          <div className="content">
            <BookList />
          </div>
        </main>

        <footer className="app-footer">
          <p>Personal Book Library — Built with React, TypeScript & Redux Toolkit</p>
        </footer>
      </div>
    </Provider>
  );
}

export default App;
