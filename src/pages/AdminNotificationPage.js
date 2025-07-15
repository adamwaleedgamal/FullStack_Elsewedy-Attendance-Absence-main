import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IoHomeOutline, IoDocumentTextOutline, IoPeopleOutline, IoSettingsOutline, IoNotificationsOutline,
  IoPersonAddOutline, IoServerOutline
} from 'react-icons/io5';

import './StudentDashboard.css';
import './StaffDashboard.css';
import './Notifications.css'; // Reuse the same CSS

import logo from '../assets/logo.png';
import managerAvatar from '../assets/manger.png';

const adminNotifications = [
    { id: 1, type: 'report', message: 'Monthly attendance report for Engineering is ready.', time: '2 hours ago', unread: true },
    { id: 2, type: 'system', message: 'New Staff Member "Hassan Ali" was added.', time: '8 hours ago', unread: true },
    { id: 3, type: 'system', message: 'Server backup completed successfully.', time: '1 day ago', unread: false },
    { id: 4, type: 'report', message: 'Quarterly financial summary has been generated.', time: '3 days ago', unread: false },
];

const AdminNotificationPage = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all');

    const handleNavigate = (path) => navigate(path);

    const filteredNotifications = adminNotifications.filter(n => {
        if (filter === 'unread') return n.unread;
        if (filter === 'all') return true;
        return n.type === filter;
    });

    const getIcon = (type) => {
        switch (type) {
            case 'report': return <IoDocumentTextOutline />;
            case 'system': return <IoServerOutline />;
            default: return <IoPersonAddOutline />;
        }
    };

    return (
        <div className="dashboard-layout">
            <aside className="sidebar">
                <div className="logo-container"><img src={logo} alt="Logo" className="logo" /></div>
                <div className="user-profile">
                    <img src={managerAvatar} alt="Manager" className="profile-pic-small" />
                    <div><p className="user-name">School Manager</p><p className="user-role">Administrator</p></div>
                </div>
                <nav className="nav-menu">
                    <ul className="nav-submenu" style={{ margin: 0 }}>
                        <li onClick={() => handleNavigate('/admin/dashboard')}><IoHomeOutline className="nav-icon" /> Dashboard</li>
                        <li onClick={() => handleNavigate('/admin/reports')}><IoDocumentTextOutline className="nav-icon" /> Reports</li>
                        <li onClick={() => handleNavigate('/admin/staff')}><IoPeopleOutline className="nav-icon" /> Staff List</li>
                        <li onClick={() => handleNavigate('/admin/settings')}><IoSettingsOutline className="nav-icon" /> Settings</li>
                    </ul>
                </nav>
            </aside>
            <main className="main-content">
                <header className="main-header">
                    <div className="header-actions" style={{ marginLeft: 'auto' }}>
                        <IoNotificationsOutline className="action-icon" />
                        <div className="notification-dot"></div>
                        <img src={managerAvatar} alt="Manager" className="profile-pic-header" onClick={() => navigate('/admin/profile')} />
                        <div className="profile-dot"></div>
                    </div>
                </header>
                <section className="content-area">
                    <div className="content-header"><h2>Notifications</h2></div>
                    <div className="notification-filters">
                        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
                        <button onClick={() => setFilter('unread')} className={filter === 'unread' ? 'active' : ''}>Unread</button>
                    </div>
                    <ul className="notification-list">
                        {filteredNotifications.map(n => (
                            <li key={n.id} className={`notification-item ${n.unread ? 'unread' : ''}`}>
                                <div className={`notification-icon-container ${n.type}`}>{getIcon(n.type)}</div>
                                <div className="notification-content">
                                    <p>{n.message}</p>
                                    <span>{n.time}</span>
                                </div>
                                {n.unread && <div className="notification-dot-indicator"></div>}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default AdminNotificationPage;