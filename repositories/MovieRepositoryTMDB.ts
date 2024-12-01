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

  async getPopularMovies(): Promise<Movie[]> {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    const popularMovieResponse = await fetch(url, options);

    if (!popularMovieResponse.ok) {
        throw new Error('Failed to fetch popular movies');
    }

    const data = await popularMovieResponse.json();
    return data.results; 
}

async getTopRatedMovies(): Promise<Movie[]> {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    const topRatedMovieResponse = await fetch(url, options);

    if (!topRatedMovieResponse.ok) {
        throw new Error('Failed to fetch top-rated movies');
    }

    const data = await topRatedMovieResponse.json();
    return data.results; 
}
}

