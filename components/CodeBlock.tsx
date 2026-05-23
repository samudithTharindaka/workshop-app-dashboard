"use client";

import { useState } from "react";
import { IconCheck, IconCopy } from "./Icons";

export function CodeBlock({ lines }: { lines: string[] }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-brand-900 bg-brand-950 text-slate-100 shadow-ring">
      <div className="flex items-center justify-between border-b border-brand-900 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 text-[11px] font-medium uppercase tracking-wider text-slate-400">
            install
          </span>
        </div>
        <button
          type="button"
          onClick={onCopy}
          aria-label="Copy install command"
          className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-brand-800 bg-brand-900/60 px-2.5 py-1 text-[11px] font-semibold text-slate-200 transition-colors hover:bg-brand-800"
        >
          {copied ? <IconCheck className="h-3.5 w-3.5" /> : <IconCopy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-sm leading-relaxed">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-3">
            <span className="select-none text-brand-500">$</span>
            <span className="text-slate-100">{line}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}
