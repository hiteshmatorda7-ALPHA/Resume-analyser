// ─────────────────────────────────────────────────────────────
//  SILVER EDGE — SITE SETTINGS & CONTENT
//  Edit this one file to change contact details, prices, services,
//  industries and showcase projects. Every page reads from here.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Silver Edge",
  legalName: "Silver Edge Technologies",
  tagline: "AI-led software engineering for growing businesses",
  description:
    "Silver Edge is a software engineering company building websites, custom software, AI assistants and business automation that help companies grow smartly.",
  url: "https://silver-edge.site", // ← your domain (SEO + sitemap)

  // Contact details — replace these placeholders
  email: "hitesh@silver-edge.site",
  careersEmail: "careers@silveredge.in",
  phone: "+91 7009611215",
  whatsapp: "917009611215", // country code + number, digits only
  whatsappMessage: "Hi Silver Edge, I'd like to discuss a project.",
  address: "Rajpura, Punjab, India",
  hours: "Mon–Sat, 10:00–19:00 IST",

  // Free form service: get a key at https://web3forms.com (enter your email, the key arrives instantly)
  web3formsKey: "YOUR_WEB3FORMS_ACCESS_KEY",

  social: {
    linkedin: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    x: "https://x.com/",
    facebook: "https://www.facebook.com/",
  },
};

