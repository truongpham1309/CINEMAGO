import { useLocalStorage } from "@/common/hooks/storage/useStorage";
import LoadingComponent from "@/components/ui/LoadingComponent";
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
    const { data, isLoading, isError } = useQuery({
        queryKey: ['CHECK-TOKEN-LOGIN'],
        queryFn: async () => {
            const data = await checkTokenExpiry();
            return data;
        },
        retry: 0
    })

    if (isLoading) return <LoadingComponent />;
    if (isError) {
        return children;
    }
    if (user && data?.success === true) {
        return <Navigate to={"/"} replace />
    }
}

export const PrivateRouterBooking: React.FC<MyComponentProps> = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user")!);
    const { data, isLoading, isError } = useQuery({
        queryKey: ['CHECK-TOKEN-BOOKING'],
        queryFn: async () => {
            const data = await checkTokenExpiry();
            return data;
        },
        retry: 0
    })

    if (isLoading) return <LoadingComponent />;
    if (!user || isError) {
        localStorage?.removeItem("user")!
        toast.warning("Phiên đăng nhập của bạn đã hết hạn!", {
            position: "top-center",
            autoClose: 2000
        })
        return <Navigate to={"/login"} replace />
    }
    if (data?.success) return children;
}

export const PrivateRouterDashBoard: React.FC<MyComponentProps> = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user")!);
    const { data, isLoading, isError } = useQuery({
        queryKey: ['CHECK-TOKEN-ADMIN'],
        queryFn: async () => {
            const data = await checkTokenExpiry();
            return data;
        },
        retry: 0
    });
    if (isLoading) return <LoadingComponent />;

    if (!user) {
        return <Navigate to={"/login"} replace />
    }
    if (user?.data?.role_id !== 1 || isError) {
        toast.warning("Bạn không phải quản trị viên!");
        return <Navigate to={"/"} replace />
    }
    return children;
}

export default PrivateRouterLogin