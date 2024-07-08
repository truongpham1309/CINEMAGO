import { deleteTicketByID, getAllTicket } from "@/services/ticket/ticketService"
import { DeleteFilled, InfoCircleTwoTone } from "@ant-design/icons"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button, Popconfirm, TableProps } from "antd"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export const useTicketQuery = () => {
    const { mutate, isPending } = useTicketMutation({ type: "DELETE" });
    const tableTicket: TableProps<any>['columns'] = [
        {
            title: "#",
            key: "index",
            render: (_, __, index) => index + 1
        },
        {
            title: "Số ghế",
            align: "center",
            key: "seat_number",
            dataIndex: "seat_number",
        },
        {
            title: "Loại ghế",
            align: "center",
            key: "type",
            dataIndex: "type",
        },
        {
            title: "Thao tác",
            key: "actions",
            align: "center",
            render: (record) => (
                <>
                    <Link className="mx-3" to={`/dashboard/booking/detail/${record.booking_id}`}>Chi tiết</Link>
                    <Popconfirm
                        title="Xóa Vé?"
                        icon={<InfoCircleTwoTone />}
                        description="Bạn có chắc chắn muốn xóa vé này?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => mutate(record)}
                    >
                        <Button icon={<DeleteFilled />} className="btn-danger"></Button>
                    </Popconfirm>

                </>
            )
        }
    ]
    const ticket = useQuery({
        queryKey: ['TICKETS'],
        queryFn: async () => {
            return await getAllTicket();
        }
    });

    return { ...ticket, tableTicket, isPending }
}


export const useTicketMutation = ({ type }: { type: "UPDATE" | "DELETE" }) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (agrument: any) => {
            switch (type) {
                case "UPDATE":
                    toast.warning("Tính năng chưa phát triển!");
                    break;
                case "DELETE":
                    return await deleteTicketByID(agrument.id);
                default: toast.warning("Thao tác không hợp lệ!");
            }
        },
        onSuccess: () => {
            switch (type) {
                case "UPDATE":
                    break;
                case "DELETE":
                    toast.success("Đã xóa vé!");
                    break;
            }
            queryClient.invalidateQueries({
                queryKey: ['TICKETS']
            })
        },
        onError: () => {
            switch (type) {
                case "UPDATE":
                    break;
                case "DELETE":
                    toast.error("Không thể xóa vé này!");
                    break;
            }
        }
    });

    return { ...mutation }
}