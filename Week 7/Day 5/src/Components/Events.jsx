import React, { useState } from 'react';

function Events() {
  const [inputText, setInputText] = useState("");
  const [isToggleOn, setIsToggleOn] = useState(true);

  const clickMe = () => {
    alert('I was clicked');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      alert(`The Enter key was pressed. Input text: ${inputText}`);
    }
  };

  const toggleState = () => {
    setIsToggleOn(!isToggleOn);
  };

  return (
    <div>
      <button onClick={clickMe}>Click Me</button>
      <br /><br />
      <input 
        type="text" 
        placeholder="Type and press Enter" 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown} 
      />
      <br /><br />
      <button onClick={toggleState}>{isToggleOn ? "ON" : "OFF"}</button>
    </div>
  );
}

export default Events;
