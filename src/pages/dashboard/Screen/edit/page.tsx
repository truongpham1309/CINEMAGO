import LoadingComponent from "@/components/ui/LoadingComponent";
import { getDetailScreen } from "@/services/screen/screenService";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { useParams } from "react-router-dom";
import ServerError from "../../_components/500";
import { useScreenMutation } from "../hooks/useScreen";

const ScreenEditPage = () => {
    const { handleSubmit, onMutate, register, formState: { errors }, isPending, reset } = useScreenMutation({ action: "EDIT" });
    const { id: idScreen } = useParams();

    const { isLoading, isError } = useQuery({
        queryKey: ['SCREEN', idScreen],
        queryFn: async () => {
            const data = await getDetailScreen(+idScreen!);
            reset(data.data.screen);
            return data;
        }
    })
    if (isLoading) return <LoadingComponent />;
    if (isError) return <ServerError />;
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Cập nhật màn hình chiếu</h6>
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
                                <Button loading={isPending} htmlType="submit" className="btn-success" type="default">Cập nhật</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ScreenEditPage