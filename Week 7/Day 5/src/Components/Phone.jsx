import React, { useState } from 'react';

function Phone() {
  const [brand, setBrand] = useState("Samsung");
  const [model, setModel] = useState("Galaxy S20");
  const [color, setColor] = useState("black");
  const [year, setYear] = useState(2020);

  const changeColor = () => {
    setColor("blue");
  };

  return (
    <div>
      <h3>Brand: {brand}</h3>
      <h3>Model: {model}</h3>
      <h3>Color: {color}</h3>
      <h3>Year: {year}</h3>
      <button onClick={changeColor}>Change Color</button>
    </div>
  );
}

export default Phone;
