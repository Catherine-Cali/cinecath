import { NextResponse } from 'next/server';
import { Movie } from '../../../entities/Movie';

const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',

    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmYyNzY4NzU0NmYyMDY3MzMzNDYyOWUwNGRjOWM3MCIsIm5iZiI6MTczMDgyMDExOS45OTIzMTUzLCJzdWIiOiI2NzJhMzM5YjE0ZDRhMzk5NzIwMzU2MDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._QOFs8qsJmlp3C3eUZVLptw2xG6B6LBwBLQdldX4m2A'
}};


export async function GET() {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des données: ${response.status}`);
    }

    const data = await response.json();

    const movies: Movie[] = data.results.map((item:Movie) => ({
      id: item.id,
      title: item.title,
      overview: item.overview,
      releaseDate: item.release_date,
      posterPath: item.poster_path,
    }));

    return NextResponse.json(movies, { status: 200 });
  }

   catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
