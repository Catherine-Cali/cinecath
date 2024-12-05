'use client'
import { useFetchPopularMovies } from "./uses-cases/useFetchPopularMovies";

console.log(useFetchPopularMovies); 

export default function PopularMovies() {
    // Utilisation correcte du hook personnalisé
    const { movies, isError, isLoading } = useFetchPopularMovies(); 

    // Gestion du chargement
    if (isLoading) {
        return <p>Loading popular movies...</p>;
    }

    // Gestion des erreurs
    if (isError) {
        return <p>Error loading popular movies</p>;
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
