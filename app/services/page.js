import Link from "next/link";
import { pillars, allServices, techStack } from "@/lib/site";
import { icons } from "@/components/Icons";
import { PageHead, CtaBand } from "@/components/Blocks";
import DemoButton from "@/components/DemoButton";

export const metadata = { title: "Services", description: "AI, automation, websites, e-commerce, custom software, cloud, data and marketing services from Silver Edge." };

export default function Services() {
  return (
    <>
      <PageHead crumbs={[[null, "Services"]]} title="Everything your business needs to grow — engineered by one team"
        lead={`${allServices.length} services across AI, web, software, cloud and growth. Start with one, add more as you grow.`}>
        <div className="btn-row"><Link href="/contact" className="btn">Talk to an expert</Link><DemoButton className="btn btn-ghost-dark">Try live demos</DemoButton></div>
      </PageHead>
      <section className="section">
        <div className="wrap">
          {pillars.map((p) => (
            <div className="pillar-block" id={p.id} key={p.id}>
              <div className="ph"><span className="p-ico">{icons[p.icon]}</span><div><h2>{p.title}</h2><p>{p.line}</p></div></div>
              <div className="svc-list">
                {p.services.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="svc-item"><b>{s.title}</b><span>{s.line}</span><em>From {s.from} · {s.timeline}</em></Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section section-mist">
        <div className="wrap">
          <div className="section-head"><h2>Technology we build with</h2><p>Modern, proven tools — chosen so your product stays fast, secure and easy to extend.</p></div>
          <div className="stack">{techStack.map((t) => <span key={t}>{t}</span>)}</div>
        </div>
      </section>
      <CtaBand title="Not sure which service you need?" text="Book a free 20-minute call. We'll look at your business and recommend the simplest setup that works." />
    </>
  );
}
