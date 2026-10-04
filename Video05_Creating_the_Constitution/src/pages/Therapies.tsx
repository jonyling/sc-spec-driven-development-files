import { Layout } from "../components/Layout";
import type { TherapyWithAilments } from "../db/clinic";

export type TherapiesPageProps = {
  therapies: TherapyWithAilments[];
};

export function TherapiesPage({ therapies }: TherapiesPageProps) {
  return (
    <Layout>
      <h1>Therapies</h1>
      <p class="lede">What we offer once the ailment has a name.</p>
      <ul class="cards">
        {therapies.map((therapy) => (
          <li>
            <strong>{therapy.name}</strong>
            <span>{therapy.description}</span>
            <span>
              For:{" "}
              {therapy.ailments.length === 0
                ? "unassigned"
                : therapy.ailments.join(", ")}
            </span>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
