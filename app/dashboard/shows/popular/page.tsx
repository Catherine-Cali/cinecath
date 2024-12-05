'use client'
import { useFetchPopularTVShows } from "./uses-cases/useFetchPopularTVShows";


export default function PopularTVShows() {
    const { shows, isError, isLoading } = useFetchPopularTVShows(); 

    if (isLoading) {
        return <p>Loading popular tv shows...</p>;
    }

    if (isError) {
        return <p>Error loading popular tv shows</p>;
    }

    return (
        <div>
            
            {shows?.map((show) => (
                <p key={show.id}>{show.name}</p>
            ))}
        </div>
    );
}


