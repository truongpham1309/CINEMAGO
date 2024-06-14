import { getAllDashBoardBooking, getDetailBookingByID } from "@/services/booking/bookingService";
import { useQuery } from "@tanstack/react-query"

export const useBookingQuery = (id:number = 0) => {
    const booking = useQuery({
        queryKey: ['BOOKINGS', id],
        queryFn: async () => {
            return !id ? await getAllDashBoardBooking() : await getDetailBookingByID(id);
        }
    });
    return { ...booking }
}