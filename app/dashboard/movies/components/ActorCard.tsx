'use client';

import { Cast } from '@/entities/Cast';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from 'next/image';

interface ActorCardProps {
  actor: Cast;
}

export function ActorCard({ actor }: ActorCardProps) {
  return (
    <Card className="w-[150px] p-0 hover:opacity-90 group border-none shadow-none rounded-md dark:bg-gray-800 dark:text-white">
      <CardHeader className="p-0 relative">
        {actor.name ? (
          <div className="w-[150px] h-[225px] relative">
            <Image
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w300/${actor.profile_path}`
                  : "https://via.placeholder.com/150x225?text=Picture+unavailable"
              }
              alt={actor.name}
              width={150}   // Largeur uniforme pour toutes les cartes
              height={225}  // Hauteur réduite
              className="w-full h-full object-cover rounded-t-md"
            />
          </div>
        ) : (
          <div className="w-[150px] h-[225px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-t-md">
            <p>No cast</p>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0 flex flex-col justify-between">
        <h2 className="truncate text-center text-sm font-medium">{actor.name}</h2>
        <p className="text-xs text-gray-500 italic text-center">{actor.character}</p>
      </CardContent>
    </Card>
  );
}
