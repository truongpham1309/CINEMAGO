import axios from "axios";

export const getAllDashBoardBooking = async () => {
    try {
        const { data } = await axios.get(`/dashboard/booking`);
        return data
    } catch (error: any) {
        console.log(error);
        throw new Error(error)
    }
}

export const getDetailBookingByID = async (id: number) => {
    try {
        const { data } = await axios.get(`/dashboard/booking/${id}`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error)
    }
}