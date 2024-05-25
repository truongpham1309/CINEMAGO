import { TRoomsCinema } from "@/common/types/cinema/roomsCinema";
import { RoomsCinemaSchema } from "@/common/validations/cinema/roomsCinemaValid";
import { createRoomsCinema, getAllRooms } from "@/services/cinema/cinemaRoomsCinema";
import { getAllScreen } from "@/services/screen/screenService";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useRoomCinemaQuery = () => {
    const query = useQuery({
        queryKey: ['CINEMA-SCREEN'],
        queryFn: async () => {
            const data = await getAllRooms();
            return data;
        }
    });
    return { ...query }
}

export const useRoomsCinemaMutation = ({ type }: { type: "CREATE" | "DELETE" | "UPDATE" }) => {
    const { idCinema } = useParams();
    const queryClient = useQueryClient();
    const form = useForm({
        resolver: joiResolver(RoomsCinemaSchema),
        defaultValues: {
            cinema_id: +idCinema!,
            screen_id: 0,
        }
    })
    const navigate = useNavigate();
    const { data, ...rest } = useQuery({
        queryKey: ['SCREEN'],
        queryFn: async () => {
            const data = await getAllScreen();
            return data;
        }
    });

    const mutation = useMutation({
        mutationFn: async (roomCinema: TRoomsCinema) => {
            switch (type) {
                case "CREATE":
                    await createRoomsCinema(roomCinema);
                    break;

                default: throw new Error("Thao tác không hợp lệ!");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['ROOMS'],
            });
            switch (type) {
                case "CREATE":
                    navigate(`/dashboard/cinema/${idCinema}/room-cinema`);
                    toast.success('Đã thêm mới phòng chiếu!');
                    break;
            }
        },
        onError: () => {
            switch (type) {
                case "CREATE":
                    toast.error('Không thể thêm mới phòng chiếu!');
                    break;
            }
        }
    });

    const onMutationRooms: SubmitHandler<TRoomsCinema> = (data) => {
        mutation.mutate(data);
        console.log(data);
    }

    return { ...mutation, data, ...rest, idCinema, onMutationRooms, ...form }

}