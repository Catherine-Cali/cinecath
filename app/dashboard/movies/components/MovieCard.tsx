'use client';

import { Movie } from '@/entities/Movie';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import Link from 'next/link';
import Image from 'next/image';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/dashboard/movies/${movie.id}`} passHref>
    <Card className="w-full p-0 hover:opacity-90 group border-none shadow-none">
      <CardHeader className="p-0 relative">
        {movie.poster_path ? (
          <Image
          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          alt={movie.title || 'Image non disponible'}
          width={500}  // Définissez la largeur souhaitée
          height={500} // Définissez la hauteur souhaitée
          className="w-full h-auto rounded-t-md" 
        />
        ) : (
          <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center text-gray-500">
            <p>Aucune image</p>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <h2 className="truncate mt-2 text-center text-sm font-medium">
        {movie.title}</h2>
      </CardContent>
    </Card>
    </Link>
  );
}
