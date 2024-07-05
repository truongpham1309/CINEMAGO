import { configureStore } from '@reduxjs/toolkit'
import { sliceBooking } from './sliceBooking'
import { sliceMovie } from './sliceMovie'

export const storeBooking = configureStore({
    reducer: {
        booking: sliceBooking.reducer,
        movie: sliceMovie.reducer
    }
});

storeBooking.subscribe(() => {
    const bookingSession = JSON.stringify(storeBooking.getState());
    sessionStorage.setItem('bookings', bookingSession);
})