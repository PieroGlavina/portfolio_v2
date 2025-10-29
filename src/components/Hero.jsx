import React, {Suspense, useRef} from 'react'
import {Canvas, useFrame} from "@react-three/fiber";
import {Physics, RigidBody} from "@react-three/rapier";
import {Box, OrbitControls} from "@react-three/drei";
import {navList} from "../costants/index.js";
import * as THREE from "three";
import Experience from "./Experience.jsx";
import Walls from "./Walls.jsx";


const Hero = () => {
    return (
        <section className="w-full h-screen bg-blue-200">

            <Canvas  camera={{ position: [0, 25, 0], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />

                <Physics gravity={[0, 0, 0]}>

                    <Walls />

                    <Experience />


                </Physics>

                <OrbitControls />

            </Canvas>


        </section>
    )
}
export default Hero
