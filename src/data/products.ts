export interface ProductCapability {
  name: string;
  detail: string;
}

export interface Product {
  slug: string;
  hue: "blue" | "green" | "indigo" | "purple";
  visual: "visibility" | "commerce" | "supplier" | "bid";
  /** Generic public-facing system name. Internal build names are never exposed. */
  name: string;
  /** Short label used in navigation and breadcrumbs. */
  navLabel: string;
  promise: string;
  summary: string;
  tags: readonly string[];
  seo: { title: string; description: string };
  hero: { title: string; lead: string; cta: string };
  problem: { title: string; body: readonly string[] };
  capabilities: readonly ProductCapability[];
  workflow: readonly string[];
  closing: { title: string; body: string };
}

export const PRODUCTS: readonly Product[] = [
  {
    slug: "ai-visibility",
    hue: "blue",
    visual: "visibility",
    name: "AI Visibility & Growth Intelligence",
    navLabel: "AI Visibility",
    promise:
      "Understand how your brand gets discovered, cited and recommended by AI.",
    summary:
      "Track visibility across answer engines, compare competitors, understand the evidence behind recommendations and identify what your site should improve next.",
    tags: [
      "AI visibility",
      "Competitors",
      "Citations",
      "Content intelligence",
      "Demand signals",
    ],
    seo: {
      title: "AI Visibility & Growth Intelligence — CUBE27 AI",
      description:
        "Measure where your brand appears in AI answers, which competitors are winning, what sources influence those recommendations and what to improve next.",
    },
    hero: {
      title: "Understand why AI recommends one brand over another.",
      lead: "AI discovery is becoming a new customer acquisition surface. This system measures where your brand appears, which competitors are winning, what sources influence those recommendations and what you can improve next.",
      cta: "See your visibility",
    },
    problem: {
      title: "From rankings to evidence",
      body: [
        "Search rankings tell you where a page appears. AI recommendations involve a more complicated chain of evidence.",
        "The system connects your website, content, demand signals, competitor observations and answer-engine results into one evidence trail—so teams can understand not only whether visibility changed, but the factors worth investigating.",
      ],
    },
    capabilities: [
      {
        name: "AI visibility tracking",
        detail:
          "Monitor brand mentions, citations and relative positioning across tracked questions and AI engines.",
      },
      {
        name: "Competitive intelligence",
        detail:
          "See where competitors outperform you and examine the recurring characteristics behind those wins.",
      },
      {
        name: "Citation & source intelligence",
        detail:
          "Understand which owned and third-party sources influence answer-engine responses.",
      },
      {
        name: "Site & content intelligence",
        detail:
          "Identify missing, stale, contradictory or poorly structured evidence across your owned content.",
      },
      {
        name: "Demand intelligence",
        detail:
          "Connect visibility analysis with real search and behavioural signals rather than optimizing prompts in isolation.",
      },
      {
        name: "Recommended actions",
        detail:
          "Turn observed gaps into prioritized opportunities, briefs and content improvements.",
      },
      {
        name: "Measure again",
        detail:
          "Re-run comparable observations to determine whether visibility and supporting indicators actually moved.",
      },
    ],
    workflow: ["Observe", "Understand", "Improve", "Verify", "Track"],
    closing: {
      title: "Stop treating AI visibility as a black box.",
      body: "Build an evidence system around what AI engines can discover, trust and recommend.",
    },
  },
  {
    slug: "commerce-intelligence",
    hue: "green",
    visual: "commerce",
    name: "Commerce Intelligence & Monitoring",
    navLabel: "Commerce Intelligence",
    promise: "Turn changing ecommerce data into competitive intelligence.",
    summary:
      "Discover comparable products, extract structured product information, normalize attributes, monitor prices and availability, detect meaningful changes and deliver intelligence into downstream systems.",
    tags: [
      "Product intelligence",
      "Enrichment",
      "Monitoring",
      "Alerts",
      "APIs",
    ],
    seo: {
      title: "Commerce Intelligence & Monitoring — CUBE27 AI",
      description:
        "Continuously discover, structure and monitor competitive product data across ecommerce channels, then turn price, availability and assortment changes into intelligence.",
    },
    hero: {
      title: "Know when the market changes.",
      lead: "Continuously discover, structure and monitor competitive product data across ecommerce channels—then turn changes in price, availability, assortment and attributes into actionable intelligence.",
      cta: "Explore the pipeline",
    },
    problem: {
      title:
        "Commerce teams rarely have a data shortage. They have a reliable data problem.",
      body: [
        "Product information lives across storefronts, structured feeds, JavaScript state, APIs and changing page layouts. Our commerce intelligence system builds a deterministic evidence pipeline first and uses AI only where it adds value.",
        "Turn external market data into another enrichment layer for your product ecosystem.",
      ],
    },
    capabilities: [
      {
        name: "Competitive product discovery",
        detail:
          "Identify likely competitor equivalents and review match confidence before monitoring them.",
      },
      {
        name: "Structured product extraction",
        detail:
          "Extract pricing, availability, attributes and other product information from complex commerce surfaces.",
      },
      {
        name: "Data enrichment",
        detail:
          "Normalize product taxonomy, attributes and pricing into consistent downstream data.",
      },
      {
        name: "Continuous monitoring",
        detail:
          "Create recurring monitors for products and fields that matter.",
      },
      {
        name: "Change intelligence",
        detail:
          "Detect meaningful differences between snapshots instead of repeatedly delivering complete datasets.",
      },
      {
        name: "Alerts",
        detail:
          "Trigger price, availability or other monitored-field alerts when defined conditions occur.",
      },
      {
        name: "Agent & API access",
        detail:
          "Expose structured commerce intelligence to applications, automation systems and AI agents.",
      },
    ],
    workflow: [
      "Discover",
      "Extract",
      "Normalize",
      "Compare",
      "Monitor",
      "Alert",
    ],
    closing: {
      title: "Deterministic first. AI where it earns its place.",
      body: "Build the evidence pipeline before the intelligence layer, so every change you act on can be traced back to what was actually observed.",
    },
  },
  {
    slug: "supplier-operations",
    hue: "indigo",
    visual: "supplier",
    name: "Supplier Order Operations",
    navLabel: "Supplier Operations",
    promise:
      "Connect purchase orders, deliveries, invoicing and receipts in one operational flow.",
    summary:
      "Give supplier teams a single view of commitments, dispatches, invoices, outstanding quantities and reconciliation—without managing the process across disconnected spreadsheets and documents.",
    tags: [
      "Purchase orders",
      "Deliveries",
      "Invoices",
      "Reconciliation",
      "Reporting",
    ],
    seo: {
      title: "Supplier Order Operations — CUBE27 AI",
      description:
        "One operational system for purchase orders, deliveries, invoices, receipts and exceptions, with automatic reconciliation across every step.",
    },
    hero: {
      title: "One flow from purchase order to reconciliation.",
      lead: "Replace fragmented supplier spreadsheets and document tracking with one operational system for orders, deliveries, invoices, receipts and exceptions.",
      cta: "See the operational flow",
    },
    problem: {
      title:
        "Supplier operations become complicated when every document tells only part of the story.",
      body: [
        "A purchase order sets the commitment. Deliveries fulfil it over time. Invoices create financial claims. Receipt records confirm what was actually accepted.",
        "The system connects those events into one operational timeline.",
      ],
    },
    capabilities: [
      {
        name: "Purchase order management",
        detail:
          "Capture and manage customer purchase orders and the commitments they create.",
      },
      {
        name: "Delivery planning",
        detail:
          "Track scheduled, partial and completed deliveries against ordered quantities.",
      },
      {
        name: "Dispatch documentation",
        detail:
          "Generate delivery documentation directly from order information.",
      },
      {
        name: "Invoice management",
        detail:
          "Create invoices against actual dispatches while maintaining linkage to source orders.",
      },
      {
        name: "Receipt tracking",
        detail: "Record customer acceptance and store receipt information.",
      },
      {
        name: "Automatic reconciliation",
        detail:
          "Compare ordered, dispatched, invoiced and received quantities to expose discrepancies.",
      },
      {
        name: "Operational analytics",
        detail:
          "See delivery performance, outstanding commitments, invoice status and deviations from one dashboard.",
      },
    ],
    workflow: [
      "Order",
      "Schedule",
      "Dispatch",
      "Invoice",
      "Receive",
      "Reconcile",
    ],
    closing: {
      title: "Every order, document and exception in one place.",
      body: "Give operations teams a live view of what has happened, what is outstanding and what requires attention.",
    },
  },
  {
    slug: "bid-operations",
    hue: "purple",
    visual: "bid",
    name: "Bid & Proposal Operations",
    navLabel: "Bid & Proposal Operations",
    promise: "Turn tender documents into faster, evidence-backed responses.",
    summary:
      "Capture opportunities, centralize tender documents, extract requirements, summarize large submissions and use AI to help teams draft responses without losing the source evidence behind them.",
    tags: [
      "Opportunity tracking",
      "Document intelligence",
      "Compliance",
      "Response generation",
    ],
    seo: {
      title: "Bid & Proposal Operations — CUBE27 AI",
      description:
        "Centralize opportunities, convert tender documents into AI-readable evidence and help bid teams review requirements, draft responses and coordinate submissions.",
    },
    hero: {
      title: "From tender document to submission workspace.",
      lead: "Centralize opportunities, convert tender documents into AI-readable evidence and help bid teams review requirements, build responses and coordinate submissions faster.",
      cta: "See the bid workspace",
    },
    problem: {
      title: "RFP work is not simply writing.",
      body: [
        "Teams first have to discover the opportunity, collect documents, interpret requirements, identify missing information, coordinate subject-matter experts and ensure the final response actually addresses the tender.",
        "AI becomes useful when it is connected to that workflow—not when it is another empty chat box.",
      ],
    },
    capabilities: [
      {
        name: "Opportunity pipeline",
        detail:
          "Track prospects, active tenders, submissions and outcomes in one shared workspace.",
      },
      {
        name: "Tender ingestion",
        detail:
          "Capture opportunity information and associated documents from tender sources.",
      },
      {
        name: "Document conversion",
        detail:
          "Turn PDF, Word, spreadsheet and other tender material into structured, AI-readable content.",
      },
      {
        name: "Document coverage",
        detail:
          "Track which tender documents were reviewed and where evidence is incomplete.",
      },
      {
        name: "Requirement intelligence",
        detail:
          "Summarize requirements, deadlines, obligations, risks and evaluation criteria.",
      },
      {
        name: "AI-assisted response drafting",
        detail:
          "Generate response material grounded in tender evidence and approved company information.",
      },
      {
        name: "Compliance workflow",
        detail:
          "Track mandatory requirements, open assumptions and incomplete responses before submission.",
      },
      {
        name: "AI assistant integration",
        detail:
          "Allow approved assistants and agents to retrieve and update bid information through controlled interfaces.",
      },
    ],
    workflow: ["Capture", "Convert", "Review", "Draft", "Validate", "Submit"],
    closing: {
      title: "Make AI part of the bid process, not another tool beside it.",
      body: "Keep the opportunity, source documents, analysis and response work connected from beginning to end.",
    },
  },
];
