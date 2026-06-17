import { useState, type FormEvent } from 'react';
import { PlusCircle, BookOpen } from 'lucide-react';
import { useBooks } from '../hooks/useBooks';
import './BookInput.css';

export const BookInput = () => {
  const { addBook, categories, addCategory } = useBooks();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!author.trim()) newErrors.author = 'Author is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addBook({
      title: title.trim(),
      author: author.trim(),
      description: description.trim(),
      category: category === 'new' && newCategory.trim() ? newCategory.trim() : category,
      isRead: false,
      rating: 0,
    });

    setTitle('');
    setAuthor('');
    setDescription('');
    setCategory('Uncategorized');
    setNewCategory('');
    setShowNewCategory(false);
    setErrors({});
  };

  const handleCategoryChange = (value: string) => {
    if (value === 'new') {
      setShowNewCategory(true);
      setCategory('new');
    } else {
      setShowNewCategory(false);
      setCategory(value);
    }
  };

  const handleAddNewCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      addCategory(newCategory.trim());
      setCategory(newCategory.trim());
      setShowNewCategory(false);
      setNewCategory('');
    }
  };

  return (
    <div className="book-input">
      <div className="book-input-header">
        <BookOpen size={24} />
        <h2>Add New Book</h2>
      </div>
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-row">
          <div className={`form-group ${errors.title ? 'error' : ''}`}>
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter book title"
              className="form-control"
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>
          <div className={`form-group ${errors.author ? 'error' : ''}`}>
            <label htmlFor="author">Author *</label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              className="form-control"
            />
            {errors.author && <span className="error-text">{errors.author}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the book"
            rows={3}
            className="form-control"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="form-control"
            >
              <option value="Uncategorized">Uncategorized</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="new">+ New Category</option>
            </select>
          </div>
        </div>

        {showNewCategory && (
          <div className="form-group new-category">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category name"
              className="form-control"
              autoFocus
            />
            <button type="button" onClick={handleAddNewCategory} className="btn-secondary">
              Add Category
            </button>
          </div>
        )}

        <button type="submit" className="btn-primary">
          <PlusCircle size={18} />
          Add Book
        </button>
      </form>
    </div>
  );
};
