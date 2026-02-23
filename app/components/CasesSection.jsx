import Link from "next/link";
import { getAllCaseSummaries } from "../lib/markdown";

export default function CasesSection() {
  const cases = getAllCaseSummaries()
    .sort((a, b) => {
      if (a.order != null && b.order != null) {
        return a.order - b.order;
      }
      if (a.order != null) return -1;
      if (b.order != null) return 1;
      return a.title.localeCompare(b.title);
    })
    .map((item) => ({
      id: item.id,
      hrefId: item.id,
      tags: item.tags || [],
      meta: item.meta || "",
      title: item.title,
      summary: item.summary,
      imageSrc: item.imageSrc,
    }));

  return (
    <section id="cases" className="reveal">
      <div className="container">
        <div className="section-head">
          <h2>Cases</h2>
          <p>Structured index</p>
        </div>

        <div className="cases-grid">
          {cases.map((item) => {
            return (
              <Link
                key={item.id}
                href={`/cases/${item.hrefId}`}
                className="card-link"
                aria-label={`${item.title} の詳細を見る`}
              >
                <article
                  className="case case-card"
                  data-tags={(item.tags || []).join(" ")}
                >
                  <div className="case-media" aria-hidden="true">
                    <img src={item.imageSrc} alt="" loading="lazy" />
                  </div>
                  <div className="case-body">
                    <div className="case-meta">{item.meta}</div>
                    <h3>{item.title}</h3>
                    <p className="summary">{item.summary}</p>
                    <p className="case-link-text">詳細を見る</p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
