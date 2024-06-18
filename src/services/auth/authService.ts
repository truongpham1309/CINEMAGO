import { TInputDataLogin, TResponseLogin } from "@/common/types/auth";
import axios from "axios";

export const registerUser = async (user: any) => {
  try {
    const { data } = await axios.post("/account/register", user);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error || "Đăng kí thất bại!");
  }
};

export const loginUser = async (
  user: TInputDataLogin
): Promise<TResponseLogin> => {
  try {
    const { data } = await axios.post("/account/login", user);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Đăng nhập không thành công!");
  }
};

export const getProfileUser = async () => {
  try {
    const { data } = await axios.get("/account/profile");
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Lấy thông tin không thành công!");
  }
};
export const postProfileUser = async (urlImg: any) => {
  try {
    const { data } = await axios.post("/account/profile/update", urlImg);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Cập nhật ảnh đại diện không thành công!");
  }
};
