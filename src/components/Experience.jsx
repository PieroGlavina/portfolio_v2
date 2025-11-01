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


// This function should be *inside* Experience.jsx or imported
function FloatingCube({ mouse, attractionStrength, content }) {
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
    const torqueImpulse = new THREE.Vector3() // Renamed from 'torque'

    useFrame((_, delta) => {
        const body = ref.current
        if (!body) return

        // === THE KEY FIX ===
        // Get the mass of the rigid body
        const mass = body.mass()
        // ===================

        // Get the cube's current position
        const posObj = body.translation()
        cubePos.set(posObj.x, posObj.y, posObj.z)

        // --- Linear Impulse ---
        impulse.set(0, 0, 0)
        if (mouse.current.active) {
            // 1. Calculate direction (as desired acceleration 'a')
            const toMouse = mouse.current.position.clone().sub(cubePos)
            toMouse.z = 0
            toMouse.normalize()
            impulse.copy(toMouse).multiplyScalar(attractionStrength)
        } else {
            // Random float logic
            if (Math.random() < 0.01) {
                impulse.copy(randomVec()).multiplyScalar(0.3) // 1. Desired acceleration 'a'
            }
        }

        // 2. Scale 'a' by time to get desired velocity change (Δv = a * Δt)
        impulse.multiplyScalar(delta)

        // 3. Scale 'Δv' by mass to get required impulse (J = Δv * m)
        impulse.multiplyScalar(mass)

        // Apply the mass-compensated impulse
        body.applyImpulse(impulse, true)

        // --- Angular Impulse (Torque) ---
        // We do the same for torque, using mass as a proxy for inertia

        // 1. Get desired angular velocity change (Δω)
        torqueImpulse.copy(randomVec()).multiplyScalar(0.003)

        // 2. Scale 'Δω' by mass to get required torque impulse (J_τ = Δω * I)
        // (Using mass as a simple proxy for Inertia 'I')
        torqueImpulse.multiplyScalar(mass)

        // Apply the mass-compensated torque impulse
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

export default function Experience() {
    const { size } = useThree()
    const mouse = useRef({ active: false, position: new THREE.Vector3() })
    const planeWidth = 60
    const planeHeight = 20

    useEffect(() => {
        const handleMove = (e) => {
            mouse.current.active = true // <-- Always active on move
            const x = (e.clientX / size.width) * 2 - 1
            const y = -(e.clientY / size.height) * 2 + 1
            mouse.current.position.set(
                x * (planeWidth / 2),
                y * (planeHeight / 2),
                0
            )
        }

        // This is the only time we set active to false
        const handleLeave = () => (mouse.current.active = false)

        window.addEventListener('mousemove', handleMove)
        window.addEventListener('mouseleave', handleLeave)
        return () => {
            window.removeEventListener('mousemove', handleMove)
            window.removeEventListener('mouseleave', handleLeave)
        }
    }, [size, planeWidth, planeHeight])

    return (
        <>

            {asteroids.map((asteroid, i) => (
                <FloatingCube key={i} mouse={mouse} attractionStrength={2} content={asteroid} />
            ))}


            <RigidBody
                colliders="hull"
                restitution={0}
                friction={0}
                linearDamping={0.5}
                angularDamping={0.3}

            >
                <Satellite />
            </RigidBody>
        </>
    )
}