import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export default create(subscribeWithSelector((set) => {
    return {
        count: 10,
        blockSeed: 0,
        startTime: 0,
        endTime: 0,
        phase: 'ready',
        start: () => {
            set(({ phase }) => phase === 'ready'
                ? ({
                    phase: 'playing',
                    startTime: Date.now()
                })
                : {}
            )
        },
        restart: () => {
            set(({ phase }) => (phase === 'playing' || phase === 'ended')
                ? ({
                    phase: 'ready',
                    blockSeed: Math.random()
                })
                : {}
            )
        },
        end: () => {
            set(({ phase }) => phase === 'playing'
                ? ({
                    phase: 'ended',
                    endTime: Date.now()
                })
                : {}
            )
        },

        SSREffect: false,
        setSSREffrct: () => set((state) => ({ SSREffect: !state.SSREffect })),
    }
}))



