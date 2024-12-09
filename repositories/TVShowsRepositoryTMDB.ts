import { TVShow } from "@/entities/TVShow";
import { TVShowRepository } from "./interface/TVShowRepository";
import { Cast } from "@/entities/Cast";
import { Images } from "@/entities/Images";
import { ShowDetail } from "@/entities/ShowDetail";

const headers = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmYyNzY4NzU0NmYyMDY3MzMzNDYyOWUwNGRjOWM3MCIsIm5iZiI6MTczMDgxODk3MS44MDcwMDAyLCJzdWIiOiI2NzJhMzM5YjE0ZDRhMzk5NzIwMzU2MDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WyT1sAl3xJWfyT9Y7dwilWvuprYEeJ65P_R-WfS921Q`,
  "Content-Type": "application/json;charset=utf-8",
};

export class TVShowRepositoryTMDB implements TVShowRepository {

  getOnTheAirTVShows(): Promise<TVShow[]> {
    async function fetchOnTheAir(){
      const onTheAirTVShowsResponse = await fetch("/api/shows/on-the-air")
      if (!onTheAirTVShowsResponse.ok) {
        throw new Error('Failed to fetch on the air tv shows')
      }
    const data = await onTheAirTVShowsResponse.json()

    return data 
  }
  return fetchOnTheAir()
  }

  getPopularTVShows(): Promise<TVShow[]> {
    async function fetchPopular(){
      const PopularTVShowsResponse = await fetch("/api/shows/popular")
      if (!PopularTVShowsResponse.ok) {
        throw new Error('Failed to fetch popular tv shows')
      }
    const data = await PopularTVShowsResponse.json()

    return data 
  }
  return fetchPopular()
  }

  getTopRatedTVShows(): Promise<TVShow[]> {
    async function fetchTopRated(){
      const TopRatedTVShowsResponse = await fetch("/api/shows/top-rated")
      if (!TopRatedTVShowsResponse.ok) {
        throw new Error('Failed to fetch popular tv shows')
      }
    const data = await TopRatedTVShowsResponse.json()

    return data 
  }
  return fetchTopRated()
  }

  getShowCast(id: number): Promise<Cast[]> {
    async function fetchShowCast() {
      const showCastResponse = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.TMDB_KEY}`,
        { headers }
      );
  
      if (!showCastResponse.ok) {
        throw new Error("Failed to fetch tv show cast");
      }
  
      const data = await showCastResponse.json();
  
      // On extrait les informations des acteurs et on les mappe à l'interface Cast
      const cast = data.cast.map((actor: { name: string; character: string; profile_path: string }) => ({
        name: actor.name,
        character: actor.character,
        profile_path: actor.profile_path,
      }));
      return cast;
    }
    return fetchShowCast()
  }
    
  getShowImages(id: number): Promise<Images[]> {
    async function fetchShowImages() {
      const showImagesResponse = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/images?api_key=${process.env.TMDB_KEY}`,
        { headers }
      );
  
      if (!showImagesResponse.ok) {
        throw new Error("Failed to fetch tv show images");
      }
  
      const data = await showImagesResponse.json();
  
      // Transformation des données API pour correspondre à l'interface `Images`
      const images = data.backdrops.map((backdrop: { file_path: string }) => ({
        filePath: backdrop.file_path, // Transforme 'file_path' en 'filePath'
      }));
  
      return images;
    }
  
    return fetchShowImages();
  }

	getShowGenres(id: number): Promise<{ id: number; name: string }[]> {
    async function fetchShowGenres(){
      const showGenreResponse = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_KEY}`,
          { headers }
        );
        if (!showGenreResponse.ok) {
          throw new Error("Failed to fetch tv show genres");
        }
        const data = await showGenreResponse.json();
        return data.genres;
    }
    return fetchShowGenres();
  }

  getShowDetails(id: number): Promise<ShowDetail> {
    async function fetchShowDetails() {
      const showDetailResponse = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_KEY}`,
          { headers }
      );
      if (!showDetailResponse.ok) {
        throw new Error("Failed to fetch movie details");
      }
      const data = await showDetailResponse.json();
      return data; // Cast des données en MovieDetail
    }
    return fetchShowDetails();
  }
}

