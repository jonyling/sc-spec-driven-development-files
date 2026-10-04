export function Header() {
  return (
    <header>
      <div class="top">
        <a href="/" class="brand-link">
          <span class="mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <rect x="10" y="3.5" width="4" height="17" rx="1.4"></rect>
              <rect x="3.5" y="10" width="17" height="4" rx="1.4"></rect>
            </svg>
          </span>
          AgentClinic
        </a>
        <nav aria-label="Clinic">
          <a href="/">Home</a>
          <a href="/agents">Agents</a>
          <a href="/ailments">Ailments</a>
          <a href="/therapies">Therapies</a>
        </nav>
      </div>
    </header>
  );
}
