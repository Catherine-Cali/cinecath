'use client'
import { useFetchOnTheAirTVShows } from "./uses-cases/useFetchOnTheAirTVShows";
console.log("on rentre ici")
export default function OnTheAirTVShows() {
    // Utilisation correcte du hook personnalisé
    const { shows, isError, isLoading } = useFetchOnTheAirTVShows(); 

    // Gestion du chargement
    if (isLoading) {
        return <p>Loading on the air tv shows...</p>;
    }

    // Gestion des erreurs
    if (isError) {
        return <p>Error loading on the air tv shows</p>;
    }

    // Rendu des films
    return (
        <div>
            
            {shows?.map((show) => (
                <p key={show.id}>{show.name}</p>
            ))}
        </div>
    );
}
