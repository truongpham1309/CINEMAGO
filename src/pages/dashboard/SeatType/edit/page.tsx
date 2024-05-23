import { SeatType } from "@/common/types/seat";
import { SeatTypeSchema } from "@/common/validations/seats/seatType";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { getDetailSeatType, updateSeatTypeByID } from "@/services/seats/seatTypeService";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ServerError from "../../_components/500";

const SeatTypeEditPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: joiResolver(SeatTypeSchema),
        defaultValues: {
            name: "",
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
    const { mutate: update, isPending } = useMutation({
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
    })
    const onSubmit: SubmitHandler<any> = (data) => {
        update(data);
    }
    if (isPending || isLoading) return <LoadingComponent />
    if (isError) return <ServerError />
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Cập nhật loại ghế</h6>
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
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-12 col-md-12">
                                <Button className="btn-success" htmlType="submit" type="primary">Cập nhật</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SeatTypeEditPage