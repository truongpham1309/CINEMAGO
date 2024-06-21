import { formatTime } from "@/common/libs/fomatSecondToMinute";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CountDown = () => {
    const navigate = useNavigate();
    const [countDown, setCountDown] = useState<number>(+JSON.parse(sessionStorage.getItem('count_down')!) || 5 * 60);

    useEffect(() => {
        if (countDown === 5) {
            notification.warning({
                message: 'Thông báo',
                description: `Trang sẽ được chuyển sau ${countDown} giây!`,
                duration: 5,
            });
        }
        const intervalId = setInterval(() => {
            const newCountDown = countDown - 1;
            if (newCountDown === 0) {
                sessionStorage.removeItem('count_down');
                sessionStorage.removeItem('booking');
                navigate('/movie');
                return;
            }
            sessionStorage.setItem('count_down', JSON.stringify(newCountDown));
            setCountDown(newCountDown);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [countDown]);

    return (
        <div className="item">
            <h5 className="title">{formatTime(countDown)}</h5>
            <p>Mins Left</p>
        </div>
    );
};

export default CountDown;