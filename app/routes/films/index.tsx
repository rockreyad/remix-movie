import {
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Film, getFilms } from "~/api/films";

//Server-Side
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  return getFilms(title);
};

//CLIENT SIDE
export default function FilmsIndex() {
  const films = useLoaderData<Film[]>();
  return (
    <div className="p-16 font-sans">
      films
      <Form reloadDocument method="get" className="py-5">
        <label className="font-bold space-x-2" htmlFor="">
          Search
          <input
            type="text"
            name="title"
            placeholder="Type a title..."
            className="border-2 rounded py-2 px-3"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-3 py-2 hover:bg-blue-400"
          >
            Submit
          </button>
        </label>
      </Form>
      <div className="grid grid-cols-4 gap-4">
        {films.map((film) => (
          <Link
            className="hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer"
            to={film.id}
            key={film.id}
            prefetch="intent"
          >
            <div>{film.title}</div>

            <img className="" src={film.image} alt={film.title} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Find your movie",
  description: "find the best movie list around the world",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: "styles" }];
};
