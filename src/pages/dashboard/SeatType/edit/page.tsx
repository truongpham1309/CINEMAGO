import { SeatType } from "@/common/types/seat";
import { SeatTypeSchema } from "@/common/validations/seats/seatType";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { getDetailSeatType, updateSeatTypeByID } from "@/services/seats/seatTypeService";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ServerError from "../../_components/500";
import { useScreenQuery } from "../../Screen/hooks/useScreen";
import { WarningFilled } from "@ant-design/icons";

const SeatTypeEditPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: joiResolver(SeatTypeSchema),
        defaultValues: {
            name: "",
            price: 0,
            promotion_price: 0,
        }
    });
    const navigate = useNavigate();
    const { id: idSeatType } = useParams();
    const queryClient = useQueryClient();
    const { isLoading, isError } = useQuery({
        queryKey: ['SEAT-TYPE', idSeatType],
        queryFn: async () => {
            const data = await getDetailSeatType(+idSeatType!);
            reset(data.data.seatType);
            return data;
        }
    })
    const { mutate: update, isPending, isError: isErrorMutation, error } = useMutation({
        mutationFn: async (seatType: SeatType) => {
            const data = await updateSeatTypeByID(seatType)
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['SEAT-TYPE'],
            });
            toast.success("Cập nhật loại ghế thành công!");
            navigate("/dashboard/seattype");
        },
        onError: () => {
            toast.error("Không thể cập nhật loại ghế");
        }
    });
    const onSubmit: SubmitHandler<any> = (data) => {
        update(data);
    }
    if (isPending || isLoading) return <LoadingComponent />
    if (isError) return <ServerError />
    return (
        <>
            {isErrorMutation && (
                <Alert
                    type="error"
                    icon={<WarningFilled />}
                    className="mb-3"
                    message="Có lỗi xảy ra khi cập nhật loại ghế."
                    description={(error as any)?.response?.data?.message.name.map((_m: any) => _m)}
                />
            )}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Cập nhật loại ghế</h6>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row mt-3">
                            <div className="col-sm-12">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Tên Loại Ghế</label>
                                    <input type="text" {...register("name")} placeholder="Tên loại ghế..." className="form-control" />
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
                                <Button htmlType="submit" type="primary">Cập nhật</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SeatTypeEditPage