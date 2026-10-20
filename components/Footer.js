import Link from "next/link";
import { site, pillars } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <img src="/brand/silver-edge-logo-stacked-white.svg" alt="Silver Edge Technologies" width="155" height="84" />
            <p>{site.tagline}. Engineering that works, partnership that lasts.</p>
          </div>
          <Link href="/contact" className="btn">Talk to an expert</Link>
        </div>
        <div className="foot-grid">
          {pillars.map((p) => (
            <div key={p.id}>
              <h4>{p.title}</h4>
              <ul>{p.services.slice(0, 5).map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.title}</Link></li>)}</ul>
            </div>
          ))}
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/industries">Industries</Link></li>
              <li><Link href="/solutions">Solutions</Link></li>
              <li><Link href="/demos">Live demos</Link></li>
              <li><Link href="/work">Work</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>
              <li>{site.address}</li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {year} {site.legalName}. All rights reserved.</span>
          <span className="socials">
            {Object.entries(site.social).map(([k, v]) => (
              <a key={k} href={v} target="_blank" rel="noopener noreferrer" style={{ textTransform: "capitalize" }}>{k === "x" ? "X" : k}</a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
