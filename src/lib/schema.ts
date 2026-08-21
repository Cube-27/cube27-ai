import type { Graph, Thing, WithContext } from "schema-dts";
import { CAPABILITIES } from "@/data/capabilities";
import { PRODUCTS, type Product } from "@/data/products";
import { SITE } from "@/data/site";

export type JsonLd = WithContext<Thing> | Graph;

const organizationNode = () => {
  const organization = SITE.organization;
  return {
    "@type": "Organization" as const,
    "@id": organization.id,
    name: organization.name,
    legalName: organization.legalName,
    url: organization.url,
    logo: organization.logo,
    email: organization.email,
    sameAs: [...organization.sameAs],
    address: {
      "@type": "PostalAddress" as const,
      ...organization.address,
    },
  };
};

const websiteNode = () => ({
  "@type": "WebSite" as const,
  "@id": `${SITE.url}/#website`,
  url: `${SITE.url}/`,
  name: SITE.brand,
  description: SITE.description,
  publisher: { "@id": SITE.organization.id },
  inLanguage: "en",
});

const imageNode = () => ({
  "@type": "ImageObject" as const,
  url: `${SITE.url}/social-preview.jpg`,
  width: "1200",
  height: "630",
});

export function buildHomeSchema(): Graph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      websiteNode(),
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/#webpage`,
        url: `${SITE.url}/`,
        name: SITE.name,
        description: SITE.description,
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": `${SITE.url}/#service` },
        primaryImageOfPage: imageNode(),
        inLanguage: "en",
      },
      {
        "@type": "Service",
        "@id": `${SITE.url}/#service`,
        name: "Production AI product engineering",
        description:
          "CUBE27 builds production AI systems for workflows where teams spend too much time collecting information, reconciling data, reviewing documents or figuring out what changed.",
        provider: { "@id": SITE.organization.id },
        serviceType: "AI product engineering",
        url: `${SITE.url}/`,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Production capabilities",
          itemListElement: CAPABILITIES.map((capability, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: capability.name,
              description: capability.detail,
            },
          })),
        },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE.url}/#products`,
        name: "CUBE27 AI product systems",
        numberOfItems: PRODUCTS.length,
        itemListElement: PRODUCTS.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.name,
          description: product.promise,
          url: `${SITE.url}/products/${product.slug}/`,
        })),
      },
    ],
  };
}

export function buildProductSchema(product: Product): Graph {
  const url = `${SITE.url}/products/${product.slug}/`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      websiteNode(),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: product.seo.title,
        description: product.seo.description,
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": `${url}#service` },
        primaryImageOfPage: imageNode(),
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE.url}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: product.name,
            item: url,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: product.name,
        description: product.promise,
        provider: { "@id": SITE.organization.id },
        serviceType: "AI product system",
        url,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${product.name} capabilities`,
          itemListElement: product.capabilities.map((capability, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: capability.name,
              description: capability.detail,
            },
          })),
        },
      },
    ],
  };
}
