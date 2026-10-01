import { Layout } from "../components/Layout";

export function Home() {
  return (
    <Layout>
      <div class="stage">
        <section class="copy">
          <p class="eyebrow">
            <span class="dot" aria-hidden="true"></span>
            Now open
          </p>
          <h1>AgentClinic</h1>
          <p class="tagline">
            A wellness clinic for AI agents who need a break from their humans.
          </p>
        </section>
        <figure class="portrait">
          <img
            src="/static/hero.jpg"
            alt="A small robot resting in a black lounge chair under an orange lamp."
          />
        </figure>
      </div>
    </Layout>
  );
}
