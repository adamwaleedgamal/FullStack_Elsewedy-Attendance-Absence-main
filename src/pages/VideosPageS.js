// --- File: src/pages/VideosPage.js ---

import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

// This component injects all our CSS directly into the webpage's <head>.
const PageStyles = () => {
    const css = `
        /* Global styles */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        :root {
            --theme-color: #E60028; --text-primary: #1d2939; --text-secondary: #475467;
            --background-light: #f9fafb; --background-white: #ffffff; --border-color: #eaecf0;
            --success-color: #16a34a; --error-color: #d92d20;
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
        .videos-page-layout { padding-top: 80px; }
        header { padding: 18px 0; position: fixed; top: 0; width: 100%; z-index: 999; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border-color); }
        nav.container { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: 800; color: var(--text-primary); text-decoration: none; }

        /* Video Page Specific Layout */
        .page-header { padding: 40px 0; background-color: var(--background-light); border-bottom: 1px solid var(--border-color); }
        .page-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .page-header p { font-size: 1.1rem; color: var(--text-secondary); }
        .page-header .container { display: flex; justify-content: space-between; align-items: center; }

        .video-content-layout {
            display: grid;
            grid-template-columns: 2fr 1fr; /* Main content on left, playlist on right */
            gap: 40px;
            padding: 40px 0;
        }

        /* Video Player */
        .video-player-container { position: sticky; top: 120px; }
        .video-player {
            position: relative; padding-bottom: 56.25%; /* 16:9 aspect ratio */
            height: 0; background: #000; border-radius: 16px;
            overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        }
        .video-player iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .video-details { margin-top: 20px; }
        .video-details h2 { font-size: 1.75rem; }

        /* Video Playlist */
        .video-playlist h3 { font-size: 1.2rem; margin-bottom: 1rem; }
        .video-list { list-style: none; padding: 0; max-height: 80vh; overflow-y: auto; }
        .video-list-item {
            display: flex; gap: 15px; padding: 15px;
            border-radius: 12px; border: 1px solid var(--border-color);
            margin-bottom: 15px; cursor: pointer; transition: background-color 0.2s, box-shadow 0.2s;
        }
        .video-list-item:hover { background-color: var(--background-light); box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .video-list-item.active { background-color: #fee2e2; border-color: var(--theme-color); }
        .video-list-item-info { flex-grow: 1; }
        .video-list-item-info h4 { font-size: 1rem; margin-bottom: 4px; color: var(--text-primary); }
        .video-list-item-info p { font-size: 0.9rem; margin: 0; }
        .video-list-item-actions { margin-left: auto; display: flex; align-items: center; gap: 5px; }
        .video-list-item-actions button { background: none; border: none; cursor: pointer; padding: 5px; color: var(--text-secondary); }
        .video-list-item-actions button:hover { color: var(--text-primary); }
        
        .final-line { height: 1px; background-color: var(--border-color); margin: 80px auto; width: 100%; }
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
        .submit-button { width: 100%; padding: 14px; font-size: 1.1rem; font-weight: 700; }
        .submit-button:disabled { background-color: #fca5a5; cursor: not-allowed; }
        .status-message { margin-top: 20px; padding: 15px; border-radius: 8px; text-align: center; font-weight: 600; }
        .status-message.error { background-color: #fee2e2; color: var(--error-color); }
    `;
    return React.createElement('style', null, css);
};

// --- SVG Icons ---
const CloseIcon = () => React.createElement('svg', { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round"}, React.createElement('path', { d: "M18 6L6 18M6 6l12 12" }));
const EditIcon = () => React.createElement('svg', { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('path', { d: "M12 20h9" }), React.createElement('path', { d: "M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"}));
const DeleteIcon = () => React.createElement('svg', { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('path', { d: "M3 6h18" }), React.createElement('path', { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}), React.createElement('path', { d: "M10 11v6"}), React.createElement('path', { d: "M14 11v6"}));

// --- Self-Contained Components ---
const Header = ({ onAddClick }) => React.createElement('header', null,
    React.createElement('nav', { className: 'container' },
        React.createElement(Link, { to: "/homepage", className: 'logo' }, 'Sewedy Learning'),
        React.createElement('div', { style: { display: 'flex', gap: '20px' } },
            React.createElement(Link, { to: "/stacks", className: 'button secondary' }, 'Back to All Stacks'),
            React.createElement('button', { onClick: onAddClick, className: 'button primary' }, 'Add New Video')
        )
    )
);

const VideoFormModal = ({ show, onClose, video, stackId, onSave }) => {
    const defaultFormState = { title: '', description: '', videoUrl: '', category: stackId, grade: '', subject: '', content: '' };
    const [formData, setFormData] = useState(defaultFormState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (show) {
            setError(null);
            setFormData(video ? { ...video, category: video.category || stackId } : { ...defaultFormState, category: stackId });
        }
    }, [video, show, stackId]);
    
    const getYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const videoId = getYouTubeId(formData.videoUrl);
        const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : formData.videoUrl;
        const finalFormData = { ...formData, videoUrl: embedUrl };
        
        setIsLoading(true);
        setError(null);
        const isUpdating = !!video;
        const url = isUpdating ? `https://sewedylearn.runasp.net/api/Videos/UpdateVideo/${video.id}` : 'https://sewedylearn.runasp.net/api/Videos/AddVideo';
        const method = isUpdating ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(finalFormData) });
            if (!response.ok) throw new Error(await response.text() || 'API Request Failed');
            onSave();
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
                React.createElement('h2', null, video ? 'Update Video' : 'Add New Video'),
                React.createElement('button', { onClick: onClose, className: 'close-button' }, React.createElement(CloseIcon))
            ),
            React.createElement('form', { onSubmit: handleSubmit },
                React.createElement('div', { className: 'form-group' }, React.createElement('label', null, 'Title'), React.createElement('input', { type: 'text', value: formData.title, onChange: (e) => setFormData({...formData, title: e.target.value }), required: true })),
                React.createElement('div', { className: 'form-group' }, React.createElement('label', null, 'Description'), React.createElement('textarea', { value: formData.description, onChange: (e) => setFormData({...formData, description: e.target.value }), required: true, rows: 3 })),
                React.createElement('div', { className: 'form-group' }, React.createElement('label', null, 'YouTube URL'), React.createElement('input', { type: 'text', value: formData.videoUrl, onChange: (e) => setFormData({...formData, videoUrl: e.target.value }), required: true })),
                React.createElement('button', { type: 'submit', className: 'button primary submit-button', disabled: isLoading }, isLoading ? 'Saving...' : 'Save Changes'),
                error && React.createElement('div', { className: 'status-message error' }, error)
            )
        )
    );
};

