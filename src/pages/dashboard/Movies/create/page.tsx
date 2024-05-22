import { TMovieCreate } from "@/common/types/movie";
import { MovieSchema } from "@/common/validations/movie/movieValid";
import { joiResolver } from "@hookform/resolvers/joi";
import { SubmitHandler, useForm } from "react-hook-form"

const MovieCreatePage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<TMovieCreate>({
        resolver: joiResolver(MovieSchema),
        defaultValues: {
            title: "",
            actor: "",
            duration: 0,
            director: "",
            image: [],
            trailer: "",
            rated: "",
            status: "",
            release_date: "",
            description: "",
        }
    });

    const onSubmit: SubmitHandler<TMovieCreate> = (data) => {
        console.log(data);
    }
    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Tạo mới phim</h6>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mt-3">
                        <div className="col-sm-12 col-md-6">
                            <div>
                                <label className="text-gray-800" htmlFor="">Tên phim</label>
                                <input type="text" {...register("title")} placeholder="Tên phim..." className="form-control" />
                                {errors.title && (<span className="text-danger">{errors.title.message}</span>)}
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div>
                                <label className="text-gray-800" htmlFor="">Thể loại</label>
                                <input type="text" {...register("genre")} placeholder="Thể loại..." className="form-control" />
                                {errors.genre && <span className="text-danger">{errors.genre.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-sm-12 col-md-6">
                            <div>
                                <label className="text-gray-800" htmlFor="">Đạo diễn</label>
                                <input type="text" {...register("director")} placeholder="Đạo diễn..." className="form-control" />
                                {errors.director && <span className="text-danger">{errors.director.message}</span>}
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div>
                                <label className="text-gray-800" htmlFor="">Diễn viên</label>
                                <input type="text" {...register("actor")} placeholder="Diễn viên..." className="form-control" />
                                {errors.actor && <span className="text-danger">{errors.actor.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-sm-6 col-md-4">
                            <div>
                                <label className="text-gray-800" htmlFor="">Thời lượng(phút)</label>
                                <input type="number" {...register("duration")} placeholder="Thời lượng..." className="form-control" />
                                {errors.duration && <span className="text-danger">{errors.duration.message}</span>}
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div>
                                <label className="text-gray-800" htmlFor="">Trạng thái</label>
                                <select {...register('status')} className="form-control">
                                    <option value="">Chọn trạng thái</option>
                                    <option value="ComingSoon">Sắp chiếu</option>
                                    <option value="CurrentlyShowing">Đang chiếu</option>
                                </select>
                                {errors.status && <span className="text-danger">{errors.status.message}</span>}
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div>
                                <label className="text-gray-800" htmlFor="">Độ tuổi</label>
                                <select {...register("rated")} className="form-control">
                                    <option value="">Chọn độ tuổi</option>
                                    <option value={"P"}>Mọi lứa tuổi</option>
                                    <option value={"C13"}>Trên 13 tuổi</option>
                                    <option value={"C16"}>Trên 16 tuổi</option>
                                    <option value={"C18"}>Trên 18 tuổi</option>
                                </select>
                                {errors.rated && <span className="text-danger">{errors.rated.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-sm-6 col-md-4">
                            <div>
                                <label className="text-gray-800" htmlFor="">Ngày khởi chiếu</label>
                                <input type="date" {...register("release_date")} className="form-control" />
                                {errors.release_date && <span className="text-danger">{errors.release_date.message}</span>}
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div>
                                <label className="text-gray-800" htmlFor="">Image</label>
                                <input type="file" {...register("image")} className="form-control" />
                                {errors.image && <span className="text-danger">{errors.image.message}</span>}
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div>
                                <label className="text-gray-800" htmlFor="">Trailer(URL)</label>
                                <input type="text" {...register("trailer")} placeholder="Trailer..." className="form-control" />
                                {errors.trailer && <span className="text-danger">{errors.trailer.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-sm-12 col-md-12">
                            <div>
                                <label className="text-gray-800" htmlFor="">Mô tả</label>
                                <textarea className="form-control" {...register("description")} name="description" rows={4} placeholder="Mô tả..." ></textarea>
                                {errors.description && <span className="text-danger">{errors.description.message}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-sm-12 col-md-12">
                            <button type="submit" className="btn btn-primary py-0">Thêm mới</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default MovieCreatePage