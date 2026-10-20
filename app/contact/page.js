import ContactForm from "@/components/ContactForm";
import { PageHead } from "@/components/Blocks";
import { waLink, WaIcon } from "@/components/WhatsApp";
import { site } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description: "Get a free quote for your website, software or automation project from Silver Edge.",
};

export default function Contact() {
  return (
    <>
      <PageHead crumbs={[[null, "Contact"]]} title="Tell us about your project"
        lead="Fill in the form or message us on WhatsApp. You'll get a clear plan and a fixed quote within one working day." />
      <section className="section">
        <div className="wrap contact-grid">
          <ContactForm />
          <aside className="info-card">
            <a href={waLink()} className="btn btn-wa" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", fontWeight: 600 }}>
              <span style={{ width: 20, height: 20 }}><WaIcon /></span> Chat on WhatsApp
            </a>
            <div><h3>Email</h3><a href={`mailto:${site.email}`}>{site.email}</a></div>
            <div><h3>Phone</h3><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></div>
            <div><h3>Office</h3><p>{site.address}</p></div>
            <div><h3>Hours</h3><p>{site.hours}</p></div>
          </aside>
        </div>
      </section>
    </>
  );
}
