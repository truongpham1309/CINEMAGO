import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const movie: any = JSON.parse(sessionStorage.getItem("bookings")!)?.movie || {};

export const sliceMovie = createSlice({
    name: "Movie",
    initialState: movie,
    reducers: {
        add_info_movie: (_: any, action: PayloadAction<any>) => {
            return action.payload
        },
        delete_info_movie: () => {
            return null;
        }
    }
});

export const { add_info_movie, delete_info_movie } = sliceMovie.actions;