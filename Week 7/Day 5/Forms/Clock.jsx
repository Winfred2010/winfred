import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const tick = () => setCurrentDate(new Date());
        const timerID = setInterval(tick, 1000);

        // Cleanup function to clear interval
        return () => clearInterval(timerID);
    }, []);

    return (
        <div style={{ textAlign: 'center', margin: '20px', fontSize: '24px' }}>
            <h2>Local Time: {currentDate.toLocaleTimeString()}</h2>
        </div>
    );
};

export default Clock;
