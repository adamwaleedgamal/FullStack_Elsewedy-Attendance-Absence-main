// --- File: src/pages/StudentDashboard.js (Updated) ---

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherSidebar from './components/TeacherSidebar';
import AppHeader from './components/AppHeader';
import './StudentDashboard.css';

// --- Data ---
const gradesData = {
  '': [],
  Junior: ['Junior 1', 'Junior 2', 'Junior 3', 'Junior 4'],
  Wheeler: ['Wheeler 1', 'Wheeler 2', 'Wheeler 3', 'Wheeler 4'],
  Senior: ['Senior 1', 'Senior 2', 'Senior 3', 'Senior 4']
};
const sessionsData = [1, 2, 3, 4, 5, 6, 7, 8];
const mockStudents = Array.from({ length: 25 }, (_, i) => ({ id: `s${i + 1}`, name: `Student ${i + 1}` }));
const noteOptions = ["Side Talks", "Eating", "Late"];

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSession, setSelectedSession] = useState('');
    const [students, setStudents] = useState([]);

    // --- MODIFIED: State structure is now more detailed ---
    const [studentStatuses, setStudentStatuses] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate('/');
        }
    }, [navigate]);

    // --- MODIFIED: Effect now initializes the new state structure ---
    useEffect(() => {
        if (selectedGrade && selectedClass && selectedSession) {
            setStudents(mockStudents);
            const initialStatuses = {};
            mockStudents.forEach(student => {
                initialStatuses[student.id] = {
                    isPresent: true, // Default to present
                    note: ''         // Default to no note
                };
            });
            setStudentStatuses(initialStatuses);
        } else {
            setStudents([]);
            setStudentStatuses({});
        }
    }, [selectedGrade, selectedClass, selectedSession]);

    // Handlers for the form filters (unchanged)
    const handleGradeSelect = (grade) => { setSelectedGrade(grade); setSelectedClass(''); setSelectedSession(''); };
    const handleClassSelect = (className) => { setSelectedClass(className); setSelectedSession(''); };
    const handleSessionSelect = (session) => { setSelectedSession(session); };

    // --- NEW: A single handler for updating any part of a student's status ---
    const handleStudentUpdate = (studentId, updatedValues) => {
        setStudentStatuses(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                ...updatedValues
            }
        }));
    };

    const handleSaveAttendance = () => {
        console.log('Saving Attendance Data:', studentStatuses);
        alert('Attendance and Behavior has been saved!');
        setSelectedGrade('');
        setSelectedClass('');
        setSelectedSession('');
    };

    return (
        <div className="dashboard-layout">
            <TeacherSidebar user={user} />
            <main className="main-content">
                <AppHeader user={user} />
                <section className="content-area">
                    <div className="content-header">
                        <h2>Take Session Attendance</h2>
                    </div>
                    
                    {/* Filter controls remain the same */}
                    <div className="card attendance-filters">
                        <div className="filter-group"><label>Grade</label><select value={selectedGrade} onChange={(e) => handleGradeSelect(e.target.value)}><option value="">Select Grade</option>{Object.keys(gradesData).filter(g => g).map(grade => (<option key={grade} value={grade}>{grade}</option>))}</select></div>
                        <div className="filter-group"><label>Class</label><select value={selectedClass} onChange={(e) => handleClassSelect(e.target.value)} disabled={!selectedGrade}><option value="">Select Class</option>{gradesData[selectedGrade]?.map(c => (<option key={c} value={c}>{c}</option>))}</select></div>
                        <div className="filter-group"><label>Session</label><select value={selectedSession} onChange={(e) => handleSessionSelect(e.target.value)} disabled={!selectedClass}><option value="">Select Session</option>{sessionsData.map(s => (<option key={s} value={s}>Session {s}</option>))}</select></div>
                    </div>

                    {/* --- MODIFIED: The student list UI is completely new --- */}
                    {selectedSession ? (
                        <div className="students-list-container card">
                            <h3>Students in {selectedClass} - Session {selectedSession}</h3>
                            <div className="attendance-header">
                                <span>Student Name</span>
                                <span>Attendance Status & Notes</span>
                            </div>
                            <hr />
                            <ul>
                                {students.map(student => (
                                    <li key={student.id} className="student-item">
                                        <span className="student-name-label">{student.name}</span>
                                        <div className="attendance-controls">
                                            <label className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    checked={studentStatuses[student.id]?.isPresent || false}
                                                    onChange={(e) => handleStudentUpdate(student.id, { isPresent: e.target.checked })}
                                                />
                                                {studentStatuses[student.id]?.isPresent ? 'Present' : 'Absent'}
                                            </label>
                                            <select
                                                className="note-dropdown"
                                                value={studentStatuses[student.id]?.note || ''}
                                                onChange={(e) => handleStudentUpdate(student.id, { note: e.target.value })}
                                                // Dropdown is disabled if student is marked absent
                                                disabled={!studentStatuses[student.id]?.isPresent}
                                            >
                                                <option value="">Add a note (optional)</option>
                                                {noteOptions.map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <button className="save-button" onClick={handleSaveAttendance}>Save Attendance</button>
                        </div>
                    ) : (
                        <div className="placeholder-text">
                            <p>Please select a Grade, Class, and Session to begin.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default StudentDashboard;