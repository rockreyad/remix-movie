import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import styles from "./tailwind.css";
import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

/**
 * Docs: https://remix.run/docs/en/v1/api/conventions#meta
 *
 * This meta function may run on the server
 * If you need server-side data in meta, get the data in the loader and access it via the meta function's data parameter.
 *
 * There are a few special cases. In the case of nested routes, the meta tags are merged automatically, so parent routes can add meta tags without the child routes needing to copy them
 */

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Find your movie",
  description: "find the best movie list around the world",
  viewport: "width=device-width,initial-scale=1",
});

export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {/* add the UI you want your users to see */}
        {error.message}
        <Scripts />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>
          {caught.status} {caught.statusText}
        </h1>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
