"use client";
import { useState, useRef, useEffect } from "react";

const TEMPLATES = {
  clinic: { label: "Clinic / Healthcare", hero: (n) => `Gentle, modern care at ${n}`, sub: "Experienced doctors, same-day appointments and transparent pricing — book online in under a minute.", cta: "Book appointment", svc: [["Consultations", "Same-day slots"], ["Diagnostics", "In-house lab"], ["Follow-ups", "WhatsApp reminders"]], band: "New patients get a free first check-up" },
  restaurant: { label: "Restaurant / Café", hero: (n) => `${n}: flavours worth coming back for`, sub: "Fresh food, cooked to order. Reserve a table or order online for free delivery nearby.", cta: "Order online", svc: [["Dine in", "Family seating"], ["Delivery", "Free within 5 km"], ["Parties", "Up to 60 guests"]], band: "Get 10% off your first online order" },
  retail: { label: "Shop / Retail", hero: (n) => `Shop the latest at ${n}`, sub: "Quality products at fair prices, with fast delivery and easy returns. Pay by UPI, card or cash.", cta: "Shop now", svc: [["New arrivals", "Updated weekly"], ["Fast delivery", "2–4 days"], ["Easy returns", "7-day policy"]], band: "Free shipping on orders above ₹999" },
  realestate: { label: "Real estate", hero: (n) => `Find your next home with ${n}`, sub: "Verified properties, honest advice and help with loans — from first visit to registry.", cta: "Book a site visit", svc: [["Buy", "Ready & upcoming"], ["Rent", "Verified listings"], ["Home loans", "Bank partners"]], band: "Weekend site visits with free pick-up" },
  services: { label: "Professional services", hero: (n) => `${n} — expert advice you can rely on`, sub: "Clear guidance, on-time delivery and a team that picks up the phone. Book a consultation today.", cta: "Book a consultation", svc: [["Advisory", "For businesses"], ["Compliance", "Always on time"], ["Support", "Dedicated manager"]], band: "Free 20-minute first consultation" },
  education: { label: "School / Coaching", hero: (n) => `Learn better at ${n}`, sub: "Small batches, experienced teachers and regular tests with progress reports for parents.", cta: "Enquire for admission", svc: [["Courses", "Classes 6–12"], ["Test series", "Weekly practice"], ["Parent app", "Live progress"]], band: "Admissions open — book a free demo class" },
};
const COLORS = ["#1e4fd6", "#0f766e", "#b45309", "#7c3aed", "#be123c", "#0d1b2a"];
const STEPS = ["Understanding your business", "Writing headlines and copy", "Choosing layout and colours", "Making it mobile-friendly", "Adding SEO and contact forms"];

export default function BuilderDemo() {
  const [name, setName] = useState("");
  const [type, setType] = useState("clinic");
  const [color, setColor] = useState(COLORS[0]);
  const [phase, setPhase] = useState(-1); // -1 idle, 0..n generating, n done
  const [site, setSite] = useState(null);
  const [view, setView] = useState("desktop");
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const generate = (e) => {
    e?.preventDefault();
    timers.current.forEach(clearTimeout);
    const n = name.trim() || "Your Business";
    setSite(null);
    STEPS.forEach((_, i) => timers.current.push(setTimeout(() => setPhase(i), i * 520)));
    timers.current.push(setTimeout(() => { setPhase(STEPS.length); setSite({ n, t: TEMPLATES[type], color }); }, STEPS.length * 520));
    setPhase(0);
  };

  // Live colour change after generation
  useEffect(() => { if (site) setSite((s) => ({ ...s, color })); }, [color]); // eslint-disable-line

  const domain = (site?.n || "yourbusiness").toLowerCase().replace(/[^a-z0-9]+/g, "") + ".com";

  return (
    <div className="demo">
      <form className="demo-side" onSubmit={generate}>
        <div><h3>Describe your business</h3><p>Our AI drafts the first version in seconds. Our designers then make it truly yours.</p></div>
        <div className="field"><label htmlFor="bname">Business name</label><input id="bname" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sharma Dental Care" maxLength={40} /></div>
        <div className="field">
          <label htmlFor="btype">Industry</label>
          <select id="btype" value={type} onChange={(e) => setType(e.target.value)}>
            {Object.entries(TEMPLATES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Brand colour</label>
          <div className="swatches">{COLORS.map((c) => <button type="button" key={c} style={{ background: c }} aria-label={`Colour ${c}`} aria-pressed={color === c} onClick={() => setColor(c)} />)}</div>
        </div>
        <button className="btn" type="submit" disabled={phase >= 0 && phase < STEPS.length}>✦ Generate website</button>
        {phase >= 0 && (
          <ul className="gen-steps" aria-live="polite">
            {STEPS.map((s, i) => <li key={s} className={i < phase || phase === STEPS.length ? "done" : i === phase ? "doing" : ""}><i />{s}</li>)}
          </ul>
        )}
      </form>
      <div className="demo-main">
        {site ? (
          <>
            <div className="seg" style={{ justifyContent: "center", marginBottom: 14 }}>
              <button aria-pressed={view === "desktop"} onClick={() => setView("desktop")}>Desktop</button>
              <button aria-pressed={view === "mobile"} onClick={() => setView("mobile")}>Mobile</button>
            </div>
            <div className={`device ${view}`} style={{ maxWidth: view === "mobile" ? 360 : 760 }}>
              <div className="device-bar"><i /><i /><i /><span>{domain}</span></div>
              <div className="gsite" style={{ "--acc": site.color }}>
                <div className="gsite-nav"><b>{site.n}</b><span><a>Home</a><a>Services</a><a>About</a><a>Contact</a></span></div>
                <div className="gsite-hero">
                  <h3>{site.t.hero(site.n)}</h3>
                  <p>{site.t.sub}</p>
                  <span className="gb">{site.t.cta}</span><span className="gb o">WhatsApp us</span>
                </div>
                <div className="gsite-svc">{site.t.svc.map(([a, b]) => <div key={a}><i /><b>{a}</b><span>{b}</span></div>)}</div>
                <div className="gsite-cta"><b>{site.t.band}</b><span>{site.t.cta}</span></div>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-preview">
            <div>
              <p style={{ fontWeight: 600, color: "var(--ink)", marginBottom: 6 }}>Your website preview appears here</p>
              <p style={{ margin: 0 }}>Enter a name, pick an industry and colour, then press Generate.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
