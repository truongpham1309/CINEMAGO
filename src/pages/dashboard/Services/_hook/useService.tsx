import { TService } from "@/common/types/service/TypeService";
import { ServiceSchema } from "@/common/validations/service/serviceValid";
import { createServiceAPI, deleteServiceByID, getAllServiceList, updateServiceByID } from "@/services/service/callAPIService";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const useServiceMutation = ({ type }: { type: "CREATE" | "DELETE" | "UPDATE" }) => {
    const queryClient = useQueryClient();
    const { reset, ...form } = useForm({
        resolver: joiResolver(ServiceSchema),
        defaultValues: {
            name: '',
            price: 0,
            quantity: 0,
            description: '',
        }
    });
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (data: TService) => {
            switch (type) {
                case "CREATE":
                    return await createServiceAPI(data);
                case "UPDATE":
                    return await updateServiceByID(data);
                case "DELETE":
                    return await deleteServiceByID(data.id!);
                default: toast.warning('Thao tác không hợp lệ!'); navigate("/dashboard/services");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['SERVICES'],
            });
            switch (type) {
                case "CREATE":
                    navigate("/dashboard/service");
                    toast.success("Đã thêm mới dịch vụ!");
                    break;
                case "UPDATE":
                    navigate("/dashboard/service");
                    toast.success("Đã cập nhật dịch vụ!");
                    break;
                case "DELETE":
                    toast.success("Đã xóa dịch vụ!");
                    break;
            }
        },
        onError: () => {
            switch (type) {
                case "CREATE":
                    toast.error("Thông tin không hợp lệ!");
                    break;
                case "UPDATE":
                    toast.error("Không thể cập nhật dịch vụ!");
                    break;
                case "DELETE":
                    toast.error("Không thể xóa dịch vụ!");
                    break;
            }
        }
    });
    const onMutationService: SubmitHandler<TService> = (data) => {
        mutation.mutate(data);
    }

    return { ...form, ...mutation, onMutationService, reset }
}

export const useServiceQuery = () => {
    const query = useQuery({
        queryKey: ['SERVICES'],
        queryFn: async () => {
            return await getAllServiceList();
        }
    });

    return { ...query }
}