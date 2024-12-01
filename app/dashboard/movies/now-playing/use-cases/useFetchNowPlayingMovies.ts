'use client'
import { Movie } from "@/entities/Movie";
import { useQuery } from "@tanstack/react-query";
import { useApplicationRepositoryContext } from "@/repositories/ApplicationRepositoryContext";

 const useFetchNowPlayingMovies = () => {
    const {movieRepository} = useApplicationRepositoryContext(); 
    // Utilisation correcte de useQuery
    const { data, isLoading, isError } = useQuery<Movie[]>({
        queryKey: ["now-playing"], // Clé pour le cache
        queryFn: async () => await movieRepository.getNowPlayingMovies(),
    });

    // Retour proprement structuré
    
    return { movies: data, isLoading, isError };
};
export {useFetchNowPlayingMovies}; 

