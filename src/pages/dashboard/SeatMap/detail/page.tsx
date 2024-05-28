import { Link, useParams } from "react-router-dom"
import { useSeatMapMutation, useSeatMapQuery } from "../_hooks/useSeatMap";
import LoadingComponent from "@/components/ui/LoadingComponent";
import ServerError from "../../_components/500";
import Seat from "../_components/Seat";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button } from "antd";

const SeatMapDetailPage = () => {
    const { id: idSeatMap } = useParams();
    const { data, isLoading, isError } = useSeatMapQuery(+idSeatMap!);
    const { mutate, isPending } = useSeatMapMutation({ type: "DELETE" });
    const onDelete = (data: any) => {
        if (!window.confirm("Bạn có chắc chắc muốn xóa bối trí ghế này?")) return;
        mutate(data);
    }
    if (isLoading) return <LoadingComponent />
    if (isError) return <ServerError />
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Chi tiết bối trí ghế</h6>
                </div>
                <div className="card-body">
                    <div className="d-flex w-75 mb-3 mx-auto my-2 justify-content-center">
                        Màn hình chiếu
                    </div>
                    {data?.data?.map((seatMap: any, index: number) => (
                        <div key={index} className="d-flex w-75 mx-auto my-2 justify-content-center">
                            {
                                seatMap.map((item: any, index: number) => (
                                    <Seat key={index} type={item.type} seat_number={index + 1} />
                                ))
                            }
                        </div>
                    ))}

                    <div className="row w-100 mt-4">
                        <div className="col-12 d-flex align-items-center justify-content-start">
                            <div className="mx-2"><Seat type="N" />: Ghế thường</div>
                            <div className="mx-2"><Seat type="V" />: Ghế VIP</div>
                            <div className="mx-2"><Seat type="C" />: Ghế đôi</div>
                        </div>
                    </div>

                    <div className="row w-100 mt-3">
                        <div className="col-12 d-flex align-items-center justify-content-end">
                            <Link className="mx-3" to={`/dashboard/seat-map/edit/${idSeatMap}`}><Button size="middle" type="primary"><EditFilled /></Button></Link>
                            <Button loading={isPending} onClick={() => onDelete(idSeatMap)} size="middle" className="btn-danger"><DeleteFilled /></Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SeatMapDetailPage