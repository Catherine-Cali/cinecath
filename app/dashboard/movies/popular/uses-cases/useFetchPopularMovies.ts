'use client'
import { Movie } from "@/entities/Movie";
import { useQuery } from "@tanstack/react-query";
import { useApplicationRepositoryContext } from "@/repositories/ApplicationRepositoryContext";

 const useFetchPopularMovies = () => {
    const {movieRepository} = useApplicationRepositoryContext(); 
    // Utilisation correcte de useQuery
    const { data, isLoading, isError } = useQuery<Movie[]>({
        queryKey: ["popular"], // Clé pour le cache
        queryFn: async () => await movieRepository.getPopularMovies(),
    });

    // Retour proprement structuré
    
    return { movies: data, isLoading, isError };
};
export {useFetchPopularMovies}; 

