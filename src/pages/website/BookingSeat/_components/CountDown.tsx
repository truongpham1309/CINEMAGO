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
    const booking = useSelector(selectorBooking);
    const dispatch = useDispatch();
    const { mutate } = useChooseSeatsBooking();

    useEffect(() => {
        const storedStartTime = sessionStorage.getItem('countdownStart') || null;
        let _currentTime = new Date();
        let _temp = storedStartTime ? new Date(storedStartTime) : false;
        const startTime = _temp ? ((+_currentTime - +_temp) / (1000 * 60) < 5 ? _temp : new Date()) : new Date();
        sessionStorage.setItem('countdownStart', startTime.toISOString());

        const intervalId = setInterval(() => {
            const currentTime = new Date();
            const elapsedSeconds = Math.floor((currentTime.getTime() - startTime.getTime()) / 1000);
            const newCountDown = countDown - elapsedSeconds;
            if (newCountDown <= 0) {
                if (booking.seats.length > 0) {
                    mutate({
                        type: "CANCEL",
                        booking_seat: {
                            seat_ids: booking.seats,
                            showtime_id: booking.showtime_id,
                        }
                    })
                }
                dispatch(clean_booking());
                dispatch(delete_info_movie());
                toast.warning("Hết thời gian, vui lòng thực hiện lại thao tác!", {
                    position: 'top-center',

                })
                navigate('/movie');
                clearInterval(intervalId);
            } else {
                setCountDown(newCountDown);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [booking, dispatch]);
    return (
        <div className="item">
            <h5 className="title">{formatTime(countDown)}</h5>
            <p>Mins Left</p>
        </div>
    );
};

export default CountDown;
