import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // 1. Import Link
import { IoSearchOutline, IoNotificationsOutline } from 'react-icons/io5';
import '../../pages/StudentDashboard.css'; 
import profilePic from '../../assets/profile.png';

const AppHeader = ({ user }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleNavClick = (path) => {
        navigate(path);
    };

    // 2. Determine the correct profile path based on the user's role
    // Using optional chaining (?.) to prevent errors if user is null
    const profilePath = user?.role === 'admin' || user?.role === 'super admin'
        ? '/admin/profile'
        : '/profile';

    return (
        <header className="main-header">
            <div className="search-bar">
                <IoSearchOutline className="search-icon" />
                <input type="text" placeholder="Search..." />
            </div>
            <div className="top-nav">
                <div onClick={() => handleNavClick('/dashboard')} className={pathname === '/dashboard' ? 'top-nav-item active-link' : 'top-nav-item'}>
                    Dashboard
                </div>
                 <div onClick={() => handleNavClick('/absence')} className={pathname === '/absence' ? 'top-nav-item active-link' : 'top-nav-item'}>
                    Absence
                </div>
                <div onClick={() => handleNavClick('/attendance')} className={pathname === '/attendance' ? 'top-nav-item active-link' : 'top-nav-item'}>
                    Attendance
                </div>
            </div>
            <div className="header-actions">
                <IoNotificationsOutline 
                    className="action-icon" 
                    onClick={() => navigate('/notifications')} 
                    style={{cursor: 'pointer'}} 
                />
                <div className="notification-dot"></div>
                
                {/* 3. Wrap the image in the Link component */}
                <Link to={profilePath} className="profile-link-wrapper">
                    <img
                        src={user?.imageP || profilePic}
                        alt="User Profile"
                        className="profile-pic-header"
                    />
                    <div className="profile-dot"></div>
                </Link>

            </div>
        </header>
    );
};

export default AppHeader;