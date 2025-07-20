// --- File: src/pages/StacksPage.js ---

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// This component injects all our CSS directly into the webpage's <head>.
const PageStyles = () => {
    const css = `
        /* Global styles from previous steps */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        :root {
            --theme-color: #E60028;
            --text-primary: #1d2939;
            --text-secondary: #475467;
            --background-light: #f9fafb;
            --background-white: #ffffff;
            --border-color: #eaecf0;
            --success-color: #16a34a;
            --error-color: #d92d20;
        }
        body { font-family: 'Inter', sans-serif; background-color: var(--background-white); color: var(--text-primary); }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .button {
            display: inline-block; padding: 10px 20px; font-size: 0.95rem; font-weight: 600;
            border-radius: 8px; border: none; cursor: pointer; text-align: center;
            transition: all 0.2s; text-decoration: none;
        }
        .button.primary { background-color: var(--theme-color); color: white; }
        .button.secondary { background-color: var(--background-light); color: var(--text-primary); border: 1px solid var(--border-color); }
        .button.delete { background-color: var(--error-color); color: white; }
        .button:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        
        /* Layout & Header */
        .stacks-page-layout { padding-top: 80px; /* Space for fixed header */ }
        header { padding: 18px 0; position: fixed; top: 0; width: 100%; z-index: 999; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border-color); }
        nav.container { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: 800; color: var(--text-primary); text-decoration: none; }
        
        .page-header {
            padding: 60px 0;
            text-align: center;
            background-color: var(--background-light);
            border-bottom: 1px solid var(--border-color);
        }
        .page-header h1 { font-size: clamp(2.5rem, 5vw, 3.5rem); margin-bottom: 0.5rem; }
        .page-header p { font-size: 1.2rem; color: var(--text-secondary); }

        /* Stacks Grid */
        .stacks-grid-container { padding: 80px 20px; }
        .stacks-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 30px;
        }
        .stack-card {
            background: var(--background-white); border: 1px solid var(--border-color);
            border-radius: 16px; display: flex; flex-direction: column;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .stack-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
        .stack-card-image { width: 100%; height: 200px; object-fit: cover; border-radius: 16px 16px 0 0; }
        .stack-card-content { padding: 25px; display: flex; flex-direction: column; flex-grow: 1; }
        .stack-card-content h3 { font-size: 1.4rem; }
        .stack-card-content p { flex-grow: 1; margin: 0.5rem 0 1.5rem; }
        .stack-card-actions { display: flex; gap: 10px; border-top: 1px solid var(--border-color); padding-top: 15px; margin-top: auto; }
        .stack-card-actions .button { flex-grow: 1; }
        
        .loading-error-state { text-align: center; padding: 150px 20px; font-size: 1.2rem; font-weight: 600; color: var(--text-secondary); }

        /* Modal Styles */
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; opacity: 0; transition: opacity 0.3s ease; pointer-events: none; }
        .modal-overlay.visible { opacity: 1; pointer-events: all; }
        .modal-content { background: var(--background-white); padding: 40px; border-radius: 16px; width: 90%; max-width: 600px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); transform: scale(0.95); transition: transform 0.3s ease; }
        .modal-overlay.visible .modal-content { transform: scale(1); }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .modal-header h2 { font-size: 1.8rem; margin: 0; }
        .close-button { background: none; border: none; font-size: 2rem; cursor: pointer; color: var(--text-secondary); }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-weight: 600; margin-bottom: 8px; }
        .form-group input, .form-group textarea { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); font-size: 1rem; }
        .form-group small { display: block; margin-top: 5px; font-size: 0.9rem; color: var(--text-secondary); }
        .submit-button { width: 100%; padding: 14px; font-size: 1.1rem; font-weight: 700; }
        .submit-button:disabled { background-color: #fca5a5; cursor: not-allowed; }
        .status-message { margin-top: 20px; padding: 15px; border-radius: 8px; text-align: center; font-weight: 600; }
        .status-message.error { background-color: #fee2e2; color: var(--error-color); }
    `;
    return React.createElement('style', null, css);
};

