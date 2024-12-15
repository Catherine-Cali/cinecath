"use client";

import { Movie } from "@/entities/Movie";
import { TVShow } from "@/entities/TVShow";
import { MovieCard } from "../../movies/components/MovieCard";
import { ShowCard } from "../../shows/components/ShowCard";

interface DiscoverCardProps {
  item: {
    id: number;
    title?: string;
    name?: string; 
    overview?: string;
    release_date?: string;
    first_air_date?: string; 
    genres?: { id: number; name: string }[];
    poster_path?: string;
    media_type: string; 
  };
}

export function DiscoverCard({ item }: DiscoverCardProps) {
  const { title, name, overview, release_date, first_air_date, genres, media_type } = item;

  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden">

      <div className="w-[200px]">
        {media_type === "movie" ? (
          <MovieCard movie={item as unknown as Movie} />
        ) : (
          <ShowCard show={item as unknown as TVShow} />
        )}
      </div>


      <div className="p-6 flex-1 flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{title || name}</h2>
        <p className="text-sm text-gray-600">
          Release Date: {release_date || first_air_date || "Unknown"}
        </p>
        <p className="text-gray-900 line-clamp-3">{overview || "No overview available."}</p>


        {genres && genres.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold">Genres</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        )}


        <p className="text-xs text-gray-500 uppercase tracking-wide">
          Type: {media_type === "movie" ? "Film" : "TV Show"}
        </p>
      </div>
    </div>
  );
}
