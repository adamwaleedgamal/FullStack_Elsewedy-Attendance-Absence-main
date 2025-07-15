// This data simulates records you would fetch from a database for the Attendance Page.
// It includes a variety of dates, grades, classes, and statuses to make filtering demonstrable.

export const mockAttendanceLogs = [
    // --- Day 1: July 10, 2025 ---
    { id: 1, studentName: 'Student 1', grade: 'Junior', class: 'Junior 1', session: 1, status: 'Present', date: '2025-07-10' },
    { id: 2, studentName: 'Student 2', grade: 'Junior', class: 'Junior 1', session: 1, status: 'Present', date: '2025-07-10' },
    { id: 3, studentName: 'Student 3', grade: 'Junior', class: 'Junior 1', session: 1, status: 'Absent', date: '2025-07-10' },
    { id: 4, studentName: 'Student 4', grade: 'Senior', class: 'Senior 2', session: 3, status: 'Late', date: '2025-07-10' },
    { id: 5, studentName: 'Student 5', grade: 'Senior', class: 'Senior 2', session: 3, status: 'Present', date: '2025-07-10' },

    // --- Day 2: July 11, 2025 ---
    { id: 6, studentName: 'Student 1', grade: 'Junior', class: 'Junior 1', session: 2, status: 'Present', date: '2025-07-11' },
    { id: 7, studentName: 'Student 3', grade: 'Junior', class: 'Junior 1', session: 2, status: 'Present', date: '2025-07-11' }, // Was absent, now present
    { id: 8, studentName: 'Student 7', grade: 'Wheeler', class: 'Wheeler 3', session: 4, status: 'Present', date: '2025-07-11' },
    { id: 9, studentName: 'Student 8', grade: 'Wheeler', class: 'Wheeler 3', session: 4, status: 'Present', date: '2025-07-11' },
    { id: 10, studentName: 'Student 4', grade: 'Senior', class: 'Senior 2', session: 4, status: 'Present', date: '2025-07-11' },

    // --- Day 3: July 12, 2025 ---
    { id: 11, studentName: 'Student 10', grade: 'Senior', class: 'Senior 4', session: 8, status: 'Late', date: '2025-07-12' },
    { id: 12, studentName: 'Student 11', grade: 'Senior', class: 'Senior 4', session: 8, status: 'Absent', date: '2025-07-12' },
    { id: 13, studentName: 'Student 12', grade: 'Junior', class: 'Junior 2', session: 5, status: 'Present', date: '2025-07-12' },
    { id: 14, studentName: 'Student 13', grade: 'Junior', class: 'Junior 2', session: 5, status: 'Present', date: '2025-07-12' },
    { id: 15, studentName: 'Student 14', grade: 'Wheeler', class: 'Wheeler 4', session: 6, status: 'Present', date: '2025-07-12' },
    { id: 16, studentName: 'Student 15', grade: 'Wheeler', class: 'Wheeler 4', session: 6, status: 'Late', date: '2025-07-12' },

    // --- Day 4: July 13, 2025 (Today) ---
    { id: 17, studentName: 'Student 1', grade: 'Junior', class: 'Junior 1', session: 3, status: 'Present', date: '2025-07-13' },
    { id: 18, studentName: 'Student 2', grade: 'Junior', class: 'Junior 1', session: 3, status: 'Late', date: '2025-07-13' },
    { id: 19, studentName: 'Student 9', grade: 'Wheeler', class: 'Wheeler 1', session: 1, status: 'Absent', date: '2025-07-13' },
    { id: 20, studentName: 'Student 16', grade: 'Senior', class: 'Senior 3', session: 7, status: 'Present', date: '2025-07-13' },
];

// Re-using the same grades data structure for consistency in filters.
// The empty key allows for the "All Grades" default option.
export const gradesData = {
  '': [], // For the 'All Grades' option
  Junior: ['Junior 1', 'Junior 2', 'Junior 3', 'Junior 4'],
  Wheeler: ['Wheeler 1', 'Wheeler 2', 'Wheeler 3', 'Wheeler 4'],
  Senior: ['Senior 1', 'Senior 2', 'Senior 3', 'Senior 4']
};