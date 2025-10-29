import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { RigidBody, Physics } from '@react-three/rapier'

function FloatingCube() {
    const ref = useRef()
    const dir = useRef(new THREE.Vector3())

    //now im creating a random 3D vector that rappresents the direction of the cube
    const randomVec = () =>
        new THREE.Vector3(
            (Math.random() - 0.5),
            (Math.random() - 0.5),
            (Math.random() - 0.5)
        ).normalize()


    //every frame i do some calculations
    useFrame((_, delta) => {
        const body = ref.current
        if (!body) return

        //getting current velocity
        const linvel = body.linvel()

        //getting current speed
        const speed = Math.sqrt(linvel.x ** 2 + linvel.y ** 2 + linvel.z ** 2)

        //appling a new impulse if speed is too slow or simly in a random moment
        if (speed < 0.1 || Math.random() < 0.1) {
            dir.current = randomVec().multiplyScalar(2) //random direction, with speed multiplyer
            body.applyImpulse(dir.current, true)
        }

        //applying a random torque to make the cube rotate
        const torque = randomVec().multiplyScalar(0.001)
        body.applyTorqueImpulse(torque, true)
    })

    return (
        <RigidBody
            ref={ref}
            colliders="cuboid"
            restitution={1}
            friction={0}
            linearDamping={0.2}
            angularDamping={0.2}
            position={[
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
            ]}
        >
            <mesh>
                <boxGeometry args={[2,2,2]} />
                <meshStandardMaterial color="orange" />
            </mesh>
        </RigidBody>
    )
}



export default function Experience() {
    return (
        <>
            {[...Array(10)].map((_, i) => (
                <FloatingCube key={i} />
            ))}
        </>

    )
}