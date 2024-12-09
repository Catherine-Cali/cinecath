'use client';

import { ActorCard } from "../components/ActorCard";
import Image from "next/image";

import { useFetchCastMovie } from "../use-cases/useFetchCastMovie";
import { useFetchImageMovie } from "../use-cases/useFetchImagesMovie";
import { useFetchMovieDetails } from "../use-cases/useFetchMovieDetail";

export default function MoviePage({ params }: { params: { id: string } }) {
  const movieId = parseInt(params.id, 10);

  // Utilisation des hooks pour récupérer les données
  const { movie, isLoading: isLoadingMovie, isError: isErrorMovie } = useFetchMovieDetails(movieId);
  const { images, isLoading: isLoadingImages, isError: isErrorImages } = useFetchImageMovie(movieId);
  const { cast, isLoading: isLoadingCast, isError: isErrorCast } = useFetchCastMovie(movieId);

  // Gestion des états de chargement et d'erreur
  const isLoading = isLoadingMovie || isLoadingImages || isLoadingCast;
  const isError = isErrorMovie || isErrorImages || isErrorCast;

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (isError) {
    return <p>Failed to fetch movie details.</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
<div className="p-6 space-y-10">
  {/* Conteneur principal avec le fond flou */}
  <div
    className="relative p-6 rounded-md"
    style={{
      backgroundImage: movie.poster_path
        ? `linear-gradient(to bottom, rgba(255, 255, 255, 0) 70%, #ffffff), url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`
        : "none",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    {/* Superposition floue */}
    <div className="absolute inset-0 backdrop-blur-sm bg-white/40 rounded-md"></div>

    {/* Contenu principal au-dessus du fond */}
    <div className="relative z-10 flex flex-col md:flex-row gap-6">
      {/* Poster */}
      <div className="w-full md:w-1/3">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title || "Image non disponible"}
            width={500}
            height={750}
            className="w-full h-auto object-cover rounded-md shadow-md"
          />
        ) : (
          <div className="w-full h-[750px] flex items-center justify-center text-gray-500 rounded-md">
            <p>Aucune image</p>
          </div>
        )}
      </div>

      {/* Détails */}
      <div className="flex-1 flex flex-col gap-4  p-6 rounded-md ">
        {/* Titre */}
        <h1 className="text-4xl font-bold">{movie.title}</h1>

        {/* Date de sortie */}
        {movie.release_date && (
          <p className="text-gray-600 text-sm">Release Date: {movie.release_date}</p>
        )}

        {/* Overview */}
        <p className="text-gray-900 text-base leading-relaxed">{movie.overview}</p>

        {/* Genres */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Genres</h2>
          {movie.genres && movie.genres.length > 0 ? (
            <ul className="list-disc pl-5">
              {movie.genres.map((genre) => (
                <li key={genre.id} className="text-gray-900">
                  {genre.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No genres available.</p>
          )}
        </div>
      </div>
    </div>
  </div>

  {/* Section secondaire : Acteurs */}
  <div>
    <h2 className="text-2xl font-semibold mb-4">Actors</h2>
    {cast && cast.length > 0 ? (
      <div className="flex gap-4 overflow-auto no-scrollbar h-[300px]">
        {cast.map((actor) => (
          <ActorCard key={actor.id} actor={actor} />
        ))}
      </div>
    ) : (
      <p>No actors available.</p>
    )}
  </div>

  {/* Section secondaire : Images */}
  <div>
    <h2 className="text-2xl font-semibold mb-4">Images</h2>
    {images && images.length > 0 ? (
      <div className="flex gap-4 overflow-auto no-scrollbar h-[400px]">
        {images.map((image, index) => (
          <div key={index} className="w-[600px] flex-shrink-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${image.filePath}`}
              alt={`Image ${index + 1}`}
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    ) : (
      <p>No images available.</p>
    )}
  </div>
</div>

  );
}
