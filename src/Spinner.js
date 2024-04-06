// component shows 3 fruits scrolling in a loop till finaly stopping at a random fruit
import React, { useState, useEffect } from 'react';

import apple from './images/apple.png';
import banana from './images/bananas.png';
import lemon from './images/lemon.png';
import strawberry from './images/strawberry.png';
import rozeKoek from './images/roze koek vector.png';
import grapes from './images/Grapes-512.png';
import pineapple from './images/pineapple2.png';

import './Spinner.css';


// styling to show the fruits scrolling from top to bottom
// using css transition to animate the fruits


const containerStyle = {
    height: '94vh',
    overflow: 'hidden',
    position: 'relative',
    border:'30px ridge #DAA520',
    // borderImage: 'linear-gradient(to bottom, red, gold) 1 stretch'

};

const fruitStyleBefore = {
    height: '100vh',
    display: 'none'
}
const fruitStyleAfter = {
    height: '100vh',
    display: 'block'
}
const fruits = [apple, banana, grapes, lemon, pineapple, strawberry, rozeKoek];
function Spinner(props) {
    const [animationName, setAnimationName] = useState('');
    const displayFruits = [...fruits, ...fruits, ...fruits];
    const randomFruitIndex = Math.floor(Math.random() * fruits.length);
    for (let i = 0; i <= randomFruitIndex; i++) {
        displayFruits.push(fruits[i]);
    }

    useEffect(() => {
        setAnimationName('');
        setTimeout(() => {
            setAnimationName('scroll');
        }, 0);
    }, [props.pressedCount]);

    const fruitContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        'align-items': 'center',
        'animationDuration': `5000ms`,
        // animationTimingFunction is a cubic-bezier function
        // it starts like ease-in and ends by overshooting the target value
        'animationTimingFunction': 'cubic-bezier(0.5, 0, 0.6, 1.06)',
        'animationIterationCount': '1',
        'animationPlayState': 'running',
        'animationDirection': 'normal',
    };


    return (
        <div style={containerStyle}>
            <div style={{...fruitContainerStyle, animationName}} hidden={!animationName}>
            {displayFruits.reverse().map((fruit, index) => (
                <img
                    key={index}
                    src={fruit}
                    alt="fruit"
                    style={animationName ? fruitStyleAfter : fruitStyleBefore}
                />
            ))    
            }
            </div>
        </div>
    );
}

export default Spinner;
