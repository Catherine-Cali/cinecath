'use client'
import { Movie } from "@/entities/Movie";
import { useQuery } from "@tanstack/react-query";
import { useApplicationRepositoryContext } from "@/repositories/ApplicationRepositoryContext";

 const useFetchTopRatedMovies = () => {
    const {movieRepository} = useApplicationRepositoryContext(); 
    const { data, isLoading, isError } = useQuery<Movie[]>({
        queryKey: ["top-rated"],
        queryFn: async () => await movieRepository.getTopRatedMovies(),
    });

    
    return { movies: data, isLoading, isError };
};
export {useFetchTopRatedMovies}; 

