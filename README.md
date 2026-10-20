# Silver Edge — Company Website

Next.js 15 website for Silver Edge Technologies:
- Interactive **3D hero** (Three.js) — a silver crystal inside an AI network that follows the cursor
- Softobiz-style **mega menu**: Services (5 practices), Industries, Solutions, Company
- **47 pages**: a page for every one of the 26 services and 8 industries, plus Home, Services,
  Industries, Solutions, Live demos, Work, Pricing, About, Careers, Contact
- **6 live popup demos** to show clients: AI receptionist chatbot, AI website generator,
  business automation, live dashboard, online store with UPI checkout, automation savings calculator
- Floating "Try a live demo" button, a timed demo invitation popup, and a WhatsApp button
- Contact form (Web3Forms) with WhatsApp fallback, SEO metadata, sitemap and robots.txt
- Brand logo files in `public/brand/`

## 1. Add your details
Open **`lib/site.js`** — all text and settings live in this one file:
- `email`, `careersEmail`, `phone`, `whatsapp` (digits only, with 91), `address`, `hours`
- `url` — your real domain
- `web3formsKey` — free key from https://web3forms.com. Until you add it, the form sends
  enquiries to your WhatsApp instead.
- `pillars` — services, prices ("from") and timelines
- `offers`, `plans`, `carePlans` — your packages and prices
- `showcase` — example builds. Replace with real client projects as you complete them.
- `testimonials` — empty on purpose. Add real client quotes (with permission) and the
  section appears on the homepage automatically.
- `careers.roles` — open positions

## 2. Run it locally
Needs Node.js 18.18+ (https://nodejs.org).
```bash
npm install
npm run dev        # open http://localhost:3000
```

## 3. Deploy
**Vercel (recommended, free):** push this folder to GitHub → https://vercel.com/new → import → Deploy.
Add your domain under Project → Settings → Domains.

**Netlify:** build command `npm run build`, publish directory `out`.

**Hostinger / cPanel / shared hosting:** run `npm run build`, then upload everything inside `out/`
to `public_html`.

## Logo files (public/brand)
- `silver-edge-logo.svg / .png` — for light backgrounds
- `silver-edge-logo-white.svg / .png` — for dark backgrounds
- `silver-edge-mark.svg`, `silver-edge-mark-512.png` — icon only (social profiles, app icon)
- `logo-sheet.png` — overview of all versions

## Project structure
```
app/                 pages (one folder per route; services/[slug] and industries/[slug] generate detail pages)
components/          header + mega menu, footer, 3D hero, demo popup system, contact form
components/demos/    the six interactive demos
lib/site.js          all editable content and settings
public/brand/        logo files
```
