"use client";

import { useQuery } from "@tanstack/react-query";
import { useApplicationRepositoryContext } from "@/repositories/ApplicationRepositoryContext";

const useFetchGenreShow = (ShowId: number) => {
  const { tvshowRepository } = useApplicationRepositoryContext();

  const { data, isLoading, isError } = useQuery<{ id: number; name: string }[]>({
    queryKey: ["genres", ShowId], // Clé unique pour chaque film
    queryFn: async () => {
      if (!ShowId) {
        throw new Error("Movie ID is required to fetch genres.");
      }
      return await tvshowRepository.getShowGenres(ShowId);
    },
    enabled: !!ShowId, // Exécuter la requête uniquement si movieId est défini
  });

  return { genres: data, isLoading, isError };
};

export { useFetchGenreShow };
