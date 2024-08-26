import { selectorBooking } from '@/common/store/booking/selectorBooking';
import { clean_seats } from '@/common/store/booking/sliceBooking';
import { delete_info_movie } from '@/common/store/booking/sliceMovie';
import { useChooseSeatsBooking } from '@/pages/website/BookingSeat/hooks/useChooseSeat';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useUnload = () => {
    const booking = useSelector(selectorBooking);
    const dispatch = useDispatch();
    const { mutateAsync } = useChooseSeatsBooking();
    const isApiCalled = useRef(false);

    const handleCancelBooking = async () => {
        if (booking?.seats.length > 0 && !isApiCalled.current) {
            const userConfirmed = window.confirm('Bạn có thay đổi chưa lưu, bạn có thực sự muốn rời đi?');
            
            if (userConfirmed) {
                isApiCalled.current = true;

                try {
                    await mutateAsync({
                        type: "CANCEL",
                        booking_seat: { seat_ids: booking?.seats, showtime_id: booking?.showtime_id }
                    });

                    dispatch(clean_seats());
                    dispatch(delete_info_movie());
                    sessionStorage.removeItem("countdownStart");
                    window.removeEventListener('beforeunload', handleBeforeUnload);
                    window.removeEventListener('unload', handleUnload);
                    window.location.reload(); 
                } catch (error) {
                    isApiCalled.current = false;
                }
            } else {
                isApiCalled.current = false;
            }
        }
    };

    const handleBeforeUnload = (event: any) => {
        if (booking?.seats.length > 0 && !isApiCalled.current) {
            event.preventDefault();
            event.returnValue = '';
        }
    };

    const handleUnload = async (event: any) => {
        if (booking?.seats.length > 0 && !isApiCalled.current) {
            event.preventDefault();
            await handleCancelBooking();
        }
    };

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('unload', handleUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('unload', handleUnload);
        };
    }, [booking]);

    return null;
};


export default useUnload;
