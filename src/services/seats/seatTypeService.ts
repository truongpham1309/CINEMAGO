import axios from "axios";

export const createSeatType = async (seatType: any) => {
    try {
        const { data } = await axios.post(`/dashboard/seat-type/create`, seatType);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
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