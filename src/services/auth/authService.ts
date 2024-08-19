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


export const logoutUser = async () => {
  try {
    const { data } = await axios.post(`/account/logout`);
    return data;
  } catch (error) {
    throw error;
  }
}

export const getAllUserList = async () => {
  const { data } = await axios.get(`/dashboard/user`)
  return data.data;
};

export const getUserDetail = async (id: string) => {
  const { data } = await axios.get(`/dasboard/user/${id}`);
  return data.data;
};


export const checkTokenExpiry = async () => {
  try {
    const { data } = await axios.get('/account/check-token-expiry');
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const checkTokenIsAdmin = async () => {
  try {
    const { data } = await axios.get("/account/check-admin-role");
    return data;
  } catch (error) {
    console.log(error);
    throw error
  }
}