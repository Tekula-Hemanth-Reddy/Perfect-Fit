
import React from 'react';
import { useState, useEffect } from 'react';
import { RnText, RnView } from '../@library';

const Timer = (props: { currentTime: Date }) => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const getTime = () => {
        const time = Date.now() - Date.parse(props.currentTime.toDateString());
        console.log(time)
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
        <RnText paddingHorizontal title>Timer: {days} Days {hours} Hrs {minutes} Mins {seconds} Sec</RnText>
    );
};

export default Timer;