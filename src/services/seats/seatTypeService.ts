import { SeatType } from "@/common/types/seat";
import axios from "axios";

export const createSeatType = async (seatType: any) => {
    try {
        const { data } = await axios.post(`/dashboard/seat-type/create`, seatType);
        return data;
    } catch (error: any) {
        throw error;
    }
}

export const getAllSeatType = async () => {
    try {
        const { data } = await axios.get(`/dashboard/seat-type`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message)
    }
}

export const deleteSeatTypeByID = async (seatTypeID: number) => {
    try {
        await axios.delete(`/dashboard/seat-type/delete/${seatTypeID}`);
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}

export const updateSeatTypeByID = async (seatType: SeatType) => {
    try {
        const { data } = await axios.put(`/dashboard/seat-type/update/${seatType.id}`, seatType);
        return data;
    } catch (error: any) {
        throw error
    }
}

export const getDetailSeatType = async (id: number) => {
    try {
        const { data } = await axios.get(`dashboard/seat-type/${id}`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}