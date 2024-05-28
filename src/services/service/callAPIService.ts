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