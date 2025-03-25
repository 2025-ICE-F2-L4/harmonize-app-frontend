import React from 'react';
import './Navbar.css';
import ReactIcon from '../assets/react.svg';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="dashboard">
                <img src={ ReactIcon } alt="dashboard icon" />
                <div className="label">Dashboard</div>
           </div>
            <div className="menu-item">
                <img src={ ReactIcon } alt="calendar icon" /> 
                <div className="label">Calendar</div>
            </div>
            <div className="menu-item">
                <img src={ ReactIcon } alt="activities icon" />
                <div className="label">Activities</div>
            </div>
            <div className="menu-item">
                <img src={ ReactIcon } alt="family icon" />
                <div className="label">Your family</div>
            </div>
            <div className="menu-item">
                <img src={ ReactIcon } alt="help icon" />
                <div className="label">Help</div>
            </div>
        </div>
    );
}
 
export default Navbar
