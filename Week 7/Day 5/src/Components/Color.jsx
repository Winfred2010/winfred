import React, { useState, useEffect } from 'react';

function Color() {
  const [favoriteColor, setFavoriteColor] = useState("red");

  useEffect(() => {
    console.log('Color component loaded');
  }, []);

  const changeColor = () => {
    setFavoriteColor("blue");
  };

  return (
    <div>
      <h1>My favorite color is {favoriteColor}</h1>
      <button onClick={changeColor}>Change Color to Blue</button>
    </div>
  );
}

export default Color;
