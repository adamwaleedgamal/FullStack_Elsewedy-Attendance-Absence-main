// --- File: src/pages/ReportsPage.js (FINAL AND CORRECTED) ---

import React, { useState, useEffect } from 'react';

// Import reusable components
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

// Import CSS
import './StudentDashboard.css';
import './StaffDashboard.css';

// --- NEW MOCK DATA ---
const mockReports = [
    {
        id: 1678886400000, // A unique ID based on a timestamp
        date: '2024-03-15',
        studentName: 'Ali Hassan',
        description: 'Student showed excellent participation in the group project but needs to focus more on individual assignments.',
        specialistSignature: 'Dr. Mona Fikry',
        status: 'Accepted'
    },
    {
        id: 1678972800000,
        date: '2024-03-16',
        studentName: 'Nour Tarek',
        description: 'Nour has shown significant improvement in her problem-solving skills this week.',
        specialistSignature: 'Eng. Sherif Hamdy',
        status: 'Pending'
    },
    {
        id: 1679059200000,
        date: '2024-03-17',
        studentName: 'Laila Mostafa',
        description: 'Laila was disruptive during the session and did not complete the assigned task. Recommend a follow-up.',
        specialistSignature: 'Mr. Mohamed Abdelmged', // As requested
        status: 'Declined'
    }
];

// --- NEW Confirmation Modal Component ---
const ConfirmationModal = ({ show, onClose, onConfirm, title, actionType, children }) => {
    if (!show) {
        return null;
    }

    // Determine button class based on action
    const confirmButtonClass = actionType === 'Accept' ? 'btn-confirm-accept' : 'btn-confirm-decline';

    return (
        <div className="modal-overlay visible">
            <div className="modal-content confirmation-modal-content">
                <div className="modal-header">
                    <h2>{title}</h2>
                </div>
                <div className="confirmation-modal-body">
                    {children}
                </div>
                <div className="confirmation-modal-actions">
                    <button className="btn-cancel" onClick={onClose}>Cancel</button>
                    <button className={confirmButtonClass} onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
};


const ReportsPage = () => {
    const [reports, setReports] = useState([]);
    // State for the confirmation modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [actionType, setActionType] = useState(''); // 'Accept' or 'Decline'

    // Load reports from mock data on initial render
    useEffect(() => {
        // In a real app, this would be an API call. Here, we use mock data.
        setReports(mockReports);
    }, []);

    const handleOpenConfirmation = (report, action) => {
        setSelectedReport(report);
        setActionType(action);
        setIsModalOpen(true);
    };

    const handleConfirmAction = () => {
        if (!selectedReport || !actionType) return;

        const updatedReports = reports.map(report => 
            report.id === selectedReport.id ? { ...report, status: actionType === 'Accept' ? 'Accepted' : 'Declined' } : report
        );
        setReports(updatedReports);
        // Here you would also make an API call to save the change
        
        // Close the modal
        setIsModalOpen(false);
        setSelectedReport(null);
        setActionType('');
    };

    return (
        <>
            <div className="dashboard-layout">
                <AdminSidebar />
                <main className="main-content">
                    <AdminHeader />
                    <section className="content-area">
                        <div className="attendance-table-container card">
                            <div className="content-header">
                                <h2>All Specialist Reports</h2>
                            </div>
                            <div className="table-responsive">
                                <table className="attendance-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Student Name</th>
                                            <th>Submitted By</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {reports.length > 0 ? reports.map((report) => (
                                        <tr key={report.id}>
                                            <td data-label="Date">{report.date}</td>
                                            <td data-label="Student Name">{report.studentName}</td>
                                            <td data-label="Submitted By">{report.specialistSignature}</td>
                                            <td data-label="Status">
                                                <span className={`status-tag status-${report.status.toLowerCase()}`}>{report.status}</span>
                                            </td>
                                            <td data-label="Actions" className="actions-cell">
                                                {report.status === 'Pending' ? (
                                                    <>
                                                        <button className="btn-action accept" onClick={() => handleOpenConfirmation(report, 'Accept')}>Accept</button>
                                                        <button className="btn-action decline" onClick={() => handleOpenConfirmation(report, 'Decline')}>Decline</button>
                                                    </>
                                                ) : (
                                                    <span>Action Taken</span>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: 'center' }}>No reports submitted yet.</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            <ConfirmationModal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmAction}
                title={`Confirm ${actionType}`}
                actionType={actionType}
            >
                <p>Are you sure you want to <strong>{actionType?.toLowerCase()}</strong> the report for <strong>{selectedReport?.studentName}</strong>?</p>
            </ConfirmationModal>
        </>
    );
};

export default ReportsPage;