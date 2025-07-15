import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import the Admin layout components
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

// Import CSS
import './StaffDashboard.css'; // Reuses some styles from the staff dashboard
import './AdminProfilePage.css'; // Adds specific styles for this page

const AdminProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // If no user is logged in, redirect to the main login
            navigate('/');
        }
    }, [navigate]);

    // Show a loading state until the user data is available
    if (!user) {
        return <div>Loading Admin Profile...</div>;
    }

    return (
        <div className="dashboard-layout">
            <AdminSidebar />
            <main className="main-content">
                <AdminHeader />
                <section className="content-area">
                    <div className="content-header">
                        <h2>Admin Profile</h2>
                    </div>

                    <div className="admin-profile-card card">
                        <div className="admin-profile-header">
                             <img 
                                src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=4a69bd&color=fff&size=100&bold=true`} 
                                alt="Admin Avatar" 
                                className="admin-profile-avatar" 
                            />
                            <div className="admin-profile-info">
                               <h3>{user.name}</h3>
                               <p className="admin-profile-role">{user.role}</p>
                            </div>
                        </div>

                        <div className="admin-profile-body">
                            <h4>Account Information</h4>
                            <div className="details-grid">
                                <div className="detail-item">
                                    <span className="detail-label">Full Name</span>
                                    <span className="detail-value">{user.name}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Email Address</span>
                                    <span className="detail-value">{user.email}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">User ID</span>
                                    <span className="detail-value">{user.id}</span>
                                </div>
                                 <div className="detail-item">
                                    <span className="detail-label">Account Status</span>
                                    <span className="detail-value status-active">Active</span>
                                </div>
                            </div>

                            <hr className="divider-line" />

                            <h4>Permissions & Access</h4>
                             <div className="permissions-grid">
                                <div className="permission-item">
                                    {user.role === 'super admin' ? '✅ Full System Access (Super Admin)' : '✔️ Student & Staff Management (Admin)'}
                                </div>
                                <div className="permission-item">
                                    ✔️ View Attendance Reports
                                </div>
                                 <div className="permission-item">
                                    ✔️ Manage Notifications
                                </div>
                                {user.role === 'super admin' && (
                                    <div className="permission-item">
                                        ✅ Manage System Settings & Other Admins
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminProfilePage;