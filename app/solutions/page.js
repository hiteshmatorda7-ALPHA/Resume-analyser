import Link from "next/link";
import { offers } from "@/lib/site";
import { PageHead, CtaBand } from "@/components/Blocks";
import DemoButton from "@/components/DemoButton";

export const metadata = { title: "Solutions", description: "Packaged offers with fixed scope and price: website in 7 days, AI chatbot in 14 days, free automation audit and MVP in 30 days." };

export default function Solutions() {
  return (
    <>
      <PageHead crumbs={[[null, "Solutions"]]} title="Packaged solutions with a fixed scope, price and timeline" lead="The fastest way to start. Each package has a clear outcome, a fixed price and a live demo you can try first." />
      <section className="section">
        <div className="wrap" style={{ display: "grid", gap: 24 }}>
          {offers.map((o, i) => (
            <div key={o.slug} id={o.slug} className={`split ${i === 0 ? "edge" : ""}`} style={{ border: "1px solid var(--line)", borderRadius: i === 0 ? 0 : 10, padding: "clamp(24px,4vw,44px)", scrollMarginTop: 100, alignItems: "center", background: i === 0 ? "var(--mist)" : "#fff" }}>
              <div>
                <h2 style={{ fontSize: "clamp(1.5rem,2.6vw,2.1rem)" }}>{o.title}</h2>
                <p className="lead">{o.line}</p>
                <div className="price" style={{ color: "var(--cobalt)", fontSize: "2rem" }}>{o.price}</div>
                <div className="btn-row" style={{ marginTop: 22 }}><Link href="/contact" className="btn">Get started</Link><DemoButton id={o.demo} className="btn btn-ghost">▶ See demo</DemoButton></div>
              </div>
              <ul className="checks" style={{ gridTemplateColumns: "1fr" }}>{o.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="Need something bigger?" text="Custom software, enterprise automation and dedicated engineering teams — scoped around your goals." />
    </>
  );
}
