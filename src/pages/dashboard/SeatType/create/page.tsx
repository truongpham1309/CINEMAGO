import { SeatTypeSchema } from "@/common/validations/seats/seatType";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { createSeatType } from "@/services/seats/seatTypeService";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ServerError from "../../_components/500";
import { useScreenQuery } from "../../Screen/hooks/useScreen";

const SeatTypeCreatePage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(SeatTypeSchema),
        defaultValues: {
            name: "",
            screen_id: 0,
            price: 0,
            promotion_price: 0
        }
    });
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: create, isPending } = useMutation({
        mutationFn: async (seatType) => {
            const data = await createSeatType(seatType)
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['SEAT-TYPE'],
            });
            toast.success("Thêm mới loại ghế thành công!");
            navigate("/dashboard/seattype");
        },
        onError: () => {
            toast.error("Thêm mới loại ghế không thành công!");
        }
    });

    const { data, isLoading, isError } = useScreenQuery();
    const onSubmit: SubmitHandler<any> = (data) => {
        create(data);
    }
    if (isPending || isLoading) return <LoadingComponent />;
    if (isError) return <ServerError />;
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Tạo mới loại ghế</h6>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row mt-3">
                            <div className="col-sm-12 col-md-6">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Tên Loại Ghế</label>
                                    <input type="text" {...register("name")} placeholder="Tên loại ghế..." className="form-control" />
                                    {errors.name && (<span className="text-danger">{errors.name.message}</span>)}
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Loại màn hình</label>
                                    <select className="form-control" {...register("screen_id")}>
                                        <option value={0}>Chọn loại màn hình</option>
                                        {data.data.screens.map((sc: any) => (
                                            <option value={sc.id} key={sc.id}>{sc.name}</option>
                                        ))}
                                    </select>
                                    {errors.name && (<span className="text-danger">{errors.name.message}</span>)}
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-12 col-md-6">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Giá vé</label>
                                    <input type="number" {...register("price")} placeholder="Giá vé..." className="form-control" />
                                    {errors.price && <span className="text-danger">{errors.price.message}</span>}
                                </div>

                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Giá ưu đãi</label>
                                    <input type="number" {...register("promotion_price")} placeholder="Giá vé..." className="form-control" />
                                    {errors.promotion_price && <span className="text-danger">{errors.promotion_price.message}</span>}
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-12 col-md-12">
                                <Button htmlType="submit" type="primary">Thêm mới</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SeatTypeCreatePage