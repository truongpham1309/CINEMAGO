import { TMovieCreate } from "@/common/types/movie";
import axios from "axios";

export const createMovieDashBoard = async (movie: TMovieCreate) => {
    try {
        const { data } = await axios.post("/dashboard/movie/create", movie, {...axios.defaults.headers.common ,headers: { 'Content-Type': 'multipart/form-data' } });
        return data
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}