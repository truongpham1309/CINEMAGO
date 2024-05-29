import { Button } from "antd"
import { useServiceMutation } from "../_hook/useService"

const ServiceCreatePage = () => {
    const { register, formState: { errors }, handleSubmit, onMutationService, isPending } = useServiceMutation({ type: "CREATE" });
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Tạo mới dịch vụ</h6>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onMutationService)}>
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
                                <Button htmlType="submit" loading={isPending} type="primary">Thêm mới</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ServiceCreatePage