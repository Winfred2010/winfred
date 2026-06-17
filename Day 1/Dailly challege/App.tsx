import React, { useState } from 'react';

// ==========================================
// 1. DATA TYPE DEFINITION
// ==========================================
interface Book {
  id: string;
  title: string;
  author: string;
}

// ==========================================
// 2. GENERIC LIST COMPONENT
// ==========================================
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export function List<T extends { id: string | number }>({ items, renderItem }: ListProps<T>) {
  return (
    <ul style={{ paddingLeft: '20px', margin: '15px 0' }}>
      {items.map((item) => (
        <li key={item.id} style={{ margin: '8px 0', listStyleType: 'square' }}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

// ==========================================
// 3. MAIN APPLICATION & STATE ENGINE
// ==========================================
export default function App() {
  const [books, setBooks] = useState<Book[]>([
    { id: '1', title: 'The Hobbit', author: 'J.R.R. Tolkien' },
    { id: '2', title: 'Dune', author: 'Frank Herbert' },
    { id: '3', title: 'Neuromancer', author: 'William Gibson' },
  ]);

  const [titleInput, setTitleInput] = useState<string>('');
  const [authorInput, setAuthorInput] = useState<string>('');

  function handleAddBook(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!titleInput.trim() || !authorInput.trim()) {
      alert('Please fill out both the Title and Author fields.');
      return;
    }

    const newBook: Book = {
      id: crypto.randomUUID(),
      title: titleInput.trim(),
      author: authorInput.trim(),
    };

    setBooks([...books, newBook]);
    setTitleInput('');
    setAuthorInput('');
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '40px auto', padding: '0 20px' }}>
      <h2>Daily Challenge: Generic List Component</h2>
      <hr style={{ border: '0', borderTop: '1px solid #ccc', marginBottom: '20px' }} />

      {/* Inputs Form */}
      <form onSubmit={handleAddBook} style={{ marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Book Title:</label>
          <input
            type="text"
            value={titleInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitleInput(e.target.value)}
            placeholder="e.g. Foundation"
            style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Author Name:</label>
          <input
            type="text"
            value={authorInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthorInput(e.target.value)}
            placeholder="e.g. Isaac Asimov"
            style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" style={{ padding: '8px', cursor: 'pointer', fontWeight: 'bold', alignSelf: 'flex-start' }}>
          Add Book Entry
        </button>
      </form>

      {/* Render Output using Generic List */}
      <h3>Current Library Inventory</h3>
      {books.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>No books remaining in registry.</p>
      ) : (
        <List
          items={books}
          renderItem={(book: Book) => (
            <span>
              <strong>{book.title}</strong> written by <em>{book.author}</em>
            </span>
          )}
        />
      )}
    </div>
  );
}
