"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pillars, industries, offers, nav } from "@/lib/site";
import { icons } from "./Icons";
import { useDemo } from "./DemoProvider";

const Chev = () => (
  <svg className="chev" viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 3.5L5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
);

export default function Header() {
  const [open, setOpen] = useState(null); // which mega menu
  const [mobile, setMobile] = useState(false);
  const path = usePathname();
  const ref = useRef(null);
  const timer = useRef();
  const { openDemo } = useDemo();

  useEffect(() => { setOpen(null); setMobile(false); }, [path]);
  useEffect(() => { document.body.classList.toggle("lock", mobile); }, [mobile]);
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && (setOpen(null), setMobile(false));
    const out = (e) => ref.current && !ref.current.contains(e.target) && setOpen(null);
    document.addEventListener("keydown", esc);
    document.addEventListener("mousedown", out);
    return () => { document.removeEventListener("keydown", esc); document.removeEventListener("mousedown", out); };
  }, []);

  const enter = (m) => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(m), 80); };
  const leave = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(null), 220); };

  return (
    <header className="header" ref={ref} onMouseLeave={leave}>
      <div className="wrap header-in">
        <Link href="/" className="brand" aria-label="Silver Edge home">
          <img src="/brand/silver-edge-logo-white.svg" alt="Silver Edge Technologies" width="211" height="44" />
        </Link>

        <nav className="topnav" aria-label="Main">
          {nav.map((n) =>
            n.menu ? (
              <button key={n.label} aria-expanded={open === n.menu} aria-haspopup="true"
                onClick={() => setOpen(open === n.menu ? null : n.menu)} onMouseEnter={() => enter(n.menu)}>
                {n.label} <Chev />
              </button>
            ) : (
              <Link key={n.label} href={n.href} onMouseEnter={() => enter(null)}>{n.label}</Link>
            )
          )}
        </nav>

        <div className="header-cta">
          <button className="btn btn-ghost-dark" onClick={() => openDemo()}>Try a demo</button>
          <Link href="/contact" className="btn">Talk to an expert</Link>
        </div>

        <button className="menu-btn" aria-label="Menu" aria-expanded={mobile} onClick={() => setMobile((m) => !m)}>
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <div className="mega" onMouseEnter={() => clearTimeout(timer.current)}>
          <div className="mega-in">
            {open === "services" && (
              <>
                <div className="mega-cols">
                  {pillars.map((p) => (
                    <div className="mega-col" key={p.id}>
                      <h4><Link href={`/services#${p.id}`}><span className="ico">{icons[p.icon]}</span>{p.title}</Link></h4>
                      <p>{p.line}</p>
                      {p.services.map((s) => (
                        <Link key={s.slug} href={`/services/${s.slug}`} className="mega-link"><b>{s.title}</b><span>{s.line}</span></Link>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mega-foot">
                  <div className="mega-offers">
                    Packaged offers:
                    {offers.map((o) => <Link key={o.slug} href={`/solutions#${o.slug}`}>{o.title}</Link>)}
                  </div>
                  <Link href="/services" className="btn btn-sm">Explore all services</Link>
                </div>
              </>
            )}
            {open === "industries" && (
              <>
                <div className="mega-grid">
                  {industries.map((i) => (
                    <Link key={i.slug} href={`/industries/${i.slug}`} className="mega-link"><b>{i.title}</b><span>{i.line}</span></Link>
                  )).slice(0, 6)}
                  <div className="mega-feature" style={{ gridColumn: 4, gridRow: "1 / span 3" }}>
                    <h4>Don&apos;t see your industry?</h4>
                    <p>We build for any business that sells, books or serves customers. Tell us how you work and we&apos;ll show you what&apos;s possible.</p>
                    <Link href="/contact" className="btn btn-sm">Talk to us</Link>
                  </div>
                  {industries.slice(6).map((i) => (
                    <Link key={i.slug} href={`/industries/${i.slug}`} className="mega-link"><b>{i.title}</b><span>{i.line}</span></Link>
                  ))}
                </div>
                <div className="mega-foot"><span className="mega-offers">Solutions shaped for {industries.length} industries</span><Link href="/industries" className="btn btn-sm">All industries</Link></div>
              </>
            )}
            {open === "solutions" && (
              <>
                <div className="mega-offer-grid">
                  {offers.map((o) => (
                    <Link key={o.slug} href={`/solutions#${o.slug}`} className="mega-offer">
                      <b>{o.title}</b><span>{o.line}</span><em>{o.price}</em>
                    </Link>
                  ))}
                </div>
                <div className="mega-foot">
                  <span className="mega-offers">Fixed scope, fixed price, fast start.</span>
                  <div className="btn-row">
                    <button className="btn btn-sm btn-ghost-dark" onClick={() => { setOpen(null); openDemo(); }}>Try live demos</button>
                    <Link href="/solutions" className="btn btn-sm">View all solutions</Link>
                  </div>
                </div>
              </>
            )}
            {open === "company" && (
              <>
                <div className="mega-offer-grid">
                  {[["/about", "About us", "Who we are and how we work"], ["/careers", "Careers", "Build with ownership"], ["/pricing", "Pricing", "Packages and care plans"], ["/contact", "Contact", "Get a free quote"]].map(([h, t, d]) => (
                    <Link key={h} href={h} className="mega-offer"><b>{t}</b><span>{d}</span></Link>
                  ))}
                </div>
                <div className="mega-foot" />
              </>
            )}
          </div>
        </div>
      )}

      {mobile && (
        <nav className="mobile-nav" aria-label="Mobile">
          <details>
            <summary>Services</summary>
            <div className="m-group">
              {pillars.map((p) => (
                <div key={p.id}>
                  <h5>{p.title}</h5>
                  {p.services.map((s) => <Link key={s.slug} href={`/services/${s.slug}`}>{s.title}</Link>)}
                </div>
              ))}
              <Link href="/services" style={{ color: "var(--cobalt-bright)", marginTop: 8 }}>All services</Link>
            </div>
          </details>
          <details>
            <summary>Industries</summary>
            <div className="m-group">{industries.map((i) => <Link key={i.slug} href={`/industries/${i.slug}`}>{i.title}</Link>)}</div>
          </details>
          <details>
            <summary>Solutions</summary>
            <div className="m-group">{offers.map((o) => <Link key={o.slug} href={`/solutions#${o.slug}`}>{o.title}</Link>)}</div>
          </details>
          <Link href="/demos">Live demos</Link>
          <Link href="/work">Work</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/contact" className="btn">Talk to an expert</Link>
        </nav>
      )}
    </header>
  );
}
