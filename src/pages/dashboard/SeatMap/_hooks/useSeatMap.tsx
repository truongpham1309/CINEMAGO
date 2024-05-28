import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import { useRoomCinemaQuery } from "../../RoomsCinema/hooks/useRoomsCinema";
import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { SeatMapSchema } from "@/common/validations/seats/seatMapType";
import { createSeatMap, deleteSeatMapByID, getAllListSeatMaps, getDetailSeatMap } from "@/services/seats/seatMap";
import { toast } from "react-toastify";


export const useSeatMapMutation = ({ type }: { type: "CREATE" | "EDIT" | "DELETE" }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const cinema_screen = useRoomCinemaQuery();
    const form = useForm({
        resolver: joiResolver(SeatMapSchema),
        defaultValues: {
            cinema_screen_id: 0,
            total_row: 0,
            total_column: 0,
            seat_total: 0,
            layout: ""
        }
    });
    const mutation = useMutation({
        mutationFn: async (data: any) => {
            switch (type) {
                case "CREATE":
                    return await createSeatMap(data);
                case "DELETE":
                    await deleteSeatMapByID(data);
                    break;
                default: toast.warning("Thao tác không hợp lệ!");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['SEAT-MAP'],
            });
            switch (type) {
                case "CREATE":
                    navigate("/dashboard/seat-map");
                    toast.success("Đã tạo mới bản đồ ghế!");
                    break;
                case "DELETE":
                    toast.success("Đã xóa bản đồ ghế!");
                    break;
            }
        },
        onError: () => {
            switch (type) {
                case "CREATE":
                    toast.error("Thông tin không hợp lệ!");
                    break;
                case "DELETE":
                    toast.error("Không thể xóa bản đồ ghế!");
                    break;
            }
        }
    });

    const onSeatMapMutation: SubmitHandler<any> = (data) => {
        mutation.mutate(data);
    }

    return { ...form, ...mutation, ...cinema_screen, onSeatMapMutation }
}

export const useSeatMapQuery = (id = 0) => {
    const query = useQuery({
        queryKey: ['SEAT-MAP', id],
        queryFn: async () => {
            return id ? await getDetailSeatMap(id) : await getAllListSeatMaps();
        }
    });

    return { ...query };
}