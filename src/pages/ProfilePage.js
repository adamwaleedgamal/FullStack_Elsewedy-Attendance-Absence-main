import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css';
import {
  FiEdit,
  FiLogOut,
  FiArrowLeft,
  FiPhone,
  FiAward,
  FiHash,
  FiCalendar,
  FiMapPin,
  FiGlobe,
  FiSave,
  FiTrash2,
  FiX,
  FiAlertTriangle
} from 'react-icons/fi';

/* ------------------------------------------------------------------
 * Edit Profile Modal (unchanged except minor prop destructure safety)
 * ------------------------------------------------------------------ */
const EditModal = ({ user, onClose, onSave, onDelete }) => {
  const [editableUser, setEditableUser] = useState(user);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const processedValue =
      type === 'number' ? (value === '' ? '' : parseInt(value, 10)) : value;
    setEditableUser((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Note: Ensure backend endpoint exists.
      const url = `https://elsewedywebsite.runasp.net/api/SignUp/update/${user.id}`;
      await axios.put(url, editableUser);
      onSave(editableUser);
      onClose();
    } catch (err) {
      setError('Failed to update profile.');
      setIsLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    if (window.confirm('Are you sure? This action is permanent.')) {
      setIsLoading(true);
      setError('');
      try {
        await onDelete(user.id);
      } catch (err) {
        setError('Failed to delete profile.');
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Profile</h2>
          <button onClick={onClose} className="modal-close-btn">
            <FiX />
          </button>
        </div>

        {error && (
          <p className="modal-error">
            <FiAlertTriangle /> {error}
          </p>
        )}

        <div className="modal-body">
          <div className="modal-input-group full-width">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={editableUser.name || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-input-group full-width">
            <label>Profile Image URL</label>
            <input
              type="text"
              name="imageP"
              value={editableUser.imageP || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-input-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNum"
              value={editableUser.phoneNum || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-input-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={editableUser.age || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-input-group">
            <label>Grade</label>
            <input
              type="text"
              name="grade"
              value={editableUser.grade || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-input-group">
            <label>Location / City</label>
            <input
              type="text"
              name="location"
              value={editableUser.location || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-input-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={editableUser.country || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button
            onClick={handleDeleteProfile}
            className="modal-btn delete"
            disabled={isLoading}
          >
            <FiTrash2 /> Delete
          </button>
          <button
            onClick={handleSaveChanges}
            className="modal-btn save"
            disabled={isLoading}
          >
            {isLoading ? (
              'Saving...'
            ) : (
              <>
                <FiSave /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------
 * NEW: Logout Confirmation Modal  // *** ADDED
 * ------------------------------------------------------------------ */
const LogoutConfirmModal = ({ name, onCancel, onConfirm }) => (
  <div className="modal-overlay">
    <div className="logout-modal-content">
      <div className="logout-modal-icon">!</div>
      <h3 className="logout-modal-title">Log Out</h3>
      <p className="logout-modal-text">Are you sure you want to log out?</p>
      {name && <p className="logout-modal-user">{name}</p>}
      <div className="logout-modal-actions">
        <button
          type="button"
          className="logout-modal-btn cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="logout-modal-btn confirm"
          onClick={onConfirm}
        >
          Log Out
        </button>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------
 * Small inline component for displaying Good / Bad Notes  // *** ADDED
 * ------------------------------------------------------------------ */
const NoteCard = ({ variant, title, notes }) => (
  <div className={`note-card ${variant}`}>
    <div className="note-card-header">{title}</div>
    <ul className="note-card-list">
      {notes && notes.length > 0 ? (
        notes.map((n, i) => <li key={i}>{n}</li>)
      ) : (
        <li>No notes yet.</li>
      )}
    </ul>
  </div>
);

/* ------------------------------------------------------------------
 * Main Profile Page Component
 * ------------------------------------------------------------------ */
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // *** ADDED
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFullProfile = async (userId, basicUser) => {
      try {
        const response = await axios.get(
          `https://elsewedywebsite.runasp.net/api/SignUp/${userId}`
        );
        const fullUserData = response.data;
        setUser(fullUserData);
        localStorage.setItem('user', JSON.stringify(fullUserData));
      } catch (err) {
        console.error('Failed to fetch full profile:', err);
        setError('Could not load full profile. Some details may be outdated.');
        setUser(basicUser); // fallback
      } finally {
        setIsLoading(false);
      }
    };

    const userString = localStorage.getItem('user');
    if (userString) {
      const basicUser = JSON.parse(userString);
      if (basicUser && basicUser.id) {
        // If we already have the expanded profile, skip fetch.
        if (basicUser.phoneNum !== undefined) {
          setUser(basicUser);
          setIsLoading(false);
        } else {
          fetchFullProfile(basicUser.id, basicUser);
        }
      } else {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  // Original logout logic remains, but now triggered from modal confirm.
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleSaveFromModal = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleDeleteFromModal = async (userId) => {
    await axios.delete(
      `https://elsewedywebsite.runasp.net/api/SignUp/delete/${userId}`
    );
    handleLogout();
  };

  const InfoDetail = ({ Icon, label, value }) => (
    <div className="info-detail">
      <Icon className="info-icon" />
      <div className="info-text">
        <span className="info-label">{label}</span>
        <span className="info-value">{value ?? 'N/A'}</span>
      </div>
    </div>
  );

  if (isLoading) {
    return <div className="loading-container">Loading Profile...</div>;
  }
  if (!user) {
    return (
      <div className="loading-container">
        Error loading profile. Please{' '}
        <button onClick={handleLogout}>login again</button>.
      </div>
    );
  }

  /* Defaults for demo if API does not yet provide them.  // *** ADDED */
  const defaultGoodNotes = [
    'Listen carefully',
    'Raise hand to speak',
    'Respect others'
  ];
  const defaultBadNotes = [
    'Talk during class',
    'Use phone',
    'Interrupt others'
  ];

  const goodNotes = user.goodNotes || defaultGoodNotes;
  const badNotes = user.badNotes || defaultBadNotes;

  return (
    <div className="profile-page-container">
      <div className="profile-wrapper">
        {/* Ensure the link back goes to a valid route for the user */}
        <Link
          to={user.role === 'admin' ? '/dashboard' : '/some-other-student-dashboard'}
          className="back-link"
        >
          <FiArrowLeft /> Back to Dashboard
        </Link>

        <div className="profile-content-card">
          {/* Sidebar */}
          <div className="profile-sidebar">
            <img
              src={
                user.imageP ||
                `https://ui-avatars.com/api/?name=${user.name.replace(
                  ' ',
                  '+'
                )}&background=d90429&color=fff&size=128&bold=true`
              }
              alt="Profile"
              className="profile-avatar"
            />
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            <div className="profile-actions">
              <button
                onClick={() => setIsModalOpen(true)}
                className="action-btn primary"
              >
                <FiEdit /> Edit Profile
              </button>
              <button
                onClick={() => setShowLogoutModal(true)} // *** CHANGED
                className="action-btn secondary"
              >
                <FiLogOut /> Log out
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="profile-main-content">
            {error && (
              <p className="modal-error" style={{ marginBottom: '20px' }}>
                <FiAlertTriangle /> {error}
              </p>
            )}

            <div className="info-section">
              <h4>Account Details</h4>
              <div className="details-grid">
                <InfoDetail Icon={FiPhone} label="Phone Number" value={user.phoneNum} />
                <InfoDetail Icon={FiAward} label="Grade" value={user.grade} />
                <InfoDetail Icon={FiHash} label="Age" value={user.age} />
                <InfoDetail
                  Icon={FiCalendar}
                  label="Days Absent"
                  value={user.daysAbsent || 0}
                />
              </div>
            </div>

            <div className="info-section">
              <h4>Location Information</h4>
              <div className="details-grid">
                <InfoDetail
                  Icon={FiMapPin}
                  label="Location / City"
                  value={user.location}
                />
                <InfoDetail Icon={FiGlobe} label="Country" value={user.country} />
              </div>
            </div>

            {/* NEW: Notes Section  // *** ADDED */}
            <div className="notes-section">
              <NoteCard variant="good" title="Good Notes" notes={goodNotes} />
              <NoteCard variant="bad" title="Bad Notes" notes={badNotes} />
            </div>

            <div className="privacy-notice">
              <p>This information is private and will not be shared.</p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <EditModal
          key={user.id}
          user={user}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveFromModal}
          onDelete={handleDeleteFromModal}
        />
      )}

      {/* Logout Confirmation Modal  // *** ADDED */}
      {showLogoutModal && (
        <LogoutConfirmModal
          name={user.name}
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={() => {
            setShowLogoutModal(false);
            handleLogout();
          }}
        />
      )}
    </div>
  );
};

export default ProfilePage;
