import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { Film, getFilmsById } from "~/api/films";
import CharacterList from "~/components/CharacterList";
import FilmBanner from "~/components/FilmBanner";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.filmId, "Expected params.filmId");
  const film = await getFilmsById(params.filmId);
  return film;
};

export default function Film() {
  const film = useLoaderData<Film>();
  return (
    <div>
      <FilmBanner film={film} />

      <div className="p-10">
        <p>{film.description}</p>

        <div className="flex py-5 space-x-5">
          <CharacterList characters={film.characters} />

          <div className="flex-1 flex flex-col justify-between">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
