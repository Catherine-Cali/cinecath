'use client'

import { useFetchTopRatedMovies } from "./uses-cases/useFetchTopRatedMovies";


export default function TopRatedMovies() {
    const { movies, isError, isLoading } = useFetchTopRatedMovies(); 

    if (isLoading) {
        return <p>Loading top rated movies...</p>;
    }

    if (isError) {
        return <p>Error loading top rated movies</p>;
    }

    return (
        <div>
            
            {movies?.map((movie) => (
                <p key={movie.id}>{movie.title}</p>
            ))}
        </div>
    );
}
