type SchemaCrumb = {
  name: string;
  path: string;
};

type BlogPostingMeta = {
  headline: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  authorName?: string;
};

type PageSeoSchemaProps = {
  title: string;
  description: string;
  path: string;
  breadcrumbs: SchemaCrumb[];
  blogPosting?: BlogPostingMeta;
  /** Adds full LocalBusiness schema (use on contact page). */
  isLocalBusiness?: boolean;
  contact?: {
    phone?: string;
    email?: string;
    address?: string;
  };
};

export function PageSeoSchema({
  title,
  description,
  path,
  breadcrumbs,
  blogPosting,
  isLocalBusiness,
  contact,
}: PageSeoSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yapiistanbul.com.tr";
  const pageUrl = `${baseUrl}${path}`;

  const organization: Record<string, unknown> = {
    "@type": isLocalBusiness ? "LocalBusiness" : "Organization",
    "@id": `${baseUrl}#organization`,
    name: "Yapı İstanbul",
    url: baseUrl,
    logo: `${baseUrl}/favicon.ico`,
    email: contact?.email || "info@yapiistanbul.com.tr",
    telephone: contact?.phone || "+90 212 000 00 00",
    address: {
      "@type": "PostalAddress",
      streetAddress: contact?.address || "İstanbul",
      addressLocality: "Istanbul",
      addressCountry: "TR",
    },
  };

  if (isLocalBusiness) {
    organization.priceRange = "$$$";
    organization.areaServed = "TR";
  }

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": `${baseUrl}#website`,
      url: baseUrl,
      name: "Yapı İstanbul",
      publisher: {
        "@id": `${baseUrl}#organization`,
      },
    },
    organization,
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      isPartOf: {
        "@id": `${baseUrl}#website`,
      },
      about: {
        "@id": `${baseUrl}#organization`,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${baseUrl}${item.path}`,
      })),
    },
  ];

  if (blogPosting) {
    graph.push({
      "@type": "BlogPosting",
      "@id": `${pageUrl}#blogposting`,
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
      headline: blogPosting.headline,
      datePublished: blogPosting.datePublished,
      dateModified: blogPosting.dateModified || blogPosting.datePublished,
      image: blogPosting.image ? [blogPosting.image] : undefined,
      author: {
        "@type": "Organization",
        name: blogPosting.authorName || "Yapı İstanbul",
      },
      publisher: { "@id": `${baseUrl}#organization` },
      description,
    });
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
