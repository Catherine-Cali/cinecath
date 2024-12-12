'use client';

import DiscoverCarousel from "./accueil/components/DiscoverCarousel";
import { useFetchDiscoverMovies } from "./discover/use-cases/useFetchDiscoverMovies";
import { useFetchDiscoverShows } from "./discover/use-cases/useFetchDiscoverShows";
import { MovieCard } from "./movies/components/MovieCard";
import { ShowCard } from "./shows/components/ShowCard";

export default function Dashboard() {
  const { movies, isError, isLoading } = useFetchDiscoverMovies();
  const {shows, isError :isErrorShow, isLoading :isLoadingShow} = useFetchDiscoverShows();

  if (isLoading || isLoadingShow) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-t-4 border-pink-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError || isErrorShow) {
    return <p>Error loading discover movies/tv shows</p>;
  }
  return (
    <div className="space-y-6 p-2">
      {/* Première ligne : Carrousel de découverte */}
      <div className="bg-white w-full h-[500px] p-8 flex items-center justify-center rounded-lg shadow-lg">
      <DiscoverCarousel slides={[]}  />
      </div>

      <div className="bg-white p-0">
        <h1 className="text-2xl font-bold mb-6">Discover Movies</h1>
        <div className="flex gap-4 overflow-auto no-scrollbar h-[400px]">
          {movies?.map((movie) => (
            <div className="flex-none w-[200px] h-[300px]"> 
              <MovieCard key={movie.id} movie={movie} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-0">
        <h1 className="text-2xl font-bold mb-6">Discover Movies</h1>
        <div className="flex gap-4 overflow-auto overflow-y-hidden no-scrollbar h-[400px]">
        {shows?.map((show) => (
            <div className="flex-none w-[200px] h-[300px]"> 
              <ShowCard key={show.id} show={show} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
