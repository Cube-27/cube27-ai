import { PRODUCTS } from "@/data/products";

export const SITE = {
  name: "CUBE27 AI — AI products for complex operational work",
  brand: "CUBE27 AI",
  url: "https://ai.cube27.com",
  description:
    "CUBE27 builds production AI systems that turn fragmented data, documents and workflows into intelligence teams can act on.",
  email: "contact@cube27.com",
  analyticsId: "G-B2GPL54QD9",
  contactUrl:
    "https://www.cube27.com/contact/?utm_source=ai.cube27.com&utm_medium=referral&utm_campaign=ai_products",
  parentUrl: "https://www.cube27.com/",
  privacyUrl: "https://www.cube27.com/privacy-policy/",
  termsUrl: "https://www.cube27.com/terms-of-service/",
  organization: {
    id: "https://www.cube27.com/#organization",
    name: "CUBE27",
    legalName: "CUBE27 IT Pvt. Ltd.",
    url: "https://www.cube27.com/",
    email: "contact@cube27.com",
    logo: "https://www.cube27.com/cube27_logo.webp",
    sameAs: ["https://www.linkedin.com/company/cube27ltd"],
    address: {
      streetAddress: "Plot 12, Mulberry Garden 1, Magarpatta City, Hadapsar",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "411013",
      addressCountry: "IN",
    },
  },
} as const;

export const CTA = {
  primary: "Start a conversation",
  workflow: "Bring us a workflow",
  products: "Explore our products",
} as const;

export const PRODUCT_LINKS = PRODUCTS.map((product) => ({
  label: product.navLabel,
  href: `/products/${product.slug}/`,
  promise: product.promise,
}));

export const NAV_ITEMS = [
  { label: "Capabilities", href: "/#capabilities" },
  { label: "How we build", href: "/#how-we-build" },
] as const;

export const FOOTER_LINKS = [
  { label: "CUBE27", href: SITE.parentUrl },
  { label: "Contact", href: SITE.contactUrl },
  { label: "Privacy", href: SITE.privacyUrl },
  { label: "Terms", href: SITE.termsUrl },
] as const;
