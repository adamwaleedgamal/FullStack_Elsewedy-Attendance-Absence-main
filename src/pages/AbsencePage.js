// --- File: src/pages/AbsencePage.js (Updated with Session Filter) ---

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import reusable components and data
import TeacherSidebar from './components/TeacherSidebar';
import AppHeader from './components/AppHeader';
import { mockAttendanceLogs, gradesData } from '../mock-attendance-page ';
import '../pages/Absence.css';

// --- ADDED: Data for the new Session filter dropdown ---
const sessionsData = [1, 2, 3, 4, 5, 6, 7, 8];

const AbsencePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // State for all logs and filtered logs
    const [allLogs, setAllLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);

    // State for filter controls
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSession, setSelectedSession] = useState(''); // --- ADDED: State for session filter

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate('/');
        }
        
        const absenceLogs = mockAttendanceLogs.filter(log => log.status === 'Absent');
        setAllLogs(absenceLogs);
        setFilteredLogs(absenceLogs);
    }, [navigate]);

    // --- MODIFIED: Effect now includes the session filter ---
    useEffect(() => {
        let logs = allLogs;

        if (selectedGrade) {
            logs = logs.filter(log => log.grade === selectedGrade);
        }
        if (selectedClass) {
            logs = logs.filter(log => log.class === selectedClass);
        }
        if (selectedSession) {
            // Note: We parse the session to a number to ensure correct comparison
            logs = logs.filter(log => log.session === parseInt(selectedSession, 10));
        }
        if (selectedDate) {
            logs = logs.filter(log => log.date === selectedDate);
        }

        setFilteredLogs(logs);
    }, [selectedGrade, selectedClass, selectedSession, selectedDate, allLogs]);
    
    // Reset class and session filters when grade changes
    const handleGradeChange = (grade) => {
        setSelectedGrade(grade);
        setSelectedClass('');
        setSelectedSession(''); // Also reset session
    };
    
    // Reset session filter when class changes
    const handleClassChange = (className) => {
        setSelectedClass(className);
        setSelectedSession('');
    };

    return (
        <div className="dashboard-layout">
            <TeacherSidebar user={user} />
            <main className="main-content">
                <AppHeader user={user} />
                <section className="content-area">
                    <div className="content-header">
                        <h2>Absence Page</h2>
                    </div>

                    {/* --- MODIFIED: Filter controls now include Session dropdown --- */}
                    <div className="card absence-log-filters">
                        <div className="filter-group">
                            <label>Filter by Grade</label>
                            <select value={selectedGrade} onChange={(e) => handleGradeChange(e.target.value)}>
                                <option value="">All Grades</option>
                                {Object.keys(gradesData).filter(g => g).map(grade => (<option key={grade} value={grade}>{grade}</option>))}
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Filter by Class</label>
                            <select value={selectedClass} onChange={(e) => handleClassChange(e.target.value)} disabled={!selectedGrade}>
                                <option value="">All Classes</option>
                                {gradesData[selectedGrade]?.map(c => (<option key={c} value={c}>{c}</option>))}
                            </select>
                        </div>
                        {/* --- ADDED: Session Filter Dropdown --- */}
                        <div className="filter-group">
                            <label>Filter by Session</label>
                            <select value={selectedSession} onChange={(e) => setSelectedSession(e.target.value)} disabled={!selectedClass}>
                                <option value="">All Sessions</option>
                                {sessionsData.map(session => (<option key={session} value={session}>Session {session}</option>))}
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Filter by Date</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Absence Log Table (unchanged) */}
                    <div className="card absence-log-container">
                        <h3>Absence Records</h3>
                        <hr />
                        <div className="table-container">
                            <table className="absence-table">
                                <thead>
                                    <tr>
                                        <th>Student Name</th><th>Grade</th><th>Class</th><th>Session</th>
                                        <th>Date</th><th>Status</th><th>Behavior</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLogs.length > 0 ? (
                                        filteredLogs.map(log => (
                                            <tr key={log.id}>
                                                <td>{log.studentName}</td><td>{log.grade}</td><td>{log.class}</td>
                                                <td>Session {log.session}</td><td>{log.date}</td>
                                                <td><span className={`status-badge status-${log.status.toLowerCase()}`}>{log.status}</span></td>
                                                <td><span className={`behavior-badge behavior-${log.behavior?.toLowerCase().replace(' ', '-') || 'na'}`}>{log.behavior || 'N/A'}</span></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="7" className="no-records-found">No absence records match the current filters.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AbsencePage;