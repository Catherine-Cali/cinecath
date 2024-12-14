'use client'
import { useQuery } from "@tanstack/react-query";
import { useApplicationRepositoryContext } from "@/repositories/ApplicationRepositoryContext";
import { TVShow } from "@/entities/TVShow";

 const useFetchDiscoverShows = () => {
    const {tvshowRepository} = useApplicationRepositoryContext(); 
    const { data, isLoading, isError } = useQuery<TVShow[]>({
        queryKey: ["shows-discover"],
        queryFn: async () => await tvshowRepository.getDiscoverTVShows(),
    });
    return { shows: data, isLoading, isError };
    
};
export {useFetchDiscoverShows}; 

