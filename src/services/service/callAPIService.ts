import { TService } from "@/common/types/service/TypeService";
import axios from "axios";

export const createServiceAPI = async (service: TService) => {
    try {
        const { data } = await axios.post(`/dashboard/service/create`, service);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const getAllServiceList = async (limit = 50) => {
    try {
        const { data } = await axios.get(`/dashboard/service?limit=${limit}`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const deleteServiceByID = async (id: number) => {
    try {
        await axios.delete(`dashboard/service/delete/${id}`);
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const getDetailService = async (id: number) => {
    try {
        const { data } = await axios.get(`/dashboard/service/${id}`);
        return data; 
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const updateServiceByID = async (service: TService) => {
    try {
        const { data } = await axios.put(`/dashboard/service/update/${service.id}`, service);
        return data
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}