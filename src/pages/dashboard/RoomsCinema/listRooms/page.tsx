import { TRoomsCinemaData } from '@/common/types/cinema/roomsCinema';
import { Table, TableProps } from 'antd';
import { useRoomCinemaQuery } from '../hooks/useRoomsCinema';
import { Link } from 'react-router-dom';
import { EditFilled, InfoCircleFilled } from '@ant-design/icons';
import LoadingComponent from '@/components/ui/LoadingComponent';
import ServerError from '../../_components/500';

const RoomsListDashBoardCinema = () => {
    const tableRooms: TableProps<TRoomsCinemaData>['columns'] = [
        {
            title: "#",
            key: "index",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Tên phòng chiếu",
            key: "name",
            align: "center",
            render: (record) => `${record.name} - ${record.screen}`
        },
        {
            title: "Địa chỉ",
            key: "city",
            dataIndex: "city"
        },
        {
            title: "Chi tiết",
            key: "action",
            align: "center",
            render: (record) => <>
                <Link title='Sửa' className='mx-3' to={`/dashboard/room-cinema/edit/${record.id}`}><EditFilled /></Link>
                <Link to={`/dashboard/room-cinema/detail/${record.id}`}><InfoCircleFilled /></Link>
            </>
        }
    ];
    const { data, isLoading, isError } = useRoomCinemaQuery();
    if (isLoading) return <LoadingComponent />;
    if (isError) return <ServerError />
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Danh sách phòng chiếu</h6>
                </div>
                <div className="card-body">
                    <Table columns={tableRooms} rowKey={record => record.id} dataSource={data.data.cinemaScreens} pagination={false} />
                </div>
            </div>
        </>
    )
}

export default RoomsListDashBoardCinema