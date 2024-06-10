import { TMovie, TMovieCreate } from "@/common/types/movie";
import axios from "axios";

export const createMovieDashBoard = async (movie: TMovieCreate) => {
    try {
        const { data } = await axios.post("/dashboard/movie/create", movie, { headers: { 'Content-Type': 'multipart/form-data' } });
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const getAllMovieList = async (limit: number = 12, page: number = 1) => {
    try {
        const { data } = await axios.get("/dashboard/movie?limit=limit&page=page");
        return data
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const deleteMovieByID = async (id: number) => {
    try {
        await axios.delete(`/dashboard/movie/delete/${id}`);
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const updateMovieByID = async (movie: TMovie) => {
    try {
        const { data } = await axios.put(`/dashboard/movie/update/${movie.id}`, movie);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}


export const getDetailMovieClient = async (id: number) => {
    try {
        const { data } = await axios.get(`/client/movie/${id}`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const getAllMovieClient = async (limit: number = 12, page: number = 1) => {
    try {
        const { data } = await axios.get("/client/movie?limit=limit&page=page");
        return data
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}