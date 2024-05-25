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