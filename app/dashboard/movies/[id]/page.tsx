"use client";

import { useFetchGenreMovie } from "../use-cases/useFetchGenresMovie";


export default function MovieGenresPage({ params }: { params: { id: string } }) {
  const movieId = parseInt(params.id, 10); // Conversion de l'ID de chaîne à entier
  const { genres, isLoading, isError } = useFetchGenreMovie(movieId);

  if (isLoading) {
    return <p>Loading genres...</p>;
  }

  if (isError) {
    return <p>Failed to fetch movie genres</p>;
  }

  return (
    <div>
      <h1>Genres for Movie {movieId}</h1>
      {genres && genres.length > 0 ? ( // Vérification si genres est défini
        <ul>
          {genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      ) : (
        <p>No genres available for this movie.</p>
      )}
    </div>
  );
}
