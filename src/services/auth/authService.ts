import { TInputDataLogin, TResponseLogin } from "@/common/types/auth";
import axios from "axios";


export const registerUser = async (user: any) => {
    try {
        const { data } = await axios.post("/account/register", user);
        return data;
    } catch (error: any) {
        throw new Error(error || "Đăng kí thất bại!");
    }
}

export const loginUser = async (user: TInputDataLogin): Promise<TResponseLogin> => {
    try {
        const { data } = await axios.post("/account/login", user);
        return data
    } catch (error: any) {
        throw new Error(error.message || "Đăng nhập không thành công!");
    }
}