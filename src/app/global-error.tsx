"use client";

import { useEffect } from "react";

import { captureClientException } from "@/lib/analytics";

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
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold tracking-tight">
              Algo deu errado
            </h1>
            <p className="text-sm text-neutral-500">
              Não foi possível carregar o Mensaliza. Tente novamente.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white"
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  );
}
