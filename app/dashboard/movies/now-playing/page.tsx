'use client';
import { useFetchNowPlayingMovies } from "./use-cases/useFetchNowPlayingMovies";

export default function NowPlayingMovies() {

    const { movies, isError, isLoading } = useFetchNowPlayingMovies();
    if (isLoading) {
        return <p>Loading now playing movies...</p>;
    }


    if (isError) {
        return <p>Error loading now playing movies</p>;
    }
console.log(movies)

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies?.map((movie) => (
                <div key={movie.id} className="flex flex-col items-center">
                    {movie.poster_path ? (
                        <img
                            src={movie.poster_path} 
                            alt={movie.title}
                            className="w-full h-auto rounded-md shadow-md"
                        />
                    ) : (
                        <div className="w-[300px] h-[450px] bg-gray-200 flex items-center justify-center text-gray-500">
                            <p>Aucune image</p>
                        </div>
                    )}
                    <p className="mt-2 text-center text-sm font-medium">
                        {movie.title}
                    </p>
                </div>
            ))}
        </div>
    );
}

