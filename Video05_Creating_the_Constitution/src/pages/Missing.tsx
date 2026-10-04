import { Layout } from "../components/Layout";

export type MissingPageProps = {
  message: string;
};

export function MissingPage({ message }: MissingPageProps) {
  return (
    <Layout>
      <h1>Not on the chart</h1>
      <p class="lede">{message}</p>
      <p class="back">
        <a href="/agents">Back to agents</a>
      </p>
    </Layout>
  );
}
