import { PageHead, CtaBand, ShowcaseGrid } from "@/components/Blocks";

export const metadata = { title: "Work", description: "Example websites, stores, AI assistants and software that Silver Edge builds for businesses." };

export default function Work() {
  return (
    <>
      <PageHead crumbs={[[null, "Work"]]} title="What we build for businesses" lead="Example builds across industries. Each one comes with a live demo so you can see exactly how it works." />
      <section className="section"><div className="wrap"><ShowcaseGrid /></div></section>
      <CtaBand title="Your business could be next" text="Share your idea and we'll show you what's possible, with a timeline and fixed quote." />
    </>
  );
}
