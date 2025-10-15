import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useGSAP(() => {
        const section = sectionRef.current;
        const container = containerRef.current;

        const totalScrollWidth = container.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDistance = totalScrollWidth - viewportWidth;

        gsap.to(container, {
            x: -scrollDistance,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${scrollDistance}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen overflow-hidden"
        >
            {/* ---- HEADER FISSO ---- */}
            <div className="absolute top-10 z-20 text-center">
                <h1 className="font-electrolize text-3xl lg:text-5xl text-center max-w-2xl">
                    {"<These are my skills />"}
                </h1>

                <h3 className="font-electrolize text-xl lg:text-3xl text-center text-gray-400 mx-1 p-3 lg:ml-28">
                    {isMobile ? "[" : "<!-- "}
                    {"Across the year I learned and used different tools to work on different kinds of projects"}
                    {isMobile ? "]" : " -->"}
                </h3>
            </div>

            {/* ---- CONTENITORE ORIZZONTALE ---- */}
            <div
                ref={containerRef}
                className="flex h-full items-center gap-10 justify-center drop-shadow-xl md:my-10"
                style={{ width: "200vw" }}
            >
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="px-24 py-40 bg-gray-200 rounded-2xl border-2 text-black"
                    >
                        <p>SKILL {i + 1}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;