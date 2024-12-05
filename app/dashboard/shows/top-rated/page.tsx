'use client'

import { useFetchTopRatedTVShows } from "./uses-cases/useFetchTopRatedTVShows";



export default function TopRatedTVShows() {
    const { shows, isError, isLoading } = useFetchTopRatedTVShows(); 

    if (isLoading) {
        return <p>Loading top rated tv shows...</p>;
    }

    if (isError) {
        return <p>Error loading top rated tv shows</p>;
    }

    return (
        <div>
            
            {shows?.map((show) => (
                <p key={show.id}>{show.name}</p>
            ))}
        </div>
    );
}
