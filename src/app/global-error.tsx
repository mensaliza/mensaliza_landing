"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { captureClientException } from "@/lib/analytics";

import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureClientException(error, {
      digest: error.digest,
      source: "global_error_boundary",
    });
  }, [error]);

  return (
    <html lang="pt-BR">
      <body className="bg-background text-foreground antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold tracking-tight">
              Algo deu errado
            </h1>
            <p className="text-sm text-foreground/72">
              Não foi possível carregar o Mensaliza. Tente novamente.
            </p>
          </div>
          <Button type="button" className="min-h-11" onClick={reset}>
            Tentar novamente
          </Button>
        </div>
      </body>
    </html>
  );
}
