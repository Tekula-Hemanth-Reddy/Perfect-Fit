
import React from 'react';
import { useState, useEffect } from 'react';
import { RnText, RnView } from '../@library';

const Timer = (props: { currentTime: Date }) => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const getTime = () => {
        const currentTimeInMs = props.currentTime.getTime(); // Get the current time in milliseconds
        const currentTime = Date.now(); // Get the current time in milliseconds
        const time = currentTime - currentTimeInMs; // Time difference in milliseconds
        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <RnText fontWeight={'bold'} paddingHorizontal>Timer: {days} Days {hours} Hrs {minutes} Mins {seconds} Sec</RnText>
    );
};

export default Timer;