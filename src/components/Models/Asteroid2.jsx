

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import scene from "/public/models/asteroids.glb"

useGLTF.preload("/public/models/asteroids.glb");


const Asteroid2 = (props) =>  {
    const { nodes, materials } = useGLTF(scene);

    return (

        <group {...props} dispose={null} scale={2.5}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube001.geometry}
                material={materials.Material}
            />
        </group>

    )
}
export default Asteroid2;

