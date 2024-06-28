import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { formatTime } from '@/common/libs/fomatSecondToMinute';
import { useDispatch } from 'react-redux';
import { clean_booking } from '@/common/store/booking/sliceBooking';
import { delete_info_movie } from '@/common/store/booking/sliceMovie';

const CountDown = () => {
    const navigate = useNavigate();
    const [countDown, setCountDown] = useState(5 * 60); // 5 minutes in seconds
    const dispatch = useDispatch();

    useEffect(() => {
        const storedStartTime = sessionStorage.getItem('countdownStart');
        const startTime = storedStartTime ? new Date(storedStartTime) : new Date();
        sessionStorage.setItem('countdownStart', startTime.toISOString());

        const intervalId = setInterval(() => {
            const currentTime = new Date();
            const elapsedSeconds = Math.floor((currentTime.getTime() - startTime.getTime()) / 1000);
            const newCountDown = countDown - elapsedSeconds;

            if (newCountDown <= 0) {
                handleCountdownEnd();
                clearInterval(intervalId);
            } else {
                setCountDown(newCountDown);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleCountdownEnd = () => {
        sessionStorage.removeItem('countdownStart');
        sessionStorage.removeItem('count_down');
        dispatch(clean_booking());
        dispatch(delete_info_movie());
        notification.error({
            message: 'Thông báo',
            description: 'Đã hết thời gian, vui lòng thực hiện lại thao tác!',
        });
        navigate('/movie');
    };

    return (
        <div className="item">
            <h5 className="title">{formatTime(countDown)}</h5>
            <p>Mins Left</p>
        </div>
    );
};

export default CountDown;
