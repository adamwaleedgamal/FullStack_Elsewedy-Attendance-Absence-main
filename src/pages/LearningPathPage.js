// // --- File: src/pages/LearningPathPage.js ---

// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { allLearningPaths } from './mock-data'; // Using local data to prevent network errors

// // This component injects all our CSS directly into the webpage's <head>.
// const PageStyles = () => {
//     const css = `
//         /* Global styles from previous steps */
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
//         :root { --theme-color: #E60028; --text-primary: #1d2939; --text-secondary: #475467; --background-light: #f9fafb; --background-white: #ffffff; --border-color: #eaecf0; }
//         body { font-family: 'Inter', sans-serif; background-color: var(--background-white); color: var(--text-primary); }
//         .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
//         h1 { font-size: clamp(2.5rem, 5vw, 3.5rem); }
//         h2 { font-size: 1.75rem; margin-bottom: 1rem; }
//         p { color: var(--text-secondary); font-size: 1.1rem; }
//         .button { display: inline-block; padding: 10px 20px; font-size: 0.95rem; font-weight: 600; border-radius: 8px; border: none; cursor: pointer; text-align: center; transition: all 0.2s; text-decoration: none; }
//         .button.primary { background-color: var(--theme-color); color: white; }
//         .button.secondary { background-color: #e5e7eb; color: var(--text-primary); }
//         .button.delete { background-color: #d92d20; color: white; }
//         .button:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(0,0,0,0.1); }

//         /* Header & Layout */
//         header { padding: 18px 0; position: sticky; top: 0; z-index: 999; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border-color); }
//         nav.container { display: flex; justify-content: space-between; align-items: center; }
//         .logo { font-size: 1.5rem; font-weight: 800; color: var(--text-primary); text-decoration: none; }
//         .nav-actions { display: flex; align-items: center; gap: 20px; }
//         .path-detail-layout { padding: 120px 0 100px; }
//         .path-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; flex-wrap: wrap; gap: 20px;}
//         .path-title-group { text-align: left; }
//         .admin-controls { display: flex; gap: 10px; }
//         .path-content-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: flex-start; }
//         .path-image img { width: 100%; border-radius: 16px; box-shadow: 0 15px 50px -10px rgba(0,0,0,0.2); object-fit: cover; aspect-ratio: 4 / 3; }
//         .key-points-list { list-style: none; padding: 0; margin: 2rem 0; }
//         .key-points-list li { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 1rem; font-weight: 600; font-size: 1.1rem; }
//         .key-points-list li svg { color: #16a34a; flex-shrink: 0; margin-top: 4px; }
//         .loading-error-state { text-align: center; padding: 150px 20px; font-size: 1.2rem; font-weight: 600; color: var(--text-secondary); }

//         /* Modal Styles */
//         .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; opacity: 0; transition: opacity 0.3s ease; pointer-events: none; }
//         .modal-overlay.visible { opacity: 1; pointer-events: all; }
//         .modal-content { background: var(--background-white); padding: 40px; border-radius: 16px; width: 90%; max-width: 600px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); transform: scale(0.95); transition: transform 0.3s ease; }
//         .modal-overlay.visible .modal-content { transform: scale(1); }
//         .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
//         .modal-header h2 { font-size: 1.8rem; margin: 0; }
//         .close-button { background: none; border: none; font-size: 2rem; cursor: pointer; color: var(--text-secondary); }
//         .form-group { margin-bottom: 20px; }
//         .form-group label { display: block; font-weight: 600; margin-bottom: 8px; }
//         .form-group input, .form-group textarea { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); font-size: 1rem; }
//         .form-group small { display: block; margin-top: 5px; font-size: 0.9rem; color: var(--text-secondary); }
//         .submit-button { width: 100%; padding: 14px; font-size: 1.1rem; font-weight: 700; color: white; background-color: var(--theme-color); border: none; border-radius: 8px; cursor: pointer; }
//         .submit-button:disabled { background-color: #fca5a5; cursor: not-allowed; }
//         .status-message { margin-top: 20px; padding: 15px; border-radius: 8px; text-align: center; font-weight: 600; }
//         .status-message.error { background-color: #fee2e2; color: #b91c1c; }
//     `;
//     return React.createElement('style', { dangerouslySetInnerHTML: { __html: css } });
// };

