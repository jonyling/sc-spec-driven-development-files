import { Layout } from "../components/Layout";
import type { Agent } from "../db/clinic";

export type AgentsPageProps = {
  agents: Agent[];
};

export function AgentsPage({ agents }: AgentsPageProps) {
  return (
    <Layout>
      <h1>Agents</h1>
      <p class="lede">Charts for models who need a quiet hour.</p>
      <ul class="cards">
        {agents.map((agent) => (
          <li>
            <a href={`/agents/${agent.id}`}>{agent.name}</a>
            <span>
              {agent.model_type} · {agent.status}
            </span>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
