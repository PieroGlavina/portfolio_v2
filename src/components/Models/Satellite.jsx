import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import scene from "/public/models/satellite.glb"
import {useFrame} from "@react-three/fiber";
useGLTF.preload("/public/models/satellite.glb");

const Satellite = ({isMobile, ...props}) =>  {
    const { nodes, materials } = useGLTF(scene)

    const satelliteRef = useRef()

    // Rotazione costante nel tempo
    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime()
        if (satelliteRef.current) {
            // rotazione ondulatoria con sinusoidi
            satelliteRef.current.rotation.x = Math.sin(t * 0.7) * 0.03 - 1
            satelliteRef.current.rotation.y = Math.sin(t * 1.1) * 0.04 - 1
            satelliteRef.current.rotation.z = Math.cos(t * 0.5) * 0.02 -0.4
        }
    })



    return (
        <group {...props} dispose={null} position={isMobile ? [0,0,-5] : [10,0,0]} scale={2.5} rotation={[-1,-1,-0.4]} ref={satelliteRef}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder_1.geometry}
                material={materials['Material.005']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder_2.geometry}
                material={materials['Material.001']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube001.geometry}
                material={materials.Material}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder001.geometry}
                material={materials['Material.002']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder002.geometry}
                material={materials['Material.001']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder003.geometry}
                material={materials['Material.001']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sphere.geometry}
                material={materials['Material.002']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sphere001.geometry}
                material={materials['Material.001']}
            />
        </group>
    )
}

export default Satellite;