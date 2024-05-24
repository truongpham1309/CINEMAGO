import { TTicketType } from "@/common/types/ticket/ticketType"
import axios from "axios"

export const createTicketType = async (ticketType: TTicketType) => {
    try {
        const { data } = await axios.post(`/dashboard/ticket-type/create`, ticketType);
        return data
    } catch (error) {
        console.log(error);
        throw new Error("Thêm loại vé không thành công!");
    }
}

export const getAllTickKetType = async () => {
    try {
        const { data } = await axios.get(`dashboard/ticket-type`);
        return data
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}

export const getDetailTicketType = async (id: number) => {
    try {
        const { data } = await axios.get(`/dashboard/ticket-type/${id}`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const updateTicketTypeByID = async (ticketType: Required<TTicketType>) => {
    try {
        const { data } = await axios.put(`/dashboard/ticket-type/update/${ticketType.id}`, ticketType); 
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error)
    }
}

export const deleteTicketTypeByID = async (id: number) => {
    try {
        await axios.delete(`/dashboard/ticket-type/${id}`);
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}