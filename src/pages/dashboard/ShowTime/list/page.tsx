import { Table } from "antd"
import { useShowTimeQuery } from "../_hooks/useShowTime"
import LoadingComponent from "@/components/ui/LoadingComponent";
import ServerError from "../../_components/500";

const ShowTimeDashBoardPage = () => {
    const { data: showTime, isLoading, isError, columnsShowTime, isPending } = useShowTimeQuery();
    if (isLoading || isPending) return <LoadingComponent />
    if (isError) return <ServerError />
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Danh sách xuất chiếu</h6>
                </div>
                <div className="card-body">
                    <Table columns={columnsShowTime} rowKey={record => record.id} dataSource={showTime.data.showtimes} />
                </div>
            </div>
        </>
    )
}

export default ShowTimeDashBoardPage