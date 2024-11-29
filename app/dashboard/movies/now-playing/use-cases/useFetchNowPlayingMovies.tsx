import { Movie } from "@/entities/Movie";
import { useQuery } from "@tanstack/react-query";
import { MovieRepositoryTMDB } from "@/repositories/MovieRepositoryTMDB"; // Remplacez par le chemin correct

export const useFetchNowPlayingMovies = () => {
    // Typage explicite pour éviter les erreurs de TypeScript
    const movieRepositoryTMDB: MovieRepositoryTMDB = new MovieRepositoryTMDB();

    // Utilisation correcte de useQuery
    const { data, isLoading, isError } = useQuery<Movie[]>({
        queryKey: ["now-playing"], // Clé pour le cache
        queryFn: async () => await movieRepositoryTMDB.getNowPlayingMovies(),
    });

    // Retour proprement structuré
    return { movies: data, isLoading, isError };
};
