// component shows 3 fruits scrolling in a loop till finaly stopping at a random fruit

import React, { useState, useEffect } from 'react';

function Spinner(props) {
    const [currentFruit, setCurrentFruit] = useState(3);
    const fruits = ['🍎', '🍌', '🍇', '🛑'];

    useEffect(() => {
        let interval;

        if (props.buttonPressed) {
            interval = setInterval(() => {
                setCurrentFruit(i => (i + 1) % 3);
            }, 100);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        }
    }, [props.buttonPressed]);

    console.log('buttonPressed', props.buttonPressed);
    return (
        <div>
            <h1 style={{fontSize: '5em'}}>{fruits[currentFruit]}</h1>
        </div>
    );
}

export default Spinner;
