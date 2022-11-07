import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
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
