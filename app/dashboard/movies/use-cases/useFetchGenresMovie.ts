"use client";

import { useQuery } from "@tanstack/react-query";
import { useApplicationRepositoryContext } from "@/repositories/ApplicationRepositoryContext";

const useFetchGenreMovie = (movieId: number) => {
  const { movieRepository } = useApplicationRepositoryContext();

  const { data, isLoading, isError } = useQuery<{ id: number; name: string }[]>({
    queryKey: ["genres", movieId], // Clé unique pour chaque film
    queryFn: async () => {
      if (!movieId) {
        throw new Error("Movie ID is required to fetch genres.");
      }
      return await movieRepository.getMovieGenres(movieId);
    },
    enabled: !!movieId, // Exécuter la requête uniquement si movieId est défini
  });

  return { genres: data, isLoading, isError };
};

export { useFetchGenreMovie };
