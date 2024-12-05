import { Movie } from "@/entities/Movie";
import { MovieRepository } from "./interface/MovieRepository";

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
}

