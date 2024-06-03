import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import { useMovieQuery } from "../../Movies/_hooks/useMovie";
import { useRoomCinemaQuery } from "../../RoomsCinema/hooks/useRoomsCinema";
import { toast } from "react-toastify";
import { createShowTime } from "@/services/showTime/showTimeService";

export const useShowTimeMutation = ({ type }: { type: "CREATE" | "UPDATE" | "DELETE" }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const movie = useMovieQuery();
    const cinema = useRoomCinemaQuery();

    const mutation = useMutation({
        mutationFn: async (show_time) => {
            switch (type) {
                case "CREATE":
                    await createShowTime(show_time);
                    break;
                default: toast.warning("Thao tác không hợp lệ!");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['SHOW-TIME']
            });
            switch (type) {
                case "CREATE":
                    navigate('/dashboard/show-time');
                    toast.success("Đã thêm mới xuất chiếu!");
                    break;
                case "UPDATE":
                    navigate('/dashboard/show-time');
                    toast.success("Đã cập nhật xuất chiếu!");
                    break;
                case "DELETE":
                    toast.success("Đã xóa xuất chiếu!");
                    break;
                default: toast.warning("Thao tác không hợp lệ!");
            }
        },
        onError: () => {
            switch (type) {
                case "CREATE":
                    toast.error("Không thể thêm xuất chiếu!");
                    break;
                case "UPDATE":
                    toast.error("Không thể cập nhật xuất chiếu!");
                    break;
                case "DELETE":
                    toast.error("Không thể xóa xuất chiếu!");
                    break;
            }
        }
    })

    return { movie, cinema, ...mutation }
}