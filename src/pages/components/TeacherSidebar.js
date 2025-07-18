// --- File: src/pages/components/TeacherSidebar.js ---

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoHome, IoCloseCircleOutline, IoCalendarOutline, IoStorefront, IoDesktop } from 'react-icons/io5';

import '../StudentDashboard.css'; // Uses the same styles
import logo from '../../assets/logo.png';
import profilePic from '../../assets/profile.png';

const TeacherSidebar = ({ user }) => {
    const navigate = useNavigate();
    const location = useLocation(); // Hook to get the current URL path

    const navItems = [
        { path: '#', label: 'Main Tabs', icon: <IoHome className="nav-icon" /> },
        { path: '/dashboard', label: 'Dashboard', icon: <IoDesktop className="nav-icon" /> },
        { path: '/absence', label: 'Absence and Behavior Records', icon: <IoCloseCircleOutline className="nav-icon" /> },
        { path: '/attendance', label: 'Attendance View', icon: <IoCalendarOutline className="nav-icon" /> },
        { path: '/HomePage', label: 'E-Learing', icon: <IoStorefront className="nav-icon" /> },
    ];

    return (
        <aside className="sidebar">
            <div className="logo-container">
                <img src={logo} alt="Elsewedy Electrometer Logo" className="logo" />
            </div>
            <div className="user-profile">
                <img src={user?.imageP || profilePic} alt={user?.name || "User"} className="profile-pic-small" />
                <div>
                    <p className="user-name">{user?.name || "User"}</p>
                    <p className="user-role">Teacher</p>
                </div>
            </div>
            <nav className="nav-menu">
                <ul className="nav-submenu">
                    {navItems.map(item => (
                        <li 
                            key={item.label} 
                            onClick={() => item.path !== '#' && navigate(item.path)}
                            // Set 'active' class if the current path matches the item's path
                            className={location.pathname === item.path ? 'active' : ''}
                        >
                            {item.icon} {item.label}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default TeacherSidebar;