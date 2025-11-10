import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import Asteroid1 from "./Models/Asteroid1.jsx";
import Asteroid2 from "./Models/Asteroid2.jsx";
import Asteroid3 from "./Models/Asteroid3.jsx";
import Asteroid4 from "./Models/Asteroid4.jsx";
import Asteroid5 from "./Models/Asteroid5.jsx";
import Asteroid6 from "./Models/Asteroid6.jsx";
import Satellite from "./Models/Satellite.jsx";

const asteroids = [<Asteroid1 />, <Asteroid2 />, <Asteroid3 />, <Asteroid4 />, <Asteroid5 />, <Asteroid6 />,
    <Asteroid1 />, <Asteroid2 />, <Asteroid3 />, <Asteroid4 />, <Asteroid5 />, <Asteroid6 />];


// 1. Pass `isMobile` prop to FloatingCube
function FloatingCube({ mouse, attractionStrength, content, isMobile }) {
    const ref = useRef()

    const randomVec = () =>
        new THREE.Vector3(
            (Math.random() - 0.5),
            (Math.random() - 0.5),
            (Math.random() - 0.5)
        ).normalize()

    // Create vectors once to reuse
    const impulse = new THREE.Vector3()
    const cubePos = new THREE.Vector3()
    const torqueImpulse = new THREE.Vector3()

    useFrame((_, delta) => {
        const body = ref.current
        if (!body) return

        const mass = body.mass()

        const posObj = body.translation()
        cubePos.set(posObj.x, posObj.y, posObj.z)

        impulse.set(0, 0, 0)

        if (!isMobile && mouse.current.active) {

            const toMouse = mouse.current.position.clone().sub(cubePos)
            toMouse.z = 0
            toMouse.normalize()
            impulse.copy(toMouse).multiplyScalar(attractionStrength)
        } else {

            if (Math.random() < 0.01) {
                impulse.copy(randomVec()).multiplyScalar(0.3) // 1. Desired acceleration 'a'
            }
        }

        impulse.multiplyScalar(delta)

        impulse.multiplyScalar(mass)

        body.applyImpulse(impulse, true)

        torqueImpulse.copy(randomVec()).multiplyScalar(0.003)
        torqueImpulse.multiplyScalar(mass)
        body.applyTorqueImpulse(torqueImpulse, true)
    })

    return (
        <RigidBody
            ref={ref}
            colliders="hull"
            restitution={1}
            friction={0}
            linearDamping={0.3}
            angularDamping={0.3}
            position={[
                (Math.random() - 0.9) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
            ]}
        >
            {content}
        </RigidBody>
    )
}

// 3. Accept `isMobile` prop
export default function Experience({ isMobile }) {
    const { size } = useThree()
    const mouse = useRef({ active: false, position: new THREE.Vector3() })
    const planeWidth = 60
    const planeHeight = 20

    useEffect(() => {
        // 4. Run this entire effect *only* if not on mobile
        if (!isMobile) {
            const handleMove = (e) => {
                mouse.current.active = true
                const x = (e.clientX / size.width) * 2 - 1
                const y = -(e.clientY / size.height) * 2 + 1
                mouse.current.position.set(
                    x * (planeWidth / 2),
                    y * (planeHeight / 2),
                    0
                )
            }

            const handleLeave = () => (mouse.current.active = false)

            window.addEventListener('mousemove', handleMove)
            window.addEventListener('mouseleave', handleLeave)
            return () => {
                window.removeEventListener('mousemove', handleMove)
                window.removeEventListener('mouseleave', handleLeave)
            }
        }
    }, [isMobile, size, planeWidth, planeHeight]); // Add isMobile to dependency array

    return (
        <>
            {/* 5. Conditionally render asteroids only if not on mobile */}
            {!isMobile && asteroids.map((asteroid, i) => (
                <FloatingCube
                    key={i}
                    mouse={mouse}
                    attractionStrength={2}
                    content={asteroid}
                    isMobile={isMobile}
                />
            ))}


            <RigidBody
                colliders="hull"
                restitution={0}
                friction={0}
                linearDamping={0.5}
                angularDamping={0.3}
            >
                <Satellite isMobile={isMobile}/>
            </RigidBody>

        </>
    )
}