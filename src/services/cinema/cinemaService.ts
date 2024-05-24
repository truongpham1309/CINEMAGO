import axios from "axios";

export const createCinema = async (cinema: { name: string, city: string }) => {
    try {
        const { data } = await axios.post(`/dashboard/cinema/create`, cinema);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}