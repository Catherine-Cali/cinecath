import { Movie } from "@/app/entities/Movie";

export class MovieRepository {
    public async getPopularMovies(): Promise<Movie[]> {
      try {
        // Appel API vers l'endpoint
        const response = await fetch("/api/movies/popular");
  
        // Vérifie si la réponse est valide
        if (!response.ok) {
          throw new Error(`Erreur API : ${response.status} ${response.statusText}`);
        }
  
        // Récupère et parse les données
        const movies = (await response.json()) as Movie[];
        return movies;
      } catch (error) {
        console.error("Erreur lors de la récupération des films populaires :", error);
        throw error; // Propagation de l'erreur pour que l'appelant puisse gérer
      }
    }
  }
  