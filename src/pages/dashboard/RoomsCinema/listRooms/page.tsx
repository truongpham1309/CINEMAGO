import { TRoomsCinemaData } from '@/common/types/cinema/roomsCinema';
import LoadingComponent from '@/components/ui/LoadingComponent';
import { DeleteFilled, EditFilled, InfoCircleTwoTone, Loading3QuartersOutlined } from '@ant-design/icons';
import { Alert, Button, Table, TableProps } from 'antd';
import confirm from 'antd/es/modal/confirm';
import { Link } from 'react-router-dom';
import ServerError from '../../_components/500';
import { useRoomCinemaQuery, useRoomsCinemaMutation } from '../hooks/useRoomsCinema';

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
            render: (record) => `${record.cinema} - ${record.screen}`
        },
        {
            title: "Chi tiết",
            key: "action",
            align: "center",
            render: (record) => <>
                <Link title='Sửa' className='mx-3' to={`/dashboard/room-cinema/edit/${record.id}`}><Button className='btn-success' icon={<EditFilled />}></Button></Link>
                <Button onClick={() => onDelete(record)} icon={<DeleteFilled />} className='btn-danger'></Button>
            </>
        }
    ];
    const { mutate, isPending, isErrorRoom, errorRoom } = useRoomsCinemaMutation({ type: "DELETE" });
    const onDelete = (record: any) => {
        confirm({
            title: "Bạn có chắc chắn muốn xóa phòng chiếu này?",
            icon: <InfoCircleTwoTone />,
            content: "Nhấn OK để xóa",
            okText: 'OK',
            okType: 'primary',
            okCancel: true,
            cancelText: 'Hủy',
            onOk() {
                mutate(record);
            }
        })
    }
    console.log(isErrorRoom)
    const { data, isLoading, isError } = useRoomCinemaQuery();
    if (isLoading || isPending) return <LoadingComponent />;
    if (isError) return <ServerError />
    return (
        <>
            {data.data.cinemaScreens.length === 0 ? <Alert
                message="Warning"
                description="Hiện tại chưa có phòng chiếu nào!"
                type="warning"
                showIcon
                closable
            /> : (
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary text-uppercase">Danh sách phòng chiếu</h6>
                    </div>
                    {isErrorRoom && (<Alert type="warning" message={"Bạn không thể xóa rạp!"} description={typeof ((errorRoom as any)?.response?.data?.message) === "string" ? (errorRoom as any)?.response?.data?.message :
                    <>
                        <ul>
                            {
                                (errorRoom as any)?.response?.data?.message.map((err: any, index: number) => (
                                    <li key={index}>
                                        {err}
                                    </li>
                                ))
                            }
                        </ul>
                    </>
                } />)}
                    <div className="card-body">
                        <Table columns={tableRooms} rowKey={record => record.id} dataSource={data.data.cinemaScreens} pagination={false} />
                    </div>
                </div>
            )}

        </>
    )
}

export default RoomsListDashBoardCinema