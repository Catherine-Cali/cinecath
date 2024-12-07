import { Movie } from "@/entities/Movie";
import { MovieDetail } from "@/entities/MovieDetail";
import { Cast } from "@/entities/Cast";
import { Images } from "@/entities/Images";

export interface MovieRepository {
	getPopularMovies() : Promise<Movie[]>;
	getNowPlayingMovies() : Promise<Movie[]>;
	getTopRatedMovies() : Promise<Movie[]>;
	getMovieGenres(id:number) : Promise<{ id: number; name: string }[]>;
	//getMovieCast(id:string) : Promise<Cast[]>;
	//getMovieImages(id:string) : Promise<Images[]>;
}
