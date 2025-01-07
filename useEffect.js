import React, { useState, useEffect } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(`Skaitiklis pasikeitė: ${count}`);
    }, [count]); // Efektas paleidžiamas tik tada, kai pasikeičia "count"

    return (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={() => setCount(count + 1)}>Increase</button>
        </div>
    );
}