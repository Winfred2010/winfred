import React, { useState } from 'react';
import './App.css';

const App = () => {
  // --- Exercise 1 State ---
  const [book, setBook] = useState({ title: '', author: '', genre: '', year: '' });
  const [bookSubmitted, setBookSubmitted] = useState(false);

  // --- Exercise 2 State ---
  const [userData, setUserData] = useState({ firstName: '', lastName: '', phone: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- Exercise 1 Handlers ---
  const handleBookChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();
    console.log("Book Data:", book);
    setBookSubmitted(true);
  };

  // --- Exercise 2 Handlers ---
  const handleUserChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (userData.phone.length < 5 || !userData.email.includes('@')) {
      alert("Please provide valid information.");
      return;
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setUserData({ firstName: '', lastName: '', phone: '', email: '' });
    setIsSubmitted(false);
  };

  return (
    <div className="container">
      {/* EXERCISE 1: New Book Form */}
      <section className="exercise">
        <h1>New Book</h1>
        <form onSubmit={handleBookSubmit}>
          <label>Title </label>
          <input name="title" onChange={handleBookChange} required /><br />
          <label>Author </label>
          <input name="author" onChange={handleBookChange} required /><br />
          <label>Genre </label>
          <input name="genre" onChange={handleBookChange} required /><br />
          <label>Year Published </label>
          <input name="year" onChange={handleBookChange} required /><br />
          <button type="submit" className="submit-btn">Submit</button>
        </form>
        {bookSubmitted && <p className="success-msg">Data submitted successfully!</p>}
      </section>

      <hr />

      {/* EXERCISE 2: Welcome Information Form */}
      <section className="exercise">
        {!isSubmitted ? (
          <div className="form-card">
            <h1 className="welcome-title">Welcome!</h1>
            <p>Please provide your information below.</p>
            <form onSubmit={handleUserSubmit}>
              <input name="firstName" placeholder="First Name" onChange={handleUserChange} required /><br />
              <input name="lastName" placeholder="Last Name" onChange={handleUserChange} required /><br />
              <input name="phone" placeholder="Phone Number" onChange={handleUserChange} required /><br />
              <input name="email" placeholder="Email Address" type="email" onChange={handleUserChange} required /><br />
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
        ) : (
          <div className="info-card">
            <h2>{userData.lastName}, {userData.firstName}</h2>
            <p>{userData.phone} | {userData.email}</p>
            <button onClick={handleReset} className="reset-btn">Reset</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default App;
