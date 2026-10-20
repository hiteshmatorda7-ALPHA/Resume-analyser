import { PageHead, CtaBand } from "@/components/Blocks";
import DemoGallery from "@/components/DemoGallery";

export const metadata = { title: "Live demos", description: "Try working demos of AI chatbots, AI website generation, business automation, dashboards and online stores built by Silver Edge." };

export default function Demos() {
  return (
    <>
      <PageHead crumbs={[[null, "Live demos"]]} title="Try what we build — right in your browser" lead="Six working demos of the AI, automation and software we create for businesses. Click any card to open it." />
      <section className="section section-dark" style={{ paddingTop: 48 }}>
        <div className="wrap"><DemoGallery /></div>
      </section>
      <CtaBand title="Want one of these for your business?" text="Every demo is a starting point. We build the real version around your services, data and brand." />
    </>
  );
}
