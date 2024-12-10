"use client";
import { useQuery } from "@tanstack/react-query";
import { useApplicationRepositoryContext } from "@/repositories/ApplicationRepositoryContext";
import { Images } from "@/entities/Images";

const useFetchImageShow = (showId: number) => {
  const { tvshowRepository } = useApplicationRepositoryContext();

  const { data, isLoading, isError } = useQuery<Images[]>({
    queryKey: ["images", showId], // Clé unique pour chaque film
    queryFn: async () => {
      if (!showId) {
        throw new Error("Show ID is required to fetch Images.");
      }
      return await tvshowRepository.getShowImages(showId);
    },
    enabled: !!showId, // Exécuter la requête uniquement si showId est défini
  });

  return { images: data, isLoading, isError };
};

export { useFetchImageShow };
