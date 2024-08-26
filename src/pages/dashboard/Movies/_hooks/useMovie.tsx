import { getAllMovieList } from "@/services/movie/movieService";
import { useQuery } from "@tanstack/react-query"


export const useMovieQuery = () => {
    const { data: movie, isLoading: isLoadingMovie, isError: isErrorMovie, ...restMovie } = useQuery({
        queryKey: ['MOVIES'],
        queryFn: async () => {
            return await getAllMovieList();
        }
    });

    return { movie, isLoadingMovie, isErrorMovie, ...restMovie }
}