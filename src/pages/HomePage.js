// --- File: src/pages/HomePage.js ---

import React, { useState, useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import Fourthimg from '../assets/first.jpg';

// This component injects all our CSS directly into the webpage's <head>.
const PageStyles = () => {
    const css = `
        /* ==========================================================================
           1. Global Settings & Professional Font
           ========================================================================== */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        
        :root {
            --theme-color: #E60028;
            --text-primary: #1d2939;
            --text-secondary: #475467;
            --background-light: #f9fafb;
            --background-white: #ffffff;
            --border-color: #eaecf0;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--background-white);
            color: var(--text-primary);
            line-height: 1.7;
            -webkit-font-smoothing: antialiased;
        }
        h1, h2, h3, h4, h5, h6 { font-weight: 800; line-height: 1.2; }
        h2 { font-size: clamp(2rem, 4vw, 2.8rem); text-align: center; margin-bottom: 60px; }
        h3 { font-size: 1.5rem; margin-bottom: 12px; }
        p { color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 1.5rem; }
        a { text-decoration: none; color: var(--theme-color); }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
        /* Advanced Animation & Transitions */
        .fade-in-section {
            opacity: 0;
            transform: translateY(30px) scale(0.98);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in-section.is-visible {
            opacity: 1;
            transform: translateY(0) scale(1);
        }

        /* ==========================================================================
           2. Header, Hero, and Page Sections
           ========================================================================== */
        /* --- NEW: Scroll Progress Bar --- */
        .scroll-progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background-color: var(--theme-color);
            width: 0%; /* Initial width is 0 */
            z-index: 1001; /* Must be higher than the header */
            transition: width 0.1s linear;
        }

        header {
            padding: 18px 0; position: fixed; top: 0; width: 100%; z-index: 1000;
            transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out;
            border-bottom: 1px solid transparent;
        }
        header.scrolled {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(10px);
            border-bottom-color: var(--border-color);
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        nav.container { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: 800; color: var(--text-primary); }
        .nav-links { display: flex; align-items: center; gap: 30px; }
        .nav-links > a {
            font-weight: 600; color: var(--text-secondary); transition: color 0.2s;
            position: relative; padding-bottom: 5px;
        }
        .nav-links > a::after {
            content: ''; position: absolute; bottom: 0; left: 0;
            width: 100%; height: 2px; background-color: var(--theme-color);
            transform: scaleX(0); transform-origin: center;
            transition: transform 0.3s ease;
        }
        .nav-links > a:hover { color: var(--text-primary); }
        .nav-links > a:hover::after { transform: scaleX(1); }
        .button {
            display: inline-block; padding: 10px 24px; font-size: 0.95rem; font-weight: 600;
            border-radius: 8px; border: 2px solid transparent; cursor: pointer;
            text-align: center; transition: all 0.2s;
        }
        .button.primary { background-color: var(--theme-color); color: white; }
        .button.secondary { background: transparent; border-color: var(--theme-color); color: var(--theme-color); }
        .button:hover { transform: translateY(-3px); box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
        .nav-links .button.secondary:hover { background: var(--theme-color); color: white; }

        .home-hero {
            padding: 160px 0 120px;
            background-color: var(--background-light);
        }
        .hero-layout {
            display: grid; grid-template-columns: 1fr 1fr;
            align-items: center; gap: 80px;
        }
        .hero-content { text-align: left; }
        .hero-content h1 { font-size: clamp(3rem, 5vw, 4.2rem); }
        .hero-content p { max-width: 550px; margin: 25px 0 35px; font-size: 1.25rem; }
        .hero-actions { display: flex; gap: 15px; }
        .hero-image img { width: 100%; border-radius: 12px; box-shadow: 0 15px 50px rgba(0,0,0,0.15); }
        
        .page-section { padding: 100px 0; }
        .page-section.bg-light { background-color: var(--background-light); }
        
        .about-section {
            display: grid; grid-template-columns: 1.2fr 1fr;
            align-items: center; gap: 80px;
        }
        .about-section .feature-content { text-align: left; }
        .about-section .feature-image img {
            width: 100%; border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            object-fit: cover; aspect-ratio: 4 / 3;
        }

        .how-it-works-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            text-align: center;
        }
        .how-it-works-card {
            background: var(--background-white);
            padding: 30px;
            border-radius: 12px;
            border: 1px solid var(--border-color);
        }
        .how-it-works-card .icon-container {
            width: 50px; height: 50px; border-radius: 50%; display: flex;
            align-items: center; justify-content: center; background-color: #fee2e2;
            margin: 0 auto 20px;
        }
        .how-it-works-card .icon-container svg { color: var(--theme-color); }

        .stack-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }
        .stack-card {
            background: var(--background-white); border: 1px solid var(--border-color);
            border-radius: 16px; padding: 30px; display: flex; flex-direction: column;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .stack-card:hover { transform: translateY(-8px); box-shadow: 0 12px 35px rgba(0,0,0,0.1); }
        .stack-card .key-topics { margin: 25px 0; flex-grow: 1; }
        .stack-card .key-topics ul { list-style: none; padding: 0; }
        .stack-card .key-topics li { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; font-weight: 600; }
        .stack-card .key-topics li svg { color: #16a34a; flex-shrink: 0; }
        .stack-button {
            display: block; margin-top: auto; padding: 14px; text-align: center;
            font-weight: 700; background: var(--theme-color); color: white; border-radius: 8px;
            transition: background-color 0.2s ease;
        }
        .stack-button:hover { background-color: #c50022; }

        .social-proof { text-align: center; }
        .social-proof h4 { color: var(--text-secondary); font-weight: 600; margin-bottom: 40px; letter-spacing: 1px; text-transform: uppercase; font-size: 0.9rem; }
        .logos-container { display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 60px; }
        .logos-container img {
            height: 40px; width: auto; max-width: 150px; object-fit: contain;
            filter: grayscale(100%); opacity: 0.7; transition: all 0.3s ease;
        }
        .logos-container img:hover { filter: grayscale(0%); opacity: 1; }
        
        .testimonials-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 30px;
        }
        .testimonial-card {
            background: var(--background-white);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 30px;
            display: flex;
            flex-direction: column;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
        .testimonial-card p {
            font-style: italic;
            font-size: 1.1rem;
            flex-grow: 1;
            margin-bottom: 25px;
        }
        .testimonial-author {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-top: auto;
            padding-top: 20px;
            border-top: 1px solid var(--border-color);
        }
        .author-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
        }
        .author-info h4 {
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--text-primary);
            margin: 0;
        }
        .author-info span {
            font-size: 0.9rem;
            color: var(--text-secondary);
        }

        .cta-section {
            padding: 80px 0; text-align: center; position: relative;
            background-color: #111; color: white; overflow: hidden;
        }
        .cta-background {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background-image: url('https://scontent.fcai19-3.fna.fbcdn.net/v/t39.30808-6/481909502_604486645689236_7911567830169363156_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=TjObEbwDjIIQ7kNvwH5dr0y&_nc_oc=AdleXAj2H3z2t7tZoHoxqMaaDsJf9cTXW3X3I1tQITWffbnc7KbDtN_nN9n-sHBfRL0&_nc_zt=23&_nc_ht=scontent.fcai19-3.fna&_nc_gid=WaNqWgoIh9CIR-IJp36fZw&oh=00_AfT7uEPjkoTeqQYiE8l-eLxBP0YtSQKCVlgC6bnLLo8ohg&oe=687DBC01');
            background-size: cover; background-position: center;
            filter: brightness(0.4); z-index: 1;
        }
        .cta-content { position: relative; z-index: 2; }
        .cta-content h2 { color: white; }
        /* --- MODIFIED: Make CTA paragraph text white --- */
        .cta-content p { color: rgba(255, 255, 255, 0.9); }

        footer { background-color: var(--background-white); color: var(--text-secondary); padding-top: 80px; border-top: 1px solid var(--border-color); }
        .footer-content { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; padding-bottom: 40px; }
        .footer-column h4 { color: var(--text-primary); font-size: 1rem; font-weight: 700; margin-bottom: 16px; }
        .footer-column p, .footer-column a { color: var(--text-secondary); display: block; margin-bottom: 12px; font-weight: 600; }
        .footer-column a:hover { color: var(--theme-color); }
        .footer-bottom { padding: 30px 0; margin-top: 40px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; }
        .social-links a { margin-left: 20px; }
        .social-links svg { color: var(--text-secondary); transition: color 0.2s; }
        .social-links a:hover svg { color: var(--text-primary); }

        @media (max-width: 900px) {
            .hero-layout, .about-section { grid-template-columns: 1fr; text-align: center; }
            .hero-image { display: none; }
            .about-section .feature-image { order: -1; margin-bottom: 40px; }
        }
    `;
    return React.createElement('style', null, css);
};

// --- SVG Icons ---
const RocketIcon = () => React.createElement('svg', { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round"}, React.createElement('path', { d: "M4.5 16.5c-1.5 1.5-3 1.5-4.5 0-1.5-1.5-1.5-3 0-4.5 1.5-1.5 3-1.5 4.5 0 1.5 1.5 1.5 3 0 4.5z" }), React.createElement('path', { d: "M12.5 11.5L9 8l3-3 5.5 5.5-3 3z" }), React.createElement('path', { d: "M14.5 16.5L11 13l-1.5 1.5L13 18l1.5-1.5z" }), React.createElement('path', { d: "M2.5 14.5L6 11l-1-1L1.5 13.5z" }));
const UsersIcon = () => React.createElement('svg', { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round"}, React.createElement('path', { d: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }), React.createElement('circle', { cx: "8.5", cy: "7", r: "4" }), React.createElement('path', { d: "M20 8v6" }), React.createElement('path', { d: "M23 11h-6" }));
const BriefcaseIcon = () => React.createElement('svg', { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round"}, React.createElement('rect', { x: "2", y: "7", width: "20", height: "14", rx: "2", ry: "2" }), React.createElement('path', { d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" }));
const CheckIcon = () => React.createElement('svg', { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round"}, React.createElement('path', { d: "M20 6L9 17l-5-5" }));
const TwitterIcon = () => React.createElement('svg', { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('path', { d: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"}));
const LinkedInIcon = () => React.createElement('svg', { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('path', { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}), React.createElement('rect', { x: "2", y: "9", width: "4", height: "12"}), React.createElement('circle', { cx: "4", cy: "4", r: "2"}));
const GithubIcon = () => React.createElement('svg', { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('path', { d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"}));
const Icons = { RocketIcon, UsersIcon, BriefcaseIcon, CheckIcon, TwitterIcon, LinkedInIcon, GithubIcon };

// --- Self-Contained Components ---
const useIntersectionObserver = (options) => {
    const ref = useRef(null); const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } }, options);
        const current = ref.current; if (current) observer.observe(current);
        return () => { if (current) observer.unobserve(current); };
    }, [ref, options]);
    return [ref, isVisible];
};

const AnimatedSection = ({ children, delay = 0 }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    const style = { transitionDelay: `${delay}ms` };
    return React.createElement('div', { ref, className: `fade-in-section ${isVisible ? 'is-visible' : ''}`, style }, children);
};

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return React.createElement('header', { className: isScrolled ? 'scrolled' : '' },
        React.createElement('nav', { className: 'container' },
            React.createElement(Link, { to: '/homepage', className: 'logo' }, 'ELearning'),
            React.createElement('div', { className: 'nav-links' },
                React.createElement('a', { href: '#about' }, 'About'),
                React.createElement('a', { href: '#how' }, 'How it works'),
                React.createElement('a', { href: '#stacks' }, 'Learning Paths'),
                React.createElement('a', { href: '#say' }, 'Says'),
                React.createElement(Link, { to: '/login', className: 'button secondary' }, 'Log In')
            )
        )
    );
};

const Footer = () => React.createElement('footer', null,
    React.createElement('div', { className: 'container' },
        React.createElement('div', { className: 'footer-content' },
            React.createElement('div', { className: 'footer-column' },
                React.createElement('h4', null, 'ELearning'),
                React.createElement('p', {style: {marginBottom: 0}}, 'Empowering the next generation of developers with the skills to build the future.')
            ),
            React.createElement('div', { className: 'footer-column' },
                React.createElement('h4', null, 'Courses'),
                React.createElement('a', { href: '#' }, 'Junior Stack'),
                React.createElement('a', { href: '#' }, 'Wheeler Stack'),
                React.createElement('a', { href: '#' }, 'Senior Stack')
            ),
            React.createElement('div', { className: 'footer-column' },
                React.createElement('h4', null, 'Company'),
                React.createElement('a', { href: '#' }, 'About Us'),
                React.createElement('a', { href: '#' }, 'Careers'),
                React.createElement('a', { href: '#' }, 'Contact')
            ),
            React.createElement('div', { className: 'footer-column' },
                React.createElement('h4', null, 'Legal'),
                React.createElement('a', { href: '#' }, 'Privacy Policy'),
                React.createElement('a', { href: '#' }, 'Terms of Service')
            )
        ),
        React.createElement('div', { className: 'footer-bottom' },
            React.createElement('p', {style: {marginBottom: 0}}, `© ${new Date().getFullYear()} Sewedy Learning. All Rights Reserved.`),
            React.createElement('div', { className: 'social-links' },
                React.createElement('a', { href: '#', 'aria-label': 'Twitter' }, React.createElement(Icons.TwitterIcon)),
                React.createElement('a', { href: '#', 'aria-label': 'LinkedIn' }, React.createElement(Icons.LinkedInIcon)),
                React.createElement('a', { href: '#', 'aria-label': 'Github' }, React.createElement(Icons.GithubIcon))
            )
        )
    )
);

const StackCard = ({ title, description, topics, linkTo }) => React.createElement('div', { className: 'stack-card' },
    React.createElement('h3', null, title),
    React.createElement('p', null, description),
    React.createElement('div', { className: 'key-topics' },
        React.createElement('ul', null,
            topics.map((topic, index) => React.createElement('li', { key: index }, React.createElement(CheckIcon), topic))
        )
    ),
    React.createElement(Link, { to: linkTo, className: 'stack-button' }, 'View Path Details')
);

// --- NEW: Scroll Progress Bar Component ---
const ScrollProgressBar = ({ progress }) => {
    const style = { width: `${progress}%` };
    return React.createElement('div', { className: 'scroll-progress-bar', style: style });
};

// --- THE MAIN HOMEPAGE COMPONENT ---
const HomePage = () => {
    // --- NEW: State and Effect for Scroll Progress ---
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const currentScroll = window.scrollY;
            const progress = (currentScroll / totalScroll) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        // Cleanup function to remove the listener
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); // Empty array ensures this effect runs only once

    const homepageStacks = [
      { id: 1, title: "Junior Stack", description: "Start your journey with the foundational skills for modern web development.", topics: ['HTML & CSS', 'JS Fundamentals', 'Git & Version Control'], linkTo: "/stacks" },
      { id: 2, title: "Wheeler Stack", description: "Build practical, real-world applications with intermediate concepts.", topics: ['React Basics', 'State Management', 'API Integration'], linkTo: "/stacks/wheeler" },
      { id: 3, title: "Senior Stack", description: "Master advanced techniques and application architecture.", topics: ['Advanced Patterns', 'Optimization', 'Microservices'], linkTo: "/stacks/senior" },
    ];
    const whyUsData = [
      { icon: 'RocketIcon', title: 'Structured Learning Paths', text: 'Go from zero to hero with guided paths designed for your specific career goals.' },
      { icon: 'UsersIcon', title: 'Vibrant Community', text: 'Never learn alone. Get unstuck, get feedback, and network with peers and mentors.' },
      { icon: 'BriefcaseIcon', title: 'Real-World Projects', text: 'Build portfolio-worthy projects that mirror professional work and showcase your skills.' },
    ];
    const testimonialsData = [
        { quote: "The junior stack gave me the confidence I needed to land my first developer job. The structured path was a game-changer!", name: "Adam Waleed", role: "Front-End Developer", avatarUrl: 'https://scontent.fcai19-3.fna.fbcdn.net/v/t39.30808-6/481996322_604270095710891_236961091105268444_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=XG_4Trgi640Q7kNvwFVBk9L&_nc_oc=AdkhSI5ZkUqqyGiSV4GY-iuX0AnoNl0GI10o49w0sz3MjwDJp6uGuTdT3p5KVimKSpo&_nc_zt=23&_nc_ht=scontent.fcai19-3.fna&_nc_gid=bHgauWwT358bmZyqXbMVog&oh=00_AfTRkJuA95VnIG3kYzrWeShC4S0jQ8HI5lsJplv20GfRpw&oe=687DB58A' },
        { quote: "As a mid-level dev, the Wheeler stack on React helped me fill in crucial knowledge gaps. Highly recommended!", name: "Omar Ahmed", role: "UI&UX Engineer", avatarUrl: 'https://scontent.fcai19-3.fna.fbcdn.net/v/t39.30808-6/481995965_604270409044193_4392839983377036466_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=-miS4vhvZi4Q7kNvwEJ6Jn4&_nc_oc=AdlAdaX-G3TMpc4-Zx0vy88inZ9P7zQgXqyeoLZYYqsP5HiMcwQyWi2Jq-lUNbNjKtI&_nc_zt=23&_nc_ht=scontent.fcai19-3.fna&_nc_gid=M9y2xmJIYbL29UKmWzD5Ow&oh=00_AfRbNlAQbN6wuNKzYoqeY-cqP8vH6OKjZXgeIqAKhh1BRQ&oe=687DD056' },
        { quote: "The advanced topics in the Senior stack are top-notch. I finally understood microservices and CI/CD.", name: "Ammar Yasser", role: "Senior Developer", avatarUrl: 'https://scontent.fcai19-3.fna.fbcdn.net/v/t39.30808-6/481997619_604270152377552_2042513078586505912_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=WAu7V23fngcQ7kNvwHt0OSn&_nc_oc=Adm2eg13QNXUdrWCi_7_YdRD6RUxPhMIAReINs_lhh5nrUQfAfqhAgjHNqLV-d1RmHg&_nc_zt=23&_nc_ht=scontent.fcai19-3.fna&_nc_gid=x5ejCz5yITIhIy3Y5ek_3Q&oh=00_AfR_nOIcSOp2qz863DjQKrI-c2pNtX0JA6dDWGjP_tJcuA&oe=687DB976' },
    ];
    const trustedByLogos = [
        { name: 'Google', src: 'https://sewedy.com.eg/wp-content/uploads/2017/04/Elsewedy-EMG-logo-01-e1528629466548.png' },
        { name: 'Microsoft', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnfiyHBZ8EdvuWEKoEp-PoAHSEMDdw_21vg&s' },
        { name: 'Amazon', src: 'https://icon2.cleanpng.com/20180509/dfe/kisspng-united-states-agency-for-international-development-criminal-justice-system-5af283a1f0f4a1.056752171525842849987.jpg' },
        { name: 'Meta', src: 'https://upload.wikimedia.org/wikipedia/ar/8/81/Ministry_of_Education_%28Egypt%29_logo_%28wikiar%29.png' },
        { name: 'Netflix', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhHot2D9oFi9MT3V6k2qpW6p6nIUMIdqkV9Q&s' },
    ];

    return React.createElement(React.Fragment, null,
        React.createElement(PageStyles, null),
        // --- NEW: Render the scroll bar here ---
        React.createElement(ScrollProgressBar, { progress: scrollProgress }),
        React.createElement(Header, null),
        React.createElement('main', null,
            React.createElement('section', { className: 'home-hero' },
                React.createElement('div', { className: 'container' },
                    React.createElement(AnimatedSection, null,
                        React.createElement('div', { className: 'hero-layout' },
                            React.createElement('div', { className: 'hero-content' },
                                React.createElement('h1', null,
                                    React.createElement(TypeAnimation, {
                                        sequence: ['Sewedy Learning for Developers', 2000, 'Sewedy Learning for Juniors', 2000 , 'Sewedy Learning for Seniors', 2000],
                                        wrapper: 'span', speed: 40, cursor: true, repeat: Infinity
                                    })
                                ),
                                React.createElement('p', null, 'Your complete career path. Master foundational and advanced skills with project-based learning designed for the modern tech industry.'),
                                React.createElement('div', { className: 'home-actions' },
                                    React.createElement('a', { href: '#stacks', className: 'button primary' }, 'Explore Learning Paths')
                                )
                            ),
                            React.createElement('div', { className: 'hero-image' },
                                React.createElement('img', { src: 'https://scontent.fcai19-3.fna.fbcdn.net/v/t39.30808-6/480323819_592606953543872_8327700408082842112_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=78Y-bmOnGj0Q7kNvwEgYDbm&_nc_oc=Adl8Ny7NK96avIe28y6Z0L918iyc9P9aaX8fauQ5RtmdimNa_tNmAaR110lOXJiC79A&_nc_zt=23&_nc_ht=scontent.fcai19-3.fna&_nc_gid=20fXGG6mZ484tTll_zTR5g&oh=00_AfRGB7-oMEnpFgtLM_T3xeNCZpAHZjAV9odF1J894_jfqA&oe=687DB400', alt: 'Developer coding at a desk' })
                            )
                        )
                    )
                )
            ),
            
            React.createElement('section', { className: 'page-section' },
                React.createElement('div', { className: 'container' },
                     React.createElement('div', { className: 'social-proof' },
                        React.createElement(AnimatedSection, null,
                            React.createElement('h4', null, 'POWERING THE NEXT GENERATION OF DEVELOPERS'),
                            React.createElement('div', { className: 'logos-container' },
                                trustedByLogos.map(logo => React.createElement('img', { key: logo.name, src: logo.src, alt: logo.name }))
                            )
                        )
                    )
                )
            ),

            React.createElement('section', { id: 'about', className: 'page-section bg-light' },
                React.createElement('div', { className: 'container' },
                    React.createElement(AnimatedSection, null,
                        React.createElement('div', { className: 'about-section' },
                            React.createElement('div', { className: 'feature-image' },
                                React.createElement('img', { src: Fourthimg, alt: 'Our team collaborating' })
                            ),
                            React.createElement('div', { className: 'feature-content' },
                                React.createElement('h2', { style: { textAlign: 'left' } }, 'Designed for the Modern Workplace'),
                                React.createElement('p', null, 'Sewedy Learning was founded on a simple principle: education should be accessible, practical, and directly applicable to a real-world career. We grew tired of academic theories that didn\'t translate to the job market.'),
                                React.createElement('p', {style: {marginBottom: 0}}, null, 'Our mission is to bridge that gap. We create hands-on learning experiences that equip you with the exact skills companies are hiring for right now. We believe in learning by doing, supported by a community that wants to see you succeed.')
                            )
                        )
                    )
                )
            ),
            
            React.createElement('section', {id:'how' ,  className: 'page-section' },
                React.createElement('div', { className: 'container' },
                    React.createElement(AnimatedSection, null,
                        React.createElement('h2', null, 'How It Works'),
                        React.createElement('div', { className: 'how-it-works-container' },
                            whyUsData.map((item, index) => 
                                React.createElement('div', { key: item.title, className: 'how-it-works-card' },
                                    React.createElement('div', { className: 'icon-container' }, React.createElement(Icons[item.icon])),
                                    React.createElement('h3', null, item.title),
                                    React.createElement('p', null, item.text)
                                )
                            )
                        )
                    )
                )
            ),

            React.createElement('section', { id: 'stacks', className: 'page-section bg-light' },
                 React.createElement('div', { className: 'container' },
                    React.createElement('h2', null, 'Core Learning Paths'),
                    React.createElement('div', { className: 'stack-container' },
                        homepageStacks.map((stack, index) =>
                            React.createElement(AnimatedSection, { key: stack.id, delay: index * 100 },
                                React.createElement(StackCard, { ...stack })
                            )
                        )
                    )
                )
            ),

            React.createElement('section', {id:'say', className: 'page-section' },
                React.createElement('div', { className: 'container' },
                    React.createElement(AnimatedSection, null,
                        React.createElement('h2', null, 'What Our Students Say'),
                        React.createElement('div', { className: 'testimonials-container' },
                            testimonialsData.map((item, index) => 
                                React.createElement('div', { key: item.name, className: 'testimonial-card' },
                                    React.createElement('p', null, `"${item.quote}"`),
                                    React.createElement('div', { className: 'testimonial-author' },
                                        React.createElement('img', { className: 'author-avatar', src: item.avatarUrl, alt: item.name }),
                                        React.createElement('div', { className: 'author-info' },
                                            React.createElement('h4', null, item.name),
                                            React.createElement('span', null, item.role)
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ),

            React.createElement('section', { className: 'page-section cta-section' },
                React.createElement('div', { className: 'cta-background' }),
                React.createElement('div', { className: 'cta-content container' },
                    React.createElement(AnimatedSection, null,
                        React.createElement('h2',  null, 'Ready to Start Your Journey?'),
                        React.createElement('p', null,'Join thousands of developers who are leveling up their skills with Sewedy Learning. Your next career move starts now.'),
                        React.createElement('a', { href: '#stacks', className: 'button primary' }, 'Create Your Account')
                    )
                )
            )
        ),
        React.createElement(Footer, null)
    );
};

export default HomePage;