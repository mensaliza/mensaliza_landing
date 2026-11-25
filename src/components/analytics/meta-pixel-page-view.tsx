"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * No App Router a navegação não recarrega a página, então o PageView do
 * script inicial só dispara uma vez. Este componente dispara um PageView a
 * cada troca de rota (ignorando a primeira, já coberta pelo script).
 */
export function MetaPixelPageView() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}
