import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.js'
import { Level } from './Level.js'
import { Physics, Debug } from '@react-three/rapier'
import Player from './Player.js'
import useGame from './stores/useGame.js'
import Effects from './Effects.js'

const Experience = () => {
    const count = useGame(state => state.count);
    const blockSeed = useGame(state => state.blockSeed);

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




