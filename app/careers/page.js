import Link from "next/link";
import { PageHead, CtaBand, Faq } from "@/components/Blocks";
import { careers, site } from "@/lib/site";

export const metadata = { title: "Careers", description: "Build production software, AI and automation for real businesses at Silver Edge. Own outcomes, learn fast, grow with us." };

const faq = [
  { q: "Where are roles based?", a: `Our office is in ${site.address}. Many roles are hybrid or remote within India; each listing states the location.` },
  { q: "Do you hire freshers and interns?", a: "Yes. Show us something you've built — a project, a GitHub repo or a website — and how you approached it." },
  { q: "What should I include in my application?", a: "Your CV, links to your work, and a short note on the hardest technical problem you've solved and the part you owned." },
];

export default function Careers() {
  const mail = (role) => `mailto:${site.careersEmail}?subject=${encodeURIComponent(`Application: ${role}`)}`;
  return (
    <>
      <PageHead crumbs={[["/about", "Company"], [null, "Careers"]]} title="Build software that real businesses run on"
        lead="Careers at Silver Edge are built around ownership, technical depth and work that reaches production. Small teams, real clients, modern AI tools.">
        <div className="btn-row"><a href="#roles" className="btn">See open roles</a><a href="#why" className="btn btn-ghost-dark">Why build here</a></div>
      </PageHead>
      <section className="section" id="why">
        <div className="wrap">
          <div className="section-head"><h2>Why build here</h2></div>
          <div className="values">{careers.why.map((w) => <div key={w.title}><h3>{w.title}</h3><p>{w.text}</p></div>)}</div>
        </div>
      </section>
      <section className="section section-mist" id="roles">
        <div className="wrap">
          <div className="section-head"><h2>Open roles</h2><p>Openings change as we grow. Don&apos;t see your role? Send us what you build best.</p></div>
          <div className="roles">
            {careers.roles.map((r) => (
              <div className="role" key={r.title}><b>{r.title}</b><span>{r.type}</span><span>{r.place}</span><a href={mail(r.title)} className="btn btn-sm">Apply</a></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="section-head"><h2>How to apply</h2></div>
          <ol className="steps four">{careers.steps.map((s) => <li className="step" key={s.title}><h3>{s.title}</h3><p>{s.text}</p></li>)}</ol>
        </div>
      </section>
      <section className="section section-mist">
        <div className="wrap"><div className="section-head"><h2>Questions, answered</h2></div><Faq items={faq} /></div>
      </section>
      <CtaBand title="Tell us what you build best" text={`Send your CV and work to ${site.careersEmail} — we read every application.`} />
    </>
  );
}
