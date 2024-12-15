'use client';


import { ShowCard } from '../components/ShowCard';
import { useFetchPopularTVShows } from './uses-cases/useFetchPopularTVShows';


export default function PopularTVShows() {
    const { shows, isError, isLoading } = useFetchPopularTVShows(); 

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-t-4 border-pink-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return <p>Error loading popular tv shows</p>;
  }

  return (
<div>
  <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Popular TV Shows</h1>
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
        <ShowCard  show={show} />
      </div>
    ))}
  </div>
</div>

  );
}

