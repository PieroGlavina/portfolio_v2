import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import scene from "/public/models/asteroids.glb"
useGLTF.preload("/public/models/asteroids.glb");


const Asteroid1 = (props) =>  {
    const { nodes, materials } = useGLTF(scene);

    return (
        <group {...props} dispose={null} scale={2}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={materials.Material}
            />
        </group>

    )
}
export default Asteroid1;

