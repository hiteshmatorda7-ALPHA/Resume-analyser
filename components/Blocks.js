import Link from "next/link";
import { waLink, WaIcon } from "./WhatsApp";
import { faqs, showcase } from "@/lib/site";
import DemoButton from "./DemoButton";

export function PageHead({ crumbs = [], title, lead, children }) {
  return (
    <section className="page-head">
      <div className="wrap">
        <div className="crumbs">
          <Link href="/">Home</Link>
          {crumbs.map(([href, label]) => <span key={label}> / {href ? <Link href={href}>{label}</Link> : label}</span>)}
        </div>
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Ready to grow your business with technology?",
  text = "Tell us what you need. You'll get a clear plan and a fixed quote within 24 hours — no obligation.",
}) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="cta edge">
          <div><h2>{title}</h2><p>{text}</p></div>
          <div className="btn-row">
            <Link href="/contact" className="btn btn-light">Get a free quote</Link>
            <a href={waLink()} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
              <span className="i"><WaIcon /></span> WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq({ items = faqs }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
      ))}
    </div>
  );
}

export function ShowcaseCard({ p }) {
  return (
    <article className="work">
      <div className="work-thumb" style={{ background: p.tone }}>
        <div className="mini"><div className="bar" /><div className="h" /><div className="h s" /><div className="row"><i /><i /><i /></div></div>
      </div>
      <div className="work-body">
        <span className="sector">{p.sector}</span>
        <h3>{p.name}</h3>
        <p>{p.goal}</p>
        <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
        <DemoButton id={p.demo} className="link">Try a live demo of this</DemoButton>
      </div>
    </article>
  );
}

export function ShowcaseGrid({ items = showcase }) {
  return <div className="work-grid">{items.map((p) => <ShowcaseCard key={p.name} p={p} />)}</div>;
}
