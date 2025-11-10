import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Experience from "./Experience.jsx";
import Walls from "./Walls.jsx";
import React, { useState, useEffect } from 'react';
import {Bloom, EffectComposer} from "@react-three/postprocessing";

// Define a mobile breakpoint
const MOBILE_BREAKPOINT = 768;

const Hero = () => {
    // 1. Add state to track if we are on mobile
    const [isMobile, setIsMobile] = useState(
        window.innerWidth < MOBILE_BREAKPOINT
    );

    // 2. Add an effect to listen for window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array means this runs once on mount

    return (
        <section className="relative w-full h-[90vh] overflow-hidden dark:bg-slate-900">

            <div className="absolute inset-0 z-0 pointer-events-none">
                <Canvas
                    orthographic={true}
                    // 3. Adjust camera zoom for mobile
                    camera={{ position: [0, 25, 0], zoom: isMobile ? 25 : 44 }}
                    className="w-full h-full"
                >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={2} />
                    <directionalLight position={[-10, 10, 5]} intensity={1} />

                    <Physics gravity={[0, 0, 0]}>
                        <Walls />
                        {/* 4. Pass isMobile prop to Experience */}
                        <Experience isMobile={isMobile} />

                    </Physics>

                </Canvas>
            </div>

            {/* 5. Add responsive classes to the HTML overlay */}
            <div className="relative z-10 w-full h-full flex justify-center items-center pointer-events-auto">
                {/* - Use `w-11/12` on mobile, `w-2/3` on desktop
                  - Remove side margin on mobile `mr-0`, add it back on desktop `md:mr-60`
                  - Center text on mobile, left-align on desktop `text-center md:text-left`
                  - Adjust bottom margin `mb-0 md:mb-45` (Note: `mb-45` is not a standard Tailwind class, you might mean mb-44 or mb-48)
                */}
                <div className="w-11/12 md:w-2/3 mr-0 md:mr-60 mb-0 md:mb-45 text-center md:text-left mt-56 md:mt-12 dark:text-slate-300">
                    {/* Adjust font sizes for mobile */}
                    <h1 className="text-6xl md:text-9xl font-electrolize">Piero Glavina</h1>
                    <h3 className="text-3xl md:text-5xl font-electrolize text-orange-500 dark:text-orange-600">Web Developer & 3D Artist</h3>
                    {/* Adjust paragraph width, margin-top, and font size */}
                    <p className="text-lg md:text-2xl font-electrolize mt-10 md:mt-20 w-full md:w-2/3">
                        I craft and design immersive digital experiences that seamlessly blend cutting-edge front-end development with the creative depth of 3D graphics, bringing interactive and visually engaging worlds to life on the web.
                    </p>
                </div>
            </div>

        </section>
    )
}
export default Hero