// // --- SVG Icons ---
// const CheckIcon = () => React.createElement('svg', { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round"}, React.createElement('path', { d: "M20 6L9 17l-5-5" }));
// const CloseIcon = () => React.createElement('svg', { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round"}, React.createElement('path', { d: "M18 6L6 18M6 6l12 12" }));

// // --- Self-Contained Components ---
// const Header = ({ onAddClick }) => React.createElement('header', null,
//     React.createElement('nav', { className: 'container' },
//         React.createElement(Link, { to: "/homepage", className: 'logo' }, 'Sewedy Learning'),
//         React.createElement('div', { className: 'nav-actions' },
//             React.createElement(Link, { to: '/homepage#stacks' }, 'All Paths'),
//             // This button now triggers the modal on this page
//             React.createElement('button', { onClick: onAddClick, className: 'button primary' }, 'Add New Stack')
//         )
//     )
// );

// const StackFormModal = ({ show, onClose, stack, onSave }) => {
//     const [formData, setFormData] = useState({ title: '', description: '', image: '', mainPorints: '' });
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (stack) setFormData(stack);
//         else setFormData({ title: '', description: '', image: '', mainPorints: '' });
//     }, [stack, show]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError(null);
//         const isUpdating = !!stack;
//         const url = isUpdating ? `https://elsewedylearn.runasp.net/api/CoreStack/UpdateCore/${stack.id}` : 'https://elsewedylearn.runasp.net/api/CoreStack/AddCore';
//         const method = isUpdating ? 'PUT' : 'POST';

//         try {
//             const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
//             if (!response.ok) throw new Error(await response.text() || 'API Request Failed');
//             onSave(isUpdating ? formData : await response.json()); // Pass back new/updated data
//             onClose();
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     if (!show) return null;

//     return React.createElement('div', { className: 'modal-overlay visible' },
//         React.createElement('div', { className: 'modal-content' },
//             React.createElement('div', { className: 'modal-header' },
//                 React.createElement('h2', null, stack ? 'Update Core Stack' : 'Add New Core Stack'),
//                 React.createElement('button', { onClick: onClose, className: 'close-button' }, React.createElement(CloseIcon))
//             ),
//             React.createElement('form', { onSubmit: handleSubmit },
//                 React.createElement('div', { className: 'form-group' }, React.createElement('label', null, 'Title'), React.createElement('input', { type: 'text', value: formData.title, onChange: (e) => setFormData({...formData, title: e.target.value }), required: true })),
//                 React.createElement('div', { className: 'form-group' }, React.createElement('label', null, 'Description'), React.createElement('textarea', { value: formData.description, onChange: (e) => setFormData({...formData, description: e.target.value }), required: true, rows: 4 })),
//                 React.createElement('div', { className: 'form-group' }, React.createElement('label', null, 'Image URL'), React.createElement('input', { type: 'text', value: formData.image, onChange: (e) => setFormData({...formData, image: e.target.value }), required: true })),
//                 React.createElement('div', { className: 'form-group' }, React.createElement('label', null, 'Main Points'), React.createElement('input', { type: 'text', value: formData.mainPorints, onChange: (e) => setFormData({...formData, mainPorints: e.target.value }), required: true }), React.createElement('small', null, 'Enter key points separated by commas.')),
//                 React.createElement('button', { type: 'submit', className: 'submit-button', disabled: isLoading }, isLoading ? 'Saving...' : 'Save Changes'),
//                 error && React.createElement('div', { className: 'status-message error' }, error)
//             )
//         )
//     );
// };

// // --- THE MAIN LEARNING PATH PAGE COMPONENT ---
// const LearningPathPage = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [pathData, setPathData] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingStack, setEditingStack] = useState(null);

