import axios from "axios";

export const getAllShowTimeByCityAndCinema = async (id: number) => {
    try {
        const { data } = await axios.get(`/filter/movie/${id}/showtime`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const getSeatMapByIDShowTime = async (id: number) => {
    try {
        const { data } = await axios.post(`/show-seat-map`, { showtime_id: id });
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}