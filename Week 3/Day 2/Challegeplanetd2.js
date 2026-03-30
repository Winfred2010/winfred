// 1. Define the planets with their unique properties
const solarSystem = [
    { name: "Mercury", color: "gray", moons: 0 },
    { name: "Venus", color: "orange", moons: 0 },
    { name: "Earth", color: "blue", moons: 1 },
    { name: "Mars", color: "red", moons: 2 },
    { name: "Jupiter", color: "brown", moons: 79 },
    { name: "Saturn", color: "khaki", moons: 82 },
    { name: "Uranus", color: "lightblue", moons: 27 },
    { name: "Neptune", color: "darkblue", moons: 14 }
];

// 2. Select the section where planets will be appended
const section = document.querySelector(".listPlanets");

// 3. Iterate through the array to build the system
solarSystem.forEach((planetData) => {
    // Create the planet div
    const planetDiv = document.createElement("div");
    planetDiv.classList.add("planet");
    planetDiv.style.backgroundColor = planetData.color;
    planetDiv.textContent = planetData.name;
    
    // Bonus: Handle Moons
    for (let i = 0; i < planetData.moons; i++) {
        const moonDiv = document.createElement("div");
        moonDiv.classList.add("moon");
        
        // Position moons around the planet using an offset
        // (Note: In a real UI, you might cap the display of 80+ moons)
        moonDiv.style.left = `${(i * 10) + 110}px`; 
        
        planetDiv.appendChild(moonDiv);
    }

    // Append the planet to the section
    section.appendChild(planetDiv);
});
