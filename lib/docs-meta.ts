// Server-safe AND client-safe types + constants for the docs system.
// Anything that touches `fs` must live in `lib/docs.ts` instead.

export const CATEGORIES = [
  { key: "setup", label: "Setup" },
  { key: "operations", label: "Operations" },
  { key: "reference", label: "Reference" },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]["key"];

export type DocMeta = {
  slug: string;
  title: string;
  description?: string;
  sidebarPosition: number;
  category: CategoryKey;
};

export type Heading = { id: string; text: string; level: 2 | 3 };

export type Doc = DocMeta & { content: string; html: string };
