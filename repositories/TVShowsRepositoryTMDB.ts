import { TVShow } from "@/entities/TVShow";
import { TVShowRepository } from "./interface/TVShowRepository";

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
}

