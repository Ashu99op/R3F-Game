import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.js'
import { KeyboardControls } from '@react-three/drei'
import Interface from './Interface.js'
import SSRCheckBox from './SSRCheckBox.js'
import { Perf } from 'r3f-perf'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <KeyboardControls
        map={[
            { name: 'forward', keys: ['ArrowUp','KeyW'] },
            { name: 'backward', keys: ['ArrowDown','KeyS'] },
            { name: 'leftward', keys: ['ArrowLeft','KeyA'] },
            { name: 'rightward', keys: ['ArrowRight','KeyD'] },
            { name: 'jump', keys: ['Space'] },
            { name: 'Boost', keys: ['Shift'] },
        ]}
    >
        <Canvas
            shadows
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [2.5, 4, 6]
            }}
        >
            <Experience />
            {/* <Perf position="top-left"/> */}
        </Canvas>

        <SSRCheckBox />
        <Interface />
        
    </KeyboardControls>
)