import Shortener from '@/components/Shortener';

const FEATURES = [
  {
    title: 'Detailed Link Analytics',
    text: 'Acompanhe o desempenho dos seus links e entenda de onde vêm os cliques.',
  },
  {
    title: 'Fully Branded Domains',
    text: 'Personalize cada parte do link com um domínio próprio.',
  },
  {
    title: 'Bulk Short URLs',
    text: 'Crie milhares de links únicos de uma vez via API.',
  },
  {
    title: 'Link Management',
    text: 'Busque, edite e gerencie milhares de links num só lugar.',
  },
];

export default function Home() {
  return (
    <>
      <header className="siteHeader">
        <div className="container headerInner">
          <span className="brand">
            <span className="brandMark" aria-hidden="true">
              ↗
            </span>
            Shortly
          </span>
          <nav className="nav" aria-label="Principal">
            <a href="#features">Features</a>
            <a href="#recent">Recent links</a>
            <a
              href="https://github.com/lucabelezal"
              target="_blank"
              rel="noopener noreferrer">
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <h1>URL Shortener, Branded Short Links &amp; Analytics</h1>
          <p className="lead">
            Encurte um link, copie e compartilhe. Seus links recentes ficam aqui —
            prontos para reusar.
          </p>
        </section>

        <Shortener />

        <section id="features" className="features" aria-label="Recursos">
          <h2 className="sectionTitle">Plans Include</h2>
          <div className="featureGrid">
            {FEATURES.map((f) => (
              <article key={f.title} className="feature">
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="siteFooter">
        <div className="container">
          <p className="muted small">
            Shortly — demo de encurtador. Os links são gerados no seu navegador
            (mock local) e redirecionam via <code>/r/&lt;code&gt;</code>.
          </p>
        </div>
      </footer>
    </>
  );
}
