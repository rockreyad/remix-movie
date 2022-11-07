export type FilmCharacter = {
  id: string;
  name: string;
  gender?: string;
  age?: string;
  eye_color?: string;
  hair_color?: string;
};

export type Film = {
  id: string;
  title: string;
  description: string;
  original_title: string;
  image: string;
  movie_banner: string;
  people: string[];
  release_date: number;
  running_time: number;
  rt_score: number;
  characters?: FilmCharacter[];
};

export async function getFilms(title?: string | null) {
  const response = await fetch("https://ghibliapi.herokuapp.com/films");

  const films: Film[] = await response.json();
  return films.filter((film) =>
    title ? film.title.toLowerCase().includes(title.toLowerCase()) : true
  );
}

export async function getFilmsById(filmId: string) {
  const response = await fetch(
    `https://ghibliapi.herokuapp.com/films/${filmId}`
  );

  const film: Film = await response.json();

  const characters = await Promise.all(
    film.people
      .filter((url) => url !== "https://ghibliapi.herokuapp.com/people/")
      .map((url) => fetch(url).then((res) => res.json()))
  );

  return { ...film, characters };
}

export async function getFilmCharacter(
  characterId: string
): Promise<FilmCharacter> {
  const response = await fetch(
    `https://ghibliapi.herokuapp.com/people/${characterId}`
  );

  if (!response.ok) {
    throw response;
  }

  return response.json();
}
