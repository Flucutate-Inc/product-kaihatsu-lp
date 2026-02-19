import Link from "next/link";
import indexCases from "../data/index-cases.json";

export default function CasesSection() {
  return (
    <section id="cases" className="reveal">
      <div className="container">
        <div className="section-head">
          <h2>Cases</h2>
          <p>Structured index</p>
        </div>

        <div className="cases-grid">
          {indexCases.map((item) => {
            const hrefId = item.detailId || item.slug || item.id;

            return (
              <Link
                key={item.id}
                href={`/cases/${hrefId}`}
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
                    <div className="case-points">
                      {(item.points || []).map((p) => (
                        <div key={p.label} className="case-point">
                          <span className="label">{p.label}</span>
                          <p>{p.text}</p>
                        </div>
                      ))}
                    </div>
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
