import axios from "axios";

export const getAllTicket = async () => {
    try {
        const { data } = await axios.get(`/dashboard/ticket`);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteTicketByID = async (id: number) => {
    try {
        return await axios.delete(`/dashboard/ticket/delete/${id}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllTicketByUser = async () => {
    try {
        const { data } = await axios.get("/booking");
        return data;
    } catch (error) {
        throw error;
    }
}

export const getDetailTicketByIDOfUser = async (id: any) => {
    try {
        const { data } = await axios.get(`/booking/${id}`);
        return data
    } catch (error) {
        console.log(error);
        throw error;
    }
}