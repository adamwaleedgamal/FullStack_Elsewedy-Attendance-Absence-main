// --- File: src/pages/VideosPageW.js (WHEELER VIDEOS - FINAL) ---

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// --- CONSTANT MOCK DATA FOR WHEELER ---
const mockData = {
  '3': { // Desktop
    videos: [
      { id: 301, title: 'Advanced Desktop UI/UX', description: 'Advanced concepts for desktop development.', videoUrl: 'https://www.youtube.com/watch?v=rpI12-11ZVI' },
      { id: 302, title: 'Performance Optimization', description: 'Making your desktop apps run faster.', videoUrl: 'https://www.youtube.com/watch?v=vV-G12-00I' }
    ]
  },
  '4': { // Database (Sql Server)
    videos: [
      { id: 401, title: 'Advanced SQL Queries', description: 'Learn about joins, subqueries, and more.', videoUrl: 'https://www.youtube.com/watch?v=wAWs94F4G5M' },
      { id: 402, title: 'Database Indexing', description: 'Speed up your database lookups.', videoUrl: 'https://www.youtube.com/watch?v=fsG1M_gG4B8' }
    ]
  },
  '5': { // Front-End
    videos: [ { id: 501, title: 'What is React?', description: 'A powerful library for building user interfaces.', videoUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk' } ]
  },
  '6': { // Problem Solving (C++)
    videos: [ { id: 601, title: 'Data Structures in C++', description: 'Understanding arrays, linked lists, and trees.', videoUrl: 'https://www.youtube.com/watch?v=B31LgI4DQ' } ]
  }
};
const defaultVideos = [{ id: 999, title: 'Coming Soon!', description: 'Videos for this course are being prepared.', videoUrl: 'https://www.youtube.com/watch?v=L_LUpnjgPso' }];

// --- UI Components ---
const getEmbedUrl = (url) => {
    if (!url) return '';
    try {
        const urlObj = new URL(url);
        const videoId = urlObj.searchParams.get('v');
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    } catch (e) { return url; }
};

const PageStyles = () => {
    const css = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        :root { --theme-color: #E60028; --text-primary: #1d2939; --text-secondary: #475467; --background-light: #f9fafb; --background-white: #ffffff; --border-color: #eaecf0; }
        body { font-family: 'Inter', sans-serif; background-color: var(--background-light); color: var(--text-primary); }
        .container { max-width: 1400px; margin: 0 auto; padding: 0 20px; }
        .page-layout { padding-top: 80px; }
        header { padding: 18px 0; position: fixed; top: 0; width: 100%; z-index: 999; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border-color); }
        nav.container { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: 800; color: var(--text-primary); text-decoration: none; }
        .back-link-button { display: inline-block; padding: 10px 20px; font-size: 0.95rem; font-weight: 600; border-radius: 8px; border: 1px solid var(--border-color); cursor: pointer; text-align: center; transition: all 0.2s; text-decoration: none; background-color: var(--background-white); color: var(--text-primary); }
        .back-link-button:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .course-room-container { padding: 40px 20px; }
        .course-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; }
        @media (max-width: 992px) { .course-layout { grid-template-columns: 1fr; } }
        .main-content, .sidebar-content { display: flex; flex-direction: column; gap: 20px; }
        .video-player-container, .tab-content-container, .playlist-container { background: var(--background-white); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        .video-embed { width: 100%; aspect-ratio: 16 / 9; border-radius: 8px; border: none; background-color: #000; }
        .tab-content h3 { margin-top: 0; }
        .tab-content p { line-height: 1.6; }
        .playlist-container h3 { margin-top: 0; padding-bottom: 10px; border-bottom: 1px solid var(--border-color); }
        .playlist-items { display: flex; flex-direction: column; gap: 10px; max-height: 60vh; overflow-y: auto; }
        .playlist-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; border-radius: 8px; border: 1px solid var(--border-color); cursor: pointer; transition: all 0.2s ease; }
        .playlist-item:hover { border-color: var(--theme-color); transform: translateX(5px); }
        .playlist-item.active { background-color: #feefef; border-color: var(--theme-color); font-weight: 700; }
        .playlist-item-title { flex-grow: 1; padding-right: 15px; }
        .playlist-item-duration { color: var(--text-secondary); font-size: 0.9rem; }
        .loading-error-state { text-align: center; padding: 200px 20px; font-size: 1.2rem; font-weight: 600; color: var(--text-secondary); }
    `;
    return React.createElement('style', null, css);
};

const CourseHeaderW = ({ stackInfo }) => React.createElement('header', null,
    React.createElement('nav', { className: 'container' },
        React.createElement(Link, { to: "/homepage", className: 'logo' }, 'ELearning'),
        React.createElement(Link, { to: "/stacks/wheeler", className: 'back-link-button' }, `‹ Back to Wheeler Stacks`)
    )
);

const VideoPlayer = ({ video }) => {
    if (!video) return null;
    return React.createElement('div', { className: 'video-player-container' },
        React.createElement('h2', null, video.title),
        React.createElement('iframe', { key: video.id, src: getEmbedUrl(video.videoUrl), title: video.title, className: 'video-embed', frameBorder: '0', allowFullScreen: true })
    );
};

const TabbedContent = ({ video }) => {
    if (!video) return null;
    return React.createElement('div', { className: 'tab-content-container' },
        React.createElement('div', { className: 'tab-content' },
            React.createElement('h3', null, "Overview"),
            React.createElement('p', null, video.description)
        )
    );
};

const Playlist = ({ videos, currentVideo, onVideoSelect }) => {
    return React.createElement('div', { className: 'playlist-container' },
        React.createElement('h3', null, 'Course Content'),
        React.createElement('div', { className: 'playlist-items' },
            videos.map((video, index) => React.createElement('div', {
                key: video.id,
                className: `playlist-item ${currentVideo && currentVideo.id === video.id ? 'active' : ''}`,
                onClick: () => onVideoSelect(video)
            },
                React.createElement('span', { className: 'playlist-item-title' }, `${index + 1}. ${video.title}`),
                React.createElement('span', { className: 'playlist-item-duration' }, `${Math.floor(Math.random() * 20) + 5}min`)
            ))
        )
    );
};

const VideosPageW = () => {
    const { stackId } = useParams();
    const [stackInfo, setStackInfo] = useState(null);
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourseData = async () => {
            setIsLoading(true); setError(null);
            try {
                const response = await fetch('https://sewedylearn.runasp.net/api/CoreStackWheeler/GetCoresW');
                if (!response.ok) throw new Error('Could not fetch stack list.');
                const allStacks = await response.json();
                const currentStack = allStacks.find(stack => stack.id.toString() === stackId);
                if (!currentStack) throw new Error(`Wheeler Course with ID ${stackId} not found.`);
                setStackInfo(currentStack);
                let videosForCourse = mockData[stackId]?.videos || defaultVideos;
                setVideos(videosForCourse);
                if (videosForCourse.length > 0) setCurrentVideo(videosForCourse[0]);
            } catch (err) { setError(err.message); } finally { setIsLoading(false); }
        };
        fetchCourseData();
    }, [stackId]);

    const handleVideoSelect = (video) => setCurrentVideo(video);

    const renderPageContent = () => {
        if (isLoading) return React.createElement('div', { className: 'loading-error-state' }, 'Loading Course...');
        if (error) return React.createElement('div', { className: 'loading-error-state' }, `Error: ${error}`);
        if (videos.length === 0) return React.createElement('div', { className: 'loading-error-state' }, `No videos for "${stackInfo?.title}".`);
        return React.createElement('main', { className: 'course-room-container' },
            React.createElement('div', { className: 'container' },
                React.createElement('div', { className: 'course-layout' },
                    React.createElement('div', { className: 'main-content' },
                        React.createElement(VideoPlayer, { video: currentVideo }),
                        React.createElement(TabbedContent, { video: currentVideo })
                    ),
                    React.createElement('div', { className: 'sidebar-content' },
                        React.createElement(Playlist, { videos: videos, currentVideo: currentVideo, onVideoSelect: handleVideoSelect })
                    )
                )
            )
        );
    };

    return React.createElement('div', { className: 'page-layout' },
        React.createElement(PageStyles, null),
        React.createElement(CourseHeaderW, { stackInfo: stackInfo }),
        renderPageContent()
    );
};

export default VideosPageW;