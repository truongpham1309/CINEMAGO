import { cancelSeatBooking, chooseSeatBooking } from "@/services/bookingClient/bookingClientService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useChooseSeatsBooking = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({ type, booking_seat }: { type: "CHOOSE" | "CANCEL", booking_seat: any }) => {
            switch (type) {
                case "CHOOSE":
                    return await chooseSeatBooking(booking_seat);
                case "CANCEL":
                    return await cancelSeatBooking(booking_seat);
                default: toast.warn("Thao tác không hợp lệ!", {
                    position: "top-center",
                    autoClose: 1000,
                })
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['SEATS_MAP']
            });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Ghế đã có người đặt, vui lòng chọn ghế khác!", {
                position: "top-center",
                autoClose: 1000,
            });
        }
    });

    return { ...mutation }
}