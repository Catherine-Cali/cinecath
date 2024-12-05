'use client'
import { TVShow } from "@/entities/TVShow";
import { useQuery } from "@tanstack/react-query";
import { useApplicationRepositoryContext } from "@/repositories/ApplicationRepositoryContext";

 const useFetchPopularTVShows = () => {
    const {tvshowRepository} = useApplicationRepositoryContext(); 
    const { data, isLoading, isError } = useQuery<TVShow[]>({
        queryKey: ["popular"],
        queryFn: async () => await tvshowRepository.getPopularTVShows(),
    });

    return { shows: data, isLoading, isError };
};
export {useFetchPopularTVShows}; 

