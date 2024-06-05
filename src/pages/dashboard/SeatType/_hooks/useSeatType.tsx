import { getAllSeatType } from "@/services/seats/seatTypeService";
import { useQuery } from "@tanstack/react-query"

export const useSeatTypeQuery = () => {
    const seatType = useQuery({
        queryKey: ['SEAT-TYPE'],
        queryFn: async () => {
            const data = await getAllSeatType();
            return data;
        }
    });
    return { ...seatType };
}