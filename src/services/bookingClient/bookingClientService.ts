import axios from "axios";

export const getAllShowTimeByCityAndCinema = async (id:number) => {
    try {
        const { data } = await axios.get(`/filter/movie/${id}`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}