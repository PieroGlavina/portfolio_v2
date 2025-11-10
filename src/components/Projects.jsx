import React, { useState, useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { projectList } from "../costants/index.js";
// We no longer need useMediaQuery for this layout
// import {useMediaQuery} from "react-responsive";

const Projects = () => {
    // This state will track which project is "popped up"
    // null = grid view, a project object = modal view
    const [selectedProject, setSelectedProject] = useState(null);

    // Refs for GSAP to target the modal elements
    const modalRef = useRef(null);
    const modalContentRef = useRef(null);

    // --- GSAP ANIMATION ---
    // This hook will run whenever selectedProject changes
    useGSAP(() => {
        if (selectedProject) {
            // Animate IN
            gsap.to(modalRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.inOut"
            });
            gsap.fromTo(modalContentRef.current,
                { opacity: 0, scale: 0.8, y: 100 },
                { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
        }
        // Note: The "out" animation is handled in the closeModal function
        // to ensure it completes before the state is set to null.
    }, [selectedProject]);

    // --- MODAL HANDLERS ---
    const openModal = (project) => {
        setSelectedProject(project);
    };

    const closeModal = () => {
        // Animate OUT
        gsap.to(modalContentRef.current, {
            opacity: 0,
            scale: 0.8,
            y: 100,
            duration: 0.3,
            ease: "power2.in"
        });

        gsap.to(modalRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            // After the animation is complete, set the state to null
            onComplete: () => {
                setSelectedProject(null);
            }
        });
    };

    // This prevents clicks inside the modal from closing it
    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        // Set a min-height instead of h-screen to allow the grid to grow
        <section id="projects" className="w-full min-h-screen relative py-20">

            <div className="w-full px-4 mb-10">
                <h1 className="section-title">
                    {"<My projects and work />"}
                </h1>
                <h3 className="section-subtitle">
                    {""}
                </h3>
            </div>

            {/* --- BENTO GRID --- */}
            <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {projectList.map((project) => (
                    <div
                        key={project.id}
                        className="rounded-lg overflow-hidden cursor-pointer aspect-video relative group"
                        onClick={() => openModal(project)}
                    >
                        {/* Video Preview: Muted, looping, no controls */}
                        <video
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            src={project.url}
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        {/* Overlay to show title on hover */}
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="text-white text-2xl font-electrolize">{project.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- MODAL / POPUP --- */}
            {/* This section is only rendered if a project is selected,
              but GSAP will animate its opacity from 0 to 1.
            */}
            {selectedProject && (
                <div
                    id="modal-backdrop"
                    ref={modalRef}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 opacity-0"
                    onClick={closeModal} // Click background to close
                >
                    <div
                        id="modal-content"
                        ref={modalContentRef}
                        className="bg-[#1a1a1a] w-11/12 lg:w-3/4 max-w-4xl rounded-lg overflow-hidden relative opacity-0"
                        onClick={handleModalContentClick} // Prevent click-through
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-3 text-white text-4xl z-10"
                        >
                            &times;
                        </button>

                        {/* Video with controls */}
                        <video
                            id="video"
                            key={selectedProject.id} // Ensures video re-renders on change
                            className="w-full"
                            autoPlay
                            controls // Show controls in the modal
                        >
                            <source src={selectedProject.url} type="video/mp4" />
                        </video>

                        {/* Details */}
                        <div id="description" className="flex flex-col p-6">
                            <h1 className="text-3xl lg:text-5xl font-electrolize">{selectedProject.title}</h1>
                            <p className="text-lg font-electrolize text-gray-400 mt-2">{selectedProject.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Projects;