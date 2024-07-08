import { createSeat, deleteSeatByID, getAllSeat, updateSeatByID } from "@/services/seats/seatService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRoomCinemaQuery } from "../../RoomsCinema/hooks/useRoomsCinema";
import { useSeatTypeQuery } from "@/common/hooks/seatType/useSeatType";
import { Button, TableProps } from "antd";
import { DeleteFilled, EditFilled, InfoCircleTwoTone } from "@ant-design/icons";
import confirm from "antd/es/modal/confirm";

export const useSeatMutation = ({ type }: { type: "CREATE" | "UPDATE" | "DELETE" }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const cinemaScreen = useRoomCinemaQuery();
    const seatType = useSeatTypeQuery();
    const mutation = useMutation({
        mutationFn: async (seat: any) => {
            switch (type) {
                case "CREATE":
                    await createSeat(seat);
                    break;
                case "UPDATE":
                    console.log(seat);
                    await updateSeatByID(seat);
                    break;
                case "DELETE":
                    await deleteSeatByID(seat.id!);
                    break;
                default: toast.warning("Thao tác không hợp lệ!");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['SEATS'],
            });
            switch (type) {
                case "CREATE":
                    navigate('/dashboard/seat');
                    toast.success(`Đã thêm mới ghế!`);
                    break;
                case "UPDATE":
                    navigate('/dashboard/seat');
                    toast.success(`Đã cập nhật ghế!`);
                    break;
                case "DELETE":
                    toast.success(`Đã xóa ghế!`);
                    break;
                default: toast.warning("Thao tác không hợp lệ!");
            }
        },
        onError: () => {
            switch (type) {
                case "CREATE":
                    toast.error(`Không thể thêm mới ghế!`);
                    break;
                case "UPDATE":
                    toast.error("Không thể cập nhật ghế!");
                    break;
                case "DELETE":
                    toast.error("Không thể xóa ghế!");
            }
        }
    });

    return { ...mutation, cinemaScreen, seatType }
}

export const useSeatQuery = () => {
    const { mutate, isPending } = useSeatMutation({ type: "DELETE" });
    const onDeleteSeat = (data: any) => {
        confirm({
            title: "Bạn có chắc chắn muốn xóa ghế này?",
            icon: <InfoCircleTwoTone />,
            content: "Nhấn OK để xóa",
            okText: 'Yes',
            okType: 'primary',
            okCancel: true,
            cancelText: 'Hủy',
            onOk() {
                mutate(data);
            }
        })
    };
    const seat = useQuery({
        queryKey: ['SEATS'],
        queryFn: async () => {
            const data = await getAllSeat();
            return data
        }
    });
    const columnsSeat: TableProps<any>['columns'] = [
        {
            title: "#",
            key: "index",
            render: (_, __, index) => index + 1
        },
        {
            title: "Rạp",
            key: "cinema",
            render: (record) => `${record.cinema} - ${record.screen}`
        },
        {
            title: "Số ghế",
            key: "seat_number",
            dataIndex: "seat_number",
        },
        {
            title: "Loại ghế",
            key: "seat_type",
            dataIndex: "seat_type",
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
        },
        {
            title: "Thao tác",
            key: "action",
            render: (record) => <>
                <Link className="mr-3" to={`/dashboard/seat/edit/${record.id}`}><Button className="btn-success" icon={<EditFilled />}></Button></Link>
                <Button onClick={() => onDeleteSeat(record)} className="btn-danger" icon={<DeleteFilled />}></Button>
            </>
        }
    ];
    return { columnsSeat, ...seat, isPending }
}