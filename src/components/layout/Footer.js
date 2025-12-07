import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>T.alisson</h3>
          <p>Your complete business management solution</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/orders">Orders</Link></li>
            <li><Link to="/customers">Customers</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><Link to="/settings">Settings</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/statistics">Statistics</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@t.alisson.com</p>
          <p>Phone: +1 234-567-8900</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} Tamer Mohamed. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

