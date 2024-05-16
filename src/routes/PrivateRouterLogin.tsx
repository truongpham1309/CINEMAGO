import { useLocalStorage } from "@/common/hooks/storeRange/useStoreRange";
import React, { ReactNode } from "react"
import { Navigate } from "react-router-dom";

type MyComponentProps = {
    children: ReactNode;
}

const PrivateRouterLogin: React.FC<MyComponentProps> = ({ children }) => {
    const [user] = useLocalStorage("user", JSON.parse(localStorage.getItem("user")!))
    if (user) {
        return <Navigate to={"/"} replace />
    }

    return children
}

export default PrivateRouterLogin