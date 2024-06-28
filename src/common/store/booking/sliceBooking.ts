import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// import { useLocation } from "react-router-dom";

const currentBooking = JSON.parse(sessionStorage.getItem("bookings")!)?.booking;
const booking: any = {
    user_id: 0,
    showtime_id: 0,
    seats: [],
    services: [],
    subtotal: 0,
    url: window.location.host,
    ...currentBooking,
}

export const sliceBooking = createSlice({
    name: 'booking',
    initialState: booking,
    reducers: {
        add_showtime: (state, action: PayloadAction<any>) => {
            state.showtime_id = action.payload;
        },
        add_user_id: (state, action) => {
            state.user_id = action.payload;
        },
        delete_showtime: (state) => {
            state.showtime_id = 0;
        }
        ,
        add_seats: (state, action: PayloadAction<any>) => {
            const seat = state.seats ? state?.seats?.find((s: any) => s === action.payload.id) : null;
            if (seat) {
                state.seats = state.seats.filter((_s: any) => _s !== action.payload.id);
                state.subtotal = +state.subtotal - Number(action.payload.price);
                console.log(state.seats);
                return state;
            }

            if (state.seats.length >= 8) {
                toast.error("Bạn chỉ được đặt tối đa 8 ghế trong 1 lần đặt!");
                return state;
            }

            state.seats.push(action.payload.id);
            state.subtotal += Number(action.payload.price);
        },
        add_services: (state, action: PayloadAction<any>) => {
            state.services.push(action.payload);
            state.subtotal += Number(action.payload.subtotal);
        },
        add_url: (state, action: PayloadAction<any>) => {
            return state.url = action.payload;
        },
        clean_booking: () => {
            return {};
        }
    }
});

export const { add_showtime, add_seats, add_services, clean_booking, delete_showtime, add_user_id } = sliceBooking.actions;
export default sliceBooking.reducer;