'use client'
import { Movie } from "@/entities/Movie";
import { useQuery } from "@tanstack/react-query";
import { useApplicationRepositoryContext } from "@/repositories/ApplicationRepositoryContext";

 const useFetchDiscoverMovies = () => {
    const {movieRepository} = useApplicationRepositoryContext(); 
    const { data, isLoading, isError } = useQuery<Movie[]>({
        queryKey: ["movies-discover"],
        queryFn: async () => await movieRepository.getDiscoverMovies(),
    });

    
    return { movies: data, isLoading, isError };
};
export {useFetchDiscoverMovies}; 

