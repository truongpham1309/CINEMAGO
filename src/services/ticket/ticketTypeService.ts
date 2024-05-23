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
        
    } catch (error) {
        
    }
}

export const getDetailTicketType = async () => {
    try {
        
    } catch (error) {
        
    }
}

export const updateTicketTypeByID = async () => {
    try {
        
    } catch (error) {
        
    }
}

export const deleteTicketTypeByID = async () => {
    try {
        
    } catch (error) {
        
    }
}