// --- File: src/pages/StudentListPage.js (UPDATED with Add Button) ---

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { IoAddCircleOutline } from 'react-icons/io5'; // 2. Import the icon

// Import reusable components
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

// Import CSS
import './StudentDashboard.css';
import './StaffDashboard.css';

// Mock Data for Students (unchanged)
const mockStudents = {
    junior: [
        { id: 'J-101', name: 'Ali Hassan', grade: 'Junior' },
        { id: 'J-102', name: 'Sara Adel', grade: 'Junior' },
        { id: 'J-103', name: 'Youssef Karim', grade: 'Junior' },
    ],
    wheeler: [
        { id: 'W-201', name: 'Nour Tarek', grade: 'Wheeler' },
        { id: 'W-202', name: 'Omar Khaled', grade: 'Wheeler' },
    ],
    senior: [
        { id: 'S-301', name: 'Laila Mostafa', grade: 'Senior' },
        { id: 'S-302', name: 'Khaled Ibrahim', grade: 'Senior' },
        { id: 'S-303', name: 'Hana Gamal', grade: 'Senior' },
    ]
};

const StudentListPage = () => {
    const navigate = useNavigate(); // 3. Initialize the navigate function
    const [selectedGrade, setSelectedGrade] = useState('junior');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        setStudents(mockStudents[selectedGrade]);
    }, [selectedGrade]);

    return (
        <div className="dashboard-layout">
            <AdminSidebar />
            <main className="main-content">
                <AdminHeader />
                <section className="content-area">
                    <div className="attendance-table-container card">
                        {/* --- 4. THIS HEADER SECTION IS MODIFIED --- */}
                        <div className="content-header student-list-filter">
                            <div className="header-left-side">
                                <h2>Student List</h2>
                                <button 
                                    className="btn-add-staff" // Reusing the green "add" button style
                                    onClick={() => navigate('/register')}
                                >
                                    <IoAddCircleOutline />
                                    Add New Student
                                </button>
                            </div>
                            <div className="filter-group">
                                <label htmlFor="grade-select">Select Grade:</label>
                                <select 
                                    id="grade-select" 
                                    value={selectedGrade} 
                                    onChange={(e) => setSelectedGrade(e.target.value)}
                                >
                                    <option value="junior">Junior</option>
                                    <option value="wheeler">Wheeler</option>
                                    <option value="senior">Senior</option>
                                </select>
                            </div>
                        </div>

                        {/* Table remains the same */}
                        <div className="table-responsive">
                            <table className="attendance-table">
                                <thead>
                                    <tr>
                                        <th>Student Name</th>
                                        <th>ID</th>
                                        <th>Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {students.map((student) => (
                                    <tr key={student.id}>
                                        <td data-label="Student Name">{student.name}</td>
                                        <td data-label="ID">{student.id}</td>
                                        <td data-label="Grade">{student.grade}</td>
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

export default StudentListPage;