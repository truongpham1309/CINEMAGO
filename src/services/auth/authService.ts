import axios from "axios";


export const registerUser = async (user: any) => {
    try {
        const { data } = await axios.post("/account/register", user);
        return data;
    } catch (error: any) {
        throw new Error(error || "Đăng kí thất bại!");
    }
}