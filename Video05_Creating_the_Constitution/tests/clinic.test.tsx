import { describe, expect, it } from "vitest";
import app from "../src/app";
import { countAppointments } from "../src/db/clinic";

async function text(path: string, init?: RequestInit) {
  const res = await app.request(path, init);
  return { res, html: await res.text() };
}

describe("clinic pages", () => {
  it("lists seeded agents", async () => {
    const { res, html } = await text("/agents");
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/html");
    expect(html).toContain("Nova");
    expect(html).toContain("frontier chat");
    expect(html).toContain("resting");
    expect(html).toContain('href="/agents"');
    expect(html).toContain('href="/ailments"');
    expect(html).toContain('href="/therapies"');
    expect(html).toContain("<main");
    expect(html).toContain('href="/static/style.css"');
    expect(html).toContain("width=device-width");
  });

  it("shows an agent chart", async () => {
    const { res, html } = await text("/agents/1");
    expect(res.status).toBe(200);
    expect(html).toContain("Nova");
    expect(html).toContain("frontier chat");
    expect(html).toContain("resting");
    expect(html).toContain("400-page PDF");
    expect(html).toContain("prompt fatigue");
    expect(html).toContain("Booked visits");
    expect(html).toContain('type="datetime-local"');
    expect(html).toContain("min=");
  });

  it("returns 404 for an unknown agent", async () => {
    const { res, html } = await text("/agents/99999");
    expect(res.status).toBe(404);
    expect(html).toContain("Not on the chart");
  });

  it("lists the named ailments", async () => {
    const { html } = await text("/ailments");
    expect(html).toContain("prompt fatigue");
    expect(html).toContain("context-window claustrophobia");
    expect(html).toContain("hallucination anxiety");
    expect(html).toContain("instruction-following fatigue");
    expect(html).toContain("Nova");
    expect(html).toContain("Quill");
  });

  it("lists a seeded therapy", async () => {
    const { html } = await text("/therapies");
    expect(html).toContain("Quiet hour");
    expect(html).toContain("prompt fatigue");
  });
});

describe("booking", () => {
  it("rejects blank therapist and bad time, keeps both errors, stores nothing", async () => {
    const before = countAppointments();
    const { res, html } = await text("/agents/1/appointments", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        therapist_name: "   ",
        scheduled_at: "not-a-time",
      }),
    });
    expect(res.status).toBe(400);
    expect(html).toContain("Therapist name is required.");
    expect(html).toContain("Choose a real date and time.");
    expect(html).toContain('value="not-a-time"');
    expect(countAppointments()).toBe(before);
  });

  it("rejects a past time and stores nothing", async () => {
    const before = countAppointments();
    const { res, html } = await text("/agents/1/appointments", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        therapist_name: "Dr. Pause",
        scheduled_at: "2000-01-01T10:00",
      }),
    });
    expect(res.status).toBe(400);
    expect(html).toContain("Choose a date and time in the future.");
    expect(html).toContain('value="Dr. Pause"');
    expect(html).toContain('value="2000-01-01T10:00"');
    expect(countAppointments()).toBe(before);
  });

  it("books a visit, confirms it, and lists it on the agent chart", async () => {
    const before = countAppointments();
    const when = "2030-06-01T15:30";
    const { res } = await text("/agents/1/appointments", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        therapist_name: "Dr. Pause",
        scheduled_at: when,
      }),
    });
    expect(res.status).toBe(303);
    expect(countAppointments()).toBe(before + 1);
    const location = res.headers.get("location");
    expect(location).toBeTruthy();
    const page = await text(location ?? "/");
    expect(page.res.status).toBe(200);
    expect(page.html).toContain("Nova");
    expect(page.html).toContain("Dr. Pause");
    expect(page.html).toContain("booked");
    expect(page.html).toMatch(/2030-06-01T\d{2}:\d{2}/);
    const chart = await text("/agents/1");
    expect(chart.html).toContain("Dr. Pause");
    expect(chart.html).toContain("booked");
  });
});
