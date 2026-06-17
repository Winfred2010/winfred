import { useBooks } from '../hooks/useBooks';
import { BookOpen, CheckCircle, Clock, Star, BarChart3, Download, Upload } from 'lucide-react';
import './StatsDashboard.css';

export const StatsDashboard = () => {
  const { stats, allBooks, importBooks } = useBooks();
  const { total, read, unread, byCategory, avgRating } = stats;

  const readPercentage = total > 0 ? Math.round((read / total) * 100) : 0;

  const handleExport = () => {
    const data = JSON.stringify(allBooks.map((b) => b.toJSON()), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `book-library-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (Array.isArray(data)) {
          importBooks(data);
        }
      } catch {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="stats-dashboard">
      <div className="stats-header">
        <BarChart3 size={24} />
        <h2>Library Statistics</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <BookOpen size={24} />
          <div className="stat-info">
            <span className="stat-value">{total}</span>
            <span className="stat-label">Total Books</span>
          </div>
        </div>

        <div className="stat-card read">
          <CheckCircle size={24} />
          <div className="stat-info">
            <span className="stat-value">{read}</span>
            <span className="stat-label">Read</span>
          </div>
        </div>

        <div className="stat-card unread">
          <Clock size={24} />
          <div className="stat-info">
            <span className="stat-value">{unread}</span>
            <span className="stat-label">Unread</span>
          </div>
        </div>

        <div className="stat-card rating">
          <Star size={24} />
          <div className="stat-info">
            <span className="stat-value">{avgRating > 0 ? avgRating.toFixed(1) : '-'}</span>
            <span className="stat-label">Avg Rating</span>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span>Reading Progress</span>
          <span>{readPercentage}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${readPercentage}%` }}
          />
        </div>
        <p className="progress-text">
          {read} of {total} books completed
        </p>
      </div>

      {Object.keys(byCategory).length > 0 && (
        <div className="category-stats">
          <h3>Books by Category</h3>
          <div className="category-bars">
            {Object.entries(byCategory)
              .sort(([, a], [, b]) => b - a)
              .map(([category, count]) => (
                <div key={category} className="category-bar-item">
                  <div className="category-bar-label">
                    <span>{category}</span>
                    <span>{count}</span>
                  </div>
                  <div className="category-bar-track">
                    <div
                      className="category-bar-fill"
                      style={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="data-actions">
        <button onClick={handleExport} className="btn-outline">
          <Download size={16} />
          Export Data
        </button>
        <label className="btn-outline">
          <Upload size={16} />
          Import Data
          <input type="file" accept=".json" onChange={handleImport} hidden />
        </label>
      </div>
    </div>
  );
};
