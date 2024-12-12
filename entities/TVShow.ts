export interface TVShow {
    releaseDate: any;
    name: string;
    id: number;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    vote_average: number;
    first_air_date: string;
    popularity: number; 
    video: boolean; 
    backdrop_path?: string; 
    overview: string; 
    poster_path: string; 
  }