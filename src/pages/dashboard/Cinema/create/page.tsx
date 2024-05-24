import { CinemaSchema } from "@/common/validations/cinema/cinemaValid";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { createCinema } from "@/services/cinema/cinemaService";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CinemaCreatePage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(CinemaSchema),
        defaultValues: {
            name: "",
            city: "",
        }
    });
    const { mutate, isPending } = useMutation({
        mutationFn: async (cinema: { name: string, city: string }) => {
            const data = await createCinema(cinema);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['CINEMA'],
            });
            navigate('/dasboard/cinema');
            toast.success("Đã thêm rạp chiếu phim!");
        },
        onError: () => {
            toast.error("Không thể thêm rạp phim, vui lòng kiểm tra lại!");
        }
    })
    const onCreateCinema: SubmitHandler<any> = (data) => {
        mutate(data);
    }
    if (isPending) return <LoadingComponent />
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Tạo mới rạp chiếu phim</h6>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onCreateCinema)}>
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
                                <Button htmlType="submit" className="btn-primary">Thêm mới</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CinemaCreatePage