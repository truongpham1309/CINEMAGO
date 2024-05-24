import { TScreen } from "@/common/types/screen/screenType";
import { ScreenSchema } from "@/common/validations/screen/screenValid";
import { createScreenDashBoard, deleteScreenByID, getAllScreen } from "@/services/screen/screenService";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type TActionScreen = {
    action: "EDIT" | "DELETE" | "CREATE",
}

export const useScreenQuery = (id = 0) => {
    const { data, ...rest } = useQuery({
        queryKey: ['SCREEN', id],
        queryFn: async () => {
            const data = await getAllScreen();
            return data;
        }
    });
    return { data, ...rest }
};

export const useScreenMutation = ({ action }: TActionScreen) => {
    const form = useForm({
        resolver: joiResolver(ScreenSchema),
        defaultValues: {
            name: "",
        }
    });
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (screen: TScreen) => {
            switch (action) {
                case "CREATE":
                    await createScreenDashBoard(screen);
                    break;
                case "DELETE":
                    await deleteScreenByID(screen.id!);
                    break;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['SCREEN']
            });
            switch (action) {
                case "CREATE":
                    navigate('/dashboard/screen');
                    toast.success("Đã thêm mới màn hình!");
                    break;
                case "DELETE":
                    toast.success("Đã xóa màn hình!");
                    break;
            }
        },
        onError: () => {
            switch (action) {
                case "CREATE":
                    toast.error("Không thể thêm mới màn hình!");
                    break;
                case "DELETE":
                    toast.error("Không thể xóa màn hình!");
                    break;
            }
        }
    });
    const onMutate: SubmitHandler<any> = (data) => {
        mutate(data);
    }
    return { mutate, ...rest, ...form, onMutate }
}