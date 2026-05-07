import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Essential CSS
import { Carousel } from 'react-responsive-carousel';

function App() {
  const images = [
    {
      url: "https://klook.com",
      label: "Hong Kong"
    },
    {
      url: "https://klook.com",
      label: "Macao"
    },
    {
      url: "https://klook.com",
      label: "Japan"
    },
    {
      url: "https://klook.com",
      label: "Las Vegas"
    }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h1>React Carousel</h1>
      
      <Carousel 
        autoPlay 
        infiniteLoop 
        showArrows={true} 
        showStatus={false}
        thumbWidth={100}
      >
        {images.map((img, index) => (
          <div key={index}>
            <img src={img.url} alt={img.label} />
            <p className="legend">{img.label}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default App;
