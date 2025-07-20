// --- File: src/pages/StudentDashboard.js (Multi-select Notes Dropdown) ---

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherSidebar from './components/TeacherSidebar';
import AppHeader from './components/AppHeader';
import './StudentDashboard.css';
import { FiChevronDown, FiX } from 'react-icons/fi';

// ----------------------------------------------
// Data (unchanged except we export noteOptions)
// ----------------------------------------------
const gradesData = {
  '': [],
  Junior: ['Junior 1', 'Junior 2', 'Junior 3', 'Junior 4'],
  Wheeler: ['Wheeler 1', 'Wheeler 2', 'Wheeler 3', 'Wheeler 4'],
  Senior: ['Senior 1', 'Senior 2', 'Senior 3', 'Senior 4'],
};
const sessionsData = [1, 2, 3, 4, 5, 6, 7, 8];

// Preset behavior notes (treated as *bad* by default)
// You can later split into good/bad arrays if needed.
const noteOptions = ['Side Talks', 'Eating', 'Late'];

const mockStudents = Array.from({ length: 25 }, (_, i) => ({
  id: `s${i + 1}`,
  name: `Student ${i + 1}`,
}));

/* =================================================================
   AddNoteModal (unchanged logic from last version, trimmed slightly)
   ================================================================= */
const AddNoteModal = ({
  open,
  onClose,
  onAddNote,
  studentName = '',
}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const fileRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTitle('');
      setDesc('');
      setImagePreview('');
    }
  }, [open]);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImagePreview(URL.createObjectURL(f));
  };

  const buildNote = (type) => ({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    type,
    label: title.trim() || 'Custom Note',
    title: title.trim() || undefined,
    description: desc.trim() || undefined,
    imageUrl: imagePreview || undefined,
  });

  const handleAddGood = () => {
    onAddNote(buildNote('good'));
    onClose();
  };
  const handleAddBad = () => {
    onAddNote(buildNote('bad'));
    onClose();
  };

  if (!open) return null;
  return (
    <div className="note-modal-overlay">
      <div className="note-modal">
        <button className="note-modal-close" onClick={onClose} aria-label="Close">
          <FiX />
        </button>
        <h3 className="note-modal-title">Add Note</h3>
        {studentName && <p className="note-modal-student">For: {studentName}</p>}

        <div className="note-modal-field">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="note-modal-field">
          <label>Description</label>
          <textarea
            rows={4}
            placeholder="Enter the description here"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className="note-modal-field">
          <label>Upload Image (Optional)</label>
          <div className="note-modal-upload-wrapper">
            <button
              type="button"
              className="note-modal-upload-btn"
              onClick={() => fileRef.current?.click()}
            >
              Upload Image
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFile}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="note-modal-upload-preview"
              />
            )}
          </div>
        </div>

        <div className="note-modal-actions">
          <button type="button" className="note-modal-btn good" onClick={handleAddGood}>
            Add Good Note
          </button>
          <button type="button" className="note-modal-btn bad" onClick={handleAddBad}>
            Add Bad Note
          </button>
        </div>
      </div>
    </div>
  );
};

/* =================================================================
   NoteChips (inline bubble display)
   ================================================================= */
const NoteChips = ({ notes = [], onRemove }) => {
  if (!notes.length) return null;
  return (
    <div className="note-chips-container">
      {notes.map((n) => (
        <span
          key={n.id}
          className={`note-chip ${n.type === 'good' ? 'good' : 'bad'}`}
          title={n.description || n.title || n.label}
        >
          {n.label}
          <button
            type="button"
            aria-label="Remove note"
            onClick={() => onRemove(n.id)}
          >
            <FiX />
          </button>
        </span>
      ))}
    </div>
  );
};

/* =================================================================
   MultiNoteDropdown
   - Shows chips
   - Shows a trigger pill w/ chevron
   - Dropdown lists all preset noteOptions w/ checkboxes
   - Last item: "Other..." => pops AddNoteModal
   ================================================================= */
