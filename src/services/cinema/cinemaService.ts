import { TCinema } from "@/common/types/cinema/cinemaType";
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

export const getAllCinemas = async () => {
    try {
        const { data } = await axios.get(`/dashboard/cinema`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const getDetailCinemas = async (id: number) => {
    try {
        const { data } = await axios.get(`/dashboard/cinema/${id}`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const updateCinemaByID = async (cinema: TCinema) => {
    try {
        const { data } = await axios.put(`/dashboard/cinema/${cinema.id}`, cinema);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const deleteCinemaByID = async (id: number) => {
    try {
        await axios.delete(`dashboard/cinema/${id}`);
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}