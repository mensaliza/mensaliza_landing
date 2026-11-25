"use client";

import { DownloadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { captureEvent } from "@/lib/analytics";

type DownloadButtonProps = {
  /** File under /public, e.g. "/downloads/planilha.xlsx". */
  href: string;
  label: string;
  /** Short format hint shown next to the button, e.g. "Excel · 74 KB". */
  meta?: string;
};

export function DownloadButton({ href, label, meta }: DownloadButtonProps) {
  return (
    <div className="my-6 flex flex-wrap items-center gap-3">
      <Button
        size="lg"
        nativeButton={false}
        render={
          <a
            href={href}
            download
            onClick={() => captureEvent("blog_download_clicked", { file: href })}
          />
        }
      >
        <DownloadIcon data-icon="inline-start" />
        {label}
      </Button>
      {meta ? <span className="text-sm text-muted-foreground">{meta}</span> : null}
    </div>
  );
}