const MultiNoteDropdown = ({
  disabled = false,
  presetOptions = [],
  notes = [],
  onToggleOption,   // (opt: string, checked: bool) -> void
  onRemoveNote,     // (noteId: string) -> void (for chips)
  onSelectOther,    // () => void (open modal)
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Which preset options are currently active?
  const activeLabels = new Set(
    notes
      .filter((n) => n.type === 'bad' && presetOptions.includes(n.label))
      .map((n) => n.label)
  );

  return (
    <div
      className={`multi-note-wrapper ${disabled ? 'disabled' : ''}`}
      ref={wrapperRef}
    >
      {/* Chips inline */}
      <NoteChips notes={notes} onRemove={onRemoveNote} />

      {/* Trigger pill */}
      <button
        type="button"
        className="multi-note-trigger"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
      >
        {notes.length ? 'Add more' : 'Add notes'}
        <FiChevronDown />
      </button>

      {open && !disabled && (
        <div className="multi-note-menu">
          {presetOptions.map((opt) => {
            const checked = activeLabels.has(opt);
            return (
              <label key={opt} className="multi-note-menu-item">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => onToggleOption(opt, e.target.checked)}
                />
                {opt}
              </label>
            );
          })}
          <div className="multi-note-menu-divider" />
          <button
            type="button"
            className="multi-note-menu-other"
            onClick={() => {
              setOpen(false);
              onSelectOther();
            }}
          >
            + Other…
          </button>
        </div>
      )}
    </div>
  );
};

/* =================================================================
   Main StudentDashboard
   ================================================================= */
