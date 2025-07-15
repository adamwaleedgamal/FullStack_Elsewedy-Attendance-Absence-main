// --- File: src/pages/StaffDashboard.js (Updated) ---

import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

// Import necessary icons
import { IoOptionsOutline, IoAddCircleOutline } from 'react-icons/io5'; // 2. Import a new icon for the button

// Import reusable components
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

// Import CSS
import './StudentDashboard.css';
import './StaffDashboard.css';

const StaffDashboard = () => {
    const navigate = useNavigate(); // 3. Initialize the navigate function

    // Mock data for this page (unchanged)
    const staffData = [
        { id: 1, name: 'Ahmed Mohamed', department: 'Engineering', status: 'Present', checkInTime: '08:45', method: 'Face ID' },
        { id: 2, name: 'Fatima Ali', department: 'Human Resources', status: 'Absent', checkInTime: '—', method: '—' },
        { id: 3, name: 'Mohamed Mohsen', department: 'Finance', status: 'Present', checkInTime: '09:00', method: 'Face ID' },
        { id: 4, name: 'Aliaa Hussein', department: 'Marketing', status: 'Late', checkInTime: '09:15', method: 'Fingerprint' },
    ];
    const stats = { total: 245, late: 12, absent: 47 };
    const present = stats.total - stats.absent;

    return (
        <div className="dashboard-layout">
            <AdminSidebar />
            <main className="main-content">
                <AdminHeader />
                <section className="content-area">
                    {/* --- 4. THIS HEADER SECTION IS MODIFIED --- */}
                    <div className="content-header">
                        <h2>Staff Attendance Overview</h2>
                        <div className="header-actions-group">
                            <button 
                                className="add-staff-btn" 
                                onClick={() => navigate('/register')}
                            >
                                <IoAddCircleOutline />
                                Add New Staff
                            </button>
                            <IoOptionsOutline className="filter-icon" />
                        </div>
                    </div>

                    {/* Stats Grid (unchanged) */}
                    <div className="stats-grid">
                        <div className="card stat-card"><p className="stat-value">{stats.total}</p><p className="stat-label">Total Staff</p></div>
                        <div className="card stat-card"><p className="stat-value" style={{color: '#28a745'}}>{present}</p><p className="stat-label">Present Today</p></div>
                        <div className="card stat-card"><p className="stat-value" style={{color: '#E60028'}}>{stats.absent}</p><p className="stat-label">Absent Today</p></div>
                        <div className="card stat-card"><p className="stat-value" style={{color: '#ffc107'}}>{stats.late}</p><p className="stat-label">Late Today</p></div>
                    </div>

                    {/* Attendance Table (unchanged) */}
                    <div className="attendance-table-container card">
                        <div className="content-header">
                            <h3>Today's Attendance Status</h3>
                        </div>
                        <div className="table-responsive">
                            <table className="attendance-table">
                                <thead><tr><th>Employee Name</th><th>Department</th><th>Status</th><th>Check-in Time</th><th>Method</th></tr></thead>
                                <tbody>
                                {staffData.map((staff) => (
                                    <tr key={staff.id}>
                                        <td data-label="Employee Name">{staff.name}</td>
                                        <td data-label="Department">{staff.department}</td>
                                        <td data-label="Status"><span className={`status-tag status-${staff.status.toLowerCase()}`}>{staff.status}</span></td>
                                        <td data-label="Check-in Time">{staff.checkInTime}</td>
                                        <td data-label="Method">{staff.method}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default StaffDashboard;