import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

interface TimerProps {
    isPlaying: boolean;
    duration: number;
    initialRemainingTime: number;
    dimension: string;
    colors: any;
    getTimeDimension: (x: number) => number
    isSeconds?: boolean
    onComplete?: ((totalElapsedTime: number) => void) | undefined
}

const Timer: React.FC<TimerProps> = (props: TimerProps) => {
    return (
        <CountdownCircleTimer
            isPlaying={props.isPlaying}
            duration={props.duration}
            initialRemainingTime={props.initialRemainingTime}
            colors={props.colors}
            colorsTime={[7, 5, 2, 0]}
            size={75}
            strokeWidth={6}
            strokeLinecap='round'
            rotation='clockwise'
            trailColor="rgba(255,255,255,0.3)"
            onComplete={props.onComplete}
        >
            {({ elapsedTime, color }) => (
                <span style={{ color }}>
                    <div className="time-wrapper">
                        <div className="time">{props.getTimeDimension(props.isSeconds ? elapsedTime : props.duration - elapsedTime)}</div>
                        <div className='dimension'>{props.dimension}</div>
                    </div>
                </span>
            )}
        </CountdownCircleTimer>
    )
}

export default Timer;
