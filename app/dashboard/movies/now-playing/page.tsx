'use client';

import { MovieCard } from '../components/MovieCard';
import { useFetchNowPlayingMovies } from './use-cases/useFetchNowPlayingMovies';

export default function NowPlayingMovies() {
  const { movies, isError, isLoading } = useFetchNowPlayingMovies();

  if (isLoading) {
    return <p>Loading now playing movies...</p>;
  }

  if (isError) {
    return <p>Error loading now playing movies</p>;
  }

  return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
  );
}
