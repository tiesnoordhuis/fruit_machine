// component shows 3 fruits scrolling in a loop till finaly stopping at a random fruit

import React, { useState, useEffect, useRef } from 'react';

function Spinner(props) {
    return (<div>a</div>);
    const [fruits, setFruits] = useState(['🍎', '🍌', '🍇']);
    const [currentFruit, setCurrentFruit] = useState(0);
    const currentFruitRef = useRef(currentFruit);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFruit((currentFruitRef.current + 1) % fruits.length);
            currentFruitRef.current = (currentFruitRef.current + 1) % fruits.length;
        }, 100);
        return () => clearInterval(interval);
    }, []);

    if (props.buttonPressed) {
        return (
            <div>
                <h1>{fruits[currentFruit]}</h1>
            </div>
        );
    } else {
        return (
            <div>
                <h1>🛑</h1>
            </div>
        );
    }
}

export default Spinner;
