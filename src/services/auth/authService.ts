import { TUser } from "@/common/types/auth";
import axios from "axios";


export const registerUser = async (user: TUser) => {
    try {
        const { data } = await axios.post("/account/register", user);
        return data;
    } catch (error) {
        console.log(error);
    }
}