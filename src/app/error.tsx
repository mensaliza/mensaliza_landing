"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { captureClientException } from "@/lib/analytics";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureClientException(error, {
      digest: error.digest,
      source: "error_boundary",
    });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">
          Algo deu errado
        </h1>
        <p className="text-sm text-muted-foreground">
          Não foi possível carregar esta página. Tente novamente.
        </p>
      </div>
      <Button type="button" onClick={reset}>
        Tentar novamente
      </Button>
    </div>
  );
}
