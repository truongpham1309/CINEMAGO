import { createSelector } from "reselect";

const movie = (state: any) => state.movie
export const movieSelector = createSelector(
    [movie],
    (state: any) => state 
)