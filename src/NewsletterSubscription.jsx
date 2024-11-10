import React, { useState } from 'react';
import axios from 'axios';
import './NewsletterSubscription.css';

function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/subscribe', { email });
      setMessage(response.data.message);
      setEmail(''); // Clear the input field
    } catch (error) {
      setMessage('Error subscribing. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="newsletter-section">
      <div className="subscription-header">
        <h1>SIGN UP FOR OUR DAILY INSIDER</h1>
        <form onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
        <p>{message}</p>
      </div>
      <div className="footer-links">
        <div className="footer-column">
          <h3>Explore</h3>
          <ul>
            <li>Home</li>
            <li>Questions</li>
            <li>Articles</li>
            <li>Tutorials</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Support</h3>
          <ul>
            <li>FAQs</li>
            <li>Help</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Stay connected</h3>
          <div className="social-icons">
            <span>📘</span>
            <span>🐦</span>
            <span>📸</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>DEV@Deakin</p>
        <ul>
          <li>Privacy Policy</li>
          <li>Terms</li>
          <li>Code of Conduct</li>
        </ul>
      </div>
    </div>
  );
}

export default NewsletterSubscription;