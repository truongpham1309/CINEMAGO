import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '@/common/libs/fomatSecondToMinute';
import { useDispatch, useSelector } from 'react-redux';
import { clean_booking } from '@/common/store/booking/sliceBooking';
import { delete_info_movie } from '@/common/store/booking/sliceMovie';
import { toast } from 'react-toastify';
import { selectorBooking } from '@/common/store/booking/selectorBooking';
import { useChooseSeatsBooking } from '../hooks/useChooseSeat';

const CountDown = () => {
    const navigate = useNavigate();
    const [countDown, setCountDown] = useState(5 * 60);
    const [countDownStart, setCountDownStart] = useState<Date | null>(null);
    const booking = useSelector(selectorBooking);
    const dispatch = useDispatch();
    const { mutate } = useChooseSeatsBooking();

    useEffect(() => {
        const storedStartTime = sessionStorage.getItem('countdownStart');
        let _temp_time = new Date();
        if (!storedStartTime) {
            setCountDownStart(_temp_time);
            sessionStorage.setItem('countdownStart', _temp_time.toISOString());
            setCountDown(5 * 60);
            return;
        }
        let newTime = _temp_time;
        if (storedStartTime) {
            let _startTime = new Date(storedStartTime);
            if (((+_startTime - +_temp_time) / (1000 * 60)) < 5) {
                newTime = _startTime;
            }
        }
        setCountDownStart(newTime);
        sessionStorage.setItem('countdownStart', newTime.toISOString());
    }, []);

    useEffect(() => {
        if (!countDownStart) return;

        const intervalId = setInterval(() => {
            const currentTime = new Date();
            const elapsedSeconds = Math.floor((currentTime.getTime() - countDownStart.getTime()) / 1000);
            const newCountDown = 5 * 60 - elapsedSeconds;
            if (newCountDown <= 0) {
                if (booking.seats.length > 0) {
                    mutate({
                        type: "CANCEL",
                        booking_seat: {
                            seat_ids: booking.seats,
                            showtime_id: booking.showtime_id,
                        }
                    });
                }
                dispatch(clean_booking());
                dispatch(delete_info_movie());
                toast.warning("Hết thời gian, vui lòng thực hiện lại thao tác!", {
                    position: 'top-center',
                });
                sessionStorage.removeItem('countdownStart');
                navigate('/movie');
                clearInterval(intervalId);
            } else {
                setCountDown(newCountDown);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [countDownStart, booking]);

    return (
        <div className="item">
            <h5 className="title">{formatTime(countDown)}</h5>
            <p>Mins Left</p>
        </div>
    );
};

export default CountDown;