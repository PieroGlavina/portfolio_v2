import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const skills = [
    // ... (your skills array remains unchanged)
    { id: 0, title: "Blender", subtitle: "3D", size: "big", style: "border-4 border-orange-400", img: "/images/blender.svg" },
    { id: 1, title: "Solar2D (SDK)", subtitle: "Game Development", size: "small", style: "bg-gray-50", img: "/images/solar2d.svg" },
    { id: 2, title: "CSS", subtitle: "Styling", size: "small", style: "bg-gray-50", img: "/images/css.svg" },
    { id: 3, title: "DaVinci Resolve", subtitle: "Video Editing", size: "horizontal", style: "border-4 border-blue-800", img: "/images/resolve.png" },
    { id: 4, title: "Figma", subtitle: "UI/UX Design", size: "small", style: "bg-gray-50", img: "/images/figma.svg" },
    { id: 5, title: "GitHub", subtitle: "Version Control", size: "small", style: "bg-gray-50", img: "/images/github.svg" },
    { id: 6, title: "GSAP", subtitle: "Animation", size: "vertical", style: "bg-gray-50", img: "/images/gsap.svg" },
    { id: 7, title: "HTML", subtitle: "Markup", size: "small", style: "bg-gray-50", img: "/images/html.svg" },
    { id: 8, title: "Java", subtitle: "Programming", size: "horizontal", style: "bg-gray-50", img: "/images/java.svg" },
    { id: 9, title: "JavaScript", subtitle: "Frontend", size: "horizontal", style: "border-4 border-orange-200", img: "/images/javascript.svg" },
    { id: 10, title: "p5.js", subtitle: "Creative Coding", size: "small", style: "bg-gray-50", img: "/images/p5js.svg" },
    { id: 11, title: "PHP", subtitle: "Backend", size: "small", style: "bg-gray-50", img: "/images/php.svg" },
    { id: 12, title: "Python", subtitle: "Scripting", size: "small", style: "bg-gray-50", img: "/images/python.svg" },
    { id: 13, title: "React", subtitle: "Frontend Framework", size: "big", style: "border-4 border-sky-500", img: "/images/react.svg" },
    { id: 14, title: "TailwindCSS", subtitle: "UI Framework", size: "small", style: "border-4 border-sky-400", img: "/images/tailwind.svg" },
    { id: 15, title: "Three.js", subtitle: "3D Web", size: "small", style: "border-4 border-neutral-700", img: "/images/threejs.svg" },
    { id: 16, title: "Vite", subtitle: "Build Tool", size: "horizontal", style: "border-4 border-violet-400", img: "/images/vite.svg" },
    { id: 17, title: "Visual Studio Code", subtitle: "Editor", size: "small", style: "bg-gray-50", img: "/images/vscode.svg" },
    { id: 18, title: "WebStorm", subtitle: "IDE", size: "small", style: "bg-gray-50", img: "/images/webstorm.svg" }
];

const sizeClasses = {
    small: 'col-span-1 row-span-1',       // 200x200 or 150x150
    horizontal: 'col-span-2 row-span-1', // 400x200 or 300x150
    vertical: 'col-span-1 row-span-2',     // 200x400 or 150x300
    big: 'col-span-2 row-span-2',        // 400x400 or 300x300
};


