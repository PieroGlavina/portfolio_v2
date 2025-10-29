
import React, {useEffect, useRef} from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import scene from "/public/models/RadioStation.glb"
import * as THREE from "three";


const RadioStation = ({ ...props }) =>  {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF(scene)
    const { actions } = useAnimations(animations, group)


    useEffect(() => {
        const action = actions["Spinning"];
        action.setLoop(THREE.LoopRepeat, Infinity); // loop infinito
        action.timeScale = 2; // velocità (2 = doppia)
        action.clampWhenFinished = false; // non bloccare alla fine
        action.reset().play(); // parte subito
    }, [actions]);


    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">

                <mesh
                    name="Plane005"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane005.geometry}
                    material={materials['Material.005']}
                >
                    <mesh
                        name="Plane"
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane.geometry}
                        material={materials['Material.001']}
                    />
                    <mesh
                        name="Plane001"
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane001.geometry}
                        material={materials['Material.004']}
                    />
                    <mesh
                        name="Plane002"
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane002.geometry}
                        material={materials['Material.003']}>
                        <mesh
                            name="Circle002"
                            castShadow
                            receiveShadow
                            geometry={nodes.Circle002.geometry}
                            material={materials['Material.004']}
                            position={[0, 2.837, 0]}>
                            <mesh
                                name="Plane006"
                                castShadow
                                receiveShadow
                                geometry={nodes.Plane006.geometry}
                                material={materials['Material.002']}
                                position={[0, 0.355, 0]}
                                rotation={[0, 1.231, 0]}
                                scale={[0.544, 0.988, 0.988]}>
                                <mesh
                                    name="Plane007"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Plane007.geometry}
                                    material={materials['Material.002']}
                                    position={[0, 0.199, 0.724]}
                                    rotation={[0.68, 0, 0]}>
                                    <mesh
                                        name="Circle"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Circle.geometry}
                                        material={materials['Material.002']}
                                        position={[0, 0.199, -1.448]}
                                        scale={[1.817, 1, 1]}>
                                        <mesh
                                            name="Circle001"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.Circle001.geometry}
                                            material={materials['Material.004']}
                                        />
                                        <mesh
                                            name="Sphere"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.Sphere.geometry}
                                            material={materials['Material.004']}
                                            position={[0, 2.168, 0]}
                                            scale={0.12}
                                        />
                                    </mesh>
                                </mesh>
                            </mesh>
                        </mesh>
                    </mesh>
                    <mesh
                        name="Plane003"
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane003.geometry}
                        material={materials['Material.007']}
                        position={[0, 0, -1.899]}
                    />
                    <mesh
                        name="Plane004"
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane004.geometry}
                        material={materials['Material.003']}
                        position={[0, 0, -1.588]}
                    />
                </mesh>
                <mesh
                    name="Plane009"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane009.geometry}
                    material={materials['Material.002']}
                    position={[0.895, 0.001, 2.407]}
                />
                <mesh
                    name="Plane011"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane011.geometry}
                    material={materials['Material.002']}
                    position={[0.895, 0.001, 2.407]}
                />
                <mesh
                    name="Plane012"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane012.geometry}
                    material={materials['Material.002']}
                    position={[0.895, 0.001, 2.407]}
                />
                <mesh
                    name="Plane008"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane008.geometry}
                    material={materials['Material.002']}
                    position={[2.242, 0.001, 0.799]}
                    rotation={[0, Math.PI / 2, 0]}
                />
                <mesh
                    name="Plane010"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane010.geometry}
                    material={materials['Material.002']}
                    position={[2.242, 0.001, 0.799]}
                    rotation={[0, Math.PI / 2, 0]}
                />
                <mesh
                    name="Plane013"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane013.geometry}
                    material={materials['Material.002']}
                    position={[2.242, 0.001, 0.799]}
                    rotation={[0, Math.PI / 2, 0]}
                />
            </group>
        </group>
    )
}

export default RadioStation;