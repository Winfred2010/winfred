import React, { useState, useEffect } from 'react';

// ==========================================
// EXERCISE 2: Components with Props
// ==========================================
interface GreetingProps {
  name: string;
  messageCount: number;
}

export function Greeting({ name, messageCount }: GreetingProps) {
  return (
    <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '4px', margin: '10px 0' }}>
      <h3 style={{ margin: '0 0 5px 0' }}>Hello, {name}!</h3>
      <p style={{ margin: 0 }}>You have {messageCount} new messages waiting for you.</p>
    </div>
  );
}


// ==========================================
// EXERCISE 3: useState Hook
// ==========================================
export function Counter() {
  const [count, setCount] = useState<number>(0);
  const [lastAction, setLastAction] = useState<string>('none');

  function increment(): void {
    setCount(count + 1);
    setLastAction('increment');
  }

  function decrement(): void {
    setCount(count - 1);
    setLastAction('decrement');
  }

  return (
    <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '4px', maxWidth: '250px', margin: '10px 0' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Counter</h3>
      <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>{count}</div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <button onClick={decrement} style={{ padding: '5px 10px' }}>- Decrement</button>
        <button onClick={increment} style={{ padding: '5px 10px' }}>+ Increment</button>
      </div>
      <div style={{ fontSize: '12px', color: '#666' }}>
        Last action: <strong>{lastAction}</strong>
      </div>
    </div>
  );
}


// ==========================================
// EXERCISE 4: Optional Props
// ==========================================
interface UserCardProps {
  name?: string;
  age?: number;
  role?: string;
}

export function UserCard({ 
  name = 'Guest User', 
  age, 
  role = 'Member' 
}: UserCardProps) {
  return (
    <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '4px', margin: '10px 0', backgroundColor: '#fafafa' }}>
      <h3 style={{ margin: '0 0 5px 0' }}>{name}</h3>
      <p style={{ margin: '3px 0' }}><strong>Role:</strong> {role}</p>
      <p style={{ margin: '3px 0' }}><strong>Age:</strong> {age !== undefined ? `${age} years old` : 'Unknown'}</p>
    </div>
  );
}


// ==========================================
// EXERCISE 5: useEffect Data Fetching
// ==========================================
interface User {
  id: number;
  name: string;
  email: string;
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://typicode.com')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not fetch data from the server.');
        }
        return response.json();
      })
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <ul style={{ paddingLeft: '20px', margin: '10px 0' }}>
      {users.map((user) => (
        <li key={user.id} style={{ margin: '5px 0' }}>
          <strong>{user.name}</strong> ({user.email})
        </li>
      ))}
    </ul>
  );
}


// ==========================================
// MAIN APPLICATION LAYOUT
// ==========================================
export default function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>React TypeScript Labs</h1>
      <hr />

      <section>
        <h2>Exercise 2: Greeting Component</h2>
        <Greeting name="Alice" messageCount={5} />
      </section>

      <section style={{ marginTop: '30px' }}>
        <h2>Exercise 3: Counter State</h2>
        <Counter />
      </section>

      <section style={{ marginTop: '30px' }}>
        <h2>Exercise 4: User Cards (Optional Props)</h2>
        <UserCard name="Bob Ross" age={52} role="Artist" />
        <UserCard name="Charlie" role="Admin" />
        <UserCard />
      </section>

      <section style={{ marginTop: '30px' }}>
        <h2>Exercise 5: API User List</h2>
        <UserList />
      </section>
    </div>
  );
}
