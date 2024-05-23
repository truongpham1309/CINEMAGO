import { SeatType } from "@/common/types/seat";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { deleteSeatTypeByID, getAllSeatType } from "@/services/seats/seatTypeService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Table, TableProps } from "antd";
import { Link } from "react-router-dom";
import ServerError from "../../_components/500";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { toast } from "react-toastify";

const SeatTypeListPage = () => {
    const queryClient = useQueryClient();
    const tableSeatType: TableProps<SeatType>['columns'] = [
        {
            title: "#",
            key: "index",
            render: (record, text, index) => index + 1
        },
        {
            title: "Tên loại ghế",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Thao tác",
            key: "actions",
            render: (record) => <>
                <Link className="mx-2" to={`/dashboard/seattype/edit/${record.id}`}><Button><EditOutlined /></Button></Link>
                <Button loading={isPending} onClick={() => onDelete(record.id)} danger><DeleteOutlined /></Button>
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
        deleteSeatType(id);
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['SEAT-TYPE'],
        queryFn: async () => {
            const data = await getAllSeatType();
            return data;
        }
    });
    if (isLoading) return <LoadingComponent />;
    if (isError) return <ServerError />;
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">DANH SÁCH LOẠI GHẾ</h6>
                </div>
                <div className="card-body" style={{width: "600px"}}>
                    <Table columns={tableSeatType} rowKey={record => record.id} size="small" dataSource={data.data.seatTypes} pagination={false} />
                </div>
            </div>
        </>
    )
}

export default SeatTypeListPage