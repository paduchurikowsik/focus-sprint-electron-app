import React, { useState } from 'react'
import { daySeconds, getTimeHours, getTimeMinutes, getTimeSeconds, hourSeconds, minuteSeconds } from '../utils';
import Timer from './timer';
import './completeTimer.css'

const CompleteTimer: React.FC = () => {
    const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
    const endTime = stratTime + (hourSeconds * 1); // use UNIX timestamp in seconds

    const remainingTime = endTime - stratTime - 3590;

    const [isDone, setIsDone] = useState(false);

    return (
        <div>
            {!isDone && <div className='completeTimer'>
                <Timer
                    isPlaying={true}
                    colors="#D14081"
                    duration={hourSeconds * 2}
                    initialRemainingTime={remainingTime % (hourSeconds * 2)}
                    dimension="hours"
                    getTimeDimension={getTimeHours}
                    onComplete={(totalElapsedTime) => ({
                        shouldRepeat: remainingTime - totalElapsedTime > hourSeconds
                    })}
                />

                <Timer
                    isPlaying={true}
                    colors="#EF798A"
                    duration={hourSeconds}
                    initialRemainingTime={remainingTime % hourSeconds}
                    dimension="minutes"
                    getTimeDimension={getTimeMinutes}
                    onComplete={(totalElapsedTime) => ({
                        shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds
                    })}
                />

                <Timer
                    isPlaying={true}
                    colors="#218380"
                    duration={minuteSeconds}
                    initialRemainingTime={remainingTime % minuteSeconds}
                    dimension="seconds"
                    getTimeDimension={getTimeSeconds}
                    isSeconds={true}
                    onComplete={(totalElapsedTime) => {
                        setIsDone(!(remainingTime - totalElapsedTime > 0))
                        return {
                            shouldRepeat: remainingTime - totalElapsedTime > 0
                        }
                    }}
                />


            </div>}
            {isDone &&
                <div className='doneScreen'>
                    <span className='text'>Done!!</span>
                    <button onClick={() => setIsDone(false)}>Restart</button>
                </div>
            }
        </div>
    )
}

export default CompleteTimer;