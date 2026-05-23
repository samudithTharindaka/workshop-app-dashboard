import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  extractHeadings,
  getDoc,
  listDocs,
} from "@/lib/docs";
import { DocsShell } from "@/components/docs/DocsShell";

export function generateStaticParams() {
  return listDocs().map((d) => ({ slug: d.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const doc = getDoc(params.slug);
  if (!doc) return {};
  return {
    title: `${doc.title} · Docs`,
    description: doc.description,
  };
}

export default function DocPage({ params }: { params: { slug: string } }) {
  const doc = getDoc(params.slug);
  if (!doc) notFound();

  const all = listDocs();
  const headings = extractHeadings(doc.content);

  const orderedInCategory = all.filter((d) => d.category === doc.category);
  const idx = orderedInCategory.findIndex((d) => d.slug === doc.slug);
  const prev = idx > 0 ? orderedInCategory[idx - 1] : null;
  const next =
    idx < orderedInCategory.length - 1 ? orderedInCategory[idx + 1] : null;

  return (
    <DocsShell
      allDocs={all}
      doc={doc}
      headings={headings}
      prev={prev}
      next={next}
    />
  );
}
