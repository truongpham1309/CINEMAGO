import { SeatTypeSchema } from "@/common/validations/seats/seatType";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { createSeatType } from "@/services/seats/seatTypeService";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ServerError from "../../_components/500";

const SeatTypeCreatePage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(SeatTypeSchema),
        defaultValues: {
            name: "",
        }
    });
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: create, isPending, isError } = useMutation({
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
    })
    const onSubmit: SubmitHandler<any> = (data) => {
        create(data);
    }
    if (isPending) return <LoadingComponent />
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