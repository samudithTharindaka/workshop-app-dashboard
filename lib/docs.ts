import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

import type {
  CategoryKey,
  Doc,
  DocMeta,
  Heading,
} from "./docs-meta";
import { CATEGORIES } from "./docs-meta";

const DOCS_DIR = path.join(process.cwd(), "app", "site");

const CATEGORY_MAP: Record<string, CategoryKey> = {
  introduction: "setup",
  installation: "setup",
  "getting-started": "setup",
  workflows: "setup",

  dashboard: "operations",
  appointments: "operations",
  inspections: "operations",
  "job-cards": "operations",
  "stock-management": "operations",
  reports: "operations",

  "status-reference": "reference",
  troubleshooting: "reference",
};

const FALLBACK_TITLES: Record<string, string> = {
  "getting-started": "Getting Started",
  "job-cards": "Job Cards",
  "stock-management": "Stock Management",
  "status-reference": "Status Reference",
};

const SKIP = new Set(["README", "readme"]);

function slugifyHeading(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function titleCase(slug: string): string {
  if (FALLBACK_TITLES[slug]) return FALLBACK_TITLES[slug];
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

function readAll(): string[] {
  if (!fs.existsSync(DOCS_DIR)) return [];
  return fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith(".md"))
    .filter((f) => !SKIP.has(f.replace(/\.md$/, "")));
}

function buildMeta(file: string): DocMeta {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(DOCS_DIR, file), "utf-8");
  const { data } = matter(raw);
  return {
    slug,
    title: (data.title as string) || titleCase(slug),
    description: data.description as string | undefined,
    sidebarPosition:
      typeof data.sidebar_position === "number" ? data.sidebar_position : 99,
    category: CATEGORY_MAP[slug] || "reference",
  };
}

export function listDocs(): DocMeta[] {
  const order = CATEGORIES.map((c) => c.key);
  return readAll()
    .map(buildMeta)
    .sort((a, b) => {
      if (a.category !== b.category) {
        return order.indexOf(a.category) - order.indexOf(b.category);
      }
      if (a.sidebarPosition !== b.sidebarPosition) {
        return a.sidebarPosition - b.sidebarPosition;
      }
      return a.title.localeCompare(b.title);
    });
}

// Configure marked once (gfm + soft breaks off).
let configured = false;
function ensureMarked() {
  if (configured) return;
  marked.use({ gfm: true, breaks: false });
  configured = true;
}

// Post-process the rendered HTML to add stable `id` attributes to h2/h3
// headings. Done this way (instead of via a custom renderer) because
// marked v12 does not reliably bind `this.parser` for renderer overrides.
function addHeadingIds(html: string): string {
  return html.replace(
    /<h([23])>([\s\S]*?)<\/h\1>/g,
    (_match, level: string, inner: string) => {
      const plain = inner.replace(/<[^>]*>/g, "");
      const id = slugifyHeading(plain);
      if (!id) return `<h${level}>${inner}</h${level}>`;
      return `<h${level} id="${id}">${inner}</h${level}>`;
    },
  );
}

export function renderMarkdown(md: string): string {
  ensureMarked();
  const html = marked.parse(md) as string;
  return addHeadingIds(html);
}

export function extractHeadings(md: string): Heading[] {
  const headings: Heading[] = [];
  const lines = md.split("\n");
  let inCode = false;
  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const m = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (m) {
      const level = m[1].length as 2 | 3;
      const text = m[2].replace(/[*_`]/g, "").trim();
      headings.push({ id: slugifyHeading(text), text, level });
    }
  }
  return headings;
}

export function getDoc(slug: string): Doc | null {
  const file = path.join(DOCS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  const meta: DocMeta = {
    slug,
    title: (data.title as string) || titleCase(slug),
    description: data.description as string | undefined,
    sidebarPosition:
      typeof data.sidebar_position === "number" ? data.sidebar_position : 99,
    category: CATEGORY_MAP[slug] || "reference",
  };
  return {
    ...meta,
    content,
    html: renderMarkdown(content),
  };
}

export function defaultDocSlug(): string | null {
  const docs = listDocs();
  return docs[0]?.slug || null;
}
