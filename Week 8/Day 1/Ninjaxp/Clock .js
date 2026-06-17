import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    };
    this.timer = null;
  }

  componentDidMount() {
    // Update the state every second
    this.timer = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    // Clean up the interval to prevent memory leaks
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { time } = this.state;

    // Extracting all required data
    const year = time.getFullYear();
    const monthIndex = time.getMonth();
    const dayNameIndex = time.getDay();
    const day = time.getDate();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Arrays for formatting
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    // Helper for padding (09 instead of 9)
    const formatNum = (num) => (num < 10 ? `0${num}` : num);

    return (
      <div className="clock-container">
        {/* Top Left: Year */}
        <div className="info year-display">{year}</div>

        {/* Bottom Right: Month */}
        <div className="info month-display">{months[monthIndex]}</div>

        {/* Central Compass Clock */}
        <div className="clock-face">
          {/* Rotating Rings Logic */}
          <div className="ring day-ring" style={{ transform: `rotate(${dayNameIndex * -51.4}deg)` }}>
             {days[dayNameIndex]}
          </div>

          {/* Main Digital Display */}
          <div className="digital-display">
            <span className="weekday">{days[dayNameIndex]}</span>
            <span className="date">{formatNum(day)}</span>
            <span className="time">
              {formatNum(hours)}:{formatNum(minutes)}:{formatNum(seconds)}
            </span>
          </div>
        </div>
       </div>
    );
  }
}

export default Clock;
