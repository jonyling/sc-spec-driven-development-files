import { describe, expect, it } from "vitest";
import app from "../src/app";

async function getHome() {
  const res = await app.request("/");
  return { res, html: await res.text() };
}

describe("GET /", () => {
  it("returns 200 OK", async () => {
    const { res } = await getHome();
    expect(res.status).toBe(200);
  });

  it("returns HTML", async () => {
    const { res, html } = await getHome();
    expect(res.headers.get("content-type")).toContain("text/html");
    expect(html.startsWith("<!DOCTYPE html>")).toBe(true);
  });

  it("contains the AgentClinic heading", async () => {
    const { html } = await getHome();
    expect(html).toContain("<h1>AgentClinic</h1>");
  });

  it("contains the mission tagline", async () => {
    const { html } = await getHome();
    expect(html).toContain(
      "A wellness clinic for AI agents who need a break from their humans.",
    );
  });

  it("renders the shared layout landmarks", async () => {
    const { html } = await getHome();
    expect(html).toContain("<header");
    expect(html).toContain("<main");
    expect(html).toContain("<footer");
  });

  it("links the CSS stylesheet", async () => {
    const { html } = await getHome();
    expect(html).toContain('href="/static/style.css"');
  });

  it("includes a responsive viewport meta tag", async () => {
    const { html } = await getHome();
    expect(html).toContain('name="viewport"');
    expect(html).toContain("width=device-width");
    expect(html).toContain("initial-scale=1.0");
  });
});

describe("GET /static/style.css", () => {
  it("returns a mobile-first stylesheet", async () => {
    const res = await app.request("/static/style.css");
    const css = await res.text();
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/css");
    expect(css).toMatch(/--[a-z0-9-]+:/);
    expect(css).toMatch(/--orange:/);
    expect(css).toMatch(/--black:/);
    expect(css).toMatch(/@media\s*\(min-width:/);
  });
});
