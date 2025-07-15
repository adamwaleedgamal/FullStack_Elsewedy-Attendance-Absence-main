import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoHomeOutline, IoCloseCircleOutline, IoCalendarOutline } from 'react-icons/io5';

import '../StudentDashboard.css'; // We can still use the same styles
import logo from '../../assets/logo.png';
import profilePic from '../../assets/profile.png'; // Adjust the path as needed

const TeacherSidebar = ({ user }) => {
    const navigate = useNavigate();
    const location = useLocation(); // Hook to get the current URL path

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <IoHomeOutline className="nav-icon" /> },
        { path: '/absence', label: 'Absence and Behavior Records', icon: <IoCloseCircleOutline className="nav-icon" /> },
        { path: '/attendance', label: 'Attendance View', icon: <IoCalendarOutline className="nav-icon" /> },
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
                            key={item.path} 
                            onClick={() => navigate(item.path)}
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