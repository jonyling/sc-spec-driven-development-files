import { Layout } from "../components/Layout";
import type { Agent, Ailment, Appointment } from "../db/clinic";

export type AgentDetailProps = {
  agent: Agent;
  ailments: Ailment[];
  appointments: Appointment[];
  errors: string[];
  therapistName: string;
  scheduledAt: string;
  minScheduledAt: string;
};

export function AgentDetailPage({
  agent,
  ailments,
  appointments,
  errors,
  therapistName,
  scheduledAt,
  minScheduledAt,
}: AgentDetailProps) {
  return (
    <Layout>
      <p class="back">
        <a href="/agents">All agents</a>
      </p>
      <h1>{agent.name}</h1>
      <dl class="facts">
        <div>
          <dt>Model</dt>
          <dd>{agent.model_type}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{agent.status}</dd>
        </div>
        <div>
          <dt>Presenting complaints</dt>
          <dd>{agent.presenting_complaints}</dd>
        </div>
        <div>
          <dt>Ailments</dt>
          <dd>
            {ailments.length === 0 ? (
              "None on file."
            ) : (
              <ul>
                {ailments.map((ailment) => (
                  <li>{ailment.name}</li>
                ))}
              </ul>
            )}
          </dd>
        </div>
        <div>
          <dt>Booked visits</dt>
          <dd>
            {appointments.length === 0 ? (
              "None booked yet."
            ) : (
              <ul>
                {appointments.map((visit) => (
                  <li>
                    <a href={`/appointments/${visit.id}`}>
                      {visit.therapist_name} · {visit.scheduled_at} ·{" "}
                      {visit.status}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </dd>
        </div>
      </dl>
      <section class="book">
        <h2>Book a visit</h2>
        {errors.length > 0 ? (
          <ul class="errors">
            {errors.map((error) => (
              <li>{error}</li>
            ))}
          </ul>
        ) : null}
        <form method="post" action={`/agents/${agent.id}/appointments`}>
          <label>
            Therapist name
            <input name="therapist_name" value={therapistName} />
          </label>
          <label>
            Date and time
            <input
              type="datetime-local"
              name="scheduled_at"
              min={minScheduledAt}
              value={scheduledAt}
            />
          </label>
          <button type="submit">Book appointment</button>
        </form>
      </section>
    </Layout>
  );
}
