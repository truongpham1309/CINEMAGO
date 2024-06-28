import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const movie: any = JSON.parse(sessionStorage.getItem("info_movie")!) || null;

export const sliceMovie = createSlice({
    name: "Movie",
    initialState: movie,
    reducers: {
        add_info_movie: (state, action: PayloadAction<any>) => {
            state = action.payload;
        },
        delete_info_movie: (state) => {
            state = null;
        }
    }
});

export const { add_info_movie, delete_info_movie } = sliceMovie.actions;