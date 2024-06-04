import { createSeat } from "@/services/seats/seatService";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRoomCinemaQuery } from "../../RoomsCinema/hooks/useRoomsCinema";
import { useSeatTypeQuery } from "@/common/hooks/seatType/useSeatType";

export const useSeatMutation = ({ type }: { type: "CREATE" | "UPDATE" | "DELETE" }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const cinemaScreen = useRoomCinemaQuery();
    const seatType = useSeatTypeQuery();
    const mutation = useMutation({
        mutationFn: async (seat) => {
            switch (type) {
                case "CREATE":
                    await createSeat(seat);
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