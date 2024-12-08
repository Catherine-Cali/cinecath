import { useQuery } from "@tanstack/react-query";
import { useApplicationRepositoryContext } from "@/repositories/ApplicationRepositoryContext";
import { MovieDetail } from "@/entities/MovieDetail";

const useFetchMovieDetails = (id: number) => {
  const { movieRepository } = useApplicationRepositoryContext(); // Accès au dépôt

  const { data, isLoading, isError } = useQuery<MovieDetail>({
    queryKey: ["movieDetails", id],
    queryFn: async () => {
      if (!id) throw new Error("Movie ID is required");
      return await movieRepository.getMovieDetails(id);
    },
    enabled: !!id, // Active la requête seulement si l'ID est valide
  });

  return { movie: data, isLoading, isError };
};

export { useFetchMovieDetails };