'use client';


import { ShowCard } from '../components/ShowCard';
import { useFetchTopRatedTVShows } from "./uses-cases/useFetchTopRatedTVShows";


export default function TopRatedTVShows() {
    const { shows, isError, isLoading } = useFetchTopRatedTVShows();  

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-t-4 border-pink-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return <p>Error loading top rated tv shows</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Top Rated TV Shows</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {shows?.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
      </div>
  );
}

