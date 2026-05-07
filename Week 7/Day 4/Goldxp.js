import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

// --- Exercise 1: BootstrapCard Component ---
const BootstrapCard = ({ title, imageUrl, buttonLabel, buttonUrl, description }) => {
  return (
    <div className="card m-5" style={{ width: '30rem' }}>
      <img className="card-img-top" src={imageUrl} alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href={buttonUrl} className="btn btn-primary">{buttonLabel}</a>
      </div>
    </div>
  );
};

// --- App Component ---
function App() {
  // Data for Exercise 1
  const celebrities = [
    {
      title: 'Bob Dylan',
      imageUrl: 'https://images.unsplash.com/photo-1549488344-cbb6c34ce08b?auto=format&fit=crop&w=500&q=80',
      buttonLabel: 'Go to Wikipedia',
      buttonUrl: 'https://wikipedia.org',
      description: 'Bob Dylan (born Robert Allen Zimmerman, May 24, 1941) is an American singer/songwriter, author, and artist who has been an influential figure in popular music and culture for more than five decades.',
    },
    {
      title: 'McCartney',
      imageUrl: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?auto=format&fit=crop&w=500&q=80',
      buttonLabel: 'Go to Wikipedia',
      buttonUrl: 'https://wikipedia.org',
      description: 'Sir James Paul McCartney CH MBE (born 18 June 1942) is an English singer, songwriter, musician, composer, and record and film producer who gained worldwide fame as co-lead vocalist and bassist for the Beatles.',
    },
  ];

  // Data for Exercise 2
  const planets = ['Mars', 'Venus', 'Jupiter', 'Earth', 'Saturn', 'Neptune'];

  return (
    <div className="container pb-5">
      {/* Exercise 1 Section */}
      <h2 className="mt-5 ms-5">Exercise 1: Celebrities</h2>
      <div className="d-flex flex-wrap">
        {celebrities.map((person, index) => (
          <BootstrapCard 
            key={index}
            title={person.title}
            imageUrl={person.imageUrl}
            description={person.description}
            buttonLabel={person.buttonLabel}
            buttonUrl={person.buttonUrl}
          />
        ))}
      </div>

      <hr />

      {/* Exercise 2 Section */}
      <h2 className="mt-5">Exercise 2: Planets</h2>
      <ul className="list-group mt-3" style={{ maxWidth: '400px' }}>
        {planets.map((planet, index) => (
          <li key={index} className="list-group-item">
            {planet}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
