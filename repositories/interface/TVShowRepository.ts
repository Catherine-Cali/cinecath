import { TVShow } from "@/entities/TVShow";

export interface TVShowRepository {
	getOnTheAirTVShows() : Promise<TVShow[]>;
	getPopularTVShows() : Promise<TVShow[]>;
	getTopRatedTVShows() : Promise<TVShow[]>;
}
