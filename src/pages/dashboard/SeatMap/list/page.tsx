import { InfoCircleFilled } from "@ant-design/icons"
import { Table, TableProps } from "antd"
import { Link } from "react-router-dom"
import { useSeatMapQuery } from "../_hooks/useSeatMap"
import LoadingComponent from "@/components/ui/LoadingComponent"
import ServerError from "../../_components/500"

const SeatMapListPage = () => {
    const { data: seat_map, isError, isLoading } = useSeatMapQuery();
    const tableSeatMap: TableProps<any>['columns'] = [
        {
            title: "#",
            key: "index",
            render: (_, __, index) => index + 1
        },
        {
            title: "Phòng chiếu",
            key: "cinema",
            render: (record) => `${record.cinema} - ${record.screen}`
        },
        {
            title: "Số hàng ghế",
            key: "total_row",
            dataIndex: "total_row",
        },
        {
            title: "Số ghế/hàng",
            key: "total_column",
            dataIndex: "total_column",
        },
        {
            title: "Tổng số ghế thực",
            key: "seat_total",
            dataIndex: "seat_total",
        },
        {
            title: "Chi tiết",
            key: "detail",
            align: "center",
            render: (record) => <>
                <Link to={`/dashboard/seat-map/detail/${record.id}`}><InfoCircleFilled /></Link>
            </>
        }
    ];
    if (isLoading) return <LoadingComponent />
    if (isError) return <ServerError />
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Danh sách phòng chiếu đã thêm ghế</h6>
                </div>
                <div className="card-body">
                    <Table columns={tableSeatMap} size="small" dataSource={seat_map.data.seatMaps} rowKey={record => record.id} />
                </div>
            </div>
        </>
    )
}

export default SeatMapListPage