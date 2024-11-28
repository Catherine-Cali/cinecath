import { NextResponse } from 'next/server';
import { Movie } from '../../../entities/Movie';
import { TVShow } from '../../../entities/TVShow';

const urlm = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const urls = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',

    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmYyNzY4NzU0NmYyMDY3MzMzNDYyOWUwNGRjOWM3MCIsIm5iZiI6MTczMDgyMDExOS45OTIzMTUzLCJzdWIiOiI2NzJhMzM5YjE0ZDRhMzk5NzIwMzU2MDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._QOFs8qsJmlp3C3eUZVLptw2xG6B6LBwBLQdldX4m2A'
}};

export async function GET() {
  try {
    const responseMovie = await fetch(urlm,options);
    const responseShow = await fetch(urls,options);

    if (!responseMovie.ok) {
        throw new Error(`Erreur lors de la recuperation des donnees: ${responseMovie.status}`);
    }

    if (!responseShow.ok) {
        throw new Error(`Erreur lors de la recuperation des donnees: ${responseShow.status}`);
    }

    const dataMovie = await responseShow.json();
    const dataShow = await responseMovie.json();

    const movies: Movie[] = dataMovie.results.map((item: Movie) => ({
      id: item.id,
      title: item.title,
      overview: item.overview,
      releaseDate: item.release_date,
      posterPath: item.poster_path,
    }));

    const show: TVShow[] = dataShow.results.map((item: TVShow) => ({
        id: item.id,
        name: item.name,
        overview: item.overview,
        releaseDate: item.release_date,  
        posterPath: item.poster_path,
    }));
    return NextResponse.json({ show, movies }, { status: 200 });
  }

   catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
