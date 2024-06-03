import axios from "axios";

export const createShowTime = async (showTime: any) => {
    try {
        const { data } = await axios.post(`/dashboard/showtime/create`, showTime);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}


export const getAllShowTimeDashBoard = async () => {
    try {
        const { data } = await axios.get(`/dashboard/showtime`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const deleteShowTimeByID = async (id: number) => {
    try {
        await axios.delete(`/dashboard/showtime/delete/${id}`);
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}