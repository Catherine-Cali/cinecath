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
  <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Top Rated TV Shows</h1>
  <div 
    className="
      grid 
      grid-cols-2 
      sm:grid-cols-3 
      md:grid-cols-4 
      lg:grid-cols-5 
      xl:grid-cols-6 
      gap-4
    "
  >
    {shows?.map((show) => (
      <div key={show.id} className="w-full max-w-[250px] mx-auto"> 
        <ShowCard show={show} />
      </div>
    ))}
  </div>
</div>

  );
}

