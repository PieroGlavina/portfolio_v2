import React from 'react'
import {RigidBody} from "@react-three/rapier";

const Walls = () => {

    const wallMat = <meshStandardMaterial color="white" wireframe opacity={0.1} transparent />
    const width = 30;
    const height = 30;
    const depth = 30;

    const size = 20;

    return (
        <>

            <RigidBody type="fixed" restitution={1}>
                {/* DESTRA */}
                <mesh position={[30 / 2, 0, 0]}>
                    <boxGeometry args={[0.1, size, size]} />
                    {wallMat}
                </mesh>
            </RigidBody>


            <RigidBody type="fixed" restitution={1}>
                {/* SINISTRA */}
                <mesh position={[-30 / 2, 0, 0]}>
                    <boxGeometry args={[0.1, size, size]} />
                    {wallMat}
                </mesh>
            </RigidBody>

            <RigidBody type="fixed" restitution={1}>
                {/* DAVANTI */}
                <mesh position={[0, size / 2, 0]}>
                    <boxGeometry args={[60, 0.1, 20]} />
                    {wallMat}
                </mesh>
            </RigidBody>

            <RigidBody type="fixed" restitution={1}>
                {/* DIETRO */}
                <mesh position={[0, -size / 2, 0]}>
                    <boxGeometry args={[60, 0.1, 20]} />
                    {wallMat}

                </mesh>
            </RigidBody>


            <RigidBody type="fixed" restitution={1}>
                {/* SOPRA */}
                <mesh position={[0, 0, -size / 2]}>
                    <boxGeometry args={[60, 20, 0.1]} />
                    {wallMat}
                </mesh>
            </RigidBody>


            <RigidBody type="fixed" restitution={1}>
                {/* SOTTO */}
                <mesh position={[0, 0, size / 2]}>
                    <boxGeometry args={[60, 20, 0.1]} />
                    {wallMat}
                </mesh>
            </RigidBody>
        </>
    )
}
export default Walls
