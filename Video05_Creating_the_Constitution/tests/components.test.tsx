import { describe, expect, it } from "vitest";
import { Footer } from "../src/components/Footer";
import { Header } from "../src/components/Header";
import { Layout } from "../src/components/Layout";
import { Main } from "../src/components/Main";

describe("Header", () => {
  it("renders a header that links home as AgentClinic", () => {
    const html = Header().toString();
    expect(html).toContain("<header");
    expect(html).toContain('href="/"');
    expect(html).toContain("AgentClinic");
  });
});

describe("Footer", () => {
  it("renders a footer with the current year and site name", () => {
    const html = Footer().toString();
    expect(html).toContain("<footer");
    expect(html).toContain(String(new Date().getFullYear()));
    expect(html).toContain("AgentClinic");
  });
});

describe("Main", () => {
  it("wraps children in a main element", () => {
    const html = Main({ children: "hello world" }).toString();
    expect(html).toContain("<main");
    expect(html).toContain("hello world");
  });
});

describe("Layout", () => {
  it("renders the document shell with title, viewport, and stylesheet", () => {
    const html = Layout({ children: "page content" }).toString();
    expect(html).toContain('<html lang="en"');
    expect(html).toContain("<title>AgentClinic</title>");
    expect(html).toContain('name="viewport"');
    expect(html).toContain("width=device-width");
    expect(html).toContain('href="/static/style.css"');
    expect(html).toContain("page content");
    expect(html).toContain("<header");
    expect(html).toContain("<main");
    expect(html).toContain("<footer");
  });
});
