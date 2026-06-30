import { SITE_NAME, SITE_URL } from "@/lib/site"

const OG_IMAGE = `${SITE_URL}/og-image.png`

/** BreadcrumbList — helps Google render breadcrumb trails in search results. */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  }
}

/** WebPage node tied back to the site's WebSite + Organization entities. */
export function webPageLd(opts: { path: string; title: string; description: string }) {
  const url = `${SITE_URL}${opts.path || ""}` || SITE_URL
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: `${opts.title} | ${SITE_NAME}`,
    description: opts.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
    primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
  }
}

/** FAQPage — eligible for FAQ rich results and reinforces topical relevance. */
export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }
}