// ── Service pillars (mega menu + /services) ─────────────────
// `demo` links a service to one of the live popup demos:
// chatbot | builder | automation | dashboard | store | roi
export const pillars = [
  {
    id: "ai",
    title: "AI & Automation",
    line: "Intelligent work, less manual effort.",
    icon: "ai",
    services: [
      {
        slug: "ai-chatbots",
        title: "AI Chatbots & Assistants",
        line: "24/7 answers on web and WhatsApp",
        demo: "chatbot",
        intro: "An AI assistant trained on your business that answers customer questions, captures leads and books appointments — on your website and WhatsApp, day and night.",
        features: ["Trained on your services, prices and FAQs", "Website chat widget and WhatsApp Business", "Books appointments and captures leads", "Hands over to a human when needed", "Hindi, Punjabi and English support", "Conversation reports every week"],
        timeline: "2–3 weeks",
        from: "₹24,999",
      },
      {
        slug: "agentic-ai",
        title: "Agentic AI Workflows",
        line: "AI agents with human oversight",
        demo: "automation",
        intro: "AI agents that carry out multi-step work — researching leads, drafting replies, updating records — and pause for your approval before anything important goes out.",
        features: ["Agents connected to your tools and data", "Approval steps for every critical action", "Full activity log you can audit", "Runs on OpenAI, Claude or open models", "Cost and usage limits built in"],
        timeline: "3–6 weeks",
        from: "₹60,000",
      },
      {
        slug: "business-automation",
        title: "Business Process Automation",
        line: "Remove repetitive manual work",
        demo: "automation",
        intro: "We map the work your team repeats every day — invoices, follow-ups, reports, data entry — and turn it into workflows that run on their own.",
        features: ["Free process audit to find quick wins", "Invoice, billing and payment reminders", "Lead capture → CRM → follow-up", "Automatic daily and weekly reports", "Works with Excel, Google Sheets, Tally and Zoho"],
        timeline: "1–4 weeks",
        from: "₹15,000",
      },
      {
        slug: "whatsapp-automation",
        title: "WhatsApp & Email Automation",
        line: "Instant replies and reminders",
        demo: "automation",
        intro: "Official WhatsApp Business API setup with automatic replies, order updates, reminders and broadcast campaigns — plus matching email flows.",
        features: ["WhatsApp Business API onboarding", "Order, payment and appointment notifications", "Abandoned cart and follow-up sequences", "Broadcast campaigns with templates", "Shared team inbox"],
        timeline: "1–2 weeks",
        from: "₹12,000",
      },
      {
        slug: "ai-document-processing",
        title: "AI Document Processing",
        line: "Read invoices, forms and PDFs",
        demo: "automation",
        intro: "AI that reads invoices, purchase orders, IDs and forms, pulls out the data and puts it straight into your software — no more typing it in by hand.",
        features: ["Invoice and bill extraction", "KYC and form processing", "Validation with human review queue", "Exports to Excel, Tally, ERP or CRM"],
        timeline: "2–4 weeks",
        from: "₹35,000",
      },
      {
        slug: "ai-consulting",
        title: "AI Strategy & Consulting",
        line: "Priorities and a practical roadmap",
        demo: "roi",
        intro: "Not sure where AI fits in your business? We review your operations and give you a ranked list of AI and automation opportunities, with cost and expected savings for each.",
        features: ["Workshop with your team", "Opportunity map with ROI estimates", "Tool and vendor recommendations", "90-day implementation roadmap"],
        timeline: "1–2 weeks",
        from: "₹9,999",
      },
    ],
  },
  {
    id: "web",
    title: "Web & E-commerce",
    line: "Websites that win clients.",
    icon: "web",
    services: [
      {
        slug: "business-websites",
        title: "Business Websites",
        line: "Fast, premium, built to convert",
        demo: "builder",
        intro: "A custom-designed website that makes a strong first impression, loads fast on every phone and turns visitors into enquiries.",
        features: ["Custom design matched to your brand", "Built on Next.js for speed and SEO", "Lead forms, WhatsApp chat and Google Maps", "Easy editing for text, images and blogs", "Google Business and Search Console setup", "Free SSL and hosting for 1 year"],
        timeline: "7–21 days",
        from: "₹14,999",
      },
      {
        slug: "ecommerce",
        title: "E-commerce Stores",
        line: "Sell online from day one",
        demo: "store",
        intro: "An online store with payments, inventory, shipping and order tracking — built on Shopify, WooCommerce or fully custom, depending on what suits you.",
        features: ["Razorpay, UPI, cards and COD", "Product catalogue and stock management", "Shiprocket and Delhivery integration", "Discount codes and abandoned-cart recovery", "Order updates on WhatsApp and email"],
        timeline: "2–5 weeks",
        from: "₹39,999",
      },
      {
        slug: "landing-pages",
        title: "Landing Pages & Funnels",
        line: "Pages built for ad campaigns",
        demo: "builder",
        intro: "High-converting landing pages for ads, launches and offers — with A/B testing and tracking so you know exactly what works.",
        features: ["Conversion-focused copy and layout", "Meta and Google Ads pixel setup", "A/B testing", "Lead routing to CRM or WhatsApp"],
        timeline: "3–7 days",
        from: "₹7,999",
      },
      {
        slug: "website-redesign",
        title: "Website Redesign",
        line: "Modernise an outdated site",
        demo: "builder",
        intro: "We rebuild slow, outdated websites into modern, fast and secure ones — keeping your Google rankings and content intact.",
        features: ["Speed and SEO audit of the current site", "New design with your existing content", "Redirects to protect rankings", "Migration from WordPress, Wix or old builders"],
        timeline: "2–4 weeks",
        from: "₹19,999",
      },
      {
        slug: "portals-booking",
        title: "Portals & Booking Systems",
        line: "Customer and member portals",
        demo: "dashboard",
        intro: "Customer portals, appointment booking, member areas and online payments — so customers can serve themselves at any time.",
        features: ["Online booking with calendar sync", "Customer login and order history", "Online payments and invoices", "Reminders by SMS, email and WhatsApp"],
        timeline: "3–6 weeks",
        from: "₹49,999",
      },
    ],
  },
  {
    id: "software",
    title: "Software & Apps",
    line: "Built around how you work.",
    icon: "software",
    services: [
      {
        slug: "custom-software",
        title: "Custom Software Development",
        line: "Web apps for your exact process",
        demo: "dashboard",
        intro: "Software built around the way your company actually works — not the other way round. From internal tools to full business platforms.",
        features: ["Requirement workshops and clickable prototype", "Agile delivery with weekly demos", "Role-based access and audit logs", "Source code and documentation handed over", "Support and new features after launch"],
        timeline: "6–16 weeks",
        from: "₹1,50,000",
      },
      {
        slug: "mobile-apps",
        title: "Mobile App Development",
        line: "Android and iOS apps",
        demo: "store",
        intro: "Cross-platform Android and iOS apps from one codebase, built with React Native or Flutter and published to both app stores.",
        features: ["One codebase for Android and iOS", "Push notifications and offline mode", "Payments and maps integration", "Play Store and App Store publishing"],
        timeline: "6–12 weeks",
        from: "₹1,20,000",
      },
      {
        slug: "crm-erp",
        title: "CRM & ERP Solutions",
        line: "Sales, stock and billing in one place",
        demo: "dashboard",
        intro: "Custom or configured CRM and ERP systems that bring your leads, sales, inventory, billing and staff onto one dashboard.",
        features: ["Lead and sales pipeline", "Inventory and purchase management", "GST-ready invoicing", "Staff roles and permissions", "Mobile access for field teams"],
        timeline: "4–12 weeks",
        from: "₹75,000",
      },
      {
        slug: "saas-mvp",
        title: "SaaS & MVP Development",
        line: "Launch your product idea",
        demo: "dashboard",
        intro: "For founders: we turn your idea into a working product — a lean MVP you can show investors and early customers, built to scale later.",
        features: ["Product scoping workshop", "MVP in as little as 30 days", "Subscriptions and billing (Razorpay/Stripe)", "Analytics to learn from first users"],
        timeline: "4–10 weeks",
        from: "₹1,00,000",
      },
      {
        slug: "api-integrations",
        title: "API & Integrations",
        line: "Connect all your tools",
        demo: "automation",
        intro: "We connect the software you already use — payment gateways, Tally, Zoho, Shopify, Google, shipping, SMS — so data flows without copy-paste.",
        features: ["Payment, shipping and SMS gateways", "Tally, Zoho, HubSpot and Google Workspace", "Custom REST and GraphQL APIs", "Webhooks and real-time sync"],
        timeline: "1–4 weeks",
        from: "₹15,000",
      },
      {
        slug: "ui-ux-design",
        title: "UI/UX Design",
        line: "Interfaces people enjoy using",
        demo: "builder",
        intro: "Research-led design for websites, apps and software — wireframes, clickable prototypes and design systems your developers can build from.",
        features: ["User research and journeys", "Wireframes and clickable prototypes", "Design systems in Figma", "Usability testing"],
        timeline: "1–4 weeks",
        from: "₹20,000",
      },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Data",
    line: "Modern platforms, clear numbers.",
    icon: "cloud",
    services: [
      {
        slug: "cloud-hosting",
        title: "Cloud Hosting & Migration",
        line: "Fast, secure, scalable hosting",
        demo: "dashboard",
        intro: "We host and manage your websites and applications on AWS, Google Cloud or Vercel — or move them there from slow shared hosting.",
        features: ["AWS, Google Cloud, Azure and Vercel", "Zero-downtime migration", "Auto-scaling and CDN", "Cost optimisation reviews"],
        timeline: "1–3 weeks",
        from: "₹9,999",
      },
      {
        slug: "devops-security",
        title: "DevOps & Security",
        line: "Secure software delivery",
        demo: "dashboard",
        intro: "Automated deployments, monitoring, backups and security hardening so your software stays online and protected.",
        features: ["CI/CD pipelines", "Uptime and error monitoring", "Security audits and fixes", "Automated daily backups"],
        timeline: "1–3 weeks",
        from: "₹19,999",
      },
      {
        slug: "dashboards-bi",
        title: "Dashboards & BI",
        line: "See your business at a glance",
        demo: "dashboard",
        intro: "Live dashboards that pull data from your sales, accounts and operations so you can make decisions from real numbers, not guesswork.",
        features: ["Sales, stock and finance dashboards", "Power BI, Looker Studio or custom", "Data from Tally, Excel, CRM and ads", "Daily reports on email or WhatsApp"],
        timeline: "2–4 weeks",
        from: "₹25,000",
      },
      {
        slug: "data-analytics",
        title: "Data Engineering & Analytics",
        line: "AI-ready data foundations",
        demo: "dashboard",
        intro: "We clean, organise and connect your business data into one reliable source — ready for reporting, forecasting and AI.",
        features: ["Data cleaning and migration", "Central database or warehouse", "Sales forecasting models", "Customer segmentation"],
        timeline: "3–8 weeks",
        from: "₹60,000",
      },
      {
        slug: "website-care",
        title: "Website Care & Maintenance",
        line: "We keep it running for you",
        demo: "dashboard",
        intro: "Monthly plans where we host, secure, back up and update your website — and make content changes whenever you need them.",
        features: ["Managed hosting with SSL", "Daily backups and uptime monitoring", "Content and price updates on request", "Monthly performance report"],
        timeline: "Ongoing",
        from: "₹1,499/mo",
      },
    ],
  },
  {
    id: "growth",
    title: "Growth & Marketing",
    line: "Get found. Get chosen.",
    icon: "growth",
    services: [
      {
        slug: "seo",
        title: "SEO & Local SEO",
        line: "Rank on Google and Maps",
        demo: "dashboard",
        intro: "Technical SEO, content and Google Business Profile optimisation that bring customers who are already searching for what you sell.",
        features: ["Keyword research for your city and industry", "Google Business Profile optimisation", "Technical SEO and speed fixes", "Monthly ranking reports"],
        timeline: "Ongoing",
        from: "₹7,999/mo",
      },
      {
        slug: "performance-marketing",
        title: "Performance Marketing",
        line: "Google and Meta ads that pay off",
        demo: "roi",
        intro: "Ad campaigns on Google, Instagram and Facebook managed by people who also build your landing pages and tracking — so every rupee is measured.",
        features: ["Campaign strategy and setup", "Conversion tracking", "Creative and copy testing", "Weekly spend and lead reports"],
        timeline: "Ongoing",
        from: "₹9,999/mo",
      },
      {
        slug: "branding",
        title: "Branding & Logo Design",
        line: "A brand clients remember",
        demo: "builder",
        intro: "Logo, colours, typography and brand guidelines that make your business look established and trustworthy everywhere.",
        features: ["Logo with 3 initial concepts", "Colour palette and typography", "Business card and letterhead", "Social media kit"],
        timeline: "1–2 weeks",
        from: "₹9,999",
      },
      {
        slug: "social-content",
        title: "Social Media & Content",
        line: "Consistent, quality content",
        demo: "builder",
        intro: "Posts, reels and blogs planned around your goals, created with AI-assisted workflows and reviewed by people.",
        features: ["Monthly content calendar", "Post and reel design", "Blog articles for SEO", "Performance reporting"],
        timeline: "Ongoing",
        from: "₹11,999/mo",
      },
    ],
  },
];

export const allServices = pillars.flatMap((p) => p.services.map((s) => ({ ...s, pillar: p.id, pillarTitle: p.title })));
export const getService = (slug) => allServices.find((s) => s.slug === slug);

// ── Packaged offers (mega menu highlight + /solutions) ──────
export const offers = [
  { slug: "website-in-7-days", title: "Website in 7 Days", line: "Professional site, live in a week", price: "₹14,999", demo: "builder", points: ["5-page custom website", "Domain, hosting and email setup", "WhatsApp and contact form", "Google Maps and Business Profile"] },
  { slug: "ai-chatbot-in-14-days", title: "AI Chatbot in 14 Days", line: "Your 24/7 sales assistant", price: "₹24,999", demo: "chatbot", points: ["Trained on your business", "Website and WhatsApp", "Lead capture and booking", "30 days of tuning included"] },
  { slug: "automation-audit", title: "Free Automation Audit", line: "Find hours to save every week", price: "Free", demo: "roi", points: ["60-minute process review", "Ranked list of quick wins", "Savings estimate for each", "No obligation"] },
  { slug: "mvp-in-30-days", title: "MVP in 30 Days", line: "Launch your product idea", price: "From ₹1,00,000", demo: "dashboard", points: ["Scoping workshop", "Working web app", "Payments and analytics", "Investor-ready demo"] },
];

// ── Industries ──────────────────────────────────────────────
export const industries = [
  { slug: "retail-ecommerce", title: "Retail & E-commerce", line: "Sell online and in-store from one system", demo: "store", challenges: ["Paying high marketplace commissions", "Stock out of sync between shop and online", "Manual order updates to customers"], solutions: ["Own online store with UPI and COD", "Inventory synced across channels", "Automatic WhatsApp order updates", "Abandoned-cart recovery"] },
  { slug: "healthcare", title: "Healthcare & Clinics", line: "Bookings, reminders and patient records", demo: "chatbot", challenges: ["Phones busy with appointment calls", "Patients missing appointments", "Paper records and slow billing"], solutions: ["Online booking and AI receptionist", "Automatic reminders on WhatsApp", "Digital patient records", "Online payments and invoices"] },
  { slug: "restaurants", title: "Restaurants & Food", line: "Direct orders without aggregator fees", demo: "store", challenges: ["20–30% commission to delivery apps", "No customer data for repeat orders", "Menu updates across many platforms"], solutions: ["Direct ordering website with UPI", "Customer database and offers", "QR-code menus", "Table reservations"] },
  { slug: "real-estate", title: "Real Estate", line: "Capture and convert property leads", demo: "chatbot", challenges: ["Leads lost across portals and calls", "Slow follow-up", "Hard to showcase projects online"], solutions: ["Project websites with virtual tours", "All leads into one CRM", "Instant WhatsApp follow-up", "Site-visit booking"] },
  { slug: "education", title: "Education & Coaching", line: "Admissions, fees and online learning", demo: "dashboard", challenges: ["Manual admissions and fee tracking", "Scattered study material", "Parent communication"], solutions: ["Admission and enquiry website", "Student portal with online fees", "Course and test platform", "Automatic parent updates"] },
  { slug: "manufacturing", title: "Manufacturing & Trading", line: "Quotes, stock and dispatch, automated", demo: "automation", challenges: ["Quotations and invoices made by hand", "No live view of stock", "Orders tracked on paper and Excel"], solutions: ["Custom ERP for orders and stock", "Automatic quotations and GST invoices", "Dealer and distributor portal", "Live production dashboards"] },
  { slug: "professional-services", title: "Professional Services", line: "For CAs, lawyers, consultants and agencies", demo: "automation", challenges: ["Client documents chased over email", "Repeated manual reports", "Time spent on scheduling"], solutions: ["Client portal for documents", "AI document processing", "Online scheduling and payments", "Automated reports"] },
  { slug: "startups", title: "Startups & SaaS", line: "From idea to launched product", demo: "dashboard", challenges: ["Need to launch fast with a small budget", "No in-house tech team", "Must scale later without a rewrite"], solutions: ["MVP in 30 days", "Dedicated engineering pod", "Cloud setup that scales", "Analytics from day one"] },
];
export const getIndustry = (slug) => industries.find((i) => i.slug === slug);

// ── Showcase builds ─────────────────────────────────────────
// These are example builds that show what Silver Edge can deliver.
// Replace them with real client projects (and real results) as you complete work.
export const showcase = [
  { name: "Organic grocery store", sector: "E-commerce", demo: "store", goal: "An online store with UPI checkout, stock sync and WhatsApp order updates.", tags: ["Next.js store", "Razorpay", "Shiprocket"], tone: "#E7F0E9" },
  { name: "Multi-doctor clinic", sector: "Healthcare", demo: "chatbot", goal: "AI receptionist that answers questions and books appointments 24/7.", tags: ["AI chatbot", "Booking", "WhatsApp reminders"], tone: "#E6EEF8" },
  { name: "Steel trading ERP", sector: "Manufacturing", demo: "automation", goal: "Quotation-to-invoice workflow with live stock and GST billing.", tags: ["Custom ERP", "Automation", "Tally sync"], tone: "#ECEEF2" },
  { name: "Real estate lead engine", sector: "Real estate", demo: "chatbot", goal: "Project microsites with every lead routed into a CRM with instant follow-up.", tags: ["Website", "CRM", "Ads"], tone: "#F4EEE6" },
  { name: "Coaching institute portal", sector: "Education", demo: "dashboard", goal: "Student portal with online fees, tests and parent updates.", tags: ["Web app", "Payments", "Dashboard"], tone: "#EFEAF6" },
  { name: "Restaurant direct ordering", sector: "Restaurant", demo: "store", goal: "Commission-free ordering site with QR menus and repeat-customer offers.", tags: ["Ordering site", "UPI", "Local SEO"], tone: "#F7EAE6" },
];

// ── Testimonials ────────────────────────────────────────────
// Add real client quotes here (with their permission). The section stays hidden until you do.
// Example: { quote: "…", name: "Client Name", role: "Owner, Business Name" },
export const testimonials = [];

export const stats = [
  { value: "7 days", label: "to launch a starter website" },
  { value: "30 days", label: "to a working MVP" },
  { value: "24/7", label: "AI assistants and monitoring" },
  { value: "100%", label: "code and data ownership" },
];

export const process = [
  { title: "Discovery", text: "A free call to understand your business, customers and goals. You get a clear proposal with scope, timeline and fixed price." },
  { title: "Design", text: "You review designs and a clickable prototype before development starts. Two rounds of changes are included." },
  { title: "AI-assisted build", text: "Our engineers build with AI tools for speed, and every line is reviewed by a human before it ships." },
  { title: "Launch", text: "We test on real devices, connect your domain, analytics and Google, then go live." },
  { title: "Grow", text: "Hosting, updates, automation and improvements every month — by the team that built it." },
];

export const reasons = [
  { icon: "team", title: "Direct access to engineers", text: "You talk to the people building your product — no account managers passing messages." },
  { icon: "ai", title: "AI-led, human-approved", text: "AI speeds up our delivery. Engineers review, test and approve everything before it reaches you." },
  { icon: "price", title: "Fixed, transparent pricing", text: "A written quote before work starts. No hidden charges, no surprise invoices." },
  { icon: "support", title: "We stay after launch", text: "Hosting, support and new features from the same team, so nothing gets lost in hand-offs." },
];

export const techStack = ["Next.js", "React", "Node.js", "Python", "React Native", "Flutter", "PostgreSQL", "MongoDB", "AWS", "Google Cloud", "Vercel", "Shopify", "WordPress", "Razorpay", "WhatsApp Cloud API", "OpenAI", "Claude", "n8n", "Power BI", "Figma"];

export const plans = [
  { name: "Starter", price: "₹14,999", unit: "one-time", for: "Shops, clinics, freelancers and new businesses", features: ["Up to 5 pages", "Mobile-friendly custom design", "Contact form + WhatsApp button", "Basic SEO and Google Maps", "1 year free hosting + SSL", "Live in 7–10 days"] },
  { name: "Business", price: "₹34,999", unit: "one-time", for: "Growing companies that need leads", featured: true, features: ["Up to 12 pages", "Premium design with animations", "Blog you can edit yourself", "Full on-page SEO + Analytics", "Lead automation to email & WhatsApp", "AI FAQ assistant (basic)", "1 year hosting, backups & support"] },
  { name: "Enterprise", price: "Custom", unit: "quote", for: "Software, stores, AI and automation", features: ["E-commerce or custom web app", "Dashboards, CRM or ERP modules", "AI chatbots and agents", "Payment and API integrations", "Dedicated project manager", "Priority support with SLA"] },
];

export const carePlans = [
  { name: "Basic care", price: "₹1,499/mo", text: "Hosting, SSL, backups, security updates and 1 hour of edits." },
  { name: "Growth care", price: "₹4,999/mo", text: "Everything in Basic, plus 5 hours of edits, SEO tuning and a monthly report." },
];

export const faqs = [
  { q: "What does \"AI-led\" mean for my project?", a: "We use AI tools to design, write and test faster, which lowers your cost and timeline. Every piece of work is reviewed and approved by our engineers before it ships." },
  { q: "How long does a website take?", a: "A starter site is usually live in 7–10 days and a business site in 2–3 weeks. Software, stores and AI projects get a written timeline before we start." },
  { q: "Can you automate work we already do in Excel or on paper?", a: "Usually, yes. Book the free automation audit and we'll show you what can run automatically — invoices, reminders, reports, data entry — with savings for each." },
  { q: "Will I own the code and data?", a: "Yes. You own your website, source code, domain and data. No lock-in." },
  { q: "Do you provide domain, hosting and business email?", a: "Yes. We can register your domain, host your site and set up professional email, or work with what you already have." },
  { q: "How do payments work?", a: "50% to start and 50% at launch for websites. Larger software projects are split into milestones." },
];

export const careers = {
  roles: [
    { title: "Full-Stack Developer (Next.js / Node)", type: "Full-time", place: "Rajpura / Hybrid" },
    { title: "AI & Automation Engineer", type: "Full-time", place: "Remote (India)" },
    { title: "UI/UX Designer", type: "Full-time", place: "Rajpura / Hybrid" },
    { title: "Business Development Executive", type: "Full-time", place: "Rajpura" },
    { title: "Software Engineering Intern", type: "Internship", place: "Rajpura" },
  ],
  why: [
    { title: "Own outcomes, not tickets", text: "Work in small teams that carry a client's product end to end. You see the problem, shape the solution and see it go live." },
    { title: "AI-first in real work", text: "Use modern AI tools every day on projects that reach production — not side experiments." },
    { title: "Learn fast", text: "Mentorship, code reviews and a learning budget built into the job." },
    { title: "Grow with the company", text: "We're early. Strong people take on more responsibility quickly." },
  ],
  steps: [
    { title: "Share your work", text: "Send your CV with a GitHub link, portfolio or a short note on the hardest problem you've solved." },
    { title: "Talk with engineers", text: "A conversation about things you've built and the decisions you made — no trick puzzles." },
    { title: "Small paid task", text: "A short, practical task similar to the real work, paid for your time." },
    { title: "Offer", text: "Clear role, team, salary and growth path before you decide." },
  ],
};

export const nav = [
  { label: "Services", menu: "services" },
  { label: "Industries", menu: "industries" },
  { label: "Solutions", menu: "solutions" },
  { label: "Live demos", href: "/demos" },
  { label: "Work", href: "/work" },
  { label: "Company", menu: "company" },
];
