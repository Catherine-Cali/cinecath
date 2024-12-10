"use client";
import Image from "next/image";


import { useRouter } from "next/navigation";
import { useFetchCastShow } from "../uses-cases/useFetchCastShow";
import { useFetchImageShow } from "../uses-cases/useFetchImageShow";
import { ActorCard } from "../../movies/components/ActorCard";
import { useFetchGenreShow } from "../uses-cases/useFetchGenreShow";
import { useFetchShowDetails } from "../uses-cases/useFetchShowDetail";

export default function ShowPage({ params }: { params: { id: string } }) {
  const showId = parseInt(params.id, 10);
  const router = useRouter();

  const { show, isLoading: isLoadingMovie, isError: isErrorMovie } = useFetchShowDetails(showId);
  const { images, isLoading: isLoadingImages, isError: isErrorImages } = useFetchImageShow(showId);
  const { cast, isLoading: isLoadingCast, isError: isErrorCast } = useFetchCastShow(showId);
  const { genres, isLoading :isLoadingGenre, isError: isErrorGenre } = useFetchGenreShow(showId);

  const isLoading = isLoadingMovie || isLoadingImages || isLoadingCast ||isLoadingGenre;
  const isError = isErrorMovie || isErrorImages || isErrorCast || isErrorGenre ;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-t-4 border-pink-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return <p>Failed to fetch tv show details.</p>;
  }

  if (!show) {
    return <p>tv show not found.</p>;
  }

  return (
    <div className="p-6 space-y-10">
      <button
        onClick={() => router.back()} 
        className="flex items-center space-x-2 text-black hover:text-gray-700"
      >
        &larr; Back
      </button>
      <div
        className="relative p-6 rounded-md mt-0"
        style={{
          backgroundImage: show.poster_path
            ? `linear-gradient(to bottom, rgba(255, 255, 255, 0) 70%, #ffffff), url(https://image.tmdb.org/t/p/w500/${show.poster_path})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 backdrop-blur-sm bg-white/40 rounded-md"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            {show.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                alt={show.name || "Image non disponible"}
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


          <div className="flex-1 flex flex-col gap-4 p-6 rounded-md">
            <h1 className="text-4xl font-bold">{show.name}</h1>
            {show.first_air_date && (
              <p className="text-gray-600 text-sm">Release Date: {show.first_air_date}</p>
            )}

            <p className="text-gray-900 text-base leading-relaxed">{show.overview}</p>

            <div>
            <h2 className="text-xl font-semibold mb-2">Genres</h2>
            {genres && genres.length > 0 ? (
                <ul className="list-disc pl-5">
                {genres.map((genre) => (
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

      <div>
        <h2 className="text-2xl font-semibold mb-4">Credits</h2>
        {cast && cast.length > 0 ? (
          <div className="flex gap-4 overflow-auto no-scrollbar h-[300px]">
            {cast.map((actor) => (
              <ActorCard key={actor.id} actor={actor} />
            ))}
          </div>
        ) : (
          <p>No credits available.</p>
        )}
      </div>

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