// --- SVG Icons ---
const CloseIcon = () => React.createElement('svg', { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round"}, React.createElement('path', { d: "M18 6L6 18M6 6l12 12" }));

// --- Self-Contained Components ---
const Header = ({ onAddClick }) => React.createElement('header', null,
    React.createElement('nav', { className: 'container' },
        React.createElement(Link, { to: "/homepage", className: 'logo' }, 'ELearning'),
        React.createElement('button', { onClick: onAddClick, className: 'button primary' }, 'Add New Stack')
    )
);

const StackFormModal = ({ show, onClose, stack, onSave }) => {
    const defaultFormState = { title: '', description: '', image: '', mainPorints: '' };
    const [formData, setFormData] = useState(defaultFormState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (show) {
            setError(null);
            setFormData(stack ? stack : defaultFormState);
        }
    },[defaultFormState, show, stack]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        const isUpdating = !!stack;
        const url = isUpdating ? `https://sewedylearn.runasp.net/api/CoreStack/UpdateCoreJ/${stack.id}` : 'https://sewedylearn.runasp.net/api/CoreStack/AddCoreJ';
        const method = isUpdating ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'API Request Failed');
            }
            onSave(); // Trigger a refetch on the main page
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!show) return null;

    return React.createElement('div', { className: 'modal-overlay visible' },
        React.createElement('div', { className: 'modal-content' },
            React.createElement('div', { className: 'modal-header' },
                React.createElement('h2', null, stack ? 'Update Core Stack' : 'Add New Core Stack'),
                React.createElement('button', { onClick: onClose, className: 'close-button' }, React.createElement(CloseIcon))
            ),
            React.createElement('form', { onSubmit: handleSubmit },
                React.createElement('div', { className: 'form-group' }, React.createElement('label', null, 'Title'), React.createElement('input', { type: 'text', value: formData.title, onChange: (e) => setFormData({...formData, title: e.target.value }), required: true })),
                React.createElement('div', { className: 'form-group' }, React.createElement('label', null, 'Description'), React.createElement('textarea', { value: formData.description, onChange: (e) => setFormData({...formData, description: e.target.value }), required: true, rows: 4 })),
                React.createElement('div', { className: 'form-group' }, React.createElement('label', null, 'Image URL'), React.createElement('input', { type: 'text', value: formData.image, onChange: (e) => setFormData({...formData, image: e.target.value }), required: true })),
                React.createElement('div', { className: 'form-group' }, React.createElement('label', null, 'Main Points'), React.createElement('input', { type: 'text', value: formData.mainPorints, onChange: (e) => setFormData({...formData, mainPorints: e.target.value }), required: true }), React.createElement('small', null, 'Enter key points separated by commas.')),
                React.createElement('button', { type: 'submit', className: 'button primary submit-button', disabled: isLoading }, isLoading ? 'Saving...' : 'Save Changes'),
                error && React.createElement('div', { className: 'status-message error' }, error)
            )
        )
    );
};

// --- THIS IS THE MODIFIED COMPONENT ---
const StackCard = ({ stack, onEdit, onDelete }) => {
    return React.createElement('div', { className: 'stack-card' },
        React.createElement('img', { src: stack.image, alt: stack.title, className: 'stack-card-image' }),
        React.createElement('div', { className: 'stack-card-content' },
            React.createElement('h3', null, stack.title),
            React.createElement('p', null, stack.description),
            React.createElement('div', { className: 'stack-card-actions' },
                React.createElement(Link, { to: `/videos/junior/${stack.id}`, className: 'button primary' }, 'View Videos'),
                React.createElement('button', { onClick: () => onEdit(stack), className: 'button secondary' }, 'Edit'),
                React.createElement('button', { onClick: () => onDelete(stack.id), className: 'button delete' }, 'Delete')
            )
        )
    );
};

// --- THE MAIN STACKS PAGE COMPONENT ---
const StacksPage = () => {
    const [stacks, setStacks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStack, setEditingStack] = useState(null);

    const fetchStacks = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://sewedylearn.runasp.net/api/CoreStack/GetCoresJ');
            if (!response.ok) throw new Error('Failed to fetch learning stacks.');
            const data = await response.json();
            setStacks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStacks();
    }, []);

    const handleOpenAddModal = () => {
        setEditingStack(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (stack) => {
        setEditingStack(stack);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this stack?')) {
            try {
                const response = await fetch(`https://sewedylearn.runasp.net/api/CoreStack/DeleteCoreJ/${id}`, { method: 'DELETE' });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText || 'Failed to delete stack.');
                }
                alert('Stack deleted successfully!');
                fetchStacks(); // Refetch data to update the UI
            } catch (err) {
                alert(`Error: ${err.message}`);
            }
        }
    };
    
    const renderContent = () => {
        if (isLoading) return React.createElement('div', { className: 'loading-error-state' }, 'Loading Learning Stacks...');
        if (error) return React.createElement('div', { className: 'loading-error-state' }, `Error: ${error}`);
        if (stacks.length === 0) return React.createElement('div', { className: 'loading-error-state' }, 'No learning stacks found. Try adding one!');

        return React.createElement('div', { className: 'stacks-grid' },
            stacks.map(stack => React.createElement(StackCard, {
                key: stack.id,
                stack: stack,
                onEdit: handleOpenEditModal,
                onDelete: handleDelete
            }))
        );
    };

    return React.createElement('div', { className: 'stacks-page-layout' },
        React.createElement(PageStyles, null),
        React.createElement(Header, { onAddClick: handleOpenAddModal }),
        React.createElement('main', null,
            React.createElement('section', { className: 'page-header' },
                React.createElement('div', { className: 'container' },
                    React.createElement('h1', null, 'Junior Core Learning Stacks'),
                    React.createElement('p', null, 'Manage the foundational learning paths for all students.')
                )
            ),
            React.createElement('div', { className: 'stacks-grid-container' },
                React.createElement('div', { className: 'container' }, renderContent())
            )
        ),
        React.createElement(StackFormModal, {
            show: isModalOpen,
            onClose: () => setIsModalOpen(false),
            stack: editingStack,
            onSave: fetchStacks
        })
    );
};

export default StacksPage;