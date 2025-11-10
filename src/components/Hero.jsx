import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Experience from "./Experience.jsx";
import Walls from "./Walls.jsx";
import React, {useState, useEffect, useMemo} from 'react';
import {Bloom, EffectComposer} from "@react-three/postprocessing";

// Define a mobile breakpoint
const MOBILE_BREAKPOINT = 768;

const Hero = () => {

    const [isMobile, setIsMobile] = useState(
        window.innerWidth < MOBILE_BREAKPOINT
    );

    const cameraSettings = useMemo(() => ({
        position: [0, 25, 0],
        zoom: isMobile ? 25 : 44
    }), [isMobile]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="relative w-full h-[90vh] overflow-hidden dark:bg-darkBg">

            <div className="absolute inset-0 z-0 pointer-events-none">
                <Canvas
                    orthographic={true}
                    camera={cameraSettings}
                    className="w-full h-full dark:hero-radial-gradient"
                >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={2} />
                    <directionalLight position={[-10, 10, 5]} intensity={1} />

                    <Physics gravity={[0, 0, 0]}>
                        <Walls />
                        <Experience isMobile={isMobile} />
                    </Physics>
                </Canvas>
            </div>

            <div className="relative z-10 w-full h-full flex justify-center items-center pointer-events-auto">

                <div
                    className="w-11/12 md:w-2/3 mr-0 md:mr-60 mb-0 md:mb-45 text-center md:text-left mt-56 md:mt-12 dark:text-darkTxt">

                    <h1 className="text-6xl md:text-9xl font-electrolize">Piero Glavina</h1>

                    <h3 className="text-3xl md:text-5xl font-electrolize text-gradient ">
                        Web Developer & 3D Artist
                    </h3>

                    <p className="text-lg md:text-2xl font-electrolize mt-10 md:mt-20 w-full md:w-2/3 dark:text-darkTxt">
                        I craft and design immersive digital experiences that seamlessly blend cutting-edge front-end
                        development with the creative depth of 3D graphics, bringing interactive and visually engaging
                        worlds to life on the web.
                    </p>


                </div>
            </div>

        </section>
    )
}
export default Hero