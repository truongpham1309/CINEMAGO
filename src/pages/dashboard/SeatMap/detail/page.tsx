import { Link, useParams } from "react-router-dom"
import { useSeatMapMutation, useSeatMapQuery } from "../_hooks/useSeatMap";
import LoadingComponent from "@/components/ui/LoadingComponent";
import ServerError from "../../_components/500";
import Seat from "../_components/Seat";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

const SeatMapDetailPage = () => {
    const { id: idSeatMap } = useParams();
    const nameRow = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
    const { data, isLoading, isError } = useSeatMapQuery(+idSeatMap!);
    let [count, __] = useState<number>(0);
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
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Chi tiết sơ đồ ghế</h6>
                </div>
                <div className="card-body">
                    <div className="d-flex w-50 rounded-5 border mb-3 mx-auto my-2 justify-content-center">
                        Màn hình chiếu
                    </div>
                    {data?.data?.map((seatMap: any, index: number) => {
                        if (seatMap.length > 0) {
                            count = count + 1;
                            return (
                                <div key={index} className="d-flex w-75 mx-auto my-2 justify-content-center">
                                    {
                                        <Button className="mx-2 seat_admin px-2 py-0 d-flex justify-content-center" type="text">{nameRow[count - 1]}</Button>
                                    }
                                    {
                                        seatMap.map((item: any, index: number) => (
                                            <Seat key={index} type={item.type} seat_number={nameRow[count] + (index + 1)} />
                                        ))
                                    }
                                </div>
                            )
                        }
                        else {
                            return (
                                <div key={index} className="d-flex w-75 mx-auto my-3 justify-content-center"></div>
                            )
                        }

                    })}

                    <div className="row w-100 mt-4">
                        <div className="col-12 d-flex align-items-center justify-content-start">
                            <div className="me-2 d-flex align-items-center"><Seat type="N" />: Ghế thường</div>
                            <div className="mx-2 d-flex align-items-center"><Seat type="V" />: Ghế VIP</div>
                            <div className="ms-2 d-flex align-items-center"><Seat type="C" />: Ghế đôi</div>
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