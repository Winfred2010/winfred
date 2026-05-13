import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      destination: '',
      nutsFree: false,
      lactoseFree: false,
      vegan: false
    };
  }

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    type === 'checkbox' 
      ? this.setState({ [name]: checked }) 
      : this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    
    const params = new URLSearchParams();
    if (this.state.firstName) params.append('firstName', this.state.firstName);
    if (this.state.lastName) params.append('lastName', this.state.lastName);
    if (this.state.age) params.append('age', this.state.age);
    if (this.state.gender) params.append('gender', this.state.gender);
    if (this.state.destination) params.append('destination', this.state.destination);
    if (this.state.lactoseFree) params.append('lactoseFree', 'on');
    
    window.location.href = `${window.location.pathname}?${params.toString()}`;
  };

  render() {
    return (
      <div>
        <header className="header">
          <h1>Sample form</h1>
        </header>
        
        <div className="form-section">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <br /><br />
            
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <br /><br />
            
            <input
              type="text"
              name="age"
              placeholder="Age"
              value={this.state.age}
              onChange={this.handleChange}
            />
            <br /><br />
            
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={this.state.gender === 'male'}
                onChange={this.handleChange}
              />
              Male
            </label>
            <br />
            
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={this.state.gender === 'female'}
                onChange={this.handleChange}
              />
              Female
            </label>
            <br />
            
            <label><b>Select your destination</b></label>
            <br />
            <select
              name="destination"
              value={this.state.destination}
              onChange={this.handleChange}
            >
              <option value="">-- Please Choose a destination --</option>
              <option value="Japan">Japan</option>
              <option value="Thailand">Thailand</option>
              <option value="Brazil">Brazil</option>
            </select>
            <br /><br />
            
            <label><b>Dietary restrictions:</b></label>
            <br />
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="nutsFree"
                checked={this.state.nutsFree}
                onChange={this.handleChange}
              />
              Nuts free
            </label>
            <br />
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="lactoseFree"
                checked={this.state.lactoseFree}
                onChange={this.handleChange}
              />
              Lactose free
            </label>
            <br />
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="vegan"
                checked={this.state.vegan}
                onChange={this.handleChange}
              />
              Vegan
            </label>
            <br /><br />
            
            <button type="submit">Submit</button>
          </form>
        </div>
        
        <hr />
        
        <div className="info-section">
          <h2>Entered information:</h2>
          <p><i>Your name:</i> {this.state.firstName} {this.state.lastName}</p>
          <p><i>Your age:</i> {this.state.age}</p>
          <p><i>Your gender:</i> {this.state.gender}</p>
          <p><i>Your destination:</i> {this.state.destination}</p>
          <p><i>Your dietary restrictions:</i></p>
          <p className="restrictions">
            **Nuts free : {this.state.nutsFree ? 'Yes' : 'No'}<br />
            **Lactose free : {this.state.lactoseFree ? 'Yes' : 'No'}<br />
            **Vegan meal : {this.state.vegan ? 'Yes' : 'No'}
          </p>
        </div>
      </div>
    );
  }
}

export default App;