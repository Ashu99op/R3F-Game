import React, { useRef, useEffect } from 'react';
import { useKeyboardControls } from '@react-three/drei';
import useGame from './stores/useGame';
import { addEffect } from '@react-three/fiber';

const Interface = () => {
    const phase = useGame(state => state.phase);
    const restart = useGame(state => state.restart);

    const time = useRef();

    useEffect(() => {
        const unsubscribEffect = addEffect(()=>{
            const state = useGame.getState()
            let elaspedTime = 0
            if(state.phase === 'playing')
                elaspedTime = Date.now() - state.startTime
            else if(state.phase === 'ended')
                elaspedTime = state.endTime - state.startTime

                elaspedTime /= 1000
                elaspedTime = elaspedTime.toFixed(2);

            if(time.current)
             time.current.textContent = elaspedTime;
        })

        return () => unsubscribEffect();
    },[]);

    const controls = useKeyboardControls(state => ({
        forward: state.forward, 
        backward: state.backward, 
        leftward: state.leftward, 
        rightward: state.rightward, 
        jump: state.jump
    }));

    const { forward, backward, leftward, rightward, jump } = controls;

    return (
        <div className="interface">
            <div ref={time} className="time">0.00</div>
            {phase === 'ended' && <div className="restart" onClick={restart} >Restart</div>}
            <div className="controls">
                <div className="raw">
                    <div className={`key ${forward ? 'active' : '' }`}></div>
                </div>
                <div className="raw"> 
                    <div className={`key ${leftward ? 'active' : '' }`}></div>
                    <div className={`key ${backward ? 'active' : '' }`}></div>
                    <div className={`key ${rightward ? 'active' : '' }`}></div>
                </div>
                <div className="raw">
                    <div className={`key ${jump ? 'active' : '' } large`}></div>
                </div>
            </div>
        </div>
    )
}

export default Interface
