import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import {
  ailmentsForAgent,
  appointmentsForAgent,
  createAppointment,
  getAgent,
  getAppointment,
  listAgents,
  listAilmentsWithAgents,
  listTherapiesWithAilments,
  openClinic,
} from "./db/clinic";
import { AgentDetailPage } from "./pages/AgentDetail";
import { AgentsPage } from "./pages/Agents";
import { AilmentsPage } from "./pages/Ailments";
import { ConfirmationPage } from "./pages/Confirmation";
import { Home } from "./pages/Home";
import { MissingPage } from "./pages/Missing";
import { TherapiesPage } from "./pages/Therapies";
import { datetimeLocalMin, validateBooking } from "./routes/booking";

const app = new Hono();

app.use("/static/*", serveStatic({ root: "./" }));

app.get("/", (c) => {
  return c.html(<Home />);
});

app.get("/agents", (c) => {
  openClinic();
  return c.html(<AgentsPage agents={listAgents()} />);
});

app.get("/agents/:id", (c) => {
  openClinic();
  const agent = getAgent(Number(c.req.param("id")));
  if (!agent) {
    return c.html(
      <MissingPage message="No agent by that chart number." />,
      404,
    );
  }
  return c.html(
    <AgentDetailPage
      agent={agent}
      ailments={ailmentsForAgent(agent.id)}
      appointments={appointmentsForAgent(agent.id)}
      errors={[]}
      therapistName=""
      scheduledAt=""
      minScheduledAt={datetimeLocalMin()}
    />,
  );
});

app.post("/agents/:id/appointments", async (c) => {
  openClinic();
  const agent = getAgent(Number(c.req.param("id")));
  if (!agent) {
    return c.html(
      <MissingPage message="No agent by that chart number." />,
      404,
    );
  }
  const body = await c.req.parseBody();
  const therapistName = String(body.therapist_name ?? "");
  const scheduledAt = String(body.scheduled_at ?? "");
  const result = validateBooking({ therapistName, scheduledAt });
  if (!result.ok) {
    return c.html(
      <AgentDetailPage
        agent={agent}
        ailments={ailmentsForAgent(agent.id)}
        appointments={appointmentsForAgent(agent.id)}
        errors={result.errors}
        therapistName={therapistName}
        scheduledAt={scheduledAt}
        minScheduledAt={datetimeLocalMin()}
      />,
      400,
    );
  }
  const appointment = createAppointment(
    agent.id,
    result.therapistName,
    result.scheduledAt,
  );
  return c.redirect(`/appointments/${appointment.id}`, 303);
});

app.get("/appointments/:id", (c) => {
  openClinic();
  const appointment = getAppointment(Number(c.req.param("id")));
  if (!appointment) {
    return c.html(<MissingPage message="That visit is not on the book." />, 404);
  }
  const agent = getAgent(appointment.agent_id);
  if (!agent) {
    return c.html(<MissingPage message="That visit is not on the book." />, 404);
  }
  return c.html(
    <ConfirmationPage agent={agent} appointment={appointment} />,
  );
});

app.get("/ailments", (c) => {
  openClinic();
  return c.html(<AilmentsPage ailments={listAilmentsWithAgents()} />);
});

app.get("/therapies", (c) => {
  openClinic();
  return c.html(<TherapiesPage therapies={listTherapiesWithAilments()} />);
});

export default app;
