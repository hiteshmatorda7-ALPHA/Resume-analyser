import Link from "next/link";
import { notFound } from "next/navigation";
import { allServices, getService, pillars, process } from "@/lib/site";
import { PageHead, CtaBand, Faq } from "@/components/Blocks";
import DemoButton from "@/components/DemoButton";
import { demoList } from "@/components/demos/registry";

export const dynamicParams = false;
export function generateStaticParams() { return allServices.map((s) => ({ slug: s.slug })); }
export async function generateMetadata({ params }) {
  const s = getService((await params).slug);
  return s ? { title: s.title, description: s.intro } : {};
}

export default async function ServicePage({ params }) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const pillar = pillars.find((p) => p.id === s.pillar);
  const related = pillar.services.filter((x) => x.slug !== s.slug).slice(0, 3);
  const demo = demoList.find((d) => d.id === s.demo);
  const faq = [
    { q: `How much does ${s.title.toLowerCase()} cost?`, a: `Projects start from ${s.from}. After a short call we send a fixed quote based on your exact needs — no hidden charges.` },
    { q: "How long will it take?", a: `Typical timeline: ${s.timeline}. You'll get a written schedule with milestones before we start.` },
    { q: "Do you provide support after launch?", a: "Yes. Every project includes post-launch support, and we offer monthly care plans for hosting, updates and improvements." },
    { q: "Will I own everything?", a: "Yes — code, designs, data and accounts are yours." },
  ];
  return (
    <>
      <PageHead crumbs={[["/services", "Services"], [`/services#${pillar.id}`, pillar.title], [null, s.title]]} title={s.title} lead={s.intro}>
        <div className="btn-row">
          <Link href="/contact" className="btn">Get a free quote</Link>
          {demo && <DemoButton id={demo.id} className="btn btn-ghost-dark">▶ Try the live demo</DemoButton>}
        </div>
        <div className="meta-row">
          <div><span>Starting from</span><b>{s.from}</b></div>
          <div><span>Typical timeline</span><b>{s.timeline}</b></div>
          <div><span>Practice</span><b>{pillar.title}</b></div>
        </div>
      </PageHead>

      <section className="section">
        <div className="wrap split">
          <div>
            <h2>What you get</h2>
            <p className="muted">Everything included, designed, built and tested by our engineers.</p>
          </div>
          <ul className="checks">{s.features.map((f) => <li key={f}>{f}</li>)}</ul>
        </div>
      </section>

      {demo && (
        <section className="section section-mist" style={{ paddingTop: 0, background: "linear-gradient(var(--paper) 50%, var(--mist) 50%)" }}>
          <div className="wrap">
            <div className="demo-panel edge" style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ maxWidth: 620 }}>
                <span className="kicker" style={{ color: "var(--cobalt-bright)" }}>Live demo</span>
                <h2 style={{ fontSize: "1.8rem" }}>{demo.title}</h2>
                <p style={{ margin: 0 }}>{demo.sub}. Try the working sample — we build the real version around your business.</p>
              </div>
              <DemoButton id={demo.id} className="btn btn-light">▶ Open the demo</DemoButton>
            </div>
          </div>
        </section>
      )}

      <section className="section section-mist">
        <div className="wrap">
          <div className="section-head"><h2>How we deliver</h2></div>
          <ol className="steps">{process.map((p) => <li className="step" key={p.title}><h3>{p.title}</h3><p>{p.text}</p></li>)}</ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head"><h2>Questions about {s.title.toLowerCase()}</h2></div>
          <Faq items={faq} />
        </div>
      </section>

      <section className="section section-mist">
        <div className="wrap">
          <div className="section-head"><h2>Related services</h2></div>
          <div className="related">
            {related.map((r) => <Link key={r.slug} href={`/services/${r.slug}`}><b>{r.title}</b><span>{r.line}</span></Link>)}
          </div>
        </div>
      </section>
      <CtaBand title={`Let's talk about your ${s.title.toLowerCase()} project`} />
    </>
  );
}
