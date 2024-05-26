import { TScreen } from '@/common/types/screen/screenType';
import LoadingComponent from '@/components/ui/LoadingComponent';
import { getDetailCinemaScreen } from '@/services/cinema/cinemaRoomsCinema';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import { useParams } from 'react-router-dom';
import ServerError from '../../_components/500';
import { useRoomsCinemaMutation } from '../hooks/useRoomsCinema';

const RoomCinemaEditPage = () => {
    const { handleSubmit, formState: { errors }, reset, onMutationRooms, register, idCinema, data: screens, isPending, isLoading, isError } = useRoomsCinemaMutation({ type: "UPDATE" });
    const { idRoom } = useParams();
    const { data: cinema, isLoading: isLoadingCinema, isError: isErrorCinema } = useQuery({
        queryKey: ['CINEMAS', idCinema],
        queryFn: async () => {
            const data = await getDetailCinemaScreen(+idRoom!);
            console.log(data.data.cinema);
            reset(data.data.cinema);
            return data;
        }
    });
    if (isLoading || isLoadingCinema) return <LoadingComponent />
    if (isErrorCinema || isError) return <ServerError />
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Cập nhật phòng chiếu {cinema.data.cinema.screen} {cinema.data.cinema.name} - {cinema.data.cinema.city}</h6>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onMutationRooms)}>
                        <div className="row mt-3">
                            <div className="col-sm-12 col-md-6">
                                <div>
                                    <label className="text-gray-800" htmlFor="">Loại màn hình</label>
                                    <select {...register("screen_id")} className="form-control" >
                                        <option>Chọn màn hình</option>
                                        {screens?.data?.screens.map((screen: TScreen) => (
                                            <option className='form-control' key={screen.id} value={screen.id}>{screen.name}</option>
                                        ))}
                                    </select>
                                    {errors.screen_id && (<span className="text-danger">{errors.screen_id.message}</span>)}
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-12 col-md-6">
                                <Button loading={isPending} htmlType="submit" className="btn-primary">Cập nhật</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RoomCinemaEditPage