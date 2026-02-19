import Link from "next/link";
import { notFound } from "next/navigation";
import cases from "../../data/cases.json";
import caseDetails from "../../data/caseDetails";

function Diagram({ lines = [], note = "" }) {
  const nodes = lines.filter((line) => line.trim() !== "↓" && line.trim() !== "  ↓");

  return (
    <div className="diagram-boxes" aria-label="structure diagram">
      <div className="diagram-col">
        <p className="diagram-title">Flow</p>
        <div className="diagram-flow">
          {nodes.map((item, index) => (
            <span key={`${item}-${index}`} className="node">
              {item}
            </span>
          ))}
        </div>
      </div>
      {note ? <p className="diagram-note">{note}</p> : null}
    </div>
  );
}

function LegacyDetail({ data }) {
  return (
    <main className="detail-main">
      <section className="detail-hero reveal">
        <div className="container">
          <p className="detail-meta">{data.meta.join(" / ")}</p>
          <h1>{data.title}</h1>
          <p className="hero-copy">{data.summary}</p>
        </div>
      </section>

      <section className="reveal">
        <div className="container detail-stack">
          <div className="section-head">
            <h2>課題定義</h2>
            <p>Challenge</p>
          </div>
          <div className="triple-grid">
            {data.challenge.map((line) => (
              <article key={line} className="block-card">
                <p>{line}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal">
        <div className="container detail-stack">
          <div className="section-head">
            <h2>問題の分解</h2>
            <p>Breakdown</p>
          </div>
          <div className="triple-grid">
            {data.breakdown.map(([label, text]) => (
              <article key={label} className="block-card">
                <span className="label">{label}</span>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal">
        <div className="container detail-stack">
          <div className="section-head">
            <h2>設計判断</h2>
            <p>Decision</p>
          </div>
          <div className="triple-grid">
            {data.decision.map(([label, text]) => (
              <article key={label} className="block-card">
                <span className="label">{label}</span>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal diagram">
        <div className="container detail-stack">
          <div className="section-head">
            <h2>Before → After</h2>
            <p>Structure</p>
          </div>
          <div className="diagram-boxes" aria-label="before and after structure">
            <div className="diagram-col">
              <p className="diagram-title">Before</p>
              <div className="diagram-flow">
                {data.beforeAfter.before.map((item) => (
                  <span key={item} className="node">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="diagram-arrow" aria-hidden="true">
              →
            </div>

            <div className="diagram-col">
              <p className="diagram-title">After</p>
              <div className="diagram-flow">
                {data.beforeAfter.after.map((item) => (
                  <span key={item} className="node">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <p className="diagram-note">{data.beforeAfter.note}</p>
          </div>
        </div>
      </section>

      <section className="reveal">
        <div className="container detail-stack">
          <div className="section-head">
            <h2>UI設計の意図</h2>
            <p>UI Intent</p>
          </div>
          <div className="triple-grid">
            {data.uiIntent.map(([title, text]) => (
              <article key={title} className="block-card">
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal">
        <div className="container detail-stack">
          <div className="section-head">
            <h2>実装上の重心</h2>
            <p>Implementation</p>
          </div>
          <div className="triple-grid">
            {data.implementationFocus.map((line) => (
              <article key={line} className="block-card">
                <p>{line}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="result" className="reveal">
        <div className="container detail-stack">
          <div className="section-head">
            <h2>結果</h2>
            <p>Result</p>
          </div>
          <div className="triple-grid">
            {data.result.map((line) => (
              <article key={line} className="block-card">
                <p>{line}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal">
        <div className="container detail-stack">
          <div className="section-head">
            <h2>サンプル本文</h2>
            <p>Sample Copy</p>
          </div>
          <article className="sample-card">
            {data.sample.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </article>
        </div>
      </section>
    </main>
  );
}

function CaseJsonDetail({ item }) {
  return (
    <main className="detail-main">
      <section className="detail-hero reveal">
        <div className="container">
          <p className="detail-meta">
            {item.meta?.category} / {item.meta?.year}
          </p>
          <h1>{item.hero?.headline || item.title}</h1>
          <p className="hero-copy">{item.hero?.lead || item.subtitle}</p>
        </div>
      </section>

      {(item.sections || []).map((section) => {
        const blocks = (section.body || section.bullets || []).slice(0, 3);
        const hasDiagram = Array.isArray(section.diagramText);

        return (
          <section className={`reveal ${hasDiagram ? "diagram" : ""}`} key={section.id}>
            <div className="container detail-stack">
              <div className="section-head">
                <h2>{section.title}</h2>
                <p>{section.id}</p>
              </div>

              {blocks.length > 0 ? (
                <div className="triple-grid">
                  {blocks.map((line) => (
                    <article key={line} className="block-card">
                      <p>{line}</p>
                    </article>
                  ))}
                </div>
              ) : null}

              {hasDiagram ? (
                <Diagram
                  lines={section.diagramText}
                  note={section.notes?.[0] || ""}
                />
              ) : null}
            </div>
          </section>
        );
      })}
    </main>
  );
}

export function generateStaticParams() {
  const idsFromCases = cases.map((item) => item.slug || item.id);
  const idsFromLegacy = Object.keys(caseDetails);
  return [...new Set([...idsFromCases, ...idsFromLegacy])].map((id) => ({ id }));
}

export default function CaseDetailPage({ params }) {
  const project = cases.find((item) => item.id === params.id || item.slug === params.id);
  const legacy = caseDetails[params.id];

  if (!project && !legacy) {
    notFound();
  }

  return (
    <>
      <header>
        <div className="container header-inner">
          <div className="brand">Product Development Cases</div>
          <nav aria-label="section links">
            <Link href="/">Index</Link>
            <a href="#top">Top</a>
          </nav>
        </div>
      </header>

      {project ? <CaseJsonDetail item={project} /> : <LegacyDetail data={legacy} />}
    </>
  );
}
