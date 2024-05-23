import axios from "axios";

export const createSeatType = async (seatType: any) => {
    try {
        const { data } = await axios.post(`/dashboard/seat-type/create`, seatType);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}