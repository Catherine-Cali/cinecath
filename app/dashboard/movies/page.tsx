import { MovieRepository } from "@/repository/movieRepo";
import { Movie } from "@/app/entities/Movie";

const MovieList = async () => {
  const movieRepo = new MovieRepository();
  let movies: Movie[] = [];

  try {
    movies = await movieRepo.getPopularMovies();
  } catch (error) {
    return <p>Erreur lors du chargement des films</p>;
  }

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
};

export default MovieList;