export default function Skills() {

    const [isMobile, setIsMobile] = useState(false);

    // Refs for GSAP
    const pinningContainerRef = useRef(null);
    const titleContainerRef = useRef(null);
    const scrollWrapperRef = useRef(null);
    const gridContainerRef = useRef(null);

    // isMobile state logic (unchanged)
    useLayoutEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // 6. GSAP Horizontal Scroll Animation (UPDATED)
    useLayoutEffect(() => {
        // Get refs to all elements
        const pinningContainer = pinningContainerRef.current;
        const titleContainer = titleContainerRef.current;
        const wrapper = scrollWrapperRef.current;
        const grid = gridContainerRef.current;

        // 1. Get widths
        const viewportWidth = wrapper.offsetWidth;
        const gridWidth = grid.scrollWidth; // Use scrollWidth for w-max
        const firstBoxWidth = grid.firstElementChild.offsetWidth;
        const lastBoxWidth = grid.lastElementChild.offsetWidth;

        // 2. Calculate Start X
        const startX = (viewportWidth / 2) - (firstBoxWidth / 2);

        // 3. Calculate End X
        const endX = -(gridWidth - (viewportWidth / 2) - (lastBoxWidth / 2));

        // 4. Set the initial position of the grid
        gsap.set(grid, { x: startX });

        // 5. Create the animation timeline
        const tl = gsap.timeline();

        // Add the grid horizontal scroll animation
        tl.to(grid, {
            x: endX,
            ease: 'none', // Linear movement
        })

        // 6. Create the main ScrollTrigger
        const st = ScrollTrigger.create({
            animation: tl, // Link the timeline to the ScrollTrigger
            trigger: pinningContainer, // The element that triggers the pin
            pin: true,                 // Pin the trigger element
            start: "top top",          // Start when the top of the trigger hits the top of the viewport
            end: "+=2000",
            scrub: 1,                  // Smooth scrubbing (1s "lag")
            invalidateOnRefresh: true, // Recalculate all values on window resize
        });

        const boxes = gsap.utils.toArray(grid.children);

        boxes.forEach((box) => {
            // Set initial state for all boxes on mobile
            gsap.set(box, { opacity: 0, y: 100 });

            // Create a timeline for *this* box's animation
            const boxAnimation = gsap.timeline().to(box, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
            });

            // Create a ScrollTrigger for *this* box
            ScrollTrigger.create({
                animation: boxAnimation,
                trigger: box,
                // This is the key: link this trigger to the main timeline's progress
                containerAnimation: tl,
                // We are scrolling horizontally
                horizontal: true,
                // Start when the left edge of the box hits the 66% mark of the viewport
                start: "left 66%",

            });
        });


        // 8. UPDATED Cleanup function
        return () => {
            // Kill *all* ScrollTriggers and timelines created in this effect
            ScrollTrigger.getAll().forEach(t => t.kill());
            tl.kill();
        };
    }, [isMobile]); // Re-run this entire effect when isMobile changes

    return (

        <section id="skills" ref={pinningContainerRef} className="w-full relative h-screen overflow-hidden dark:bg-slate-900">

            <div
                ref={titleContainerRef}
                className="absolute top-10 md:top-20 left-0 right-0 z-20 w-full px-4"
            >
                <h1 className="section-title dark:text-gray-200">
                    {"<These are my skills />"}
                </h1>

                <h3 className="section-subtitle text-center">
                    {isMobile ? "[" : "<!-- "}
                    {"During my studies I learned different tools and technologies that allowed me to create stuff"}
                    {isMobile ? "]" : " -->"}
                </h3>
            </div>


            <div ref={scrollWrapperRef} className="w-full h-full overflow-hidden flex items-center">

                <div
                    ref={gridContainerRef}
                    // 1. UPDATED: Make grid/row sizes responsive
                    className={`grid grid-flow-col w-max px-4 
                        ${isMobile
                        ? 'grid-rows-[repeat(2,150px)] auto-cols-[150px] gap-3'
                        : 'grid-rows-[repeat(2,200px)] auto-cols-[200px] gap-4'
                    }
                    `}
                >
                    {skills.map(skill => (

                        <div
                            key={skill.id}
                            className={`rounded-2xl p-4 text-black font-bold drop-shadow-xl dark:bg-slate-600
                            ${skill.size === "horizontal" ? "flex items-center" : "flex flex-col items-center"}
                            ${sizeClasses[skill.size]} 
                            ${skill.style}`}
                        >
                            {/* 2. UPDATED: Make text and image smaller on mobile */}
                            <h3 className="text-lg md:text-xl dark:text-gray-200">{skill.title}</h3>
                            <img src={skill.img} alt={skill.title} className="w-[60%] md:w-[70%] h-[60%] md:h-[70%] object-contain"/>
                        </div>
                    ))}


                </div>
            </div>



        </section>
    );
}