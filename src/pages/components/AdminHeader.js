import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchOutline, IoNotificationsOutline } from 'react-icons/io5';

import '../StudentDashboard.css'; // Base styles
import '../StaffDashboard.css';   // Admin styles
import managerAvatar from '../../assets/manger.png';

const AdminHeader = () => {
    const navigate = useNavigate();

    return (
        <header className="main-header">
            <div className="search-bar">
                <IoSearchOutline className="search-icon" />
                <input type="text" placeholder="Search..." />
            </div>
            <div className="top-nav">
                <Link to="/admin/dashboard" className="top-nav-item">Admin Dashboard</Link>
                <Link to="/dashboard" className="top-nav-item">Student View</Link>
            </div>
            <div className="header-actions">
                <IoNotificationsOutline 
                    className="action-icon" 
                    onClick={() => navigate('/admin/notifications')}
                />
                <div className="notification-dot"></div>
                <img 
                    src={managerAvatar} 
                    alt="Manager" 
                    className="profile-pic-header" 
                    onClick={() => navigate('/admin/profile')} 
                />
                <div className="profile-dot"></div>
            </div>
        </header>
    );
};

export default AdminHeader;