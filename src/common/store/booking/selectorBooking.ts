import { createSelector } from "@reduxjs/toolkit";

const booking = (state: any) => state.booking;

export const selectorBooking = createSelector(
    [booking],
    (state: any) => state
);