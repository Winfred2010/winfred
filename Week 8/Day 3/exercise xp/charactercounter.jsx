import { useRef, useState } from 'react';

function CharacterCounter() {
  const inputRef = useRef(null);
  const [count, setCount] = useState(0);

  const handleInput = () => {
    setCount(inputRef.current?.value.length ?? 0);
  };

  return (
    <div style={{ width: '100%', maxWidth: 520 }}>
      <label htmlFor="char-input" style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
        Enter text:
      </label>
      <input
        id="char-input"
        ref={inputRef}
        type="text"
        onInput={handleInput}
        placeholder="Start typing..."
        style={{
          width: '100%',
          padding: '0.9rem 1rem',
          borderRadius: 12,
          border: '1px solid #d1d5db',
          fontSize: '1rem',
          marginBottom: 12,
          outline: 'none',
        }}
      />
      <div style={{ fontSize: '0.95rem', color: '#4b5563' }}>
        Character count: <strong>{count}</strong>
      </div>
    </div>
  );
}

export default CharacterCounter;