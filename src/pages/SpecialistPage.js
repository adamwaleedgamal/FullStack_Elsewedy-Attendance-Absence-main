// --- File: src/pages/SpecialistPage.js (UPDATED TO BE THE FORM) ---

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import reusable components
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

// Import CSS
import './StudentDashboard.css';
import './StaffDashboard.css';
import './SpecialistReportForm.css'; // <-- Import the new form styles

const SpecialistPage = () => {
    const navigate = useNavigate();

    // State for each form field
    const [date, setDate] = useState('');
    const [studentName, setStudentName] = useState('');
    const [description, setDescription] = useState('');
    const [specialistSignature, setSpecialistSignature] = useState('');
    const [managerSignature, setManagerSignature] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!date || !studentName || !description) {
            alert('Please fill out Date, Student Name, and Description.');
            return;
        }

        // Create the new report object
        const newReport = {
            id: Date.now(), // Simple unique ID
            date,
            studentName,
            description,
            specialistSignature,
            managerSignature,
            status: 'Pending' // All new reports are pending
        };

        // Get existing reports from localStorage, or start a new array
        const existingReports = JSON.parse(localStorage.getItem('specialistReports')) || [];
        
        // Add the new report
        const updatedReports = [...existingReports, newReport];
        
        // Save back to localStorage
        localStorage.setItem('specialistReports', JSON.stringify(updatedReports));

        alert('Report submitted successfully!');
        
        // Navigate to the reports page to see the new report
        navigate('/admin/reports');
    };

    return (
        <div className="dashboard-layout">
            <AdminSidebar />
            <main className="main-content">
                <AdminHeader />
                <section className="content-area">
                    <div className="form-container card">
                        <form onSubmit={handleSubmit}>
                            <h2>Submit Specialist Report</h2>

                            <div className="form-group">
                                <label htmlFor="date">Date</label>
                                <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="studentName">Student Name</label>
                                <input type="text" id="studentName" value={studentName} onChange={e => setStudentName(e.target.value)} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Report Description</label>
                                <textarea id="description" placeholder="Write your observations or feedback here...." value={description} onChange={e => setDescription(e.target.value)} required></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="specialistSig">Specialist Signature</label>
                                <input type="text" id="specialistSig" value={specialistSignature} onChange={e => setSpecialistSignature(e.target.value)} />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="managerSig">Manager Signature</label>
                                <input type="text" id="managerSig" value={managerSignature} onChange={e => setManagerSignature(e.target.value)} />
                            </div>

                            <button type="submit" className="submit-btn">Send to Parent</button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default SpecialistPage;