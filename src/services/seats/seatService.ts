import axios from "axios";


export const createSeat = async (seat: any) => {
    try {
        await axios.post(`/dashboard/seat/create`, seat)
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const getAllSeat = async () => {
    try {
        const { data } = await axios.get(`/dashboard/seat`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const deleteSeatByID = async (id: number) => {
    try {
        await axios.delete(`/dashboard/seat/delete/${id}`);
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const getDetailSeatByID = async (id: number) => {
    try {
        const { data } = await axios.get(`/dashboard/seat/${id}`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const updateSeatByID = async (seat:any) => {
    try {
       await axios.put(`/dashboard/seat/update/${seat.id}`, seat);
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}