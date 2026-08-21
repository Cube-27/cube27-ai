import type { IconName } from "@/lib/icons";

export interface Capability {
  name: string;
  detail: string;
  icon: IconName;
}

export const CAPABILITIES_INTRO = {
  eyebrow: "Capabilities",
  title: "Seven capabilities behind every CUBE27 AI system.",
  lead: "Products solve different problems. The engineering underneath them is reusable: reliable context, controlled automation, measurable quality and systems that improve from actual use.",
  outro:
    "These are not standalone AI experiments. They are the production building blocks used across our products.",
} as const;

export const CAPABILITIES: readonly Capability[] = [
  {
    name: "Grounded Retrieval",
    detail:
      "Give models the right business context at the moment it is needed—with traceable source evidence.",
    icon: "layers",
  },
  {
    name: "Model Adaptation",
    detail:
      "Adapt model behaviour when prompting and retrieval alone cannot reliably deliver the required behaviour.",
    icon: "sliders",
  },
  {
    name: "Performance & Cost Control",
    detail:
      "Reduce repeated inference, latency and model spend without sacrificing freshness where it matters.",
    icon: "gauge",
  },
  {
    name: "Controlled Automation",
    detail:
      "Define what AI can do, what requires approval and how uncertainty or failure is exposed to users.",
    icon: "shield",
  },
  {
    name: "Human Feedback Loops",
    detail:
      "Capture corrections and outcomes so systems become more useful through real operational use.",
    icon: "loop",
  },
  {
    name: "Agent Evaluation",
    detail:
      "Test multi-step AI behaviour against known scenarios before trusting it with important workflows.",
    icon: "check",
  },
  {
    name: "AI Observability",
    detail:
      "Measure quality, latency, cost, failures, tool calls and model behaviour in production.",
    icon: "pulse",
  },
];

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
