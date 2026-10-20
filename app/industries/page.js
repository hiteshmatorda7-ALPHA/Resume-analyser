import Link from "next/link";
import { industries } from "@/lib/site";
import { icons } from "@/components/Icons";
import { PageHead, CtaBand } from "@/components/Blocks";

export const metadata = { title: "Industries", description: "Websites, software, AI and automation shaped for retail, healthcare, restaurants, real estate, education, manufacturing and more." };

export default function Industries() {
  return (
    <>
      <PageHead crumbs={[[null, "Industries"]]} title="Technology shaped for how your industry works" lead="We've mapped the everyday problems in each industry — and the websites, software and automation that solve them." />
      <section className="section">
        <div className="wrap">
          <div className="ind-grid">
            {industries.map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}`} className="ind"><span className="ico">{icons[i.slug]}</span><b>{i.title}</b><span>{i.line}</span></Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Don't see your industry?" text="We build for any business that sells, books or serves customers. Tell us how you work." />
    </>
  );
}
