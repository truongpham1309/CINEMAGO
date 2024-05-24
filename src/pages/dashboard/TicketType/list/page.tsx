import { TTicketType } from "@/common/types/ticket/ticketType";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { deleteTicketTypeByID, getAllTickKetType } from "@/services/ticket/ticketTypeService";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Table, TableProps } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ServerError from "../../_components/500";

const TicketTypeListPage = () => {
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['TICKET-TYPE'],
        queryFn: async () => {
            const data = await getAllTickKetType();
            // console.log(data.data.ticketTypes);
            return data;
        }
    });

    const { mutate: deleteTicketType, isPending } = useMutation({
        mutationFn: async (id: number) => {
            await deleteTicketTypeByID(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['TICKET-TYPE'],
            }),
            toast.success("Đã xóa loại vé!", {
                position: "top-center",
            });
        },
        onError: () => {
            toast.error("Không thể xóa loại vé này!");
        }
    });
    const onDeleteTicketType = (id: number) => {
        if(!confirm("Bạn có chắc chắn muốn xóa loại vé này!")) return;
        deleteTicketType(id)
    }
    
    const tableTicketType: TableProps<TTicketType>['columns'] = [
        {
            title: "#",
            key: "index",
            render: (__, _, index) => index + 1
        },
        {
            title: "Loại vé",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Loại ghế",
            dataIndex: "seat_type_name",
            key: "seat_type_name",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Giá ưu đãi",
            dataIndex: "promotion_price",
            key: "promotion_price",
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => <>
                <Link className="mx-2" to={`/dashboard/ticket-type/edit/${record.id}`}><Button><EditFilled /></Button></Link>
                <Button onClick={() => onDeleteTicketType(record.id!)} danger><DeleteFilled /></Button>
            </>
        }
    ];
    if(isLoading || isPending) return <LoadingComponent />;
    if(isError) return <ServerError />
    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-uppercase">Danh sách loại vé</h6>
                </div>
                <div className="card-body">
                    <Table columns={tableTicketType} rowKey={record => record.id!} dataSource={data.data.ticketTypes} pagination={false} />
                </div>
            </div>
        </>
    )
}

export default TicketTypeListPage