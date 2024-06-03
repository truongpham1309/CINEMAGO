import axios from "axios";

export const createShowTime = async (showTime: any) => {
    try {
        const { data } = await axios.post(`/dashboard/showtime/create`, showTime);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}