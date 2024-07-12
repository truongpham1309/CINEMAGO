import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '@/common/libs/fomatSecondToMinute';
import { useDispatch } from 'react-redux';
import { clean_booking } from '@/common/store/booking/sliceBooking';
import { delete_info_movie } from '@/common/store/booking/sliceMovie';
import { toast } from 'react-toastify';

const CountDown = () => {
    const navigate = useNavigate();
    const [countDown, setCountDown] = useState(5 * 60);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedStartTime = sessionStorage.getItem('countdownStart') || null;
        const startTime = storedStartTime ? new Date(storedStartTime) : new Date();
        sessionStorage.setItem('countdownStart', startTime.toISOString());

        const intervalId = setInterval(() => {
            const currentTime = new Date();
            const elapsedSeconds = Math.floor((currentTime.getTime() - startTime.getTime()) / 1000);
            const newCountDown = countDown - elapsedSeconds;

            if (newCountDown <= 0) {
                sessionStorage.clear();
                dispatch(clean_booking());
                dispatch(delete_info_movie());
                toast.error("Hết thời gian, vui lòng thực hiện lại thao tác!", {
                    position: 'top-center',

                })
                navigate('/movie');
                clearInterval(intervalId);
            } else {
                setCountDown(newCountDown);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);
    return (
        <div className="item">
            <h5 className="title">{formatTime(countDown)}</h5>
            <p>Mins Left</p>
        </div>
    );
};

export default CountDown;
