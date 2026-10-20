import Link from "next/link";
import { pillars, offers, industries, stats, process, reasons, testimonials } from "@/lib/site";
import { icons } from "@/components/Icons";
import { CtaBand, Faq, ShowcaseGrid } from "@/components/Blocks";
import Hero3D from "@/components/Hero3D";
import TiltCard from "@/components/TiltCard";
import DemoGallery from "@/components/DemoGallery";
import DemoButton from "@/components/DemoButton";

export default function Home() {
  const marquee = ["Business websites", "AI chatbots", "E-commerce", "Business automation", "Custom software", "Mobile apps", "CRM & ERP", "Dashboards", "Cloud hosting", "SEO"];
  return (
    <>
      <div className="hero-scroll">
      <section className="hero">
        <Hero3D />
        <div className="wrap hero-in">
          <div className="hero-copy">
            <span className="hero-badge"><b>New</b> AI assistants and automation for growing businesses</span>
            <h1>AI-led software engineering that <span className="sil">grows your business</span></h1>
            <p className="lead">Silver Edge builds websites that win clients, software that fits how you work, and AI automation that takes repetitive work off your team — designed, built and supported by engineers.</p>
            <div className="btn-row">
              <Link href="/contact" className="btn">Talk to our engineers</Link>
              <DemoButton className="btn btn-ghost-dark">▶ Try live demos</DemoButton>
            </div>
          </div>
          <div className="hero-stats">
            {stats.map((s) => <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}
          </div>
        </div>
        <div className="hero-hint"><span className="mouse" aria-hidden="true" />Scroll to explore</div>
      </section>
      </div>

      <div className="strip" aria-hidden="true">
        <div className="marquee">{[...marquee, ...marquee].map((m, i) => <span key={i}>{m}</span>)}</div>
      </div>

      <section className="section">
        <div className="wrap split" style={{ alignItems: "end" }}>
          <div>
            <span className="kicker">Why it matters</span>
            <h2>AI opens the door. Engineering builds what&apos;s on the other side.</h2>
          </div>
          <p className="lead" style={{ margin: 0 }}>Anyone can generate a website template. Growing businesses need systems that work every day — capturing leads, answering customers, sending invoices and showing the numbers. We combine AI speed with real engineering so what we build keeps working.</p>
        </div>
      </section>

      <section className="section section-mist" id="services">
        <div className="wrap">
          <div className="head-row">
            <div className="section-head">
              <span className="kicker">What we engineer</span>
              <h2>Every service your business needs, under one roof</h2>
              <p>{pillars.reduce((a, p) => a + p.services.length, 0)} services across five practices — pick one, or let us run your whole digital setup.</p>
            </div>
            <Link href="/services" className="btn btn-ghost">All services</Link>
          </div>
          <div className="pillar-grid">
            {pillars.map((p) => (
              <TiltCard key={p.id} className="pillar">
                <div className="p-ico">{icons[p.icon]}</div>
                <h3>{p.title}</h3>
                <p>{p.line}</p>
                <ul>{p.services.slice(0, 4).map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.title}</Link></li>)}</ul>
                <div className="p-foot"><Link href={`/services#${p.id}`} className="link">{p.services.length} services</Link></div>
              </TiltCard>
            ))}
            <TiltCard className="pillar cta-card">
              <div>
                <h3>Not sure where to start?</h3>
                <p>Try our live demos or book a free 20-minute call. We&apos;ll recommend the simplest setup that works for you.</p>
              </div>
              <div className="btn-row">
                <Link href="/contact" className="btn btn-light">Book a free call</Link>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="demos">
        <div className="wrap">
          <div className="head-row">
            <div className="section-head">
              <span className="kicker">See it working</span>
              <h2>Don&apos;t imagine it. Try it.</h2>
              <p>Live demos of what we build for clients. Click any card — they run right here in your browser.</p>
            </div>
            <Link href="/demos" className="btn btn-ghost-dark">All demos</Link>
          </div>
          <DemoGallery />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="head-row">
            <div className="section-head">
              <span className="kicker">Packaged offers</span>
              <h2>Start fast with a fixed scope and price</h2>
            </div>
            <Link href="/solutions" className="btn btn-ghost">All solutions</Link>
          </div>
          <div className="offer-grid">
            {offers.map((o) => (
              <div className="offer" key={o.slug}>
                <h3>{o.title}</h3><p>{o.line}</p>
                <div className="o-price">{o.price}</div>
                <ul>{o.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                <div className="btn-row"><Link href="/contact" className="btn btn-sm">Get started</Link><DemoButton id={o.demo} className="btn btn-sm btn-ghost">Demo</DemoButton></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-mist">
        <div className="wrap">
          <div className="head-row">
            <div className="section-head">
              <span className="kicker">What we can build</span>
              <h2>Built for businesses like yours</h2>
              <p>Example builds that show what we deliver — each one has a live demo you can try.</p>
            </div>
            <Link href="/work" className="btn btn-ghost">See more</Link>
          </div>
          <ShowcaseGrid />
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="section-head"><span className="kicker">In their words</span><h2>What clients say</h2></div>
            <div className="quotes">{testimonials.map((t) => <figure className="quote" key={t.name}><p>“{t.quote}”</p><b>{t.name}</b><span>{t.role}</span></figure>)}</div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <div className="head-row">
            <div className="section-head"><span className="kicker">Industries</span><h2>Solutions shaped for your industry</h2></div>
            <Link href="/industries" className="btn btn-ghost">All industries</Link>
          </div>
          <div className="ind-grid">
            {industries.map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}`} className="ind"><span className="ico">{icons[i.slug]}</span><b>{i.title}</b><span>{i.line}</span></Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="wrap split">
          <div>
            <span className="kicker">Why Silver Edge</span>
            <h2>Engineering measured in business outcomes</h2>
            <p className="lead">We&apos;re a team of software engineers, not a template shop. We stay accountable for how what we build performs — long after launch.</p>
            <Link href="/about" className="btn btn-ghost-dark" style={{ marginTop: 12 }}>About us</Link>
          </div>
          <div className="reasons">
            {reasons.map((r) => (
              <div className="reason" key={r.title}><div className="ico">{icons[r.icon]}</div><div><h3>{r.title}</h3><p>{r.text}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head"><span className="kicker">How we deliver</span><h2>From first call to growth</h2><p>A clear, transparent process — you always know what&apos;s happening and what&apos;s next.</p></div>
          <ol className="steps">{process.map((p) => <li className="step" key={p.title}><h3>{p.title}</h3><p>{p.text}</p></li>)}</ol>
        </div>
      </section>

      <section className="section section-mist">
        <div className="wrap">
          <div className="section-head"><span className="kicker">Questions, answered</span><h2>Common questions</h2></div>
          <Faq />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