//     const fetchPathData = async () => {
//         setIsLoading(true);
//         // Using local mock data to prevent CORS/network errors during development
//         const targetPath = allLearningPaths.find(path => path.id === parseInt(id, 10));
//         if (targetPath) {
//             setPathData(targetPath);
//         } else {
//             setError(`Path with ID ${id} not found.`);
//         }
//         setIsLoading(false);
//     };

//     useEffect(() => {
//         fetchPathData();
//     }, [id]);

//     const handleOpenAddModal = () => {
//         setEditingStack(null);
//         setIsModalOpen(true);
//     };

//     const handleOpenEditModal = () => {
//         setEditingStack(pathData);
//         setIsModalOpen(true);
//     };

//     const handleDelete = async () => {
//         if (window.confirm('Are you sure you want to delete this stack?')) {
//             // NOTE: The delete API call is commented out to prevent errors if the API is down.
//             // Uncomment this block to enable live deletion.
//             /*
//             try {
//                 const response = await fetch(`https://elsewedylearn.runasp.net/api/CoreStack/DeleteCore/${id}`, { method: 'DELETE' });
//                 if (!response.ok) throw new Error('Failed to delete.');
//                 alert('Stack deleted successfully!');
//                 navigate('/homepage');
//             } catch (err) {
//                 alert(`Error: ${err.message}`);
//             }
//             */
//             alert(`(Simulated) Deleted stack with ID: ${id}. Redirecting to homepage.`);
//             navigate('/homepage');
//         }
//     };
    
//     const handleSaveSuccess = (savedData) => {
//         // If we just updated the current page's data, refresh it.
//         if (savedData.id === parseInt(id, 10)) {
//             setPathData(savedData);
//         }
//         // If we added a new item, we could optionally navigate to it
//         // navigate(`/path/${savedData.id}`);
//         alert('Data saved successfully!');
//     };

//     if (isLoading) return React.createElement('div', { className: 'loading-error-state' }, 'Loading...');
//     if (error) return React.createElement('div', { className: 'loading-error-state' }, `Error: ${error}`);
//     if (!pathData) return React.createElement('div', { className: 'loading-error-state' }, 'Path not found.');

//     const mainPoints = pathData.mainPorints ? pathData.mainPorints.split(',').map(p => p.trim()) : [];

//     return React.createElement(React.Fragment, null,
//         React.createElement(PageStyles, null),
//         React.createElement(Header, { onAddClick: handleOpenAddModal }),
//         React.createElement('main', { className: 'path-detail-layout' },
//             React.createElement('div', { className: 'container' },
//                 React.createElement('section', { className: 'path-header' },
//                     React.createElement('div', { className: 'path-title-group' },
//                         React.createElement('h1', null, pathData.title)
//                     ),
//                     React.createElement('div', { className: 'admin-controls' },
//                         React.createElement('button', { onClick: handleOpenEditModal, className: 'button secondary' }, 'Edit this Path'),
//                         React.createElement('button', { onClick: handleDelete, className: 'button delete' }, 'Delete this Path')
//                     )
//                 ),
//                 React.createElement('div', { className: 'path-content-grid' },
//                     React.createElement('div', { className: 'path-image' }, React.createElement('img', { src: pathData.image, alt: pathData.title })),
//                     React.createElement('div', { className: 'path-details' },
//                         React.createElement('h2', null, 'Path Description'),
//                         React.createElement('p', null, pathData.description),
//                         React.createElement('h2', { style: { marginTop: '2.5rem' } }, 'Key Learning Points'),
//                         React.createElement('ul', { className: 'key-points-list' },
//                             mainPoints.map((point, index) => React.createElement('li', { key: index }, React.createElement(CheckIcon), point))
//                         )
//                     )
//                 )
//             )
//         ),
//         React.createElement(StackFormModal, { show: isModalOpen, onClose: () => setIsModalOpen(false), stack: editingStack, onSave: handleSaveSuccess })
//     );
// };

// export default LearningPathPage;