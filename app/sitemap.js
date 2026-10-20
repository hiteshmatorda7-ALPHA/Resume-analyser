import { site, allServices, industries } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap() {
  const pages = ["", "/services", "/industries", "/solutions", "/demos", "/work", "/pricing", "/about", "/careers", "/contact",
    ...allServices.map((s) => `/services/${s.slug}`), ...industries.map((i) => `/industries/${i.slug}`)];
  return pages.map((p) => ({ url: `${site.url}${p}/`, lastModified: new Date() }));
}
