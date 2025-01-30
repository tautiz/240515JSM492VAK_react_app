import React, { useEffect, useState } from 'react';

const CountDown = () => {
    const targetTime = React.useMemo(() => {
        const date = new Date();
        date.setHours(22, 0, 0, 0);
        return date;
    }, []);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const difference = targetTime - now;

            if (difference > 0) {
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setTimeLeft({ hours, minutes, seconds });
            } else {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const interval = setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call

        return () => clearInterval(interval);
    }, []); // Empty dependency array to run only once

    return (
        <div
            className="w-full h-96 rounded-2xl flex gap-9 flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url('https://pagedone.io/asset/uploads/1710565658.jpg')` }}
        >
            <span className='uppercase text-gray-500'>Iki paskaitos galo liko</span>
            <div className="m-10 flex items-start justify-center w-full gap-1.5 count-down-main">

                <div className="timer">
                    <div
                        className="rounded-xl bg-black/25 backdrop-blur-sm py-3 min-w-[96px] flex items-center justify-center flex-col gap-1 px-3">
                        <h3
                            className="countdown-element hours font-manrope font-semibold text-2xl text-white text-center">
                        </h3>
                        <p className="text-lg font-normal text-white mt-1 text-center w-full">{timeLeft.hours.toString().padStart(2, '0')}</p>
                    </div>
                </div>

                <div className="timer">
                    <div
                        className="rounded-xl bg-black/25 backdrop-blur-sm py-3 min-w-[96px] flex items-center justify-center flex-col gap-1 px-3">
                        <h3
                            className="countdown-element minutes font-manrope font-semibold text-2xl text-white text-center">
                        </h3>
                        <p className="text-lg font-normal text-white mt-1 text-center w-full">{timeLeft.minutes.toString().padStart(2, '0')}</p>
                    </div>
                </div>

                <div className="timer">
                    <div
                        className="rounded-xl bg-black/25 backdrop-blur-sm py-3 min-w-[96px] flex items-center justify-center flex-col gap-1 px-3">
                        <h3
                            className="countdown-element seconds font-manrope font-semibold text-2xl text-white text-center">
                        </h3>
                        <p className="text-lg font-normal text-white mt-1 text-center w-full">{timeLeft.seconds.toString().padStart(2, '0')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountDown;
