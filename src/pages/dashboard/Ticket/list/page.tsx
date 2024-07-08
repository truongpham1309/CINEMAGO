import { Alert, Table } from "antd"
import { useTicketQuery } from "../_hooks/useTicket"
import LoadingComponent from "@/components/ui/LoadingComponent";
import ServerError from "../../_components/500";

const TicketListPage = () => {
    const { data, tableTicket, isError, isLoading, isPending } = useTicketQuery();
    if(isLoading || isPending) return <LoadingComponent />
    if(isError) return <ServerError />
    return (
        <>
            {data?.data.tickets.length === 0 || isLoading ? <Alert
                message="Warning"
                description="Hiện tại chưa có phòng chiếu nào!"
                type="warning"
                showIcon
                closable
            /> : (
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary text-uppercase">Danh sách vé</h6>
                    </div>
                    <div className="card-body">
                        <Table columns={tableTicket} size="small" rowKey={record => record.id} dataSource={data.data.tickets} pagination={false} />
                    </div>
                </div>
            )}

        </>
    )
}

export default TicketListPage