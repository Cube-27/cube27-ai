export const SITE = {
  name: "Cube27 AI — Production AI Systems",
  brand: "Cube27 AI",
  url: "https://ai.cube27.com",
  description:
    "Cube27 designs grounded, governed, and observable AI systems for real-world operations.",
  email: "contact@cube27.com",
  analyticsId: "G-B2GPL54QD9",
  contactUrl:
    "https://www.cube27.com/contact/?utm_source=ai.cube27.com&utm_medium=referral&utm_campaign=ai_services",
  parentUrl: "https://www.cube27.com/",
  privacyUrl: "https://www.cube27.com/privacy-policy/",
  termsUrl: "https://www.cube27.com/terms-of-service/",
  organization: {
    id: "https://www.cube27.com/#organization",
    name: "Cube27",
    legalName: "Cube27 IT Pvt. Ltd.",
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

export const NAV_ITEMS = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Patterns", href: "#patterns" },
  { label: "Proof", href: "#proof" },
  { label: "Method", href: "#method" },
] as const;

export const DEPLOYMENT_LENS = [
  { id: "01", name: "Grounded", detail: "Evidence and retrieval" },
  { id: "02", name: "Governed", detail: "Boundaries and controls" },
  { id: "03", name: "Observed", detail: "Signals and evaluation" },
] as const;

export const ENGINEERING_PRINCIPLES = [
  {
    icon: "database",
    label: "Trusted data",
    statement: "Ground every answer.",
    detail: "Retrieval · provenance",
  },
  {
    icon: "bot",
    label: "Controlled automation",
    statement: "Automate with limits.",
    detail: "Tools · approvals",
  },
  {
    icon: "activity",
    label: "Live signals",
    statement: "Measure what matters.",
    detail: "Quality · cost · latency",
  },
] as const;

export const SERVICE_PATTERNS = [
  {
    id: "01",
    name: "RAG systems",
    detail: "Retrieve trusted context.",
    icon: "search",
    tone: "quality",
  },
  {
    id: "02",
    name: "Fine-tuning",
    detail: "Tune model behaviour.",
    icon: "brain",
    tone: "quality",
  },
  {
    id: "03",
    name: "Caching",
    detail: "Reduce cost and latency.",
    icon: "gauge",
    tone: "efficiency",
  },
  {
    id: "04",
    name: "Guardrails & defensive UX",
    detail: "Set safe boundaries.",
    icon: "shield",
    tone: "assurance",
  },
  {
    id: "05",
    name: "User feedback loops",
    detail: "Learn from real use.",
    icon: "messages",
    tone: "learning",
  },
  {
    id: "06",
    name: "Agentic evaluations",
    detail: "Test agent behaviour.",
    icon: "clipboard",
    tone: "quality",
  },
  {
    id: "07",
    name: "LLM observability",
    detail: "Track live systems.",
    icon: "activity",
    tone: "assurance",
  },
] as const;

export const PRODUCT_PROOF = [
  {
    code: "IV-02",
    name: "Invoro",
    label: "Commerce intelligence",
    useCase: "Track product, price, and availability changes with confidence.",
    focus: "Retail & market intelligence",
    metric: "Time to market-change signal",
  },
  {
    code: "CL-01",
    name: "CiteLadder",
    label: "Search & visibility intelligence",
    useCase: "Make owned content easier to find, trust, and recommend.",
    focus: "Marketing & ecommerce teams",
    metric: "Answer-engine citation share",
  },
  {
    code: "SS-04",
    name: "SalesERP",
    label: "Business operations systems",
    useCase: "Keep purchasing, delivery, and invoicing in one flow.",
    focus: "Suppliers & distribution teams",
    metric: "Order-to-invoice cycle time",
  },
  {
    code: "RF-03",
    name: "RFPmanager",
    label: "Bid & proposal operations",
    useCase: "Turn tender documents into faster, governed responses.",
    focus: "B2B services & public procurement",
    metric: "RFP response turnaround",
  },
] as const;

export const DELIVERY_STEPS = [
  {
    step: "01",
    name: "Map",
    detail: "Clarify the workflow, decision points, risks, and source systems.",
  },
  {
    step: "02",
    name: "Architect",
    detail:
      "Choose the smallest reliable stack of models, data, tools, and controls.",
  },
  {
    step: "03",
    name: "Instrument",
    detail:
      "Make quality, latency, cost, and failure modes measurable from the start.",
  },
  {
    step: "04",
    name: "Operate",
    detail:
      "Ship with feedback loops, governance, and a clear path to the next capability.",
  },
] as const;
