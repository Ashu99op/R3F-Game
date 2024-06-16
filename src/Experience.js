import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.js'
import { Level } from './Level.js'
import { Physics, Debug } from '@react-three/rapier'
import Player from './Player.js'
import useGame from './stores/useGame.js'
import Effects from './Effects.js'
import { useControls } from 'leva'

const Experience = () => {
    const count = useGame(state => state.count);
    const setCount = useGame(state => state.setCount);
    const blockSeed = useGame(state => state.blockSeed);

    // useControls({
    //     rotationControl: {
    //         value: count,
    //         min: 5,
    //         max: 20,
    //         onChange: (value) => setCount(value),
    //     },
    // })

    return <>
        {/* <OrbitControls makeDefault /> */}
        <color args={[ '#252731' ]} attach="background"/>
        <Physics>
            {/* <Debug /> */}
            <Lights />
            <Level count={count} seed={blockSeed} />
            <Player />
        </Physics>
        <Effects />
    </>
}

export default Experience 




