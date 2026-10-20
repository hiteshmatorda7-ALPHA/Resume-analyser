import Link from "next/link";
import { plans, carePlans } from "@/lib/site";
import { PageHead, CtaBand, Faq } from "@/components/Blocks";
import DemoButton from "@/components/DemoButton";

export const metadata = {
  title: "Pricing",
  description: "Simple, fixed website packages from Silver Edge, plus monthly care plans and custom software quotes.",
};

export default function Pricing() {
  return (
    <>
      <PageHead crumbs={[[null, "Pricing"]]} title="Simple packages, fixed prices"
        lead="Choose a package to get started. Every quote is fixed in writing before work begins. Prices exclude GST.">
        <div className="btn-row"><DemoButton id="roi" className="btn btn-ghost-dark">Calculate your automation savings</DemoButton></div>
      </PageHead>
      <section className="section">
        <div className="wrap">
          <div className="plans">
            {plans.map((p) => (
              <div key={p.name} className={`plan${p.featured ? " featured edge" : ""}`}>
                {p.featured && <span className="badge">Most popular</span>}
                <h3>{p.name}</h3>
                <p className="for">{p.for}</p>
                <div className="price">{p.price}<small>{p.unit}</small></div>
                <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                <Link href="/contact" className={`btn${p.featured ? "" : " btn-ghost"}`}>
                  {p.price === "Custom" ? "Request a quote" : `Choose ${p.name}`}
                </Link>
              </div>
            ))}
          </div>

          <h2 style={{ marginTop: 80, fontSize: "1.6rem" }}>Monthly care plans</h2>
          <p className="muted">Keep your website fast, secure and up to date after launch.</p>
          <div className="care">
            {carePlans.map((c) => (
              <div key={c.name}><h3>{c.name}</h3><strong>{c.price}</strong><p>{c.text}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-mist">
        <div className="wrap">
          <div className="section-head"><h2>Pricing questions</h2></div>
          <Faq />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
