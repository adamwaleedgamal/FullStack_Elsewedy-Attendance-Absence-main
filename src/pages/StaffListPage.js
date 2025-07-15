import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import necessary icons
import {
  IoSearchOutline, IoNotificationsOutline, IoAddCircleOutline, IoPencilOutline, IoTrashOutline,
  IoHomeOutline, IoDocumentTextOutline, IoPeopleOutline, IoSettingsOutline
} from 'react-icons/io5';

// Reuse the same CSS files
import './StudentDashboard.css';
import './StaffDashboard.css';

import logo from '../assets/logo.png';
import managerAvatar from '../assets/manger.png'; // Placeholder for staff photos

const StaffListPage = () => {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('staff');

    // State for search and filter
    const [searchTerm, setSearchTerm] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('all');

    // Sample data for the staff list
    const staffListData = [
        { id: 'E-101', name: 'Ahmed Mohamed', photo: managerAvatar, department: 'Engineering', role: 'Senior Developer', email: 'ahmed.m@example.com', phone: '010-123-4567' },
        { id: 'HR-201', name: 'Fatima Ali', photo: managerAvatar, department: 'Human Resources', role: 'HR Manager', email: 'fatima.a@example.com', phone: '011-234-5678' },
        { id: 'F-301', name: 'Mohamed Mohsen', photo: managerAvatar, department: 'Finance', role: 'Accountant', email: 'mohsen.m@example.com', phone: '012-345-6789' },
        { id: 'M-401', name: 'Aliaa Hussein', photo: managerAvatar, department: 'Marketing', role: 'Marketing Lead', email: 'aliaa.h@example.com', phone: '015-456-7890' },
        { id: 'IT-501', name: 'Khaled Walid', photo: managerAvatar, department: 'IT Support', role: 'IT Specialist', email: 'khaled.w@example.com', phone: '010-567-8901' },
        { id: 'E-102', name: 'Sara Adel', photo: managerAvatar, department: 'Engineering', role: 'Junior Developer', email: 'sara.a@example.com', phone: '011-678-9012' },
    ];
    
    // Logic to filter the staff list based on search and department
    const filteredStaff = staffListData.filter(staff => {
        const nameMatches = staff.name.toLowerCase().includes(searchTerm.toLowerCase());
        const departmentMatches = departmentFilter === 'all' || staff.department === departmentFilter;
        return nameMatches && departmentMatches;
    });

    // Navigation and action handlers
    const handleNavigate = (path, navItem) => {
        setActiveNav(navItem);
        navigate(path);
    };

    const handleEdit = (staffId) => alert(`Editing staff member with ID: ${staffId}`);
    const handleDelete = (staffId) => alert(`Deleting staff member with ID: ${staffId}`);
    const handleAddNewStaff = () => alert('Navigating to Add New Staff form...');

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo-container"><img src={logo} alt="School Logo" className="logo" /></div>
                <div className="user-profile">
                    <img src={managerAvatar} alt="Manager" className="profile-pic-small" />
                    <div><p className="user-name">School Manager</p><p className="user-role">Administrator</p></div>
                </div>
                <nav className="nav-menu">
                    <ul className="nav-submenu" style={{ margin: 0 }}>
                        <li onClick={() => handleNavigate('/admin/dashboard', 'dashboard')} className={activeNav === 'dashboard' ? 'active' : ''}><IoHomeOutline className="nav-icon" /> Dashboard</li>
                        <li onClick={() => handleNavigate('/admin/reports', 'reports')} className={activeNav === 'reports' ? 'active' : ''}><IoDocumentTextOutline className="nav-icon" /> Reports</li>
                        <li onClick={() => handleNavigate('/admin/staff', 'staff')} className={activeNav === 'staff' ? 'active' : ''}><IoPeopleOutline className="nav-icon" /> Staff List</li>
                        <li onClick={() => handleNavigate('/admin/settings', 'settings')} className={activeNav === 'settings' ? 'active' : ''}><IoSettingsOutline className="nav-icon" /> Settings</li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="main-header">
                    <div className="search-bar"><IoSearchOutline className="search-icon" /><input type="text" placeholder="Search..." /></div>
                    <div className="top-nav"><a href="/admin/dashboard">Dashboard</a><a href="/admin/reports">Reports</a>                        <a href='http://localhost:3000/dashboard'>StudentDashboard</a>
</div>
                    <div className="header-actions">
                        <IoNotificationsOutline className="action-icon" /><div className="notification-dot"></div>
                        <img src={managerAvatar} alt="Manager" className="profile-pic-header" onClick={() => navigate('/admin/profile')} />
                        <div className="profile-dot"></div>
                    </div>
                </header>

                <section className="content-area">
                    <div className="content-header">
                        <h2>Staff Management</h2>
                        <button className="btn-add-staff" onClick={handleAddNewStaff}>
                            <IoAddCircleOutline /> Add New Staff
                        </button>
                    </div>

                    {/* Filters Bar */}
                    <div className="card reports-filter-bar">
                        <div className="filter-group" style={{ flexGrow: 1 }}>
                            <label>Search by Name</label>
                            <input type="text" placeholder="Enter staff name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        </div>
                        <div className="filter-group">
                            <label>Filter by Department</label>
                            <select value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)}>
                                <option value="all">All Departments</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Human Resources">Human Resources</option>
                                <option value="Finance">Finance</option>
                                <option value="Marketing">Marketing</option>
                                <option value="IT Support">IT Support</option>
                            </select>
                        </div>
                    </div>

                    {/* Staff List Table */}
                    <div className="attendance-table-container">
                        <table className="attendance-table">
                            <thead>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Employee ID</th>
                                    <th>Department</th>
                                    <th>Role</th>
                                    <th>Contact</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStaff.length > 0 ? filteredStaff.map((staff) => (
                                    <tr key={staff.id}>
                                        <td className="staff-info-cell">
                                            <img src={staff.photo} alt={staff.name} className="staff-list-avatar" />
                                            {staff.name}
                                        </td>
                                        <td>{staff.id}</td>
                                        <td>{staff.department}</td>
                                        <td>{staff.role}</td>
                                        <td>{staff.email}</td>
                                        <td className="actions-cell">
                                            <IoPencilOutline className="action-icon-edit" onClick={() => handleEdit(staff.id)} />
                                            <IoTrashOutline className="action-icon-delete" onClick={() => handleDelete(staff.id)} />
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center' }}>No staff members found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default StaffListPage;