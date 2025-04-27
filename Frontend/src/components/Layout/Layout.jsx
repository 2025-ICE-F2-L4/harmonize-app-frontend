import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import './Layout.css';
import { useState } from 'react';

const Layout = () => {
    const location = useLocation();
    const hideNavbar = location.pathname === '/login';
  
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);


    return (
      <div className="layout">
        {!hideNavbar && <Navbar />}

        {!hideNavbar && (
          <div className="top-bar">
            <div className="user-menu">
              <button onClick={toggleDropdown}> Menu ▼ </button>
              {dropdownOpen && (
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/family">Family Panel</a></li>
                  <li><a href="/login">Sign up</a></li>
                  <li><a href="/logout">Log out</a></li>
                </ul>
              )}
            </div>
          </div>
        )}

        <main className={`layout-content ${hideNavbar ? 'no-navbar' : ''}`}>
            <Outlet />
        </main>
      </div>
    );
  };
  
 
export default Layout;