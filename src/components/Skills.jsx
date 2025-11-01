import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const skills = [
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
    small: 'col-span-1 row-span-1',       // 200x200
    horizontal: 'col-span-2 row-span-1', // 400x200
    vertical: 'col-span-1 row-span-2',     // 200x400
    big: 'col-span-2 row-span-2',        // 400x400
};


export default function Skills() {

    const [isMobile, setIsMobile] = useState(false);

    // Refs for GSAP
    const pinningContainerRef = useRef(null);
    const titleContainerRef = useRef(null);
    const scrollWrapperRef = useRef(null);
    const gridContainerRef = useRef(null);

    // 5. isMobile state logic
    useLayoutEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // 6. GSAP Horizontal Scroll Animation
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

        // 2. Calculate Start X (to center the first box)
        // (Half Viewport) - (Half First Box)
        const startX = (viewportWidth / 2) - (firstBoxWidth / 2);

        // 3. Calculate End X (to center the last box)
        // -(Total Grid Width - Half Viewport - Half Last Box)
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
            end: "+=2000", //"2 pages" -> scroll 2000px past the start
            scrub: 1,                  // Smooth scrubbing (1s "lag")
            invalidateOnRefresh: true, // Recalculate all values on window resize
        });

        // 7. Cleanup function
        return () => {
            st.kill();  // Kill the ScrollTrigger
            tl.kill();  // Kill the Timeline
        };
    }, [isMobile]);

    return (

        <section ref={pinningContainerRef} className="w-full relative h-screen overflow-hidden">

            <div
                ref={titleContainerRef}
                className="absolute top-10 md:top-20 left-0 right-0 z-20 w-full px-4"
            >
                <h1 className="section-title">
                    {"<Discover my work />"}
                </h1>

                <h3 className="section-subtitle">
                    {isMobile ? "[" : "<!-- "}
                    {"Across the year I learned and used different tools to work on different kinds of projects"}
                    {isMobile ? "]" : " -->"}
                </h3>
            </div>


            <div ref={scrollWrapperRef} className="w-full h-full overflow-hidden flex items-center">

                <div
                    ref={gridContainerRef}
                    className="grid grid-flow-col grid-rows-[repeat(2,200px)] auto-cols-[200px] gap-4 w-max px-4"
                >
                    {skills.map(skill => (

                        <div
                            key={skill.id}
                            className={`rounded-2xl p-4 text-black font-bold drop-shadow-xl
                            ${skill.size === "horizontal" ? "flex items-center" : "flex flex-col items-center"}
                            ${sizeClasses[skill.size]} 
                            ${skill.style}`}
                        >
                            <h3 className="text-xl">{skill.title}</h3>
                            <img src={skill.img} alt={skill.title} className="w-[70%] h-[70%] object-contain"/>
                        </div>
                    ))}


                </div>
            </div>



        </section>
    );
}

