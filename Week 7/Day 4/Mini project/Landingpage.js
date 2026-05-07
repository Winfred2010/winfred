import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faCode, faHeart } from '@fortawesome/free-solid-svg-icons';

// --- 1. HEADER COMPONENT ---
const Header = () => {
  return (
    <nav style={styles.nav} className="navbar">
      <h2 style={{ margin: 0, fontWeight: 'bold' }}>Company Name</h2>
      <ul style={styles.navLinks}>
        <li style={styles.link}>About</li>
        <li style={styles.link}>About</li>
        <li style={styles.link}>Contact</li>
      </ul>
    </nav>
  );
};

// --- 2. CARD COMPONENT ---
const Card = ({ icon, title, description }) => {
  return (
    <div style={styles.card} className="card-item">
      <FontAwesomeIcon icon={icon} size="3x" style={{ color: '#333', marginBottom: '15px' }} />
      <h3 style={{ fontSize: '1.2rem', margin: '10px 0' }}>{title}</h3>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>{description}</p>
    </div>
  );
};

// --- 3. CONTACT COMPONENT ---
const Contact = () => {
  return (
    <section style={styles.contactSection}>
      <h2>Contact Us</h2>
      <form style={styles.form}>
        <input type="text" placeholder="Your Name" style={styles.input} />
        <input type="email" placeholder="Your Email" style={styles.input} />
        <textarea placeholder="Your Message" style={{ ...styles.input, height: '100px' }}></textarea>
        <button type="submit" style={styles.button}>Send Message</button>
      </form>
    </section>
  );
};

// --- 4. FOOTER COMPONENT ---
const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={{ margin: 0 }}>&copy; 2024 Your Company. All rights reserved.</p>
    </footer>
  );
};

// --- 4. MAIN APP COMPONENT ---
function App() {
  return (
    <div style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', margin: 0, color: '#333' }}>
      <Header />
      
      <main style={styles.hero}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Build Something Amazing</h1>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>A responsive landing page built with React components.</p>
      </main>

      <section style={styles.cardContainer}>
        <Card 
          icon={faRocket} 
          title="Fast Launch" 
          description="Get your project up and running in minutes with optimized tools." 
        />
        <Card 
          icon={faCode} 
          title="Clean Code" 
          description="Reusable components that are easy to read and maintain." 
        />
        <Card 
          icon={faHeart} 
          title="User Friendly" 
          description="Modern design that looks great on any device or screen size." 
        />
      </section>

      <Footer />
    </div>
  );
}

// --- 5. STYLES (Flexbox & Responsiveness) ---
const styles = {
  nav: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '20px 50px', 
    background: '#2c3e50', 
    color: '#fff', 
    flexWrap: 'wrap' 
  },
  navLinks: { display: 'flex', listStyle: 'none', gap: '30px', margin: 0, padding: 0 },
  link: { cursor: 'pointer' },
  
  hero: { padding: '100px 20px', textAlign: 'center', background: '#f8f9fa' },
  
  cardContainer: { 
    display: 'flex', 
    justifyContent: 'center', 
    padding: '50px', 
    flexWrap: 'wrap', // This is key for responsiveness!
    gap: '20px' 
  },
  
  card: { 
    flex: '1 1 300px', 
    maxWidth: '350px',
    padding: '30px 20px', 
    textAlign: 'center', 
    borderRadius: '4px', 
    backgroundColor: '#fff'
  },
  
  contactSection: { padding: '50px', textAlign: 'center', background: '#f9f9f9' },
  form: { display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '0 auto', gap: '10px' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' },
  footer: { 
    padding: '30px', 
    textAlign: 'center', 
    background: '#333', 
    color: '#aaa', 
    fontSize: '0.85rem' 
  },
  button: { 
    padding: '12px', 
    background: '#007bff', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '4px', 
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default App;
