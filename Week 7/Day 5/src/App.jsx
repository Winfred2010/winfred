import React from 'react';
import Car from './Components/Car.jsx';
import Events from './Components/Events.jsx';
import Phone from './Components/Phone.jsx';
import Color from './Components/Color.jsx';

function App() {
  const carinfo = { name: "Ford", model: "Mustang" };

  return (
    <div style={{ padding: '30px' }}>
      <h1>React Exercises</h1>
      
      <Car carInfo={carinfo} />
      <hr />
      
      <Events />
      <hr />
      
      <Phone />
      <hr />
      
      <Color />
    </div>
  );
}

export default App;