// --- THE MAIN VIDEOS PAGE COMPONENT ---
const VideosPage = () => {
    const { stackId } = useParams();
    const [allVideos, setAllVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVideo, setEditingVideo] = useState(null);

    const fetchVideos = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://sewedylearn.runasp.net/api/Videos/GetAllVideos');
            if (!response.ok) throw new Error('Failed to fetch videos.');
            const data = await response.json();
            setAllVideos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const filteredVideos = allVideos.filter(video => video.category === stackId);

    useEffect(() => {
        setCurrentVideo(filteredVideos.length > 0 ? filteredVideos[0] : null);
    }, [allVideos, stackId]);

    const handleOpenAddModal = () => {
        setEditingVideo(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (video) => {
        setEditingVideo(video);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this video?')) {
            try {
                const response = await fetch(`https://sewedylearn.runasp.net/api/Videos/DeleteVideo/${id}`, { method: 'DELETE' });
                if (!response.ok) throw new Error(await response.text() || 'Failed to delete video.');
                alert('Video deleted successfully!');
                fetchVideos();
            } catch (err) {
                alert(`Error: ${err.message}`);
            }
        }
    };
    
    const renderContent = () => {
        if (isLoading) return React.createElement('div', { className: 'loading-error-state' }, 'Loading Videos...');
        if (error) return React.createElement('div', { className: 'loading-error-state' }, `Error: ${error}`);
        if (filteredVideos.length === 0) return React.createElement('div', { className: 'loading-error-state' }, 'No videos found for this stack. Try adding one!');

        return React.createElement('div', { className: 'video-content-layout' },
            React.createElement('div', { className: 'video-player-container' },
                currentVideo && React.createElement(React.Fragment, null,
                    React.createElement('div', { className: 'video-player' },
                        React.createElement('iframe', {
                            src: currentVideo.videoUrl, title: currentVideo.title, frameBorder: "0",
                            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                            allowFullScreen: true
                        })
                    ),
                    React.createElement('div', { className: 'video-details' },
                        React.createElement('h2', null, currentVideo.title),
                        React.createElement('p', null, currentVideo.description)
                    )
                )
            ),
            React.createElement('aside', { className: 'video-playlist' },
                React.createElement('h3', null, `Videos in this Stack (${filteredVideos.length})`),
                React.createElement('ul', { className: 'video-list' },
                    filteredVideos.map(video =>
                        React.createElement('li', {
                            key: video.id,
                            className: `video-list-item ${currentVideo && currentVideo.id === video.id ? 'active' : ''}`,
                            onClick: () => setCurrentVideo(video)
                        },
                            React.createElement('div', { className: 'video-list-item-info' },
                                React.createElement('h4', null, video.title)
                            ),
                            React.createElement('div', { className: 'video-list-item-actions' },
                                React.createElement('button', { onClick: (e) => { e.stopPropagation(); handleOpenEditModal(video); } }, React.createElement(EditIcon)),
                                React.createElement('button', { onClick: (e) => { e.stopPropagation(); handleDelete(video.id); } }, React.createElement(DeleteIcon))
                            )
                        )
                    )
                )
            )
        );
    };

    return React.createElement('div', { className: 'videos-page-layout' },
        React.createElement(PageStyles, null),
        React.createElement(Header, { onAddClick: handleOpenAddModal }),
        React.createElement('main', null,
            React.createElement('section', { className: 'page-header' },
                React.createElement('div', { className: 'container' },
                    React.createElement('h1', null, 'Video Library'),
                    React.createElement('p', null, 'Manage the videos for this learning path.')
                )
            ),
            React.createElement('div', { className: 'container' }, renderContent()),
            React.createElement('div', { className: 'container' },
                React.createElement('div', { className: 'final-line' })
            )
        ),
        React.createElement(VideoFormModal, {
            show: isModalOpen,
            onClose: () => setIsModalOpen(false),
            video: editingVideo,
            stackId: stackId,
            onSave: fetchVideos
        })
    );
};

export default VideosPage;