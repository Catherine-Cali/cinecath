"use client";
import { useQuery } from "@tanstack/react-query";
import { useApplicationRepositoryContext } from "@/repositories/ApplicationRepositoryContext";
import { Cast } from "@/entities/Cast";

const useFetchCastMovie = (movieId: number) => {
  const { movieRepository } = useApplicationRepositoryContext();

  const { data, isLoading, isError } = useQuery<Cast[]>({
    queryKey: ["cast", movieId], // Clé unique pour chaque film
    queryFn: async () => {
      if (!movieId) {
        throw new Error("Movie ID is required to fetch cast.");
      }
      return await movieRepository.getMovieCast(movieId);
    },
    enabled: !!movieId, // Exécuter la requête uniquement si movieId est défini
  });

  return { cast: data, isLoading, isError };
};

export { useFetchCastMovie };
