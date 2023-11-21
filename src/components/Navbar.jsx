import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../hooks/useAuth';
import logo from '../assets/logo.png';

function Navbar() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const { authToken } = JSON.parse(localStorage.getItem('Token')) || {};
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };
  const handleLogout = () => {
    setAuth({});
    localStorage.removeItem('Token');
    if (authToken) {
      try {
        axios.delete('http://localhost:3000/auth/logout', {
          headers: {
            Authorization: authToken,
            'Content-Type': 'application/json',
          },
        });
        toast.success('Logout Successfully');
      } catch (err) {
        toast.error('Opps😥 failed To logout');
        throw Error(err);
      }
    }
    navigate('/login');
  };
  return (
    <>
      <div className="mob-nav">
        <FontAwesomeIcon icon={faBars} className="humburger" onClick={toggleSidebar} />
      </div>
      <div className={`side-bar ${sidebarVisible ? 'visible' : ''}`}>
        <div className="sidebar-logo-container">
          <img src={logo} alt="" className="sidebar-logo" />
        </div>
        <div className="sidebar-links-container">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeSidebar}>Cars</Link>
          <Link to="/newCar" className={`nav-link ${location.pathname === '/newCar' ? 'active' : ''}`} onClick={closeSidebar}>Add Car</Link>
          <Link to="/cars/delete" className={`nav-link ${location.pathname === '/cars/delete' ? 'active' : ''}`} onClick={closeSidebar}>Delete Car</Link>
          <Link to="/reserveCars" className={`nav-link ${location.pathname === '/reserveCars' ? 'active' : ''}`} onClick={closeSidebar}>Add Reservation</Link>
          <Link to="/reservationsList" className={`nav-link ${location.pathname === '/reservationsList' ? 'active' : ''}`} onClick={closeSidebar}>My Reservations</Link>
          <button
            disabled={!authToken}
            onClick={handleLogout}
            type="button"
            className="list-group-item list-group-item-action logout-btn"
          >
            Log Out
          </button>
        </div>
        <div className="license-container">
          <p className="license">&copy; 2023 Test Drive Zone</p>
          <p className="license">All rights reserved.</p>
        </div>
      </div>
    </>
  );
}

export default Navbar;
