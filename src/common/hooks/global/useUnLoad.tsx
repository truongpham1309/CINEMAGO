import { selectorBooking } from '@/common/store/booking/selectorBooking';
import { clean_seats } from '@/common/store/booking/sliceBooking';
import { delete_info_movie } from '@/common/store/booking/sliceMovie';
import { useChooseSeatsBooking } from '@/pages/website/BookingSeat/hooks/useChooseSeat';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useUnload = () => {
    const booking = useSelector(selectorBooking);
    const dispatch = useDispatch();
    const { mutate } = useChooseSeatsBooking();
    const isApiCalled = useRef(false);

    const handleCancelBooking = () => {
        if (booking?.seats.length > 0) {
            isApiCalled.current = true;

            mutate({
                type: "CANCEL",
                booking_seat: { seat_ids: booking?.seats, showtime_id: booking?.showtime_id }
            }, {
                onSuccess: () => {
                    console.log('Cancel booking API call successful');
                    dispatch(clean_seats());
                    dispatch(delete_info_movie());
                    sessionStorage.removeItem("countdownStart");
                },
                onError: () => {
                    console.log('Cancel booking API call failed');
                    isApiCalled.current = false;
                }
            });
        }
    };

    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            if (booking?.seats.length > 0) {
                handleCancelBooking();
                const confirmationMessage = 'Bạn có thay đổi chưa lưu, bạn có thực sự muốn rời đi?';
                event.returnValue = confirmationMessage;
                return confirmationMessage;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    });

    return null;
};

export default useUnload;
