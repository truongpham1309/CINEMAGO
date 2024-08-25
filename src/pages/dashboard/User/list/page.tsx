import React, { useState } from "react";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { useQuery } from "@tanstack/react-query";
import { Table, TableProps, Input } from "antd";
import { Link } from "react-router-dom";
import ServerError from "../../_components/500";
import { getAllUserList } from "@/services/auth/authService";

export type TUser = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
};

const UserListPage = () => {
    const { data: user, isLoading, isError } = useQuery({
        queryKey: ["USERS"],
        queryFn: async () => {
            const data = await getAllUserList();
            return data;
        }
    });

    const [searchText, setSearchText] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const filteredData = user?.User?.filter((user: TUser) =>
        user.email.toLowerCase().includes(searchText.toLowerCase())
    );

    const tableColumns: TableProps<TUser>['columns'] = [
        {
            title: "#",
            dataIndex: "index",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Tên người dùng",
            dataIndex: "full_name",
            key: "full_name"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            className: "text-lowercase",
            render: (text: string) => text.toLowerCase(),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status"
        },
        // {
        //     title: "",
        //     key: "action",
        //     render: (_, record) => (
        //         <Link to={`/dashboard/user/detail/${record.id}`}>Chi tiết</Link>
        //     )
        // }
    ];

    if (isLoading) return <LoadingComponent />;
    if (isError) return <ServerError />;
    console.log(user);

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary text-uppercase">Danh sách người dùng</h6>
            </div>
            <div className="card-body">
                <Input
                    placeholder="Tìm kiếm theo email"
                    value={searchText}
                    onChange={handleSearch}
                    style={{ marginBottom: 16 }}
                />
                <Table
                    columns={tableColumns}
                    size="small"
                    dataSource={filteredData}
                    rowKey={(record) => record.id}
                    pagination={{ defaultPageSize: 10 }}
                />
            </div>
        </div>
    );
};

export default UserListPage;
