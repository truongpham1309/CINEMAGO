import { TRoomsCinema } from "@/common/types/cinema/roomsCinema";
import axios from "axios";

export const createRoomsCinema = async (room: TRoomsCinema) => {
    try {
        const { data } = await axios.post(`/dashboard/cinema-screen/create`, room);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const getAllRooms = async () => {
    try {
        const { data } = await axios.get(`/dashboard/cinema-screen`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const deleteRoomsByID = async (id: number) => {
    try {
        await axios.delete(`/dashboard/cinema-screen/delete/${id}`);
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const getDetailCinemaScreen = async (idCinemaScreen: number) => {
    try {
        const { data } = await axios.get(`/dashboard/cinema-screen/${idCinemaScreen}`);
        return data
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const updateCinemaScreenByID = async (cinemaScreen: any) => {
    try {
        const { data } = await axios.put(`/dashboard/cinema-screen/update/${cinemaScreen.id}`, cinemaScreen);
        return data
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}