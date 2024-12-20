'use client';
import { useState } from 'react';
import { Movie } from '@/entities/Movie';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import Link from 'next/link';
import Image from 'next/image';
import { useFetchGenreMovie } from '../use-cases/useFetchGenresMovie';


interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const { genres, isLoading, isError } = useFetchGenreMovie(movie.id);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/dashboard/movies/${movie.id}`} passHref>
      <Card
        className="w-full p-0 hover:opacity-90 group border-none shadow-none relative dark:bg-gray-800 dark:text-white"
        onMouseEnter={() => setIsHovered(true)}   
        onMouseLeave={() => setIsHovered(false)} 
      >
        <CardHeader className="p-0 relative">
          <div
            className={`w-full h-[300px] transition-all duration-300 ease-in-out ${isHovered ? 'filter blur-sm' : 'filter-none'}`}
          >
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                alt={movie.title || 'Image unavailable'}
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-t-md"
              />
            ) : (
              <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center text-gray-500">
                <p>Aucune image</p>
              </div>
            )}
          </div>

          <div
  className={`absolute bottom-0 left-0 w-full p-4 bg-opacity-75 bg-black text-white transform transition-all duration-300 ease-in-out 
    ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
>
  {isLoading ? (
    <p>Loading...</p>
  ) : isError ? (
    <p>Error loading genres</p>
  ) : (
    <>
      <p className="text-sm">Genres: {genres?.map((genre) => genre.name).join(", ")}</p>
    </>
  )}
</div>

        </CardHeader>

        <CardContent className="p-4 flex flex-col justify-between">
          <h2 className="truncate mt-2 text-center text-sm font-medium">{movie.title}</h2>
        </CardContent>
      </Card>
    </Link>
  );
}