const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // filters
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSession, setSelectedSession] = useState('');

  // students
  const [students, setStudents] = useState([]);

  // statuses  { studentId: { isPresent: bool, notes: [] } }
  const [studentStatuses, setStudentStatuses] = useState({});

  // which student we are adding a custom note to
  const [activeNoteStudentId, setActiveNoteStudentId] = useState(null);

  // load user
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/');
    }
  }, [navigate]);

  // when grade/class/session set -> load students & init statuses
  useEffect(() => {
    if (selectedGrade && selectedClass && selectedSession) {
      setStudents(mockStudents);
      const initial = {};
      mockStudents.forEach((s) => {
        initial[s.id] = {
          isPresent: true,
          notes: [],
        };
      });
      setStudentStatuses(initial);
    } else {
      setStudents([]);
      setStudentStatuses({});
    }
  }, [selectedGrade, selectedClass, selectedSession]);

  // update attendance
  const handleStudentUpdate = (studentId, updatedValues) => {
    setStudentStatuses((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        ...updatedValues,
      },
    }));
  };

  // toggle preset option (always type='bad' here; you can map differently later)
  const togglePresetNote = (studentId, label, checked) => {
    setStudentStatuses((prev) => {
      const current = prev[studentId];
      if (!current) return prev;
      let nextNotes = current.notes;
      if (checked) {
        // add if not exists
        if (!current.notes.some((n) => n.label === label && n.type === 'bad')) {
          nextNotes = [
            ...current.notes,
            {
              id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
              type: 'bad',
              label,
            },
          ];
        }
      } else {
        // remove all with this label
        nextNotes = current.notes.filter(
          (n) => !(n.type === 'bad' && n.label === label)
        );
      }
      return {
        ...prev,
        [studentId]: {
          ...current,
          notes: nextNotes,
        },
      };
    });
  };

  // remove any note by id
  const removeNoteFromStudent = (studentId, noteId) => {
    setStudentStatuses((prev) => {
      const current = prev[studentId];
      if (!current) return prev;
      return {
        ...prev,
        [studentId]: {
          ...current,
          notes: current.notes.filter((n) => n.id !== noteId),
        },
      };
    });
  };

  // add custom note (good or bad) from modal
  const addCustomNote = (studentId, noteObj) => {
    setStudentStatuses((prev) => {
      const current = prev[studentId];
      if (!current) return prev;
      return {
        ...prev,
        [studentId]: {
          ...current,
          notes: [...current.notes, noteObj],
        },
      };
    });
  };

  // Save (placeholder)
  const handleSaveAttendance = () => {
    console.log('Saving Attendance Data:', studentStatuses);
    alert('Attendance and Behavior has been saved!');
    setSelectedGrade('');
    setSelectedClass('');
    setSelectedSession('');
  };

  // filter selects (unchanged)
  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
    setSelectedClass('');
    setSelectedSession('');
  };
  const handleClassSelect = (className) => {
    setSelectedClass(className);
    setSelectedSession('');
  };
  const handleSessionSelect = (session) => {
    setSelectedSession(session);
  };

  // active student name for modal
  const activeStudent = activeNoteStudentId
    ? students.find((s) => s.id === activeNoteStudentId)
    : null;

  return (
    <div className="dashboard-layout">
      <TeacherSidebar user={user} />
      <main className="main-content">
        <AppHeader user={user} />
        <section className="content-area">
          <div className="content-header">
            <h2>Take Session Attendance</h2>
          </div>

          {/* Filters */}
          <div className="card attendance-filters">
            <div className="filter-group">
              <label>Grade</label>
              <select
                value={selectedGrade}
                onChange={(e) => handleGradeSelect(e.target.value)}
              >
                <option value="">Select Grade</option>
                {Object.keys(gradesData)
                  .filter((g) => g)
                  .map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Class</label>
              <select
                value={selectedClass}
                onChange={(e) => handleClassSelect(e.target.value)}
                disabled={!selectedGrade}
              >
                <option value="">Select Class</option>
                {gradesData[selectedGrade]?.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Session</label>
              <select
                value={selectedSession}
                onChange={(e) => handleSessionSelect(e.target.value)}
                disabled={!selectedClass}
              >
                <option value="">Select Session</option>
                {sessionsData.map((s) => (
                  <option key={s} value={s}>
                    Session {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Students table */}
          {selectedSession ? (
            <div className="students-list-container card">
              <h3>
                Students in {selectedClass} - Session {selectedSession}
              </h3>
              <div className="attendance-header">
                <span>Student Name</span>
                <span>Attendance & Notes</span>
              </div>
              <hr />
              <ul>
                {students.map((student) => {
                  const status = studentStatuses[student.id] || {
                    isPresent: false,
                    notes: [],
                  };
                  return (
                    <li key={student.id} className="student-item">
                      <span className="student-name-label">{student.name}</span>
                      <div className="attendance-controls">
                        {/* Attendance */}
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={!!status.isPresent}
                            onChange={(e) =>
                              handleStudentUpdate(student.id, {
                                isPresent: e.target.checked,
                              })
                            }
                          />
                          {status.isPresent ? 'Present' : 'Absent'}
                        </label>

                        {/* Multi-note dropdown */}
                        <MultiNoteDropdown
                          disabled={!status.isPresent}
                          presetOptions={noteOptions}
                          notes={status.notes}
                          onToggleOption={(opt, checked) =>
                            togglePresetNote(student.id, opt, checked)
                          }
                          onRemoveNote={(noteId) =>
                            removeNoteFromStudent(student.id, noteId)
                          }
                          onSelectOther={() => setActiveNoteStudentId(student.id)}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
              <button className="save-button" onClick={handleSaveAttendance}>
                Save Attendance
              </button>
            </div>
          ) : (
            <div className="placeholder-text">
              <p>Please select a Grade, Class, and Session to begin.</p>
            </div>
          )}
        </section>
      </main>

      {/* Custom Note Modal (Other...) */}
      <AddNoteModal
        open={!!activeNoteStudentId}
        studentName={activeStudent?.name}
        onClose={() => setActiveNoteStudentId(null)}
        onAddNote={(noteObj) => {
          if (!activeNoteStudentId) return;
          addCustomNote(activeNoteStudentId, noteObj);
        }}
      />
    </div>
  );
};

export default StudentDashboard;
