import "@fontsource-variable/archivo/wdth.css";
import "@fontsource/hanken-grotesk/400.css";
import "@fontsource/hanken-grotesk/500.css";
import "@fontsource/hanken-grotesk/600.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsApp";
import DemoProvider from "@/components/DemoProvider";
import { site } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  icons: { icon: "/favicon.svg", apple: "/apple-touch-icon.png" },
  openGraph: { title: site.name, description: site.description, url: site.url, siteName: site.name, type: "website", locale: "en_IN", images: ["/brand/silver-edge-logo-stacked-white.png"] },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
};

export const viewport = { themeColor: "#081320" };

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  url: site.url,
  logo: `${site.url}/brand/silver-edge-app-icon-512.png`,
  email: site.email,
  telephone: site.phone,
  address: site.address,
  description: site.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </head>
      <body>
        <DemoProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </DemoProvider>
      </body>
    </html>
  );
}
