import Link from "next/link";
import { notFound } from "next/navigation";
import { industries, getIndustry, allServices } from "@/lib/site";
import { PageHead, CtaBand } from "@/components/Blocks";
import DemoButton from "@/components/DemoButton";
import DemoGallery from "@/components/DemoGallery";

export const dynamicParams = false;
export function generateStaticParams() { return industries.map((i) => ({ slug: i.slug })); }
export async function generateMetadata({ params }) {
  const i = getIndustry((await params).slug);
  return i ? { title: `${i.title} solutions`, description: `${i.line}. Websites, software, AI and automation for ${i.title.toLowerCase()}.` } : {};
}

const PICKS = {
  "retail-ecommerce": ["ecommerce", "whatsapp-automation", "seo"],
  healthcare: ["ai-chatbots", "portals-booking", "business-websites"],
  restaurants: ["ecommerce", "business-websites", "seo"],
  "real-estate": ["landing-pages", "crm-erp", "ai-chatbots"],
  education: ["portals-booking", "custom-software", "whatsapp-automation"],
  manufacturing: ["crm-erp", "business-automation", "dashboards-bi"],
  "professional-services": ["ai-document-processing", "portals-booking", "business-automation"],
  startups: ["saas-mvp", "mobile-apps", "cloud-hosting"],
};

export default async function IndustryPage({ params }) {
  const ind = getIndustry((await params).slug);
  if (!ind) notFound();
  const picks = (PICKS[ind.slug] || []).map((s) => allServices.find((x) => x.slug === s)).filter(Boolean);
  return (
    <>
      <PageHead crumbs={[["/industries", "Industries"], [null, ind.title]]} title={`${ind.title}: ${ind.line.toLowerCase()}`}
        lead={`Websites, software and AI automation built around the way ${ind.title.toLowerCase()} businesses actually work.`}>
        <div className="btn-row"><Link href="/contact" className="btn">Talk to an expert</Link><DemoButton id={ind.demo} className="btn btn-ghost-dark">▶ Try a live demo</DemoButton></div>
      </PageHead>
      <section className="section">
        <div className="wrap two-col">
          <div className="panel bad"><h3>Common challenges</h3><ul className="checks" style={{ gridTemplateColumns: "1fr" }}>{ind.challenges.map((c) => <li key={c}>{c}</li>)}</ul></div>
          <div className="panel" style={{ borderColor: "var(--cobalt)" }}><h3>How we solve them</h3><ul className="checks" style={{ gridTemplateColumns: "1fr" }}>{ind.solutions.map((c) => <li key={c}>{c}</li>)}</ul></div>
        </div>
      </section>
      <section className="section section-mist">
        <div className="wrap">
          <div className="section-head"><h2>Recommended services</h2></div>
          <div className="related">{picks.map((s) => <Link key={s.slug} href={`/services/${s.slug}`}><b>{s.title}</b><span>{s.line} · from {s.from}</span></Link>)}</div>
        </div>
      </section>
      <section className="section section-dark">
        <div className="wrap">
          <div className="section-head"><h2>Try it yourself</h2><p>Working demos of what we can set up for you.</p></div>
          <DemoGallery only={[ind.demo, "roi", ind.demo === "automation" ? "dashboard" : "automation"]} />
        </div>
      </section>
      <CtaBand title={`Let's grow your ${ind.title.toLowerCase()} business`} />
    </>
  );
}
