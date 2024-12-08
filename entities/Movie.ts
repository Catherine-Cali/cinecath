//l'interface permet de définir un contrat de règles,
// une structure, forme pour notre code : nommer et typer

export interface Movie {
    name: any;
    datemax : string;
    datemin : string; 
    title: string;
    id: number;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    vote_average: number;
    releaseDate: string;
    adult: boolean; 
    popularity: number; 
    backdrop_path: string; 
    overview: string; 
    poster_path: string; 
  }
