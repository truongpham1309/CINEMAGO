import { useSeatTypeQuery } from "@/common/hooks/seatType/useSeatType";
import { SeatType } from "@/common/types/seat";
import { TicketTypeSchema } from "@/common/validations/ticket/ticketTypeValid";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import ServerError from "../../_components/500";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TTicketType } from "@/common/types/ticket/ticketType";
import { createTicketType } from "@/services/ticket/ticketTypeService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TicketTypeCreatePage = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(TicketTypeSchema),
        defaultValues: {
            name: "",
            seat_type_id: 0,
            price: 0,
            promotion_price: 0,
        }
    });
    const { data: seatTList, isLoading, isError } = useSeatTypeQuery();
    const { mutate: createTicket, isPending } = useMutation({
        mutationFn: async (ticketType: TTicketType) => {
            const data = await createTicketType(ticketType);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['TICKET-TYPE'],
            });
            toast.success("Thêm loại vé thành công!");
            navigate('/dashboard/ticket-type');
        },
        onError: () => {
            toast.error("Thêm loại vé không thành công!");
        }
    });
    const onSubmitCreate: SubmitHandler<any> = (data) => {
        createTicket(data);
    };
    if (isLoading || isPending) return <LoadingComponent />
    if (isError) return <ServerError />;
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Tạo mới loại vé</h6>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmitCreate)}>
                        <div className="row mt-3">
                            <div className="col-sm-12 col-md-6">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Tên loại vé</label>
                                    <input type="text" {...register("name")} placeholder="Tên loại vé..." className="form-control" />
                                    {errors.name && (<span className="text-danger">{errors.name.message}</span>)}
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Loại ghế</label>
                                    <select {...register("seat_type_id")} className="form-control">
                                        <option className="form-control">Chọn loại ghế</option>
                                        {seatTList?.seatTypes?.map((seatType: SeatType, index: number) => (
                                            <option className="form-control" key={index + 1} value={seatType.id}>{seatType.name}</option>
                                        ))}
                                    </select>
                                    {errors.seat_type_id && (<span className="text-danger">{errors.seat_type_id.message}</span>)}
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
                            <div className="col-sm-12">
                                <Button loading={isPending} htmlType="submit" className="btn-primary">Thêm mới</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default TicketTypeCreatePage