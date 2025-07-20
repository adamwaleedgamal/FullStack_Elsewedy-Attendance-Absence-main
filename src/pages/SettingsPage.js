// --- File: src/pages/SettingsPage.js (CORRECTED) ---

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import ALL necessary icons
import {
  IoPersonCircleOutline, IoBusinessOutline, IoNotificationsCircleOutline, IoKeyOutline,
  IoHomeOutline, IoDocumentTextOutline, IoPeopleOutline, IoSettingsOutline, 
  IoNotificationsOutline, IoSchoolOutline, IoStarOutline // <-- ADDED MISSING ICONS
} from 'react-icons/io5';

// Reuse the same CSS files
import './StudentDashboard.css';
import './StaffDashboard.css';

import logo from '../assets/logo.png';
import managerAvatar from '../assets/manger.png';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('settings');

    // State for form inputs (unchanged)
    const [adminName, setAdminName] = useState('School Manager');
    const [adminEmail, setAdminEmail] = useState('manager@school.com');
    const [schoolName, setSchoolName] = useState('Elsewedy International School');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const handleNavigate = (path, navItem) => {
        setActiveNav(navItem);
        navigate(path);
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        alert('Settings have been saved!');
    };

    return (
        <div className="dashboard-layout">
            {/* --- CORRECTED SIDEBAR --- */}
            <aside className="sidebar">
                <div className="logo-container"><img src={logo} alt="School Logo" className="logo" /></div>
                <div className="user-profile">
                    <img src={managerAvatar} alt="Manager" className="profile-pic-small" />
                    <div><p className="user-name">School Manager</p><p className="user-role">Administrator</p></div>
                </div>
                <nav className="nav-menu">
                    <ul className="nav-submenu" style={{ margin: 0 }}>
                        <li onClick={() => handleNavigate('/admin/dashboard', 'dashboard')} className={activeNav === 'dashboard' ? 'active' : ''}><IoHomeOutline className="nav-icon" /> Dashboard</li>
                        <li onClick={() => handleNavigate('/admin/reports', 'reports')} className={activeNav === 'reports' ? 'active' : ''}><IoDocumentTextOutline className="nav-icon" /> Reports</li>
                        <li onClick={() => handleNavigate('/admin/staff', 'staff')} className={activeNav === 'staff' ? 'active' : ''}><IoPeopleOutline className="nav-icon" /> Staff List</li>
                        <li onClick={() => handleNavigate('/admin/student-list', 'student-list')} className={activeNav === 'student-list' ? 'active' : ''}><IoSchoolOutline className="nav-icon" /> Student List</li>
                        <li onClick={() => handleNavigate('/admin/specialists', 'specialists')} className={activeNav === 'specialists' ? 'active' : ''}><IoStarOutline className="nav-icon" /> Specialists</li>
                        <li onClick={() => handleNavigate('/admin/settings', 'settings')} className={activeNav === 'settings' ? 'active' : ''}><IoSettingsOutline className="nav-icon" /> Settings</li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content (unchanged) */}
            <main className="main-content">
                <header className="main-header">
                    <div className="search-bar"></div>
                    <div className="header-actions">
                        <IoNotificationsOutline className="action-icon" onClick={() => navigate('/admin/notifications')} />
                        <div className="notification-dot"></div>
                        <img src={managerAvatar} alt="Manager" className="profile-pic-header" onClick={() => navigate('/admin/profile')} />
                        <div className="profile-dot"></div>
                    </div>
                </header>

                <section className="content-area">
                    <div className="content-header">
                        <h2>Application Settings</h2>
                    </div>

                    <form onSubmit={handleSaveChanges}>
                        <div className="settings-grid">
                            {/* Cards for settings */}
                            <div className="card settings-card">
                                <div className="settings-card-header"><IoPersonCircleOutline className="settings-icon" /><h3>Profile Settings</h3></div>
                                <div className="form-group"><label htmlFor="adminName">Full Name</label><input type="text" id="adminName" value={adminName} onChange={e => setAdminName(e.target.value)} /></div>
                                <div className="form-group"><label htmlFor="adminEmail">Email Address</label><input type="email" id="adminEmail" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} /></div>
                            </div>

                            <div className="card settings-card">
                                <div className="settings-card-header"><IoBusinessOutline className="settings-icon" /><h3>General Settings</h3></div>
                                <div className="form-group"><label htmlFor="schoolName">School Name</label><input type="text" id="schoolName" value={schoolName} onChange={e => setSchoolName(e.target.value)} /></div>
                                <div className="form-group"><label>School Logo</label><input type="file" /></div>
                            </div>

                            <div className="card settings-card">
                                <div className="settings-card-header"><IoKeyOutline className="settings-icon" /><h3>Change Password</h3></div>
                                <div className="form-group"><label htmlFor="currentPassword">Current Password</label><input type="password" id="currentPassword" placeholder="Enter current password" /></div>
                                <div className="form-group"><label htmlFor="newPassword">New Password</label><input type="password" id="newPassword" placeholder="Enter new password" /></div>
                            </div>
                            
                            <div className="card settings-card">
                                <div className="settings-card-header"><IoNotificationsCircleOutline className="settings-icon" /><h3>Notifications</h3></div>
                                <div className="form-group-horizontal">
                                    <label>Enable Email Notifications</label>
                                    <label className="toggle-switch">
                                        <input type="checkbox" checked={notificationsEnabled} onChange={() => setNotificationsEnabled(!notificationsEnabled)} />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="settings-actions">
                            <button type="submit" className="btn-save">Save All Changes</button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default SettingsPage;