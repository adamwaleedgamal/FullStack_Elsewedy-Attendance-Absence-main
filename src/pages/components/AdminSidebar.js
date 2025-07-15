import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  IoHomeOutline, IoDocumentTextOutline, IoPeopleOutline, IoSettingsOutline,
  IoMenuOutline, IoCloseOutline
} from 'react-icons/io5';

import '../StudentDashboard.css'; // Reusing base styles
import '../StaffDashboard.css';   // Reusing admin styles
import logo from '../../assets/logo.png'; // Adjust the path as needed
import managerAvatar from '../../assets/manger.png';

const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: <IoHomeOutline className="nav-icon" /> },
        { path: '/admin/reports', label: 'Reports', icon: <IoDocumentTextOutline className="nav-icon" /> },
        { path: '/admin/staff', label: 'Staff List', icon: <IoPeopleOutline className="nav-icon" /> },
        { path: '/admin/settings', label: 'Settings', icon: <IoSettingsOutline className="nav-icon" /> },
    ];
    
    // A function to handle navigation and close the sidebar on mobile
    const handleNavigate = (path) => {
        navigate(path);
        setIsSidebarOpen(false);
    };

    return (
        <>
            {/* Mobile menu button, outside the sidebar */}
            <button className="mobile-menu-toggle" onClick={() => setIsSidebarOpen(true)}>
              <IoMenuOutline />
            </button>
            
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                    <IoCloseOutline className="sidebar-close-btn" onClick={() => setIsSidebarOpen(false)} />
                </div>
                <div className="user-profile">
                    <img src={managerAvatar} alt="Manager" className="profile-pic-small" />
                    <div><p className="user-name">School Manager</p><p className="user-role">Administrator</p></div>
                </div>
                <nav className="nav-menu">
                    <ul className="nav-submenu">
                        {navItems.map(item => (
                            <li 
                                key={item.path} 
                                onClick={() => handleNavigate(item.path)}
                                className={location.pathname === item.path ? 'active' : ''}
                            >
                                {item.icon} {item.label}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default AdminSidebar;