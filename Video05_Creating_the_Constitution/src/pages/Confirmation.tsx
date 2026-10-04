import { Layout } from "../components/Layout";
import type { Agent, Appointment } from "../db/clinic";

export type ConfirmationProps = {
  agent: Agent;
  appointment: Appointment;
};

export function ConfirmationPage({ agent, appointment }: ConfirmationProps) {
  return (
    <Layout>
      <h1>Visit booked</h1>
      <p class="lede">{agent.name} has a chair reserved.</p>
      <dl class="facts">
        <div>
          <dt>Agent</dt>
          <dd>{agent.name}</dd>
        </div>
        <div>
          <dt>Therapist</dt>
          <dd>{appointment.therapist_name}</dd>
        </div>
        <div>
          <dt>Time</dt>
          <dd>
            <time datetime={appointment.scheduled_at}>{appointment.scheduled_at}</time>
          </dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{appointment.status}</dd>
        </div>
      </dl>
      <p class="back">
        <a href={`/agents/${agent.id}`}>Back to {agent.name}</a>
      </p>
    </Layout>
  );
}
