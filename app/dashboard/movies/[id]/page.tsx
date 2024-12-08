"use client";

import { useFetchGenreMovie } from "../use-cases/useFetchGenresMovie";
import { useFetchImageMovie } from "../use-cases/useFetchImagesMovie";
import { useFetchCastMovie } from "../use-cases/useFetchCastMovie"; // Assurez-vous d'utiliser le bon hook
import { ActorCard } from "../components/ActorCard";
import Image from 'next/image';



export default function MoviePage({ params }: { params: { id: string } }) {
  const movieId = parseInt(params.id, 10);

  const { genres, isLoading: isLoadingGenres, isError: isErrorGenres } = useFetchGenreMovie(movieId);
  const { images, isLoading: isLoadingImages, isError: isErrorImages } = useFetchImageMovie(movieId);
  const { cast, isLoading: isLoadingCast, isError: isErrorCast } = useFetchCastMovie(movieId);

  if (isLoadingGenres || isLoadingImages || isLoadingCast) {
    return <p>Loading data...</p>;
  }

  if (isErrorGenres) {
    return <p>Failed to fetch genres.</p>;
  }

  if (isErrorImages) {
    return <p>Failed to fetch images.</p>;
  }

  if (isErrorCast) {
    return <p>Failed to fetch cast.</p>;
  }

  return (
    <div >
    <h1>Genres for Movie {movieId}</h1>
      {genres && genres.length > 0 ? (
        <ul>
          {genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      ) : (
        <p>No genres available.</p>
      )}

    <h2>Actors</h2>
    {cast && cast.length > 0 ? (
    <div className="flex gap-2 overflow-auto mt-4 mx-5 no-scrollbar h-[300px]">
      {cast.map((actor) => (
        <ActorCard key={actor.id} actor={actor}/>
      ))}
    </div>
      ) : (
    <p>No actors available.</p>
    )}

<h2>Images</h2>
{images && images.length > 0 ? (
  <div className="flex gap-2 overflow-auto mt-4 mx-5 no-scrollbar h-[400px]">
    {images.map((image, index) => (
      <div key={index} className="w-[600px] flex-shrink-0" style={{ margin: "1rem 0" }}>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${image.filePath}`}
          alt={`Image ${index + 1}`}
          width={600}  // Largeur de l'image
          height={300} // Hauteur de l'image
          className="w-full h-auto object-cover"
        />
      </div>
    ))}
  </div>
) : (
  <p>No images available.</p>
)}

</div>
  );
}


