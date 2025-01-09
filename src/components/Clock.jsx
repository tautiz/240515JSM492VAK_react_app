import React, { useState, useEffect } from 'react';

function Clock() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => {
            clearInterval(interval); // Išvalome intervalą, kai komponentas išmontuojamas.
        };
    }, []); // Tuščias masyvas: efektas paleidžiamas tik kartą.

    return <p>Current Time: {time}</p>;
}

export default Clock;
