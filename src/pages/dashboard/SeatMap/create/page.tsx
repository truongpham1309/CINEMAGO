import { Button } from "antd";
import { useSeatMapMutation } from "../_hooks/useSeatMap"
import LoadingComponent from "@/components/ui/LoadingComponent";
import ServerError from "../../_components/500";

const SeatMapCreatePage = () => {
    const { handleSubmit, formState: { errors }, register, data: cinema_screen,
        onSeatMapMutation, isPending,
        isLoading, isError } = useSeatMapMutation({ type: "CREATE" });
    if (isLoading) return <LoadingComponent />
    if (isError) return <ServerError />
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Tạo mới bản đồ ghế</h6>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSeatMapMutation)}>
                        <div className="row mt-3">
                            <div className="col-sm-12 col-md-6">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Phòng chiếu</label>
                                    <select defaultValue={""} className="form-control" {...register("cinema_screen_id")}>
                                        <option value={""} >Chọn phòng chiếu</option>
                                        {cinema_screen.data.cinemaScreens.map((screen: any, index: number) => (
                                            <option key={index} value={screen.id}>{screen.name} - {screen.screen} {screen.city}</option>
                                        ))}
                                    </select>
                                    {errors.cinema_screen_id && (<span className="text-danger">{errors.cinema_screen_id.message}</span>)}
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Số hàng</label>
                                    <input type="number" className="form-control" {...register("total_row")} />
                                    {errors.total_row && (<span className="text-danger">{errors.total_row.message}</span>)}
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-12 col-md-6">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Số ghế trên hàng</label>
                                    <input type="number" className="form-control" {...register("total_column")} />
                                    {errors.total_column && (<span className="text-danger">{errors.total_column.message}</span>)}
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-6">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Tổng số ghế</label>
                                    <input type="number" className="form-control" {...register("seat_total")} />
                                    {errors.seat_total && (<span className="text-danger">{errors.seat_total.message}</span>)}
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12">
                                <label htmlFor="">Layout</label>
                                <textarea className="form-control" {...register("layout")} rows={4}></textarea>
                                {errors.layout && (<span className="text-danger">{errors.layout.message}</span>)}
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-12 col-md-12">
                                <Button loading={isPending} htmlType="submit" type="primary">Thêm mới</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}

export default SeatMapCreatePage