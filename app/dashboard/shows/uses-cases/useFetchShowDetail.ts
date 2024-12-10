import { useQuery } from "@tanstack/react-query";
import { useApplicationRepositoryContext } from "@/repositories/ApplicationRepositoryContext";
import { ShowDetail } from "@/entities/ShowDetail";


const useFetchShowDetails = (showId: number) => {
  const { tvshowRepository } = useApplicationRepositoryContext(); // Accès au dépôt

  const { data, isLoading, isError } = useQuery<ShowDetail>({
    queryKey: ["mshowDetails", showId],
    queryFn: async () => {
      if (!showId) throw new Error("Show ID is required");
      return await tvshowRepository.getShowDetails(showId);
    },
    enabled: !!showId, // Active la requête seulement si l'ID est valide
  });

  return { show: data, isLoading, isError };
};

export { useFetchShowDetails };