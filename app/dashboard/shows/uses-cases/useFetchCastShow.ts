"use client";
import { useQuery } from "@tanstack/react-query";
import { useApplicationRepositoryContext } from "@/repositories/ApplicationRepositoryContext";
import { Cast } from "@/entities/Cast";

const useFetchCastShow = (ShowId: number) => {
  const { tvshowRepository } = useApplicationRepositoryContext();

  const { data, isLoading, isError } = useQuery<Cast[]>({
    queryKey: ["cast", ShowId], // Clé unique pour chaque film
    queryFn: async () => {
      if (!ShowId) {
        throw new Error("Movie ID is required to fetch cast.");
      }
      return await tvshowRepository.getShowCast(ShowId);
    },
    enabled: !!ShowId, // Exécuter la requête uniquement si movieId est défini
  });

  return { cast: data, isLoading, isError };
};

export { useFetchCastShow };
