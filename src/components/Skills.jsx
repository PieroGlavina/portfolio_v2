import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {skillList} from "../costants/index.js";

gsap.registerPlugin(ScrollTrigger);

const SkillCard = ({title, subtitle, src, description}) => {
    return (
        <div className="group relative w-[500px] h-[300px] [perspective:1000px] lg:w-[300px] lg:h-[400px]">
            <div className="card">
                {/* LATO FRONTE */}
                <div className="card-front flex-col gap-5">
                    <p className="font-electrolize text-xl text-center lg:text-4xl">{title}</p>
                    <img src={src} alt="" className="h-20 w-20 lg:h-30 lg:w-30"/>
                    <p className="font-electrolize text-center lg:text-2xl mx-4">{subtitle}</p>

                </div>

                {/* LATO RETRO */}
                <div className="card-back flex items-center justify-center">
                    <p className="font-electrolize text-xs lg:text-2xl text-center my-4 mx-4">{description}</p>
                </div>
            </div>
        </div>

    );
}


const Skills = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useGSAP(() => {
        const section = sectionRef.current;
        const container = containerRef.current;

        const updateScroll = () => {
            const totalScrollWidth = container.scrollWidth;
            const viewportWidth = section.offsetWidth;

            // Calcolo base
            let scrollDistance = totalScrollWidth - viewportWidth;

            // 👉 Aggiungiamo offset per centrare prima e ultima card su mobile
            let startOffset = 0;
            let endOffset = 0;

            if (isMobile) {
                startOffset = viewportWidth / 2; // sposta la prima card al centro
                endOffset = viewportWidth / 2;   // centra l’ultima card
            }

            // Impostiamo posizione iniziale del container
            gsap.set(container, { x: startOffset });

            // Calcoliamo lo scroll effettivo da percorrere
            const totalDistance = scrollDistance + startOffset + endOffset;

            gsap.to(container, {
                x: -(scrollDistance + endOffset),
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${totalDistance}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });
        };

        updateScroll();

        window.addEventListener("resize", updateScroll);
        return () => window.removeEventListener("resize", updateScroll);
    }, { scope: sectionRef });


    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen overflow-hidden"
        >
            <div className="absolute top-10 z-20 text-center">
                <h1 className="section-title">
                    {"<These are my skills />"}
                </h1>

                <h3 className="section-subtitle">
                    {isMobile ? "[" : "<!-- "}
                    {"Across the year I learned and used different tools to work on different kinds of projects"}
                    {isMobile ? "]" : " -->"}
                </h3>
            </div>

            <div
                ref={containerRef}
                className="flex h-full items-center gap-10 justify-center drop-shadow-xl md:my-10"
                style={isMobile ? { width: "700vw" } : { width: "430vw" }}
            >
                {skillList.map((skill) => (
                    <SkillCard key={skill.id} title={skill.title} subtitle={skill.subtitle} src={skill.src} description={skill.description} />
                ))}

            </div>

        </section>
    );
};

export default Skills;