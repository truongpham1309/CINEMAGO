import { joiResolver } from "@hookform/resolvers/joi";
import { Alert, Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { ShowTimeSchema } from './../../../../common/validations/showTime/showTimeValid';
import { useShowTimeMutation } from "../_hooks/useShowTime";
import LoadingComponent from "@/components/ui/LoadingComponent";
import ServerError from "../../_components/500";
import { formatDateToString } from "@/common/libs/formatDateToString";
import { convertTo24Hour } from "@/common/libs/formatTime24hours";

const ShowTimeCreate = () => {

    const { movie, cinema, mutate, isPending, error, isError } = useShowTimeMutation({ type: "CREATE" });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(ShowTimeSchema),
        defaultValues: {
            movie_id: 0,
            cinema_screen_id: 0,
            subtitle: "",
            show_date: "",
            show_time: "",
            status: "Hoạt động"
        }
    });
    const onSubmit: SubmitHandler<any> = (data) => {
        const format_date = formatDateToString(data.show_date);
        const format_time = convertTo24Hour(data.show_time);
        mutate({ ...data, show_date: format_date, show_time: format_time });
    }
    if (movie.isLoading || cinema.isLoading) return <LoadingComponent />;
    if (movie.isError || cinema.isError) return <ServerError />
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Tạo mới xuất chiếu</h6>
                </div>
                {isError && (<Alert type="warning" message={"Có lỗi sảy ra!"} description={(error as any)?.response.data.message} />)}
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row mt-3">
                            <div className="col-sm-12 col-md-6">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Phim</label>
                                    <select {...register("movie_id")} className="form-control">
                                        <option className="form-control" value="">Chọn phim</option>
                                        {movie?.data.data.movie.map((movie: any) => (
                                            <option key={movie.id} className="form-control" value={movie.id}>{movie.title}</option>
                                        ))}
                                    </select>
                                    {errors.movie_id && (<span className="text-danger">{errors.movie_id.message}</span>)}
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Rạp</label>
                                    <select {...register("cinema_screen_id")} className="form-control">
                                        <option className="form-control" value="">Chọn Rạp</option>
                                        {cinema.data.data.cinemaScreens.map((cinema: any) => (
                                            <option key={cinema.id} className="form-control" value={cinema.id}>{`${cinema.cinema} - ${cinema.screen}`}</option>
                                        ))}
                                    </select>
                                    {errors.cinema_screen_id && (<span className="text-danger">{errors.cinema_screen_id.message}</span>)}
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-4">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Ngôn ngữ dịch</label>
                                    <select className="form-control" {...register("subtitle")}>
                                        <option className="form-control" value="">Chọn ngôn ngữ dịch</option>
                                        <option className="form-control" value="Tiếng Anh-Phụ đề tiếng Việt">Tiếng Anh-Phụ đề tiếng Việt</option>
                                        <option className="form-control" value="Tiếng Anh-Phụ đề tiếng Anh">Tiếng Anh-Phụ đề tiếng Anh</option>
                                    </select>
                                    {errors.subtitle && (<span className="text-danger">{errors.subtitle.message}</span>)}
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-4">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Ngày chiếu</label>
                                    <input type="date" className="form-control" {...register("show_date")} />
                                    {errors.show_date && (<span className="text-danger">{errors.show_date.message}</span>)}
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-4">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Giờ chiếu</label>
                                    <input type="time" className="form-control" {...register("show_time")} />
                                    {errors.show_time && (<span className="text-danger">{errors.show_time.message}</span>)}
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-12">
                                <Button loading={isPending} htmlType="submit" type="primary">Thêm mới</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ShowTimeCreate