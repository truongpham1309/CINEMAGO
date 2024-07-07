import { SeatType } from "@/common/types/seat";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { deleteSeatTypeByID, getAllSeatType } from "@/services/seats/seatTypeService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Table, TableProps } from "antd";
import { Link } from "react-router-dom";
import ServerError from "../../_components/500";
import { DeleteFilled, DeleteOutlined, EditFilled, EditOutlined, ExclamationCircleFilled, InfoCircleTwoTone } from "@ant-design/icons"
import { toast } from "react-toastify";
import confirm from "antd/es/modal/confirm";

const SeatTypeListPage = () => {
    const queryClient = useQueryClient();
    const tableSeatType: TableProps<SeatType>['columns'] = [
        {
            title: "#",
            key: "index",
            render: (_, __, index) => index + 1
        },
        {
            title: "Tên loại ghế",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Giá",
            key: "price",
            dataIndex: "price",
        },
        {
            title: "Giá ưu đãi",
            key: "promotion_price",
            dataIndex: "promotion_price",
        },
        {
            title: "Thao tác",
            key: "actions",
            render: (record) => <>
                <Link className="mr-2" to={`/dashboard/seattype/edit/${record.id}`}><Button icon={<EditFilled />} className="btn-success"></Button></Link>
                <Button className="btn-danger" onClick={() => onDelete(record.id)} icon={<DeleteFilled />}></Button>
            </>
        }
    ];
    const { mutate: deleteSeatType, isPending } = useMutation({
        mutationFn: async (id: number) => {
            await deleteSeatTypeByID(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['SEAT-TYPE'],
            });
            toast.success("Đã xóa loại ghế!");
        },
        onError: () => {
            toast.error("Không thể xóa loại ghế!")
        }
    });

    const onDelete = (id: number) => {
        confirm({
            title: "Bạn có chắc chắn muốn xóa loại ghế này?",
            icon: <InfoCircleTwoTone />,
            content: "Nhấn OK để xóa",
            okText: 'Yes',
            okType: 'primary',
            okCancel: true,
            cancelText: 'Hủy',
            onOk() {
                deleteSeatType(id);
            },
        })
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['SEAT-TYPE'],
        queryFn: async () => {
            const data = await getAllSeatType();
            return data;
        }
    });
    if (isLoading || isPending) return <LoadingComponent />;
    if (isError) return <ServerError />;
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">DANH SÁCH LOẠI GHẾ</h6>
                </div>
                <div className="card-body" >
                    <Table columns={tableSeatType} rowKey={record => record.id} dataSource={data.data.seatTypes} pagination={false} />
                </div>
            </div>
        </>
    )
}

export default SeatTypeListPage