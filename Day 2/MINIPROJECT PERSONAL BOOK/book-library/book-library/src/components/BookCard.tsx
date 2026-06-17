import { useState } from 'react';
import { Trash2, CheckCircle, Circle, Star, Edit3, Calendar, Tag, Save, X } from 'lucide-react';
import { useBooks } from '../hooks/useBooks';
import { BookItem, type Book } from '../model/Book';
import './BookCard.css';

interface BookCardProps {
  book: BookItem;
}

export const BookCard = ({ book }: BookCardProps) => {
  const { removeBook, toggleReadStatus, setRating, updateBook, categories } = useBooks();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Book>(book.toJSON());

  const handleSave = () => {
    updateBook(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(book.toJSON());
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="book-card editing">
        <div className="book-card-edit">
          <input
            type="text"
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            className="edit-input"
            placeholder="Title"
          />
          <input
            type="text"
            value={editForm.author}
            onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
            className="edit-input"
            placeholder="Author"
          />
          <textarea
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            className="edit-textarea"
            placeholder="Description"
            rows={2}
          />
          <select
            value={editForm.category}
            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
            className="edit-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className="edit-actions">
            <button onClick={handleSave} className="btn-icon save">
              <Save size={16} />
            </button>
            <button onClick={handleCancel} className="btn-icon cancel">
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`book-card ${book.isRead ? 'read' : ''}`}>
      <div className="book-card-header">
        <div className="book-status-badge" onClick={() => toggleReadStatus(book.id)}>
          {book.isRead ? (
            <CheckCircle size={20} className="status-read" />
          ) : (
            <Circle size={20} className="status-unread" />
          )}
        </div>
        <div className="book-actions">
          <button onClick={() => setIsEditing(true)} className="btn-icon edit" title="Edit">
            <Edit3 size={16} />
          </button>
          <button onClick={() => removeBook(book.id)} className="btn-icon delete" title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="book-card-body">
        <h3 className="book-title" title={book.displayTitle}>
          {book.displayTitle}
        </h3>
        <p className="book-author">{book.displayAuthor}</p>
        {book.description && (
          <p className="book-description">{book.description}</p>
        )}
      </div>

      <div className="book-card-footer">
        <div className="book-meta">
          <span className="book-category">
            <Tag size={12} />
            {book.category}
          </span>
          <span className="book-date">
            <Calendar size={12} />
            {book.formattedDate}
          </span>
        </div>
        <div className="book-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(book.id, star)}
              className={`star-btn ${star <= book.rating ? 'filled' : ''}`}
            >
              <Star size={16} fill={star <= book.rating ? 'currentColor' : 'none'} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
