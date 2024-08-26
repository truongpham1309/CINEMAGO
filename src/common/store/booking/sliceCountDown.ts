import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const countDown: any = JSON.parse(sessionStorage.getItem("bookings")!)?.countDown || {};

export const sliceCountDown = createSlice({
    name: "CountDown",
    initialState: countDown,
    reducers: {
        add_countdown: (state, action: PayloadAction<any>) => {
            state = action.payload;
        },
        decrement_countdown: (state) => {
            if(state === 0) return null
            state = state - 1;
        },
        delete_countdown: (state) => {
            return state = null;
        }
    }
});

export const { add_countdown, decrement_countdown, delete_countdown } = sliceCountDown.actions;