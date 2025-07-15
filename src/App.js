import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// --- ADDED: All the necessary component imports ---
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

// This is our security guard component. The logic is correct.
const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole')?.toLowerCase();

  // 1. If not logged in, redirect to login page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // 2. SUPER ADMIN RULE: If the user is 'super admin', they can access ANY protected page.
  if (userRole === 'super admin') {
    return <Outlet />; // Show the page they are trying to access
  }

  // 3. STANDARD ROLE CHECK: Check if their role is in the list of roles allowed for this route.
  const isAuthorized = allowedRoles.includes(userRole);

  if (isAuthorized) {
    return <Outlet />; // Show the page
  } else {
    // If they are logged in but not authorized, send them back to the login page.
    return <Navigate to="/" replace />;
  }
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
        
        {/* --- STUDENT-ONLY ROUTE --- */}
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* --- ADMIN-ONLY ROUTES (Student Dashboard View) --- */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/absence" element={<AbsencePage />} />
          <Route path="/profile" element={<AdminProfilePage />} />

        </Route>

        {/* --- SUPER ADMIN-ONLY ROUTES (Staff Dashboard View) --- */}
        <Route element={<ProtectedRoute allowedRoles={['SuperAdmin']} />}>
          <Route path="/admin/dashboard" element={<StaffDashboard />} />
          <Route path="/admin/profile" element={<AdminProfilePage />} />
          <Route path="/admin/reports" element={<ReportsPage />} />
          <Route path="/admin/staff" element={<StaffListPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="/admin/notifications" element={<AdminNotificationPage />} />
        </Route>
        
        {/* If a user types a URL that doesn't exist, redirect them to the login page. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;