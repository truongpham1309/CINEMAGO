import LoadingComponent from "@/components/ui/LoadingComponent";
import { getAllCinemas } from "@/services/cinema/cinemaService";
import { useQuery } from "@tanstack/react-query"
import { Alert, Button, Table, TableProps } from "antd";
import { Link } from "react-router-dom";
import ServerError from "../../_components/500";

const CinemaList = () => {

    const tableCinema: TableProps<any>['columns'] = [
        {
            title: "#",
            key: "index",
            render: (__, _, index) => index + 1
        },
        {
            title: "Tên rạp phim",
            key: "name",
            align: "center",
            dataIndex: "name",
        },
        {
            title: "",
            key: "add-room",
            align: "center",
            render: (record) => <>
                <Link className="" to={`/dashboard/cinema/${record.id}/rooms/create`}><Button className="btn-success">Thêm phòng chiếu</Button></Link>
            </>
        }
    ];
    const { data, isLoading, isError } = useQuery({
        queryKey: ['CINEMAS'],
        queryFn: async () => {
            return await getAllCinemas();
        }
    });

    if (isLoading) return <LoadingComponent />;
    if (isError) return <ServerError />
    const dataSource = data?.data?.cinemas || [];
    const tablePaginationConfig = {
        pageSize: 10,
    };
    const paginationConfig = dataSource.length >= 20 ? tablePaginationConfig : false;
    return (
        <>
            {data?.data?.cinemas.length === 0 ? <Alert
                message="Warning"
                description="Hiện tại chưa có rạp chiếu nào!"
                type="warning"
                showIcon
                closable
            /> : (
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary text-uppercase">Danh sách rạp chiếu</h6>
                    </div>
                    <div className="card-body">
                        <Table columns={tableCinema} size="small" dataSource={data.data.cinemas} rowKey={record => record.id} pagination={paginationConfig} />
                    </div>
                </div>
            )}

        </>
    )
}

export default CinemaList