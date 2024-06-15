import React from 'react'
import { SSR, DepthOfField, EffectComposer, Bloom } from '@react-three/postprocessing';
import useGame from './stores/useGame';

const Effects = () => {    
    const isSSR = useGame(state => state.SSREffect);
    
    return (
        <EffectComposer>
            <Bloom intensity={1}/>
            {isSSR && <SSR
                intensity={0.45}
                exponent={1}
                distance={10}
                fade={10}
                roughnessFade={1}
                thickness={10}
                ior={0.45}
                maxRoughness={1}
                maxDepthDifference={10}
                blend={0.95}
                correction={1}
                correctionRadius={1}
                blur={0}
                blurKernel={1}
                blueSharpness={10}
                jitter={0.75}
                jitterRoughness={0.2}
                steps={40}
                refineSteps={5}
                missedRays={true}
                useNormalMap={true}
                useRoughnessMap={true}
                resolutionScale={1}
                velocityResolutionScale={1}
            />}
            <DepthOfField
                focusDistance={0.01}
                focusLength={0.2}
                bokehScale={3}
            />
        </EffectComposer>
    )
}

export default Effects
