import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import necessary icons
import {
  IoSearchOutline, IoNotificationsOutline, IoCalendarOutline, IoDocumentTextOutline,
  IoHomeOutline, IoPeopleOutline, IoSettingsOutline, IoDownloadOutline
} from 'react-icons/io5';

// Reuse the same CSS files for a consistent look
import './StudentDashboard.css';
import './StaffDashboard.css'; 

import logo from '../assets/logo.png';
import managerAvatar from '../assets/manger.png';

const ReportsPage = () => {
    const navigate = useNavigate();
    
    // State to manage the active navigation item in the sidebar
    const [activeNav, setActiveNav] = useState('reports');

    // State for filter controls
    const [reportType, setReportType] = useState('monthly');
    const [dateFrom, setDateFrom] = useState('2023-11-01');
    const [dateTo, setDateTo] = useState('2023-11-30');

    // Sample data for the report table
    const reportData = [
        { id: 1, name: 'Ahmed Mohamed', department: 'Engineering', daysPresent: 21, daysAbsent: 1, daysLate: 2 },
        { id: 3, name: 'Mohamed Mohsen', department: 'Finance', daysPresent: 22, daysAbsent: 0, daysLate: 0 },
        { id: 4, name: 'Aliaa Hussein', department: 'Marketing', daysPresent: 19, daysAbsent: 3, daysLate: 5 },
        { id: 5, name: 'Khaled Walid', department: 'IT Support', daysPresent: 20, daysAbsent: 2, daysLate: 1 },
    ];

    // Handler for navigation to keep code clean
    const handleNavigate = (path, navItem) => {
        setActiveNav(navItem);
        navigate(path);
    };

    const handleGenerateReport = () => {
        alert(`Generating '${reportType}' report from ${dateFrom} to ${dateTo}.`);
        // In a real app, you would fetch data from an API here based on the filters.
    };
    
    const handleExport = () => {
        alert("Exporting report as CSV...");
        // Logic to convert `reportData` to CSV and trigger a download would go here.
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar - Reused from the dashboard */}
            <aside className="sidebar">
                <div className="logo-container">
                    <img src={logo} alt="School Logo" className="logo" />
                </div>
                <div className="user-profile">
                    <img src={managerAvatar} alt="Manager" className="profile-pic-small" />
                    <div>
                        <p className="user-name">School Manager</p>
                        <p className="user-role">Administrator</p>
                    </div>
                </div>
                <nav className="nav-menu">
                    <ul className="nav-submenu" style={{margin: 0}}>
                        <li onClick={() => handleNavigate('/admin/dashboard', 'dashboard')} className={activeNav === 'dashboard' ? 'active' : ''}>
                           <IoHomeOutline className="nav-icon" /> Dashboard
                        </li>
                        <li onClick={() => handleNavigate('/admin/reports', 'reports')} className={activeNav === 'reports' ? 'active' : ''}>
                           <IoDocumentTextOutline className="nav-icon" /> Reports
                        </li>
                        <li onClick={() => handleNavigate('/admin/staff', 'staff')} className={activeNav === 'staff' ? 'active' : ''}>
                           <IoPeopleOutline className="nav-icon" /> Staff List
                        </li>
                        <li onClick={() => handleNavigate('/admin/settings', 'settings')} className={activeNav === 'settings' ? 'active' : ''}>
                           <IoSettingsOutline className="nav-icon" /> Settings
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="main-header">
                    <div className="search-bar">
                        <IoSearchOutline className="search-icon" />
                        <input type="text" placeholder="Search..." />
                    </div>
                    <div className="top-nav">
                        <a href="/admin/dashboard">Dashboard</a>
                        <a href="/admin/reports" className="active-link">Reports</a>
                        <a href='http://localhost:3000/dashboard'>StudentDashboard</a>                       
                    </div>
                    <div className="header-actions">
                        <IoNotificationsOutline className="action-icon" />
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

                <section className="content-area">
                    <div className="content-header">
                        <h2>Generate Attendance Reports</h2>
                    </div>

                    {/* Filters Bar */}
                    <div className="card reports-filter-bar">
                        <div className="filter-group">
                            <label htmlFor="report-type">Report Type</label>
                            <select id="report-type" value={reportType} onChange={(e) => setReportType(e.target.value)}>
                                <option value="monthly">Monthly Summary</option>
                                <option value="late">Late Arrivals</option>
                                <option value="absenteeism">Absenteeism</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label htmlFor="date-from">From</label>
                            <input type="date" id="date-from" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}/>
                        </div>
                        <div className="filter-group">
                            <label htmlFor="date-to">To</label>
                            <input type="date" id="date-to" value={dateTo} onChange={(e) => setDateTo(e.target.value)}/>
                        </div>
                        <button className="btn-generate" onClick={handleGenerateReport}>
                            <IoCalendarOutline /> Generate
                        </button>
                    </div>

                    {/* Report Table Section */}
                    <div className="attendance-table-container card">
                        <div className="report-table-header">
                            <h3>Monthly Attendance Summary</h3>
                            <button className="btn-export" onClick={handleExport}>
                                <IoDownloadOutline /> Export CSV
                            </button>
                        </div>
                        <hr />
                        <table className="attendance-table">
                            <thead>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Department</th>
                                    <th>Days Present</th>
                                    <th>Days Absent</th>
                                    <th>Days Late</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.name}</td>
                                        <td>{row.department}</td>
                                        <td>{row.daysPresent}</td>
                                        <td>{row.daysAbsent}</td>
                                        <td>{row.daysLate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ReportsPage;