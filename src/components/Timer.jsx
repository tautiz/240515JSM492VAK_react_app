import React, { useState, useEffect } from 'react';

function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        return () => {
            clearInterval(interval); // Išvalome intervalą, kai "isRunning" pasikeičia į false.
        };
    }, [isRunning]); // Efektas priklauso nuo "isRunning".

    return (
        <div>
            <p>Timer: {seconds}s</p>
            <button onClick={() => setIsRunning(true)}>Start</button>
            <button onClick={() => setIsRunning(false)}>Pause</button>
            <button onClick={() => setSeconds(0)}>Reset</button>
        </div>
    );
}

export default Timer;
