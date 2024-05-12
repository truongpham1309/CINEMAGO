export type TUser = {
    email: string;
    password: string;
    birth_date: string;
    gender: "Nam" | "Nữ";
    fullname: string;
    phone: string;
    role_id?: number;
}


export type TResponseLogin = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        data: {
            full_name: string,
            email: string,
            avatar: string,
            gender: string,
            phone: string,
            role_id: 1,
            status: string,
            birth_date: string,
        },
        access_token: string,
    }
}