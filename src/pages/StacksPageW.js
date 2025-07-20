import React, { useState as useStateW, useEffect as useEffectW } from 'react';
import { Link as LinkW } from 'react-router-dom';

const DEFAULT_FORM_STATE_W = Object.freeze({
  title: '',
  description: '',
  image: '',
  mainPorints: '',
});

const PageStylesW = () => {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
    :root { --theme-color: #E60028; --text-primary: #1d2939; --text-secondary: #475467; --background-light: #f9fafb; --background-white: #ffffff; --border-color: #eaecf0; --error-color: #d92d20; }
    body { font-family: 'Inter', sans-serif; } .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 0.95rem; font-weight: 600; border-radius: 8px; border: none; cursor: pointer; text-align: center; transition: all 0.2s; text-decoration: none; } .button.primary { background-color: var(--theme-color); color: white; } .button.secondary { background-color: var(--background-light); color: var(--text-primary); border: 1px solid var(--border-color); } .button.delete { background-color: var(--error-color); color: white; } .button:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(0,0,0,0.1); } .stacks-page-layout { padding-top: 80px; } header { padding: 18px 0; position: fixed; top: 0; width: 100%; z-index: 999; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border-color); } nav.container { display: flex; justify-content: space-between; align-items: center; } .logo { font-size: 1.5rem; font-weight: 800; color: var(--text-primary); text-decoration: none; } .page-header { padding: 60px 0; text-align: center; background-color: var(--background-light); border-bottom: 1px solid var(--border-color); } .page-header h1 { font-size: clamp(2.5rem, 5vw, 3.5rem); margin-bottom: 0.5rem; } .page-header p { font-size: 1.2rem; color: var(--text-secondary); } .stacks-grid-container { padding: 80px 20px; } .stacks-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; } .stack-card { background: var(--background-white); border: 1px solid var(--border-color); border-radius: 16px; display: flex; flex-direction: column; box-shadow: 0 4px 20px rgba(0,0,0,0.05); transition: all 0.3s ease; } .stack-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.08); } .stack-card-image { width: 100%; height: 200px; object-fit: cover; border-radius: 16px 16px 0 0; } .stack-card-content { padding: 25px; display: flex; flex-direction: column; flex-grow: 1; } .stack-card-content h3 { font-size: 1.4rem; } .stack-card-content p { flex-grow: 1; margin: 0.5rem 0 1.5rem; } .stack-card-actions { display: flex; gap: 10px; border-top: 1px solid var(--border-color); padding-top: 15px; margin-top: auto; } .stack-card-actions .button { flex-grow: 1; } .loading-error-state { text-align: center; padding: 150px 20px; font-size: 1.2rem; font-weight: 600; color: var(--text-secondary); } .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; } .modal-content { background: var(--background-white); padding: 40px; border-radius: 16px; width: 90%; max-width: 600px; } .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; } .modal-header h2 { font-size: 1.8rem; margin: 0; } .close-button { background: none; border: none; font-size: 2rem; cursor: pointer; color: var(--text-secondary); } .form-group { margin-bottom: 20px; } .form-group label { display: block; font-weight: 600; margin-bottom: 8px; } .form-group input, .form-group textarea { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); font-size: 1rem; }
  `;
  return React.createElement('style', null, css);
};

const CloseIconW = () => (
  React.createElement('svg', { width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' },
    React.createElement('path', { d: 'M18 6L6 18M6 6l12 12' }))
);

const HeaderW = ({ onAddClick }) => (
  React.createElement('header', null,
    React.createElement('nav', { className: 'container' },
      React.createElement(LinkW, { to: '/homepage', className: 'logo' }, 'ELearning'),
      React.createElement('button', { onClick: onAddClick, className: 'button primary' }, 'Add New Wheeler Stack')
    )
  )
);

const StackFormModalW = ({ show, onClose, stack, onSave }) => {
  const [formData, setFormData] = useStateW(() => ({ ...DEFAULT_FORM_STATE_W }));
  useEffectW(() => {
    if (show) setFormData(stack ? { ...stack } : { ...DEFAULT_FORM_STATE_W });
  }, [show, stack]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isUpdating = !!stack;
    const url = isUpdating
      ? `https://sewedylearn.runasp.net/api/CoreStackWheeler/UpdateCoreW/${stack.id}`
      : 'https://sewedylearn.runasp.net/api/CoreStackWheeler/AddCoreW';
    const method = isUpdating ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error((await res.text()) || 'API Request Failed');
      onSave();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!show) return null;
  return (
    React.createElement('div', { className: 'modal-overlay visible' },
      React.createElement('div', { className: 'modal-content' },
        React.createElement('div', { className: 'modal-header' },
          React.createElement('h2', null, stack ? 'Update Wheeler Stack' : 'Add New Wheeler Stack'),
          React.createElement('button', { onClick: onClose, className: 'close-button' }, React.createElement(CloseIconW))
        ),
        React.createElement('form', { onSubmit: handleSubmit },
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'Title'),
            React.createElement('input', {
              type: 'text',
              value: formData.title,
              onChange: (e) => setFormData({ ...formData, title: e.target.value }),
              required: true,
            })
          ),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'Description'),
            React.createElement('textarea', {
              value: formData.description,
              onChange: (e) => setFormData({ ...formData, description: e.target.value }),
              rows: 4,
            })
          ),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'Image URL'),
            React.createElement('input', {
              type: 'text',
              value: formData.image,
              onChange: (e) => setFormData({ ...formData, image: e.target.value }),
              required: true,
            })
          ),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'Main Points'),
            React.createElement('input', {
              type: 'text',
              value: formData.mainPorints,
              onChange: (e) => setFormData({ ...formData, mainPorints: e.target.value }),
            })
          ),
          React.createElement('button', { type: 'submit', className: 'button primary' }, 'Save Changes')
        )
      )
    )
  );
};

