import React, { Component } from 'react';

// --- EXERCISE 2: UserFavoriteAnimals Class Component ---
class UserFavoriteAnimals extends Component {
  render() {
    const { favAnimals } = this.props;
    return (
      <ul>
        {favAnimals.map((animal, index) => (
          <li key={index}>{animal}</li>
        ))}
      </ul>
    );
  }
}

// --- EXERCISE 3: Exercise Class Component ---
class Exercise extends Component {
  render() {
    // PART II: Style Object
    const style_header = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };

    return (
      <div>
        {/* Style from Object */}
        <h1 style={style_header}>This is a Header</h1>
        
        {/* CSS logic for Paragraph (Simulating Exercise.css) */}
        <p style={{
          backgroundColor: '#282c34',
          color: 'white',
          padding: '40px',
          fontFamily: 'Arial',
          textAlign: 'center'
        }}>
          This is a paragraph
        </p>
        
        <a href="https://reactjs.org">This is a link</a>
        
        <form style={{ marginTop: '20px' }}>
          <h3>This is a form:</h3>
          Enter your name: <br />
          <input type="text" />
          <button type="submit">Submit</button>
        </form>
        
        <h3>Here is an image:</h3>
        <img src="https://wikimedia.org" alt="react" width="100" />
        
        <h3>This is a list:</h3>
        <ul>
          <li>Coffee</li>
          <li>Tea</li>
          <li>Milk</li>
        </ul>
      </div>
    );
  }
}

// --- MAIN APP COMPONENT ---
function App() {
  // Exercise 1 Variables
  const myelement = <h1>I Love JSX!</h1>;
  const sum = 5 + 5;

  // Exercise 2 Object
  const user = {
    firstName: 'Bob',
    lastName: 'Dylan',
    favAnimals: ['Horse', 'Turtle', 'Elephant', 'Monkey']
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* EXERCISE 1 */}
      <section>
        <p>Hello World!</p>
        {myelement}
        <p>React is {sum} times better with JSX</p>
      </section>

      <hr />

      {/* EXERCISE 2 */}
      <section>
        <h3>{user.firstName}</h3>
        <h3>{user.lastName}</h3>
        <UserFavoriteAnimals favAnimals={user.favAnimals} />
      </section>

      <hr />

      {/* EXERCISE 3 */}
      <section>
        <Exercise />
      </section>
    </div>
  );
}

export default App;
