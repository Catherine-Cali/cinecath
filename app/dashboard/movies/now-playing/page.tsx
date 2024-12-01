'use client'
import { useFetchNowPlayingMovies } from "./use-cases/useFetchNowPlayingMovies";
console.log(useFetchNowPlayingMovies); 

export default function NowPlayingMovies() {
    // Utilisation correcte du hook personnalisé
    const { movies, isError, isLoading } = useFetchNowPlayingMovies(); 

    // Gestion du chargement
    if (isLoading) {
        return <p>Loading now playing movies...</p>;
    }

    // Gestion des erreurs
    if (isError) {
        return <p>Error loading now playing movies</p>;
    }

    // Rendu des films
    return (
        <div>
            
            {movies?.map((movie) => (
                <p key={movie.id}>{movie.title}</p>
            ))}
        </div>
    );
}