const StackCardW = ({ stack, onEdit, onDelete }) => (
  React.createElement('div', { className: 'stack-card' },
    React.createElement('img', { src: stack.image, alt: stack.title, className: 'stack-card-image' }),
    React.createElement('div', { className: 'stack-card-content' },
      React.createElement('h3', null, stack.title),
      React.createElement('p', null, stack.description),
      React.createElement('div', { className: 'stack-card-actions' },
        React.createElement(LinkW, { to: `/videos/wheeler/${stack.id}`, className: 'button primary' }, 'View Videos'),
        React.createElement('button', { onClick: () => onEdit(stack), className: 'button secondary' }, 'Edit'),
        React.createElement('button', { onClick: () => onDelete(stack.id), className: 'button delete' }, 'Delete')
      )
    )
  )
);

const StacksPageW = () => {
  const [stacks, setStacks] = useStateW([]);
  const [isLoading, setIsLoading] = useStateW(true);
  const [error, setError] = useStateW(null);
  const [isModalOpen, setIsModalOpen] = useStateW(false);
  const [editingStack, setEditingStack] = useStateW(null);

  const fetchStacks = async () => {
    setIsLoading(true); setError(null);
    try {
      const res = await fetch('https://sewedylearn.runasp.net/api/CoreStackWheeler/GetCoresW');
      if (!res.ok) throw new Error('Failed to fetch stacks');
      const data = await res.json();
      setStacks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffectW(() => { fetchStacks(); }, []);

  const handleOpenAddModal = () => { setEditingStack(null); setIsModalOpen(true); };
  const handleOpenEditModal = (stack) => { setEditingStack(stack); setIsModalOpen(true); };
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        const res = await fetch(`https://sewedylearn.runasp.net/api/CoreStackWheeler/DeleteCoreW/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete');
        fetchStacks();
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    }
  };
  
  const renderContent = () => {
    if (isLoading) return React.createElement('div', { className: 'loading-error-state' }, 'Loading Wheeler Stacks...');
    if (error) return React.createElement('div', { className: 'loading-error-state' }, `Error: ${error}`);
    if (stacks.length === 0) return React.createElement('div', { className: 'loading-error-state' }, 'No Wheeler stacks found.');
    return React.createElement('div', { className: 'stacks-grid' }, stacks.map((stack) => (
      React.createElement(StackCardW, { key: stack.id, stack, onEdit: handleOpenEditModal, onDelete: handleDelete })
    )));
  };

  return (
    React.createElement('div', { className: 'stacks-page-layout' },
      React.createElement(PageStylesW, null),
      React.createElement(HeaderW, { onAddClick: handleOpenAddModal }),
      React.createElement('main', null,
        React.createElement('section', { className: 'page-header' },
          React.createElement('div', { className: 'container' },
            React.createElement('h1', null, 'Wheeler Core Stacks'),
            React.createElement('p', null, 'Manage intermediate learning paths.')
          )
        ),
        React.createElement('div', { className: 'stacks-grid-container' },
          React.createElement('div', { className: 'container' }, renderContent())
        )
      ),
      React.createElement(StackFormModalW, { show: isModalOpen, onClose: () => setIsModalOpen(false), stack: editingStack, onSave: fetchStacks })
    )
  );
};

export { StacksPageW as default };