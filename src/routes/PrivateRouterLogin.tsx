import { useLocalStorage } from "@/common/hooks/storage/useStorage";
import { checkTokenExpiry } from "@/services/auth/authService";
import { useQuery } from "@tanstack/react-query";
import React, { ReactNode } from "react"
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

type MyComponentProps = {
    children: ReactNode;
}

const PrivateRouterLogin: React.FC<MyComponentProps> = ({ children }) => {
    const [user,] = useLocalStorage("user", JSON.parse(localStorage.getItem("user")!));
    if (user) {
        return <Navigate to={"/"} replace />
    }

    return children
}

export const PrivateRouterBooking: React.FC<MyComponentProps> = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user")!);
    const { data } = useQuery({
        queryKey: ['CHECK-TOKEN'],
        queryFn: async () => {
            const data = await checkTokenExpiry();
            return data;
        }
    })
    if (!user || !data?.success) {
        localStorage?.removeItem("user")!
        toast.warning("Phiên đăng nhập của bạn đã hết hạn!", {
            position: "top-center",
            autoClose: 2000
        })
        return <Navigate to={"/login"} replace />
    }
    return children;
}

export const PrivateRouterDashBoard: React.FC<MyComponentProps> = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user")!);
    const { data } = useQuery({
        queryKey: ['CHECK-TOKEN'],
        queryFn: async () => {
            const data = await checkTokenExpiry();
            return data;
        }
    })
    if (!user) {
        return <Navigate to={"/login"} replace />
    }
    if (user?.data?.role_id !== 1 || !data?.success) {
        toast.warning("Bạn không phải quản trị viên!");
        return <Navigate to={"/"} replace />
    }
    return children;
}

export default PrivateRouterLogin