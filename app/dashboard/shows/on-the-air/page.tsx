'use client';


import { ShowCard } from '../components/ShowCard';
import { useFetchOnTheAirTVShows } from './uses-cases/useFetchOnTheAirTVShows';

export default function OnTheAirShow() {
  const { shows, isError, isLoading } = useFetchOnTheAirTVShows();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-t-4 border-pink-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return <p>Error loading on the air tv shows</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">On the Air TV Shows</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {shows?.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
      </div>
  );
}

