import { Button, Result } from 'antd';
import '@styles/PaymentSuccess.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clean_booking } from '@/common/store/booking/sliceBooking';
import { delete_info_movie } from '@/common/store/booking/sliceMovie';

const PaymentSuccess = ({ type }: { type: 'SUCCESS' | 'FAILD' | 'QUESTIONS' }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [countdown, setCountDown] = useState(5);
    useEffect(() => {
        const countdownInterval = setInterval(() => {
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                dispatch(clean_booking());
                dispatch(delete_info_movie());
                navigate('/');
                return;
            }
            setCountDown(countdown - 1);
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [countdown]);
    const handleNavigateHome = () => {
        dispatch(clean_booking());
        dispatch(delete_info_movie());
        navigate('/');
        return;
    }

    const handleNavigateCheckout = () => {
        navigate('/movie/booking/services');
        return;
    }

    const handleViewDetailTicket = () => {
        dispatch(clean_booking());
        dispatch(delete_info_movie());
        navigate('/account/ticket');
        return;
    }
    return (
        <div className="custom-result">
            {type === "QUESTIONS" ? (
                <Result
                    status='404'
                    title={<span className="custom-title">Trạng thái không hợp lệ</span>}
                    subTitle={<>
                        <span className="custom-subtitle">
                            Bạn đã hủy thanh toán!
                        </span> <br /> <br />
                        <span className="custom-subtitle text-danger">Trang sẽ điều hướng về trang chủ sau {countdown} giây</span>
                    </>}
                    extra={
                        [
                            <Button onClick={() => navigate('/')} className='btn-success' key="home">
                                Quay về trang chủ
                            </Button>,
                        ]
                    }
                />
            ) : (
                <Result
                    status={type === 'SUCCESS' ? 'success' : 'error'}
                    title={<span className="custom-title">{type === 'SUCCESS' ? 'Thanh toán thành công' : 'Thanh toán thất bại'}</span>}
                    subTitle={<>
                        <span className="custom-subtitle">
                            {type === 'SUCCESS' ? 'Cảm ơn bạn đã mua vé. Bạn có thể xem chi tiết vé của mình.' : 'Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau.'}
                        </span> <br /> <br />
                        <span className="custom-subtitle text-danger">Trang sẽ điều hướng về trang chủ sau {countdown} giây</span>
                    </>}
                    extra={
                        [
                            type === "SUCCESS" ?
                                <Button onClick={handleViewDetailTicket} type="primary" key="ticketDetails">
                                    Xem chi tiết vé
                                </Button> : null,
                            <Button onClick={handleNavigateHome} className='btn-success' key="home">
                                Quay về trang chủ
                            </Button>,
                        ]
                    }
                />
            )}


        </div>
    );
};

export default PaymentSuccess;
