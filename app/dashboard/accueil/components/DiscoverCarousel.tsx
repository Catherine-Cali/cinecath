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

interface Slide {
  id: string;
  title: string;
  bgColor?: string;
}

interface DiscoverCarouselProps {
  slides: Slide[];
}

export default function DiscoverCarousel({ slides }: DiscoverCarouselProps) {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="h-full w-full">
      <Carousel
        plugins={[plugin.current]}
        className="h-full w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="h-full w-full">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="basis">
              <div className="h-full w-full p-1">
                <Card className="h-full w-full">
                  <CardContent
                    className={`flex items-center justify-center h-full w-full ${
                      slide.bgColor || "bg-gray-500"
                    }`}
                  >
                    <span className="text-4xl font-semibold text-white">{slide.title}</span>
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
