"use client";
import { useQuery } from "@tanstack/react-query";
import { useApplicationRepositoryContext } from "@/repositories/ApplicationRepositoryContext";
import { Images } from "@/entities/Images";

const useFetchImageMovie = (movieId: number) => {
  const { movieRepository } = useApplicationRepositoryContext();

  const { data, isLoading, isError } = useQuery<Images[]>({
    queryKey: ["images", movieId], // Clé unique pour chaque film
    queryFn: async () => {
      if (!movieId) {
        throw new Error("Movie ID is required to fetch Images.");
      }
      return await movieRepository.getMovieImages(movieId);
    },
    enabled: !!movieId, // Exécuter la requête uniquement si movieId est défini
  });

  return { images: data, isLoading, isError };
};

export { useFetchImageMovie };
