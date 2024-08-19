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
    const [countDown, setCountDown] = useState(300); // 30 giây đếm ngược
    const [countDownStart, setCountDownStart] = useState<Date | null>(null);
    const booking = useSelector(selectorBooking);
    const dispatch = useDispatch();
    const { mutate } = useChooseSeatsBooking();

    const resetCountdown = () => {
        sessionStorage.removeItem('countdownStart');
        setCountDownStart(null);
        setCountDown(300);
    };

    useEffect(() => {
        const storedStartTime = sessionStorage.getItem('countdownStart');
        const _temp_time = new Date();

        if (!storedStartTime) {
            // Nếu không có thời gian bắt đầu được lưu trữ, khởi tạo lại thời gian đếm ngược
            setCountDownStart(_temp_time);
            sessionStorage.setItem('countdownStart', _temp_time.toISOString());
            setCountDown(300);
        } else {
            const _startTime = new Date(storedStartTime);
            const elapsedSeconds = Math.floor((_temp_time.getTime() - _startTime.getTime()) / 1000);

            if (elapsedSeconds >= 300) {
                // Nếu thời gian đã hết, reset lại đếm ngược
                resetCountdown();
            } else {
                setCountDownStart(_startTime);
                setCountDown(300 - elapsedSeconds);
            }
        }
    }, []);

    useEffect(() => {
        if (!countDownStart) return;
        console.log(countDownStart)
        const intervalId = setInterval(() => {
            const currentTime = new Date();
            const elapsedSeconds = Math.floor((currentTime.getTime() - countDownStart.getTime()) / 1000);
            const newCountDown = 300 - elapsedSeconds;

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
                clearInterval(intervalId);
                resetCountdown();
                console.log(countDownStart)
                navigate('/');
            } else {
                setCountDown(newCountDown);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [countDownStart, booking]);

    return (
        <div className="item">
            <h5 className="title">{formatTime(countDown)}</h5>
        </div>
    );
};

export default CountDown;
