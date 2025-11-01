

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import scene from "/public/models/asteroids.glb"

useGLTF.preload("/public/models/asteroids.glb");


const Asteroid6= (props) =>  {
    const { nodes, materials } = useGLTF(scene);

    return (
        <group {...props} dispose={null} scale={0.8}>

            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube005.geometry}
                material={materials.Material}
            />
        </group>
    )
}
export default Asteroid6;

