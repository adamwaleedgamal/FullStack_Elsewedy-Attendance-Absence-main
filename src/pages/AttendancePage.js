import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import Chart.js components
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend
} from 'chart.js';

// Import reusable components
import TeacherSidebar from './components/TeacherSidebar';
import AppHeader from './components/AppHeader';

import './StudentDashboard.css'; // For base layout
import './AttendancePage.css'; // Specific styles for AttendancePage

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const AttendancePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
        else navigate('/');
    }, [navigate]);

    // --- MOCK DATA FOR ANALYSIS ---
    const kpiData = {
        attendanceRate: 94.5,
        totalAbsences: 48,
        totalLates: 15,
        topClass: 'Junior 3'
    };

    const classPerformanceData = {
        labels: ['Junior 1', 'Junior 2', 'Junior 3', 'Junior 4', 'Wheeler 1'],
        datasets: [{
            label: 'Attendance Rate (%)',
            data: [92, 89, 98, 95, 91],
            backgroundColor: 'rgba(230, 0, 40, 0.6)',
            borderColor: 'rgba(230, 0, 40, 1)',
            borderWidth: 1,
        }]
    };
    
    const attendanceTrendData = {
        labels: ['Nov 1', 'Nov 5', 'Nov 10', 'Nov 15', 'Nov 20', 'Nov 25'],
        datasets: [{
            label: 'Daily Attendance %',
            data: [95, 96, 92, 94, 91, 95],
            fill: false,
            borderColor: '#3E8BFF',
            tension: 0.1,
        }]
    };
    
    const statusDistributionData = {
        labels: ['Present', 'Absent', 'Late'],
        datasets: [{
            data: [1250, 48, 15],
            backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
            hoverOffset: 4,
        }]
    };

    const atRiskStudents = [
        { id: 's8', name: 'Student 8', class: 'Junior 2', absences: 5, lates: 2, rate: '75%' },
        { id: 's15', name: 'Student 15', class: 'Wheeler 1', absences: 4, lates: 3, rate: '78%' },
        { id: 's22', name: 'Student 22', class: 'Senior 1', absences: 6, lates: 1, rate: '70%' },
    ];

    return (
        <div className="dashboard-layout">
            <TeacherSidebar user={user} />
            <main className="main-content">
                <AppHeader user={user} />
                <section className="content-area">
                    <div className="content-header">
                        <h2>Attendance Analysis</h2>
                    </div>

                    {/* KPI Cards */}
                    <div className="kpi-grid">
                        <div className="card kpi-card"><p className="kpi-value">{kpiData.attendanceRate}%</p><p className="kpi-label">Overall Attendance</p></div>
                        <div className="card kpi-card"><p className="kpi-value">{kpiData.totalAbsences}</p><p className="kpi-label">Total Absences</p></div>
                        <div className="card kpi-card"><p className="kpi-value">{kpiData.totalLates}</p><p className="kpi-label">Total Lates</p></div>
                        <div className="card kpi-card"><p className="kpi-value">{kpiData.topClass}</p><p className="kpi-label">Top Performing Class</p></div>
                    </div>
                    
                    {/* Charts Grid */}
                    <div className="charts-grid">
                        <div className="card chart-card">
                            <h3>Class Performance</h3>
                            <Bar data={classPerformanceData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                        <div className="card chart-card">
                            <h3>Attendance Trend (Last 30 Days)</h3>
                            <Line data={attendanceTrendData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>

                    <div className="charts-grid-secondary">
                        <div className="card chart-card">
                            <h3>Status Distribution</h3>
                            <Doughnut data={statusDistributionData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                        <div className="card at-risk-card">
                            <h3>Students with Low Attendance</h3>
                            <table className="attendance-table">
                                <thead><tr><th>Student</th><th>Absences</th><th>Lates</th><th>Rate</th></tr></thead>
                                <tbody>
                                    {atRiskStudents.map(s => (
                                        <tr key={s.id}><td>{s.name}</td><td>{s.absences}</td><td>{s.lates}</td><td>{s.rate}</td></tr>
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

export default AttendancePage;