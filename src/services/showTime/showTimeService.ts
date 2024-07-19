import axios from "axios";

export const createShowTime = async (showTime: any) => {
    try {
        const { data } = await axios.post(`/dashboard/showtime/create`, showTime);
        return data;
    } catch (error: any) {
        throw error;
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

export const getDetailShowTime = async (id: number) => {
    try {
        const { data } = await axios.get(`/dashboard/showtime/${id}`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const updateShowTimeByID = async (showTime: any) => {
    try {
        await axios.put(`/dashboard/showtime/update/${showTime.id}`, showTime);
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}