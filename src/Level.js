import { useFrame } from '@react-three/fiber';
import React, { useMemo } from 'react'
import { useRef } from 'react';
import * as THREE from 'three';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useState } from 'react';
import { Float, Text, useGLTF } from '@react-three/drei';

THREE.ColorManagement.legacyMode = false;

const ballGeometry = new THREE.SphereGeometry;
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const spinnerTrapGeometry = new THREE.BoxGeometry(3.5, 0.3, 0.3);

const f1Material = new THREE.MeshStandardMaterial({ color: "#111111", metalness: 0, roughness: 0 })
const f2Material = new THREE.MeshStandardMaterial({ color: "#222222", metalness: 0, roughness: 0 })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "#ff0000", metalness: 0, roughness: 5 })
const wallMaterial = new THREE.MeshStandardMaterial({ color: "#887777", metalness: 0, roughness: 0 })

// const Spear = ({ position, scale }) => {
//     return (
//         <mesh
//             receiveShadow
//             castShadow
//             material={obstacleMaterial}
//             geometry={ballGeometry}
//             scale={scale}
//             position={position}
//         />
//     )
// }
// const SpinnerTrap = ({ position }) => {
// const obstacle = useRef();
// useFrame((state, delta) => {
//     obstacle.current.rotation.y += -(delta * 2);
// })

//     return (
// <RigidBody
//     type='kinematicPosition'
//     position={[0,0.3,0]}
//     restitution={0.2}
//     friction={0}
// >
//             {/* <group position={position} ref={obstacle}> */}
//             {/* <Spear position={[1.5, -0.1, 0]} scale={0.4} /> */}
// <mesh
//     ref={obstacle}
//     geometry={spinnerTrapGeometry}
//     receiveShadow
//     material={obstacleMaterial}
// />
//             {/* <Spear position={[-1.5, -0.1, 0]} scale={0.4} /> */}
//             {/* </group> */}
//         </RigidBody>

//     )
// }

export const BlockStart = ({ position = [0, 0, 0] }) => {
    return (
        <group position={position}>
            <Float floatIntensity={0.25} rotationIntensity={0.25} >
                <Text
                    scale={0.4}
                    maxWidth={0.25}
                    lineHeight={0.75}
                    textAlign='right'
                    position={[0.75, 0.65, 0]}
                    rotation-y={-0.25}
                >
                    Marbel Race
                    <meshBasicMaterial toneMapped={false} />
                </Text>
            </Float>
            <mesh
                geometry={boxGeometry}
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
                material={f1Material}
            />
        </group>
    )
}

export const BlockSpinner = ({ position = [0, 0, 0] }) => {
    const [speed] = useState(() => (Math.random() + 0.5) * (Math.random() < 0.5 ? -1 : 1));
    const obstacle = useRef();
    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
        obstacle.current.setNextKinematicRotation(rotation)
    })
    return (
        <group position={position}>
            <mesh
                geometry={boxGeometry}
                material={f2Material}
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
            />
            <RigidBody
                ref={obstacle}
                type='kinematicPosition'
                position={[0, 0.3, 0]}
                restitution={0.2}
                friction={0}
            >
                <mesh
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    scale={[3.5, 0.3, 0.3]}
                    receiveShadow
                    castShadow
                />
            </RigidBody>
        </group>
    )
}

export const BlockLimbo = ({ position = [0, 0, 0] }) => {
    const [offset] = useState(() => (Math.random() * Math.PI * 2))
    const obstacle = useRef();
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const y = Math.sin(time + offset) + 1.15;
        obstacle.current.setNextKinematicTranslation({ x: position[0], y: position[1] + y, z: position[2] })
    })
    return (
        <group position={position}>
            <mesh
                geometry={boxGeometry}
                material={f2Material}
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
            />
            <RigidBody
                ref={obstacle}
                type='kinematicPosition'
                position={[0, 0.3, 0]}
                restitution={0.2}
                friction={0}
            >
                <mesh
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    scale={[3.5, 0.3, 0.3]}
                    receiveShadow
                    castShadow
                />
            </RigidBody>
        </group>
    )
}

export const BlockAxe = ({ position = [0, 0, 0] }) => {
    const [offset] = useState(() => (Math.random() * Math.PI * 2))
    const obstacle = useRef();
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const x = Math.sin(time + offset) * 1.25;
        obstacle.current.setNextKinematicTranslation({ x: position[0] + x, y: position[1] + 1, z: position[2] })
    })
    return (
        <group position={position}>
            <mesh
                geometry={boxGeometry}
                material={f2Material}
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
            />
            <RigidBody
                ref={obstacle}
                type='kinematicPosition'
                position={[0, 0.3, 0]}
                restitution={0.2}
                friction={0}
            >
                <mesh
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    scale={[1.5, 1.5, 0.3]}
                    receiveShadow
                    castShadow
                />
            </RigidBody>
        </group>
    )
}

export const BlockEnd = ({ position = [0, 0, 0] }) => {
    const burger = useGLTF("./hamburger.glb");

    useFrame((state, delta) => {
        burger.scene.rotation.y +=  delta * 0.15;
    })

    burger.scene.children.forEach((mesh) => mesh.castShadow = true);

    return (
        <group position={position}>
            <Text
                scale={0.5}
                position={[0, 1.5, 2]}
            >
                FINISHED
                <meshBasicMaterial toneMapped={false} />
            </Text>
            <mesh
                geometry={boxGeometry}
                position={[0, -0.1, 0]}
                scale={[4, 0.4, 4]}
                receiveShadow
                castShadow
                material={f1Material}
            />
            <RigidBody
                type='fixed'
                colliders="hull"
                friction={10}
                restitution={0.2}
                position={[0, 0.25, 0]}
            >
                <primitive object={burger.scene} scale={0.2} />
            </RigidBody>
        </group>
    )
}

export const Bounds = ({ length = 1 }) => {
    return (
        <RigidBody type='fixed' friction={0} restitution={0.2}>
            <mesh
                geometry={boxGeometry}
                position={[2.1, 0.55, -((length * 4) / 2) + 2]}
                scale={[0.2, 1.5, length * 4]}
                material={wallMaterial}
                castShadow
            />
            <mesh
                geometry={boxGeometry}
                position={[-2.1, 0.55, -((length * 4) / 2) + 2]}
                scale={[0.2, 1.5, length * 4]}
                material={wallMaterial}
                receiveShadow
            />
            <mesh
                geometry={boxGeometry}
                position={[0, 0.55, -(length * 4) + 2]}
                scale={[4, 1.5, 0.3]}
                material={wallMaterial}
                receiveShadow
            />
            <CuboidCollider
                args={[2, 0.1, length * 2]}
                position={[0, -0.1, - (length * 2) + 2]}
                restitution={0.2}
                friction={1}
            />
        </RigidBody>
    )
}


export const Level = ({
    count = 5,
    types = [BlockSpinner, BlockAxe, BlockLimbo],
    seed = 0,
}) => {
    const blocks = useMemo(() => {
        const blocks = [];
        for (let i = 0; i < count; i++) {
            const type = types[Math.floor(Math.random() * types.length)];
            blocks.push(type);
        }
        return blocks;
    }, [count, types, seed]);
    return (
        <>
            <BlockStart position={[0, 0, 0]} />
            {blocks.map((Block, i) => <Block key={i} position={[0, 0, -((i + 1) * 4)]} />)}
            <BlockEnd position={[0, 0, -((count + 1) * 4)]} />

            <Bounds length={count + 2} />
        </>
    )
}
