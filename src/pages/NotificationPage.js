import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoNotificationsCircleOutline, IoAlertCircleOutline } from 'react-icons/io5';

// Import reusable components
//  vvv THIS IS THE FIX vvv
import TeacherSidebar from './components/TeacherSidebar';
import AppHeader from './components/AppHeader';
//  ^^^ THIS IS THE FIX ^^^

import './StudentDashboard.css';
import './Notifications.css'; // Import the new CSS

const mockNotifications = [
    { id: 1, type: 'attendance', message: 'Attendance for Junior 1 - Session 3 is due.', time: '1 hour ago', unread: true },
    { id: 2, type: 'system', message: 'System will be down for maintenance tonight at 11 PM.', time: '4 hours ago', unread: true },
    { id: 3, type: 'attendance', message: 'You have 3 unexcused absences for Student 8.', time: '1 day ago', unread: false },
    { id: 4, type: 'system', message: 'Your password will expire in 7 days.', time: '2 days ago', unread: false },
];

const NotificationPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
        else navigate('/');
    }, [navigate]);

    const filteredNotifications = mockNotifications.filter(n => {
        if (filter === 'unread') return n.unread;
        if (filter === 'all') return true;
        return n.type === filter;
    });

    const getIcon = (type) => {
        switch (type) {
            case 'attendance': return <IoNotificationsCircleOutline />;
            case 'system': return <IoAlertCircleOutline />;
            default: return <IoNotificationsCircleOutline />;
        }
    };

    return (
        <div className="dashboard-layout">
            <TeacherSidebar user={user} />
            <main className="main-content">
                <AppHeader user={user} />
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

export default NotificationPage;