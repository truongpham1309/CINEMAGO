import { selectorBooking } from '@/common/store/booking/selectorBooking';
import { clean_seats } from '@/common/store/booking/sliceBooking';
import { useChooseSeatsBooking } from '@/pages/website/BookingSeat/hooks/useChooseSeat';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useUnload = () => {
    const booking = useSelector(selectorBooking);
    const dispatch = useDispatch();
    const { mutate } = useChooseSeatsBooking();
    const isApiCalled = useRef(false);
    const [shouldReload, setShouldReload] = useState(false);

    const handleUnload = (event: any) => {
        console.log('handleUnload called');  // Câu lệnh debugging
        if (booking.seats.length > 0 && !isApiCalled.current) {
            event.preventDefault();
            event.returnValue = '';
            isApiCalled.current = true;

            mutate({
                type: "CANCEL",
                booking_seat: { seat_ids: booking.seats, showtime_id: booking?.showtime_id }
            }, {
                onSuccess: () => {
                    dispatch(clean_seats());
                    sessionStorage.removeItem("countdownStart");
                    isApiCalled.current = false;
                    setShouldReload(true); // Set state to trigger reload
                },
                onError: () => {
                    isApiCalled.current = false;
                }
            });
            return false;
        }
    };

    useEffect(() => {
        window.addEventListener('beforeunload', handleUnload);

        const removeUnloadListener = () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
        return () => {
            removeUnloadListener();
        };
    }, [booking]);  // Đảm bảo event listener được cập nhật khi booking thay đổi

    useEffect(() => {
        if (shouldReload) {
            window.location.reload();
        }
    }, [shouldReload]);

    useEffect(() => {
        isApiCalled.current = false;
    }, []);
};

export default useUnload;
