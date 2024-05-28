import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import { useRoomCinemaQuery } from "../../RoomsCinema/hooks/useRoomsCinema";
import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { SeatMapSchema } from "@/common/validations/seats/seatMapType";
import { createSeatMap } from "@/services/seats/seatMap";
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
        mutationFn: async (data) => {
            switch (type) {
                case "CREATE":
                    return await createSeatMap(data);
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
            }
        },
        onError: () => {
            switch (type) {
                case "CREATE":
                    toast.error("Thông tin không hợp lệ!");
                    break;
            }
        }
    });

    const onSeatMapMutation: SubmitHandler<any> = (data) => {
        mutation.mutate(data);
    }

    return { ...form, ...mutation, ...cinema_screen, onSeatMapMutation }
}