import { Button } from "antd"
import { useServiceMutation } from "../_hook/useService"
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getDetailService } from "@/services/service/callAPIService";
import LoadingComponent from "@/components/ui/LoadingComponent";
import ServerError from "../../_components/500";

const ServiceEditPage = () => {
    const { register, formState: { errors }, reset, handleSubmit, isPending, mutate } = useServiceMutation({ type: "UPDATE" });
    const { id: idService } = useParams();
    const { isLoading, isError } = useQuery({
        queryKey: ['SERVICES', +idService!],
        queryFn: async () => {
            const data = await getDetailService(+idService!);
            reset(data.data.service);
            return data
        }
    });

    const onSubmit = (data: any) => {
        mutate(data)
    }
    if (isLoading) return <LoadingComponent />
    if (isError) return <ServerError />
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Cập nhật dịch vụ</h6>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row mt-3">
                            <div className="col-sm-12 col-md-4">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Tên dịch vụ</label>
                                    <input type="text" {...register("name")} placeholder="Tên dịch vụ..." className="form-control" />
                                    {errors.name && (<span className="text-danger">{errors.name.message}</span>)}
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Giá</label>
                                    <input type="text" {...register("price")} placeholder="Giá dịch vụ..." className="form-control" />
                                    {errors.price && (<span className="text-danger">{errors.price.message}</span>)}
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-4">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Số lượng</label>
                                    <input type="text" {...register("quantity")} placeholder="Số lượng..." className="form-control" />
                                    {errors.quantity && (<span className="text-danger">{errors.quantity.message}</span>)}
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-12">
                                <Button htmlType="submit" loading={isPending} className="btn-success">Cập nhật</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ServiceEditPage