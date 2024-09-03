import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/BalloonAnimation.css';

const BalloonAnimation = () => {
    const balloonContainer = useRef(null);

    useEffect(() => {
        const createBalloon = () => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.backgroundColor = getRandomColor();
            balloonContainer.current.appendChild(balloon);

            const xStart = Math.random() * window.innerWidth;
            const xEnd = Math.random() * window.innerWidth;
            const yStart = window.innerHeight;

            const animation = gsap.fromTo(balloon, {
                y: yStart,
                x: xStart,
                opacity: 0.8,
                scale: 0.9,
            }, {
                y: `-${window.innerHeight + 100}`, // Move off the screen upwards
                x: xEnd,
                duration: Math.random() * 5 + 3, // Random duration between 3 and 8 seconds
                ease: 'power1.inOut',
                onComplete: () => {
                    balloon.remove();
                    createBalloon(); // Create a new balloon once one completes
                },
            });

            gsap.to(balloon, {
                opacity: 0,
                duration: 0.3,
                scale: 1.2,
                delay: animation.duration() - 0.3, // Balloon pops before disappearing
            });
        };

        // Create an initial set of balloons
        for (let i = 0; i < 20; i++) {
            setTimeout(createBalloon, i * 300); // Stagger the initial balloons
        }

        return () => {
            gsap.globalTimeline.clear();
        };
    }, []);

    const getRandomColor = () => {
        const colors = [
            'rgba(255, 99, 71, 0.7)',   // Tomato
            'rgba(135, 206, 235, 0.7)', // Sky Blue
            'rgba(147, 112, 219, 0.7)', // Medium Purple
            'rgba(60, 179, 113, 0.7)',  // Medium Sea Green
            'rgba(255, 182, 193, 0.7)', // Light Pink
            'rgba(255, 165, 0, 0.7)',   // Orange
            'rgba(255, 223, 0, 0.7)',   // Yellow
            'rgba(173, 216, 230, 0.7)', // Light Blue
            'rgba(255, 20, 147, 0.7)',  // Deep Pink
            'rgba(0, 191, 255, 0.7)'    // Deep Sky Blue
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return <div className="balloon-container" ref={balloonContainer}></div>;
};

export default BalloonAnimation;
