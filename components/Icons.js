const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
const I = (children) => <svg viewBox="0 0 24 24" {...s}>{children}</svg>;

export const icons = {
  ai: I(<><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3.5"/></>),
  web: I(<><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 8h18M7 21h10M12 18v3"/></>),
  software: I(<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>),
  cloud: I(<path d="M7 18a4.5 4.5 0 0 1-.6-9 6 6 0 0 1 11.5 1.5A3.8 3.8 0 0 1 17.5 18z"/>),
  growth: I(<><path d="M3 20h18"/><path d="M5 16l5-5 3 3 6-7"/><path d="M15 7h4v4"/></>),
  team: I(<><circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.4 3-5.5 6-5.5s5.4 2.1 6 5.5"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14.6c2.6.2 4.4 2.1 5 5"/></>),
  price: I(<><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></>),
  speed: I(<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>),
  support: I(<><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/><path d="M19 19c0 1.5-2 2.5-5 2.5"/></>),
  sparkle: I(<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>),
  form: I(<><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></>),
  crm: I(<><circle cx="12" cy="7" r="3.5"/><path d="M5 21c.8-4 3.6-6 7-6s6.2 2 7 6"/></>),
  chat: I(<path d="M21 12a8 8 0 0 1-11.8 7L4 20l1.1-4.6A8 8 0 1 1 21 12z"/>),
  invoice: I(<><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/></>),
  mail: I(<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></>),
  db: I(<><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></>),
  cart: I(<><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2"/><circle cx="10" cy="20" r="1.3"/><circle cx="17" cy="20" r="1.3"/></>),
  bell: I(<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></>),
  check: I(<path d="M5 12.5l4.5 4.5L19 7.5"/>),
  play: I(<path d="M7 5l12 7-12 7z" fill="currentColor"/>),
  // industries
  "retail-ecommerce": I(<><path d="M4 9l1.5-5h13L20 9"/><path d="M4 9h16v11H4z"/><path d="M9 20v-6h6v6"/></>),
  healthcare: I(<><path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11z"/><path d="M12 10v5M9.5 12.5h5"/></>),
  restaurants: I(<><path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10"/><path d="M17 21V3c-2 1-3 4-3 8h3"/></>),
  "real-estate": I(<><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/></>),
  education: I(<><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5"/></>),
  manufacturing: I(<><path d="M3 21V10l6 4V10l6 4V6h6v15z"/><path d="M7 17h2M12 17h2M17 17h2"/></>),
  "professional-services": I(<><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/></>),
  startups: I(<><path d="M5 19c0-3 1-5 3-6l3 3c-1 2-3 3-6 3z"/><path d="M9 13c2-6 6-9 12-10-1 6-4 10-10 12"/><circle cx="15" cy="9" r="1.5"/></>),
};
