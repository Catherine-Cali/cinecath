'use client';
import { useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import Link from 'next/link';
import Image from 'next/image';
import { useFetchGenreShow } from '../uses-cases/useFetchGenreShow';
import { TVShow } from '@/entities/TVShow';


interface ShowCardProps {
  show: TVShow;
}

export function ShowCard({ show }: ShowCardProps) {
  // Récupérer les genres du film
  const { genres, isLoading, isError } = useFetchGenreShow(show.id);


  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/dashboard/shows/${show.id}`} passHref>
      <Card
        className="w-full p-0 hover:opacity-90 group border-none shadow-none relative  dark:bg-gray-800 dark:text-white"
        onMouseEnter={() => setIsHovered(true)}   // Quand on survole
        onMouseLeave={() => setIsHovered(false)}  // Quand on quitte le survol
      >
        <CardHeader className="p-0 relative">
          {/* L'image du film avec effet de flou sur hover */}
          <div
            className={`w-full h-[300px] transition-all duration-300 ease-in-out ${isHovered ? 'filter blur-sm' : 'filter-none'}`}
          >
            {show.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w300/${show.poster_path}`}
                alt={show.name || 'Image unavailable'}
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

          {/* Les informations du genre et de la date de sortie */}
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
          <h2 className="truncate mt-2 text-center text-sm font-medium">{show.name}</h2>
        </CardContent>
      </Card>
    </Link>
  );
}
