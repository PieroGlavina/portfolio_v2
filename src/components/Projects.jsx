import React, {useState} from 'react'
import {useGSAP} from "@gsap/react";
import gsap from 'gsap';
import {projectList} from "../costants/index.js";
import {useMediaQuery} from "react-responsive";

const Projects = () => {

    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });



    const [currentIndex, setCurrentIndex] = useState(0);
    const totalProjects = projectList.length;

    const goToSlide = (index) => {
        const newIndex = (index + totalProjects) % totalProjects;
        setCurrentIndex(newIndex);
    };

    const getProjectAt = (indexOffset) => {
        return projectList[(currentIndex + indexOffset + totalProjects) % totalProjects];
    };

    const project = getProjectAt(0);

    useGSAP(() => {
        gsap.fromTo("#video", {opacity: 0, scale: 0.5}, {opacity: 1, scale: 1, duration: 1, ease: "power2.inOut"});
        gsap.fromTo("#description", {opacity: 0, y: 50}, {opacity: 1, y: 0, duration: 1, ease: "power2.inOut"});

    }, [currentIndex]);

    return (
        <section id="projects" className="w-full h-screen relative">

            <div
                className=" top-10 md:top-20 left-0 right-0 z-20 w-full px-4"
            >
                <h1 className="section-title">
                    {"<My projects and work />"}
                </h1>

                <h3 className="section-subtitle">
                    {isMobile ? "[" : "<!-- "}
                    {"Across the years to practice I did different projects and experiments"}
                    {isMobile ? "]" : " -->"}
                </h3>
            </div>

            <div className="flex flex-col items-center">
                <video id="video" key={project.id} className="w-[100%] lg:w-[60%]" autoPlay>
                    <source src={project.url} type="video/mp4"/>
                </video>


                <div className="w-[90%] lg:w-[60%]">
                    <div id="description" className="flex flex-col items-center mt-5">
                        <h1 className="text-3xl lg:text-5xl font-electrolize">{project.title}</h1>
                        <h1 className="text-xl font-electrolize text-gray-400 text-center">{project.description}</h1>
                    </div>

                    <div className="flex justify-between p-5">
                        <div onClick={() => goToSlide(currentIndex - 1)} className="nav-button">
                            <h3>0{currentIndex}</h3>
                            <p>//prev</p>
                        </div>

                        <div onClick={() => goToSlide(currentIndex + 1)} className="nav-button">
                            <h3>0{currentIndex + 1}</h3>
                            <p>//next</p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
export default Projects
