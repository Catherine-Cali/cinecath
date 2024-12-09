
'use client';

import { MovieCard } from '../components/MovieCard';
import { useFetchTopRatedMovies } from './uses-cases/useFetchTopRatedMovies';



export default function TopRatedMovies() {
  const { movies, isError, isLoading } = useFetchTopRatedMovies();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-t-4 border-pink-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return <p>Error loading top rated movies</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Top Rated Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      </div>
  );
}
