import { breadcrumbLd, webPageLd } from "@/lib/structured-data"

/** Renders one or more JSON-LD blocks (server-rendered into the document). */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data]
  return (
    <>
      {blocks.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  )
}

/**
 * Per-page structured data: a WebPage node + a BreadcrumbList. Drop one of these
 * into each route's page component (alongside metadata) for richer SERP signals.
 */
export function PageStructuredData({
  path,
  title,
  description,
  breadcrumb,
  extra,
}: {
  path: string
  title: string
  description: string
  breadcrumb?: { name: string; path: string }[]
  extra?: object | object[]
}) {
  const crumbs =
    breadcrumb ?? [
      { name: "Home", path: "/" },
      { name: title, path },
    ]
  const extras = extra ? (Array.isArray(extra) ? extra : [extra]) : []
  return (
    <JsonLd data={[webPageLd({ path, title, description }), breadcrumbLd(crumbs), ...extras]} />
  )
}
