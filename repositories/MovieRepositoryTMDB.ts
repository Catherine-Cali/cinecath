import { Movie } from "@/entities/Movie";
import { MovieRepository } from "./interface/MovieRepository";
import { MovieDetail } from "@/entities/MovieDetail";
import { Images } from "@/entities/Images";
import { Cast } from "@/entities/Cast";


const headers = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmYyNzY4NzU0NmYyMDY3MzMzNDYyOWUwNGRjOWM3MCIsIm5iZiI6MTczMDgxODk3MS44MDcwMDAyLCJzdWIiOiI2NzJhMzM5YjE0ZDRhMzk5NzIwMzU2MDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WyT1sAl3xJWfyT9Y7dwilWvuprYEeJ65P_R-WfS921Q`,
  "Content-Type": "application/json;charset=utf-8",
};

export class MovieRepositoryTMDB implements MovieRepository {

  getNowPlayingMovies(): Promise<Movie[]> {
    async function fetchNowPlaying(){
      const nowPlayingMovieResponse = await fetch("/api/movies/now-playing")
      if (!nowPlayingMovieResponse.ok) {
        throw new Error('Failed to fetch now playing movies')
      }
    const data = await nowPlayingMovieResponse.json()
    return data 
  }
  return fetchNowPlaying()
  }

  getPopularMovies(): Promise<Movie[]> {
    async function fetchPopular(){
      const popularMovieResponse = await fetch("/api/movies/popular")
      if (!popularMovieResponse.ok) {
        throw new Error('Failed to fetch popular movies')
      }
    
    const data = await popularMovieResponse.json();
    return data; 
  }
  return fetchPopular() 
  }

  getTopRatedMovies(): Promise<Movie[]> {
    async function fetchTopRated(){
      const popularMovieResponse = await fetch("/api/movies/top-rated");
      if (!popularMovieResponse.ok) {
        throw new Error('Failed to fetch top-rated movies');
    }
    const data = await popularMovieResponse.json();
    return data;
    }
    return fetchTopRated() 
}

getMovieGenres(id: number): Promise<{ id: number; name: string }[]> {
  async function fetchMovieGenres(){
    const movieGenreResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`,
        { headers }
      );
      if (!movieGenreResponse.ok) {
        throw new Error("Failed to fetch movie genres");
      }
      const data = await movieGenreResponse.json();
      return data.genres;
  }
  return fetchMovieGenres();
}

getMovieDetails(id: number): Promise<MovieDetail> {
  async function fetchMovieDetails() {
    const movieDetailResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`,
        { headers }
    );
    if (!movieDetailResponse.ok) {
      throw new Error("Failed to fetch movie details");
    }
    const data = await movieDetailResponse.json();
    return data; // Cast des données en MovieDetail
  }
  return fetchMovieDetails();
}


getMovieCast(id: number): Promise<Cast[]> {
  async function fetchMovieCast() {
    const movieCastResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_KEY}`,
      { headers }
    );

    if (!movieCastResponse.ok) {
      throw new Error("Failed to fetch movie cast");
    }

    const data = await movieCastResponse.json();

    // On extrait les informations des acteurs et on les mappe à l'interface Cast
    const cast = data.cast.map((actor: { name: string; character: string; profile_path: string }) => ({
      name: actor.name,
      character: actor.character,
      profile_path: actor.profile_path,
    }));

    return cast;
  }

  return fetchMovieCast();
}

getMovieImages(id: number): Promise<Images[]> {
  async function fetchMovieImages() {
    const movieImagesResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`,
      { headers }
    );

    if (!movieImagesResponse.ok) {
      throw new Error("Failed to fetch movie images");
    }

    const data = await movieImagesResponse.json();

    // Transformation des données API pour correspondre à l'interface `Images`
    const images = data.backdrops.map((backdrop: { file_path: string }) => ({
      filePath: backdrop.file_path, // Transforme 'file_path' en 'filePath'
    }));

    return images;
  }

  return fetchMovieImages();
}
}
