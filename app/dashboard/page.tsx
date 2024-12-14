'use client';

import { useFetchDiscoverMovies } from "./use-cases/useFetchDiscoverMovies";
import { useFetchDiscoverShows } from "./use-cases/useFetchDiscoverShows";
import { MovieCard } from "./movies/components/MovieCard";
import { ShowCard } from "./shows/components/ShowCard";


export default function Discover() {
  const { movies, isError, isLoading } = useFetchDiscoverMovies();
  const { shows, isError: isErrorShow, isLoading: isLoadingShow } = useFetchDiscoverShows();

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
  
  // const testShow = {
  //   id: 247885,
  //   name: "Papás por Conveniencia",
  //   overview: "Tino, a single father who faces great challenges in raising his two children, finds out one day that he is also the father of two rebellious teenagers, children of Aidé, a former high school classmate who has become an important businesswoman. For Tino, this news becomes an opportunity to take on the role of father of the children he never knew he had. Thus, he begins to work at Aidé's company, but everything gets complicated when Tino and his family move into Aidé's house to integrate into her new life. The house becomes a battlefield, both of their children have problems adapting, and love resurfaces between Tino and Aidé and a torrid romance begins. But building this new life for Aidé, Tino and their children will not be easy; they will have to face serious obstacles, always supported by the strength of their love and that of their children.",
  //   poster_path: "/y7yIu9PKx2WTphhYgbBq9C1RNzV.jpg",
  //   first_air_date: "2024-10-21",
  //   media_type: "tv",
  //   genres: [
  //     { id: 35, name: "Comedy" },
  //     { id: 18, name: "Drama" },
  //     { id: 10751, name: "Family" },
  //     { id: 10762, name: "Kids" },
  //     { id: 10759, name: "Action & Adventure" },
  //   ],
  // };

  // const List = [];
  // const maxLength = 10; // Limiter la taille de la liste combinée à 10
  // let i = 0;

  // while (List.length < maxLength && (movies[i] || shows[i])) {
  //   if (movies[i]) List.push({ ...movies[i], media_type: "movie" }); // Ajouter un film avec son type
  //   if (shows[i]) List.push({ ...shows[i], media_type: "tv" }); // Ajouter une série avec son type
  //   i++;
  // }

  return (
    <div className="space-y-6 p-1">
      {/* Carrousel de découverte
      <div className="bg-white w-full h-[500px] p-8 flex items-center justify-center rounded-lg shadow-lg">
      <DiscoverCarouselessai items={List} />
      </div> */}

      {/* Liste de films */}
      <div className="bg-white mb-0 ">
        <h1 className="text-2xl font-bold mb-3">Discover Movies</h1>
        <div className="flex gap-4 overflow-auto no-scrollbar h-[400px]">
        {movies?.map((movie) => (
        <div key={movie.id} className="flex-none w-[200px] h-[300px]">
          <MovieCard movie={movie} />
        </div>
      ))}

        </div>
      </div>

      {/* Liste de séries */}
      <div className="bg-white mt-0 mb-0 ">
        <h1 className="text-2xl font-bold mb-3">Discover TV Shows</h1>
        <div className="flex gap-4 overflow-auto overflow-y-hidden no-scrollbar h-[400px]">
        {shows?.map((show) => (
        <div key={show.id} className="flex-none w-[200px] h-[300px]">
          <ShowCard show={show} />
        </div>
      ))}

        </div>
      </div>
    </div>
  );
}
