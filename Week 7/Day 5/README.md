# React Exercises - Week 7 Day 5

A collection of React exercises covering fundamental concepts like components, state management, hooks, and event handling.

## Exercises Included

1. **Car Component** - Component composition with props and state
   - Displays car information (model, color)
   - Nested Garage component

2. **Events** - Event handling and state management
   - Click event handler
   - Keyboard input handling (Enter key)
   - Toggle button state

3. **Phone Component** - Multiple state variables
   - Brand, model, color, and year state
   - Button to change color

4. **Color Component** - useEffect hook usage
   - Demonstrates side effects on component mount
   - Color state management

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Running the Application

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

### Building for Production

```bash
npm build
```

## Project Structure

```
src/
├── App.jsx          # Main application component
├── index.jsx        # React entry point
└── Components/
    ├── Car.jsx
    ├── Events.jsx
    ├── Phone.jsx
    ├── Color.jsx
    └── Garage.jsx
public/
└── index.html       # HTML template
```

## Technologies Used

- React 18.2.0
- React DOM 18.2.0
- react-scripts

## License

MIT
