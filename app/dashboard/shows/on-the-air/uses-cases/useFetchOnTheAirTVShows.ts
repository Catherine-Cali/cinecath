'use client'
import { TVShow } from "@/entities/TVShow";
import { useQuery } from "@tanstack/react-query";
import { useApplicationRepositoryContext } from "@/repositories/ApplicationRepositoryContext";

 const useFetchOnTheAirTVShows = () => {
    const {tvshowRepository} = useApplicationRepositoryContext(); 
    // Utilisation correcte de useQuery
    const { data, isLoading, isError } = useQuery<TVShow[]>({
        queryKey: ["on-the-air"], // Clé pour le cache
        queryFn: async () => await tvshowRepository.getOnTheAirTVShows(),
    });

    // Retour proprement structuré
    
    return { shows: data, isLoading, isError };
};
export {useFetchOnTheAirTVShows}; 

