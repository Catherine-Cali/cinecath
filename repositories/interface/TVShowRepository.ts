import { Cast } from "@/entities/Cast";
import { Images } from "@/entities/Images";
import { ShowDetail } from "@/entities/ShowDetail";
import { TVShow } from "@/entities/TVShow";

export interface TVShowRepository {
	getOnTheAirTVShows() : Promise<TVShow[]>;
	getPopularTVShows() : Promise<TVShow[]>;
	getTopRatedTVShows() : Promise<TVShow[]>;
	getShowGenres(id:number) : Promise<{ id: number; name: string }[]>;
	getShowCast(id:number) : Promise<Cast[]>;
	getShowImages(id:number) : Promise<Images[]>;
	getShowDetails(id:number):Promise<ShowDetail>;
	getDiscoverTVShows() :Promise<TVShow[]>;
}
