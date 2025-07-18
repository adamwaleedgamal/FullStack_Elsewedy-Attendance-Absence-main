// --- File: src/App.js (Corrected and Final) ---

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// --- Component Imports ---
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import StudentDashboard from './pages/StudentDashboard';
import ProfilePage from './pages/ProfilePage';
import AttendancePage from './pages/AttendancePage';
import NotificationPage from './pages/NotificationPage';
import AbsencePage from './pages/AbsencePage';
import StaffDashboard from './pages/StaffDashboard';
import AdminProfilePage from './pages/AdminProfilePage';
import ReportsPage from './pages/ReportsPage';
import StaffListPage from './pages/StaffListPage';
import SettingsPage from './pages/SettingsPage';
import AdminNotificationPage from './pages/AdminNotificationPage';
import HomePage from './pages/HomePage';
import StacksPage from './pages/StacksPage';
import StacksPageS from './pages/StacksPageS';
import StacksPageW from './pages/StacksPageW';
// Correctly imported ONCE
import VideosPage from './pages/VideosPage';

// Security guard component
const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole')?.toLowerCase();

  if (!token) return <Navigate to="/" replace />;
  if (userRole === 'super admin') return <Outlet />;
  if (allowedRoles.includes(userRole)) return <Outlet />;
  
  return <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/homepage" element={<HomePage />} />
        
        {/* --- Public Stack & Video Routes --- */}
        <Route path="/stacks/senior" element={<StacksPageS />} />
        <Route path="/stacks/wheeler" element={<StacksPageW />} />
        <Route path="/videos/:stackId" element={<VideosPage />} />

        {/* --- Protected Routes --- */}
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin', 'superadmin']} />}>
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/absence" element={<AbsencePage />} />
          <Route path="/admin-profile" element={<AdminProfilePage />} />
          <Route path="/stacks" element={<StacksPage />} /> 
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['superadmin']} />}>
          <Route path="/admin/dashboard" element={<StaffDashboard />} />
          <Route path="/admin/reports" element={<ReportsPage />} />
          <Route path="/admin/staff" element={<StaffListPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="/admin/notifications" element={<AdminNotificationPage />} />
        </Route>
        
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;