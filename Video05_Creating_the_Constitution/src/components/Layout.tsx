import { raw } from "hono/html";
import type { Child } from "hono/jsx";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";

export type LayoutProps = {
  children?: Child;
};

export function Layout({ children }: LayoutProps) {
  return (
    <>
      {raw("<!DOCTYPE html>")}
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#111111" />
        <title>AgentClinic</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,680&family=Outfit:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/static/style.css" />
      </head>
      <body>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
    </>
  );
}
