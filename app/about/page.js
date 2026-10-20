import Link from "next/link";
import { PageHead, CtaBand } from "@/components/Blocks";
import { site, industries, techStack, reasons } from "@/lib/site";
import { icons } from "@/components/Icons";

export const metadata = { title: "About us", description: "Silver Edge is a software engineering company founded by engineers to help businesses grow with websites, software, AI and automation." };

const values = [
  ["Engineering first", "We write real code, test it properly and build things that keep working as you grow."],
  ["AI with human oversight", "AI makes us faster. Engineers review and approve everything before it reaches you."],
  ["Plain language", "No jargon. You always know what we're building, why, and what it costs."],
  ["Ownership", "You own your website, code, domain and data. No lock-in, ever."],
];

export default function About() {
  return (
    <>
      <PageHead crumbs={[[null, "About"]]} title="Software engineers helping businesses grow smartly"
        lead={`${site.name} was started by software engineers who saw businesses overpaying for slow template websites — and still doing hours of manual work every day.`} />
      <section className="section">
        <div className="wrap split">
          <div>
            <h2>Our story</h2>
            <p className="muted">We started Silver Edge with a simple idea: every business deserves the same quality of technology that large companies use, at a price that makes sense for them.</p>
            <p className="muted">Today we build websites that bring in clients, custom software that fits the way teams work, AI assistants that answer customers around the clock, and automations that remove repetitive tasks — from invoices to lead follow-ups.</p>
            <p className="muted">Because we&apos;re engineers, we don&apos;t stop at how something looks. We care about speed, security and whether it&apos;s actually helping you grow.</p>
          </div>
          <div className="quote-panel edge">
            <p>&ldquo;Technology should do more than look good. It should bring in customers and save your team time every single day.&rdquo;</p>
            <span className="muted">— Founding team, {site.name}</span>
          </div>
        </div>
      </section>
      <section className="section section-mist">
        <div className="wrap">
          <div className="section-head"><h2>What we stand for</h2></div>
          <div className="values">{values.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
        </div>
      </section>
      <section className="section section-dark">
        <div className="wrap split">
          <div><h2>How we work with you</h2><p className="lead">Small, senior teams that own your project end to end.</p></div>
          <div className="reasons">{reasons.map((r) => <div className="reason" key={r.title}><div className="ico">{icons[r.icon]}</div><div><h3>{r.title}</h3><p>{r.text}</p></div></div>)}</div>
        </div>
      </section>
      <section className="section">
        <div className="wrap split">
          <div><h2>Who we work with</h2><p className="muted">From a first website to company-wide software, across {industries.length} industries.</p><Link href="/industries" className="link">Explore industries</Link></div>
          <div className="stack">{industries.map((i) => <span key={i.slug}>{i.title}</span>)}</div>
        </div>
      </section>
      <section className="section section-mist">
        <div className="wrap"><div className="section-head"><h2>Our technology</h2></div><div className="stack">{techStack.map((t) => <span key={t}>{t}</span>)}</div></div>
      </section>
      <CtaBand title="Let's build something that works for your business" />
    </>
  );
}
