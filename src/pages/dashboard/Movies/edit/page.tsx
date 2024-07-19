import { TMovie } from "@/common/types/movie";
import { MovieSchemaUpdate } from "@/common/validations/movie/movieValid";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { updateMovieByID } from "@/services/movie/movieService";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ServerError from "../../_components/500";
import { uploadImage } from "@/common/libs/uploadImage";
import { formatDateToString } from "@/common/libs/formatDateToString";
import { Button } from "antd";

const MovieEditPage = () => {
    const { id: idMovie } = useParams();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<TMovie>({
        resolver: joiResolver(MovieSchemaUpdate),
    });
    const { data, isLoading, isError } = useQuery({
        queryKey: ['MOVIES', idMovie],
        queryFn: async () => {
            try {
                const { data } = await axios.get(`/dashboard/movie/${idMovie}`);
                reset(data.data.movie);
                console.log(MovieSchemaUpdate.validate(data.data.movie));
                return data
            } catch (error: any) {
                console.log(error);
                throw new Error(error);
            }
        }
    });
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: async (movie: TMovie) => {
            const data = await updateMovieByID(movie);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['MOVIES']
            });
            toast.success("Cập nhật phim thành công!");
            navigate("/dashboard/movie");
        },
        onError: (err: Error) => {
            toast.error(err.message || "");
            toast.error("Cập nhật phim thất bại!");
        },
    })

    const onSubmit: SubmitHandler<TMovie> = async (data) => {
        // Định dạng lại ngày
        const date_fomat = formatDateToString(data.release_date);
        let image_URL = data.image;
        // Kiểm tra Ảnh có được thêm mới hay không?
        if (typeof image_URL === 'object') {
            image_URL = await uploadImage(image_URL);
        }
        mutate({ ...data, image: image_URL, release_date: date_fomat });
        console.log({ ...data, image: image_URL, release_date: date_fomat });
    }

    if (isPending || isLoading) return <LoadingComponent />
    if (isError) return <ServerError />
    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary text-uppercase">Cập nhật PHIM {data.data.movie.title}</h6>
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
                                    <option value="Coming Soon">Sắp chiếu</option>
                                    <option value="Currently Showing">Đang chiếu</option>
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
                        <div className="col-sm-6 col-md-3">
                            <div>
                                <label className="text-gray-800" htmlFor="">Ngày khởi chiếu</label>
                                <input type="date" {...register("release_date")} className="form-control" />
                                {errors.release_date && <span className="text-danger">{errors.release_date.message}</span>}
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <div>
                                <label className="text-gray-800" htmlFor="">Ngày dừng chiếu</label>
                                <input type="date" {...register("end_date")} className="form-control" />
                                {errors.end_date && <span className="text-danger">{errors.end_date.message}</span>}
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <div>
                                <label className="text-gray-800" htmlFor="">Ảnh</label>
                                <input type="file" {...register("image")} className="form-control" />
                                {errors.image && <span className="text-danger">{errors.image.message}</span>}
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3">
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
                            <Button htmlType="submit" type="primary" >Cập nhật</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MovieEditPage