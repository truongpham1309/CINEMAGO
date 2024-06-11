import { Table } from "antd"
import { useSeatQuery } from "../_hooks/useSeat"
import LoadingComponent from "@/components/ui/LoadingComponent";
import ServerError from "../../_components/500";

const SeatDashBoardPage = () => {
  const { columnsSeat, isLoading, isError, isPending, data } = useSeatQuery();
  if(isLoading || isPending) return <LoadingComponent />
  if(isError) return <ServerError />
  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary text-uppercase">Danh sách ghế</h6>
        </div>
        <div className="card-body">
          <Table columns={columnsSeat} dataSource={data.data.seats} rowKey={record => record.id} />
        </div>
      </div>
    </>
  )
}

export default SeatDashBoardPage