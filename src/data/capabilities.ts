import type { IconName } from "@/lib/icons";

export interface Capability {
  name: string;
  /** The promise, in one line. Carries the card; `detail` explains it. */
  tagline: string;
  detail: string;
  icon: IconName;
}

/**
 * The three stages a system passes through, in order. The capabilities are
 * grouped under them rather than listed flat: seven equal tiles say nothing
 * about how the seven relate, and the numbering they already carried implied
 * a sequence the grid then contradicted.
 */
export interface Phase {
  id: string;
  label: string;
  capabilities: readonly Capability[];
}

export const CAPABILITIES_INTRO = {
  eyebrow: "AI systems, built for production",
  title:
    "Seven capabilities that turn models into reliable systems that improve over time.",
} as const;

export const PHASES: readonly Phase[] = [
  {
    id: "build",
    label: "Build",
    capabilities: [
      {
        name: "Grounded Retrieval",
        tagline: "Context you can trace.",
        detail:
          "Give models the right business context at the moment it is needed — with traceable source evidence.",
        icon: "layers",
      },
      {
        name: "Model Adaptation",
        tagline: "Behaviour you can shape.",
        detail:
          "Adapt model behaviour when prompting and retrieval alone cannot reliably deliver the required behaviour.",
        icon: "sliders",
      },
    ],
  },
  {
    id: "operate",
    label: "Operate",
    capabilities: [
      {
        name: "Controlled Automation",
        tagline: "Actions within boundaries.",
        detail:
          "Define what AI can do, what requires approval and how uncertainty or failure is exposed to users.",
        icon: "shield",
      },
      {
        name: "Performance & Cost Control",
        tagline: "Efficient at production scale.",
        detail:
          "Reduce repeated inference, latency and model spend without sacrificing freshness where it matters.",
        icon: "gauge",
      },
    ],
  },
  {
    id: "improve",
    label: "Improve",
    capabilities: [
      {
        name: "Human Feedback",
        tagline: "Learn.",
        detail:
          "Capture corrections and outcomes so systems become more useful through real operational use.",
        icon: "loop",
      },
      {
        name: "Agent Evaluation",
        tagline: "Verify.",
        detail:
          "Test multi-step AI behaviour against known scenarios before trusting it with important workflows.",
        icon: "check",
      },
      {
        name: "AI Observability",
        tagline: "Understand.",
        detail:
          "Measure quality, latency, cost, failures, tool calls and model behaviour in production.",
        icon: "pulse",
      },
    ],
  },
];

/* The flat list the schema, the llms routes and the content tests read from.
   Derived, so the page and the machine-readable surfaces can never disagree
   about how many capabilities there are or what they are called. */
export const CAPABILITIES: readonly Capability[] = PHASES.flatMap(
  (phase) => phase.capabilities,
);

export const PHILOSOPHY_INTRO = {
  eyebrow: "How we build",
  title: "Different workflows. One production philosophy.",
  lead: "Our products may work with websites, product catalogs, purchase orders or tender documents, but the underlying challenge is remarkably similar.",
} as const;

export const PHILOSOPHY_STEPS = [
  {
    step: "01",
    name: "Connect the evidence",
    detail:
      "Bring together the documents, systems and signals needed to understand the workflow.",
  },
  {
    step: "02",
    name: "Build intelligence around it",
    detail:
      "Use deterministic processing, retrieval and models to classify, compare, extract and reason.",
  },
  {
    step: "03",
    name: "Put AI inside the workflow",
    detail:
      "Move from isolated chat to actions, recommendations, approvals and operational interfaces.",
  },
  {
    step: "04",
    name: "Measure what happens",
    detail:
      "Capture outcomes, failures, costs and user feedback so the system can be improved.",
  },
] as const;

export const ADAPT_BLOCK = {
  eyebrow: "Built by CUBE27",
  title: "Adaptable to your workflow.",
  body: "This is a working system we build and operate, not a fixed subscription. We adapt the data model, the interfaces and the controls to the way your team already works—then take it into production.",
  cta: "Bring us a workflow",
} as const;
