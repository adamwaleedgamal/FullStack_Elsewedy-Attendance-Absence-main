// --- File: src/pages/VideosPageS.js (SENIOR VIDEOS - FINAL) ---

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// --- CONSTANT MOCK DATA FOR SENIOR ---
const mockData = {
  '1': { // Flutter
    videos: [
      { id: 101, title: 'Intro to Flutter', description: 'Build beautiful mobile apps with Flutter.', videoUrl: 'https://www.youtube.com/watch?v=4hjd0I-j2-s' },
      { id: 102, title: 'Widgets Explained', description: 'Understand the core building block of Flutter.', videoUrl: 'https://www.youtube.com/watch?v=pTQBw40yvC0' }
    ]
  },
  '2': { // Asp.net
    videos: [
      { id: 201, title: 'What is ASP.NET Core?', description: 'Build robust web applications with Microsoft\'s framework.', videoUrl: 'https://www.youtube.com/watch?v=lE8NdaX97m0' },
      { id: 202, title: 'Building your first API', description: 'Create a simple web API.', videoUrl: 'https://www.youtube.com/watch?v=pa9iWD6kY6I' }
    ]
  },
  '4': { // MultiMedia
    videos: [ { id: 401, title: 'Handling Images & Video', description: 'Learn the basics of processing multimedia content.', videoUrl: 'https://www.youtube.com/watch?v=j_eX_e-g3s4' } ]
  },
  '5': { // Code Modification
    videos: [ { id: 501, title: 'Refactoring Principles', description: 'How to improve the design of existing code.', videoUrl: 'https://www.youtube.com/watch?v=D-a-eK4i_0M' } ]
  },
  '6': { // Embded Systmem
    videos: [ { id: 601, title: 'Intro to Embedded Systems', description: 'Working with microcontrollers and hardware.', videoUrl: 'https://www.youtube.com/watch?v=K834g2I-sZA' } ]
  },
  '7': { // Internet Of Things Network (IOT)
    videos: [ { id: 701, title: 'What is IoT?', description: 'Understanding the network of connected devices.', videoUrl: 'https://www.youtube.com/watch?v=QSIPNhOiMoY' } ]
  }
};
const defaultVideos = [{ id: 999, title: 'Coming Soon!', description: 'Videos for this course are being prepared.', videoUrl: 'https://www.youtube.com/watch?v=L_LUpnjgPso' }];

// --- Helper Functions & UI Components ---
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

const CourseHeaderS = ({ stackInfo }) => React.createElement('header', null,
    React.createElement('nav', { className: 'container' },
        React.createElement(Link, { to: "/homepage", className: 'logo' }, 'ELearning'),
        React.createElement(Link, { to: "/stacks/senior", className: 'back-link-button' }, `‹ Back to Senior Stacks`)
    )
);

const VideoPlayer = ({ video }) => {
    if (!video) return null;
    return React.createElement('div', { className: 'video-player-container' },
        React.createElement('h2', null, video.title),
        React.createElement('iframe', {
            key: video.id, src: getEmbedUrl(video.videoUrl), title: video.title, className: 'video-embed',
            frameBorder: '0', allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture', allowFullScreen: true
        })
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

const VideosPageS = () => {
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
                const response = await fetch('https://sewedylearn.runasp.net/api/CoreStackSenior/GetCoresS');
                if (!response.ok) throw new Error('Could not fetch stack list.');
                const allStacks = await response.json();
                const currentStack = allStacks.find(stack => stack.id.toString() === stackId);
                if (!currentStack) throw new Error(`Senior Course with ID ${stackId} not found.`);
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
        React.createElement(CourseHeaderS, { stackInfo: stackInfo }),
        renderPageContent()
    );
};

export default VideosPageS;