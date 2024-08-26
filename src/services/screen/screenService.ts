import { TScreen } from "@/common/types/screen/screenType";
import axios from "axios";

export const getAllScreen = async () => {
    try {
        const { data } = await axios.get(`dashboard/screen`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
};

export const getDetailScreen = async (id: number) => {
    try {
        const { data } = await axios.get(`dashboard/screen/${id}`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const createScreenDashBoard = async (screen: TScreen) => {
    try {
        const { data } = await axios.post(`dashboard/screen/create`, screen);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const updateScreenByID = async (screen: Required<TScreen>) => {
    try {
        const { data } = await axios.put(`dashboard/screen/update/${screen.id}`, screen);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const deleteScreenByID = async (id: number) => {
    try {
        await axios.delete(`dashboard/screen/delete/${id}`);
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}