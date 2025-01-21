import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import AdvertiserLoginPage from './pages/AdvertiserLoginPage';
import UserAccountCreation from './pages/UserAccountCreation';
import AdvertiserAccountCreation from './pages/AdvertiserAccountCreation';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            {/* Define routes for the pages */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/advertiser-login" element={<AdvertiserLoginPage />} />
            <Route path="/create-user-account" element={<UserAccountCreation />} />
            <Route path="/signup" element={<AdvertiserAccountCreation />} /> {/* Updated to /signup */}
            <Route path="/create-advertiser-account" element={<AdvertiserAccountCreation />} /> {/* This can remain if you want a different route */}
            {/* Add other routes like about, help, etc. */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
