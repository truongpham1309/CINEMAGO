import { TCinema } from "@/common/types/cinema/cinemaType";
import { CinemaSchema } from "@/common/validations/cinema/cinemaValid";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { getDetailCinemas, updateCinemaByID } from "@/services/cinema/cinemaService";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ServerError from "../../_components/500";

const CinemaEditPage = () => {
    const navigate = useNavigate();
    const { id: idCinema } = useParams();
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: joiResolver(CinemaSchema),
        defaultValues: {
            name: "",
            city: "",
        }
    });
    const { isLoading, isError } = useQuery({
        queryKey: ['CINEMAS', idCinema],
        queryFn: async () => {
            const data = await getDetailCinemas(+idCinema!);
            reset(data.data.cinema)
            return data
        }
    })
    const { mutate, isPending } = useMutation({
        mutationFn: async (cinema: TCinema) => {
            const data = await updateCinemaByID(cinema);
            
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['CINEMAS'],
            });
            navigate('/dashboard/cinema');
            toast.success("Đã cập nhật rạp chiếu phim!");
        },
        onError: () => {
            toast.error("Không thể cập nhật rạp phim, vui lòng kiểm tra lại thông tin!");
        }
    })
    const onUpdateCinema: SubmitHandler<any> = (data) => {
        mutate(data);
    }
    if (isPending || isLoading) return <LoadingComponent />
    if(isError) return <ServerError />
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Cập nhật rạp chiếu phim</h6>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onUpdateCinema)}>
                        <div className="row mt-3">
                            <div className="col-sm-12 col-md-6">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Tên rạp phim</label>
                                    <input type="text" {...register("name")} placeholder="Tên rạp phim..." className="form-control" />
                                    {errors.name && (<span className="text-danger">{errors.name.message}</span>)}
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Thành phố</label>
                                    <input type="text" {...register("city")} placeholder="Thành phố..." className="form-control" />
                                    {errors.city && (<span className="text-danger">{errors.city.message}</span>)}
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-12 col-md-6">
                                <Button htmlType="submit" className="btn-success">Cập nhật</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CinemaEditPage