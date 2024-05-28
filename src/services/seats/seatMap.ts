import axios from "axios";

export const createSeatMap = async (seatMap: any) => {
    try {
        const { data } = await axios.post('/dashboard/seat-map/create', seatMap);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}