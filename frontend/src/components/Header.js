import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Header() {
  const navigate = useNavigate(); // Initialize navigate function

  // Function to handle navigation
  const navigateToPage = (page) => {
    switch (page) {
      case 'home':
        navigate('/');
        break;
      case 'about':
        navigate('/about'); // Ensure that there's a route for 'about' in App.js
        break;
      case 'help':
        navigate('/help'); // Ensure that there's a route for 'help' in App.js
        break;
      case 'login':
        navigate('/login');
        break;
      case 'create-user':
        navigate('/create-user-account');
        break;
      case 'create-advertiser':
        navigate('/create-advertiser-account');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <header>
      <div className="header-container">
        <button className="brand-name" onClick={() => navigateToPage('home')}>MelodyMinds</button>
        <nav>
          <ul className="nav-links">
            <li><button className="nav-link-button" onClick={() => navigateToPage('home')}>Home</button></li>
            <li><button className="nav-link-button" onClick={() => navigateToPage('about')}>About Us</button></li>
            <li><button className="nav-link-button" onClick={() => navigateToPage('help')}>Help</button></li>
          </ul>
          <button className="login-link" onClick={() => navigateToPage('login')}>
            Login
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
