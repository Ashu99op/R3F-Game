import React, { useEffect, useRef, useState } from 'react'
import { RigidBody, useRapier } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { Bounds, useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import useGame from './stores/useGame';

const Player = () => {
    const count = useGame(state => state.count);
    const phase = useGame(state => state.phase);
    const start = useGame(state => state.start);
    const restart = useGame(state => state.restart);
    const end = useGame(state => state.end);

    const [smoothedCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10));
    const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

    const body = useRef();
    const [subscribeKeys, getKeys] = useKeyboardControls();
    const { rapier, world } = useRapier();
    const rapierWorld = world.raw();

    const reset = () => {
        body.current.setTranslation({ x:0, y:2, z:0 });
        body.current.setLinvel({ x:0, y:0, z:0 });
        body.current.setAngvel({ x:0, y:0, z:0 });
    }

    useEffect(() => {

        const unsubscribReset = useGame.subscribe(
            (state) => state.phase,
            (phase) => phase === 'ready' && reset()
        )

        const unsubscribJump = subscribeKeys(
            (state) => state.jump,
            (value) => {
                if (value) {
                    const origin = body.current.translation();
                    origin.y -= 0.31;
                    const direction = { x: 0, y: -1, z: 0 }
                    const ray = new rapier.Ray(origin, direction);
                    const hit = rapierWorld.castRay(ray, 10, true)

                    hit.toi < 0.15 && body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
                }
            }
        )

        const unsubscribAnyKeys = subscribeKeys(
            () => start()
        )

        return () => {
            unsubscribReset();
            unsubscribJump();
            unsubscribAnyKeys();
        }
    }, []);

    useFrame((state, delta) => {
        //Controls
        const { forward, backward, leftward, rightward } = getKeys();
        const impulse = { x: 0, y: 0, z: 0 };
        const torque = { x: 0, y: 0, z: 0 };

        const impulseStrength = 0.6 * delta;
        const torqueStrength = 0.2 * delta;

        if (forward) {
            impulse.z -= impulseStrength;
            torque.x -= torqueStrength;
        }
        if (backward) {
            impulse.z += impulseStrength;
            torque.x += torqueStrength;
        }
        if (rightward) {
            impulse.x += impulseStrength;
            torque.z -= torqueStrength;
        }
        if (leftward) {
            impulse.x -= impulseStrength;
            torque.z += torqueStrength;
        }

        body.current.applyImpulse(impulse);
        body.current.applyTorqueImpulse(torque);

        //Camera
        const bodyPosition = body.current.translation();

        const cameraPosition = new THREE.Vector3();
        cameraPosition.copy(bodyPosition);
        cameraPosition.z += 2.25;
        cameraPosition.y += 0.65

        const cameraTarget = new THREE.Vector3();
        cameraTarget.copy(bodyPosition);
        cameraTarget.y += 0.25;

        smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

        state.camera.position.copy(smoothedCameraPosition);
        state.camera.lookAt(smoothedCameraTarget);

        //checking is reached at end point
        const isReachedAtFinished = -bodyPosition.z >= (count * 4) + 2
        isReachedAtFinished && end();

        //Restart ball on fall off
        const isFallOff = bodyPosition.y < -5;
        isFallOff && restart();
    })

    return (
        <RigidBody
            ref={body}
            position={[0, 1, 0]}
            colliders="ball"
            restitution={0.2}
            friction={1}
            linearDamping={0.5}
            angularDamping={0.5}
        >
            <mesh castShadow >
                <icosahedronGeometry args={[0.3, 1]} />
                <meshStandardMaterial flatShading color="mediumpurple" />
            </mesh>
        </RigidBody>
    )
}

export default Player
