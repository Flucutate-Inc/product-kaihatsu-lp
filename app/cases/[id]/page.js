import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCaseIds, getCaseMarkdownHtml } from "../../lib/markdown";
import HeroImage from "../../components/HeroImage";

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

function MarkdownDetail({ project, markdown }) {
  const title = markdown.frontMatter?.title || project?.title;
  const lead = markdown.frontMatter?.lead || project?.lead;
  const meta = markdown.frontMatter?.meta || project?.meta;
  const imageSrc = markdown.frontMatter?.imageSrc;
  const imageFallbackSrc = markdown.frontMatter?.imageFallbackSrc;

  return (
    <main className="detail-main">
      <section className="detail-hero reveal">
        <div className="container">
          <div className="detail-hero-grid">
            <div className="detail-hero-copy">
              {meta ? <p className="detail-meta">{meta}</p> : null}
              <h1>{title}</h1>
              {lead ? <p className="hero-copy">{lead}</p> : null}
            </div>

            {imageSrc ? (
              <div className="detail-hero-media" aria-hidden="true">
                <HeroImage src={imageSrc} fallbackSrc={imageFallbackSrc} />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="reveal">
        <div className="container detail-stack">
          <article
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: markdown.contentHtml }}
          />
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return getAllCaseIds().map((id) => ({ id }));
}

export default async function CaseDetailPage({ params }) {
  const markdown = await getCaseMarkdownHtml(params.id);

  if (!markdown) {
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

      <MarkdownDetail markdown={markdown} />
    </>
  );
}
