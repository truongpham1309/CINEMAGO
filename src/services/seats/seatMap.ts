import axios from "axios";

export const createSeatMap = async (seatMap: any) => {
    try {
        const { data } = await axios.post('/dashboard/seat-map/create', seatMap);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const getAllListSeatMaps = async (limit: number = 50) => {
    try {
        const { data } = await axios.get(`/dashboard/seat-map?limit=${limit}`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const getDetailSeatMap = async (id: number) => {
    try {
        const { data } = await axios.get(`/dashboard/seat-map/${id}`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const deleteSeatMapByID = async (id: number) => {
    try {
        await axios.delete(`/dashboard/seat-map/delete/${id}`);
    } catch (error: any) {
        console.log(error);
        throw new Error(error)
    }
}

export const updateSeatMapByID = async (seatMap: any) => {
    try {
        const { data } = await axios.put(`/dashboard/seat-map/update/${seatMap.id}`, seatMap);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error)
    }
}