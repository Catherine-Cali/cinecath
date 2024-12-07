import { Movie } from "./Movie";


export interface MovieDetail extends Movie {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
    release_date: string;
    poster_path: string;
    genres: { id: number; name: string }[];
}