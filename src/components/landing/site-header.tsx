"use client";

import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { DemoButton } from "@/components/landing/demo-button";
import { LoginLink } from "@/components/landing/login-link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/landing-content";
import { getDemoLinkProps } from "@/lib/site-urls";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  /** When true, header starts flush/transparent over the hero and becomes a floating cell on scroll. */
  blendWithHero?: boolean;
};

export function SiteHeader({ blendWithHero = false }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(blendWithHero);
  const demoLink = getDemoLinkProps();

  useEffect(() => {
    if (!blendWithHero) {
      setAtTop(false);
      return;
    }

    const sync = () => {
      setAtTop(window.scrollY < 8);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, [blendWithHero]);

  const transparent = blendWithHero && atTop;
  const floating = !transparent;

  return (
    <header
      data-at-top={transparent ? "true" : "false"}
      data-floating={floating ? "true" : "false"}
      className={cn(
        "site-header-shell sticky top-0 z-40 w-full",
        floating ? "px-4 pt-3 sm:px-6 sm:pt-3.5" : "px-0 pt-0"
      )}
    >
      <div
        className={cn(
          "site-header-bar relative mx-auto flex w-full items-center justify-between gap-3 sm:gap-4",
          floating
            ? "h-14 max-w-5xl rounded-2xl border border-border bg-background/95 px-3 backdrop-blur-sm sm:h-[3.75rem] sm:px-5"
            : "h-16 max-w-6xl border border-transparent bg-transparent px-4 sm:px-6 lg:px-8"
        )}
      >
        <a href="/" className="shrink-0 text-foreground" aria-label="Mensaliza — início">
          <Logo size={floating ? "sm" : "md"} />
        </a>

        <nav
          aria-label="Navegação principal"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 lg:flex xl:gap-7"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LoginLink className="hidden sm:inline-flex" />
          <DemoButton size="sm" showIcon={false} className="hidden sm:inline-flex" />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "size-11 lg:hidden",
                    transparent && "border-border/70 bg-background/70"
                  )}
                  aria-label="Abrir menu"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Menu mobile">
                {navLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <a
                        href={link.href}
                        className={cn(
                          "rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        )}
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2 border-t p-4">
                <LoginLink variant="outline" fullWidth />
                <SheetClose
                  render={
                    <Button
                      className="w-full"
                      nativeButton={false}
                      render={
                        <a
                          {...demoLink}
                          aria-label={
                            demoLink.target === "_blank"
                              ? "Agendar demonstração (abre em nova aba)"
                              : "Agendar demonstração"
                          }
                        />
                      }
                    />
                  }
                >
                  Agendar demonstração
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
