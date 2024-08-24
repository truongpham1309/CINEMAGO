import LoadingComponent from "@/components/ui/LoadingComponent";
import { deleteCinemaByID, getAllCinemas } from "@/services/cinema/cinemaService";
import { DeleteFilled, EditFilled, InfoCircleOutlined, InfoCircleTwoTone } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Table, TableProps } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ServerError from "../../_components/500";
import confirm from "antd/es/modal/confirm";

const CinemaListPage = () => {
    const queryClient = useQueryClient();
    const tableCinema: TableProps<any>['columns'] = [
        {
            title: "#",
            key: "index",
            render: (__, _, index) => index + 1
        },
        {
            title: "Tên rạp phim",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Thành phố",
            key: "city",
            dataIndex: "city",
        },
        {
            title: "",
            key: "action",
            render: (record) => <>
                <Link className="mx-2" to={`/dashboard/cinema/edit/${record.id}`}><Button className="btn-success" icon={<EditFilled />}></Button></Link>
                <Button onClick={() => onDeleteCinema(record.id)} className="btn-danger" icon={<DeleteFilled />}></Button>
            </>
        },
        {
            title: "",
            key: "detail",
            render: (record) => <>
                <Link className="mx-2" to={`/dashboard/room-cinema/detail/${record.id}`}>Chi tiết</Link>
            </>
        }
    ];
    const { mutate, isPending } = useMutation({
        mutationFn: async (id: number) => {
            const data = await deleteCinemaByID(id);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['CINEMAS'],
            });
            toast.success("Đã xóa rạp chiếu phim!");
        },
        onError: () => {
            toast.error("Xóa không thành công, vui lòng thử lại!");
        }
    })
    const { data, isLoading, isError } = useQuery({
        queryKey: ['CINEMAS'],
        queryFn: async () => {
            const data = await getAllCinemas();
            return data;
        }
    });
    const onDeleteCinema = (id: number) => {
        confirm({
            title: "Bạn có chắc chắn muốn xóa rạp chiếu này?",
            icon: <InfoCircleTwoTone />,
            content: "Nhấn OK để xóa",
            okText: 'Yes',
            okType: 'primary',
            okCancel: true,
            cancelText: 'Hủy',
            onOk() {
                mutate(id);
            }
        })
    }
    if (isLoading || isPending) return <LoadingComponent />;
    if (isError) return <ServerError />;
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Danh sách rạp phim</h6>
                </div>
                <div className="card-body">
                    <Table columns={tableCinema} dataSource={data.data.cinemas} rowKey={record => record.id} pagination={false} />
                </div>
            </div>
        </>
    )
}

export default CinemaListPage