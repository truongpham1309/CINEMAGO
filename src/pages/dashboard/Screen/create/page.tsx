import { Button } from "antd";
import { useScreenMutation } from "../hooks/useScreen"

const ScreenCreatePage = () => {
    const { handleSubmit, onMutate, register, formState: { errors }, isPending } = useScreenMutation({ action: "CREATE" });
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Tạo mới màn hình chiếu</h6>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onMutate)}>
                        <div className="row mt-3">
                            <div className="col-sm-12 col-md-6">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Tên màn hình</label>
                                    <input type="text" {...register("name")} placeholder="Tên màn hình..." className="form-control" />
                                    {errors.name && (<span className="text-danger">{errors.name.message}</span>)}
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-12 col-md-12">
                                <Button loading={isPending} htmlType="submit" type="primary">Thêm mới</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ScreenCreatePage