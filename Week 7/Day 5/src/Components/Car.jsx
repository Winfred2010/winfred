import React, { useState } from 'react';
import Garage from './Garage.jsx';

const Car = ({ carInfo }) => {
    const [color, setColor] = useState("red");

    return (
        <div>
            <header>This car is {carInfo.model}</header>
            <p>This car is {color} {carInfo.model}</p>
            <Garage size="small" />
        </div>
    );
};

export default Car;
