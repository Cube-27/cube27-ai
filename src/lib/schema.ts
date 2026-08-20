import type { Graph, Thing, WithContext } from "schema-dts";
import { PRODUCT_PROOF, SERVICE_PATTERNS, SITE } from "@/data/site";

export type JsonLd = WithContext<Thing> | Graph;

export function buildHomeSchema(): Graph {
  const organization = SITE.organization;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organization.id,
        name: organization.name,
        legalName: organization.legalName,
        url: organization.url,
        logo: organization.logo,
        email: organization.email,
        sameAs: [...organization.sameAs],
        address: {
          "@type": "PostalAddress",
          ...organization.address,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: `${SITE.url}/`,
        name: SITE.brand,
        description: SITE.description,
        publisher: { "@id": organization.id },
        inLanguage: "en",
      },
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/#webpage`,
        url: `${SITE.url}/`,
        name: SITE.name,
        description: SITE.description,
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": `${SITE.url}/#service` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE.url}/social-preview.jpg`,
          width: "1200",
          height: "630",
        },
        inLanguage: "en",
      },
      {
        "@type": "Service",
        "@id": `${SITE.url}/#service`,
        name: "Production AI engineering",
        description:
          "Cube27 designs and builds reliable AI systems that are context-aware, observable, measurable, and ready to operate.",
        provider: { "@id": organization.id },
        serviceType: "AI engineering",
        url: `${SITE.url}/`,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Production AI patterns",
          itemListElement: SERVICE_PATTERNS.map((pattern, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: pattern.name,
              description: pattern.detail,
            },
          })),
        },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE.url}/#products`,
        name: "Cube27 AI product systems",
        numberOfItems: PRODUCT_PROOF.length,
        itemListElement: PRODUCT_PROOF.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.name,
          description: product.useCase,
        })),
      },
    ],
  };
}
