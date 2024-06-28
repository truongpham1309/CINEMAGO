import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useLocation } from "react-router-dom";


const location = useLocation();
console.log(location);
const booking: any = {
    user_id: 0,
    showtime_id: 0,
    seats: [],
    services: [],
    subtotal: 0,
    url: "",
}
export const sliceBooking = createSlice({
    name: 'booking',
    initialState: booking,
    reducers: {
        add_showtime: (state, action: PayloadAction<any>) => {
            state.showtime_id = action.payload;
        },
        add_seats: (state, action: PayloadAction<any>) => {
            state.seats.push(action.payload.id);
            state.subtotal += action.payload.price
        },
        add_services: (state, action: PayloadAction<any>) => {
            state.services.push(action.payload);
            state.subtotal += action.payload.subtotal;
        }
    }
});

export const { add_showtime, add_seats, add_services } = sliceBooking.actions;
export default sliceBooking.reducer;