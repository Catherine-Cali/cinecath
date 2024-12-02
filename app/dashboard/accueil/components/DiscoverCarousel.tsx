'use client';

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function DiscoverCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  
  const slides = [
    { id: 1, content: "Découvrez l'univers 1 Ce que j'ai à faire de restant : 1) gérer les cookies ( faire en sorte que ca dure 3h) 2) faire l'api discover pour afficher sur la page d'accueil les films a decouvrir 3) faire toutes les fetchs pour les 5 cas restants et le discover 4) preparer un template pour les films ", bgColor: "bg-red-500" },
    { id: 2, content: "Découvrez l'univers 2", bgColor: "bg-blue-500" },
    { id: 3, content: "Découvrez l'univers 3", bgColor: "bg-green-500" },
  ];

  return (
    <div className="h-full w-full">
      <Carousel
        plugins={[plugin.current]}
        className="h-full w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="h-full w-full">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="h-full w-full">
              <div className="h-full w-full p-1">
                <Card className="h-full w-full">
                  <CardContent
                    className={`flex items-center justify-center h-full w-full  ${slide.bgColor}`}
                  >
                    <span className="text-4xl font-semibold text-white">{slide.content}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
