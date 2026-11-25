"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { captureEvent } from "@/lib/analytics";

type MessageTemplateProps = {
  /** Short label shown above the bubble, e.g. "3 dias antes do vencimento". */
  label: string;
  children: React.ReactNode;
};

/**
 * Copyable message model rendered as a chat bubble. Text stays in the HTML
 * (good for SEO and for readers who select it by hand).
 */
export function MessageTemplate({ label, children }: MessageTemplateProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = bodyRef.current?.innerText.trim();
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      captureEvent("blog_template_copied", { label });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (permissions, insecure context); text is still selectable.
    }
  }

  return (
    <figure className="my-6 flex flex-col gap-2 rounded-xl border border-border bg-muted/60 p-4 sm:p-5">
      <figcaption className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-foreground/72">{label}</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCopy}
          aria-label={copied ? "Mensagem copiada" : `Copiar mensagem: ${label}`}
          className="min-h-8"
        >
          {copied ? <CheckIcon data-icon="inline-start" /> : <CopyIcon data-icon="inline-start" />}
          {copied ? "Copiada" : "Copiar"}
        </Button>
      </figcaption>
      <div
        ref={bodyRef}
        className="max-w-[60ch] self-start rounded-xl rounded-tl-sm border border-border bg-card px-4 py-3 text-[0.95rem] leading-relaxed text-foreground [&_p]:mt-0 [&_p+p]:mt-3"
      >
        {children}
      </div>
    </figure>
  );
}
