"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { DiscoverCard } from "./DiscoverCard";

interface DiscoverCarouselessaiProps {
  items: {
    id: number;
    title?: string;
    name?: string; // Pour les séries
    overview?: string;
    release_date?: string;
    first_air_date?: string; // Pour les séries
    genres?: { id: number; name: string }[];
    poster_path?: string;
    media_type: string; // Type : Film ou Série TV
  }[];
}

export function DiscoverCarouselessai({ items }: DiscoverCarouselessaiProps) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 20000, // Délai entre chaque changement de slide (en millisecondes)
          stopOnInteraction: true, // Arrêter le défilement automatique si interaction
        }),
      ]}
    >
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id}>
            <DiscoverCard item={item} />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation */}
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
