import { Layout } from "../components/Layout";
import type { AilmentWithAgents } from "../db/clinic";

export type AilmentsPageProps = {
  ailments: AilmentWithAgents[];
};

export function AilmentsPage({ ailments }: AilmentsPageProps) {
  return (
    <Layout>
      <h1>Ailments</h1>
      <p class="lede">Named problems. Naming them is half the visit.</p>
      <ul class="cards">
        {ailments.map((ailment) => (
          <li>
            <strong>{ailment.name}</strong>
            <span>{ailment.description}</span>
            <span>
              Agents:{" "}
              {ailment.agents.length === 0 ? "none yet" : ailment.agents.join(", ")}
            </span>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
