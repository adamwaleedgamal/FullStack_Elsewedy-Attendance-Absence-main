// src/pages/AdminProfilePage.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ProfilePage.css'; // Reuse the same CSS
import { FiLogOut, FiArrowLeft, FiUser, FiShield, FiMail } from 'react-icons/fi';
import managerAvatar from '../assets/manger.png'; // Your placeholder

const AdminProfilePage = () => {
    const navigate = useNavigate();
    const adminUser = {
        name: "Mr.Sowilam Mehany",
        email: "Admin@gmail.com",
        role: "Administrator",
        access: "Full Control",
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const InfoDetail = ({ Icon, label, value }) => (
        <div className="info-detail">
            <Icon className="info-icon" />
            <div className="info-text">
                <span className="info-label">{label}</span>
                <span className="info-value">{value}</span>
            </div>
        </div>
    );

    return (
        <div className="profile-page-container">
            <div className="profile-wrapper">
                <Link to="/admin/dashboard" className="back-link">
                    <FiArrowLeft /> Back to Dashboard
                </Link>

                <div className="profile-content-card">
                    <div className="profile-sidebar">
                        <img src={managerAvatar} alt="Profile" className="profile-avatar" />
                        <h2 className="profile-name">{adminUser.name}</h2>
                        <p className="profile-email">{adminUser.email}</p>
                        <div className="profile-actions">
                            <button onClick={handleLogout} className="action-btn secondary"><FiLogOut /> Logout</button>
                        </div>
                    </div>

                    <div className="profile-main-content">
                        <div className="info-section">
                            <h4>Account Details</h4>
                            <div className="details-grid">
                                <InfoDetail Icon={FiUser} label="Username" value={adminUser.name} />
                                <InfoDetail Icon={FiMail} label="Email Address" value={adminUser.email} />
                                <InfoDetail Icon={FiUser} label="Role" value={adminUser.role} />
                                <InfoDetail Icon={FiShield} label="Access Level" value={adminUser.access} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfilePage;