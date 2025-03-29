import React from 'react';
import { useState } from 'react';
import './Navbar.css';
import ReactIcon from '../../assets/react.svg';
import HomeIcon from '../../assets/icons/home-02-svgrepo-com.svg';
import CalendarIcon from '../../assets/icons/calendar.svg';
import ActivitiesIcon from '../../assets/icons/people-svgrepo-com.svg';
import FullLogo from '../../assets/logo/logo.png';
import IconLogo from '../../assets/logo/logo_icon.png';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [isExpanded, setIsExpanded] = useState(false);
    const handleMouseEnter = () => setIsExpanded(true);
    const handleMouseLeave = () => setIsExpanded(false);

    return (
        <div className={`navbar ${isExpanded ? 'expanded' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="logo">
            <img src={isExpanded ? FullLogo : IconLogo} alt="Harmonize logo" className="logo-image" />
            </div>
            <div className="dashboard">
                <div className='dashboard-title'>Dashboard</div>
                <div className="menu-item">
                    <img src={ HomeIcon } alt="home icon" />
                    <Link to="/" className="label">Home</Link>
                </div>
                <div className="menu-item">
                    <img src={ CalendarIcon } alt="calendar icon" />
                    <Link to="/calendar" className="label">Calendar</Link>
                </div>
                <div className="menu-item">
                    <img src={ ActivitiesIcon } alt="activities icon" />
                    <Link to="/activities" className="label">Activities</Link>
                </div>
            </div>
                <div className="family">
                    <div className="family-title">Your family</div>
                    <div className="menu-item">
                        <img src={ ActivitiesIcon } alt="family icon" />
                        <div className="label">Mom</div>
                    </div>
                    <div className="menu-item">
                        <img src={ ActivitiesIcon } alt="family icon" />
                        <div className="label">Dad</div>
                    </div>
                    <div className="menu-item">
                        <img src={ ActivitiesIcon } alt="family icon" />
                        <div className="label">Alice</div>
                    </div>
                    <div className="menu-item">
                        <img src={ ActivitiesIcon } alt="family icon" />
                        <div className="label">Max</div>
                    </div>
                </div>
        </div>
    );
}
 
export default Navbar
