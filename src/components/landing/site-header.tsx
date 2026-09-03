"use client";

import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { LoginLink } from "@/components/landing/login-link";
import { SignupButton } from "@/components/landing/signup-button";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/landing-content";
import { trackLandingCta, trackLandingNavClicked } from "@/lib/landing-analytics";
import { getSignupLinkProps } from "@/lib/site-urls";
import { cn } from "cn";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

const headerLinkClassName =
  "rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

type SiteHeaderProps = {
  /** When true, header starts flush/transparent over the hero and becomes a floating cell on scroll. */
  blendWithHero?: boolean;
};

export function SiteHeader({ blendWithHero = false }: SiteHeaderProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(blendWithHero);

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
        "z-40 w-full px-4 pt-3 sm:px-6 sm:pt-3.5",
        blendWithHero ? "fixed top-0" : "sticky top-0"
      )}
    >
      <div
        className={cn(
          "site-header-bar relative mx-auto flex w-full max-w-5xl items-center justify-between gap-3 rounded-2xl border px-3 sm:px-5 py-3",
          floating
            ? "border-border bg-background/95 backdrop-blur-sm"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="flex flex-1 items-end justify-between gap-12">
          <Link
            href="/"
            className="flex-none rounded-sm text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-label="Mensaliza — início"
          >
            <Logo size={isMobile ? "lg" : "md"} />
          </Link>

          <nav
            aria-label="Navegação principal"
            className="hidden mt-1 items-end gap-4 lg:flex xl:gap-5"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={headerLinkClassName}
                onClick={() =>
                  trackLandingNavClicked({
                    target_section: link.href.replace("/#", ""),
                    source: "header",
                  })
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-none items-center gap-2 sm:gap-3">
            <LoginLink
              variant="secondary"
              className="hidden min-h-8 px-3 sm:inline-flex"
              location="header"
            />
            <SignupButton
              size="sm"
              showIcon={false}
              label="Começar"
              className="hidden min-h-8 px-3 sm:inline-flex"
              location="header"
            />

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    className={cn(
                      "min-h-11 min-w-11 lg:hidden",
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
                  <SheetDescription className="sr-only">
                    Navegação do site Mensaliza
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4" aria-label="Menu mobile">
                  {navLinks.map((link) => (
                    <SheetClose
                      key={link.href}
                      render={
                        <a
                          href={link.href}
                          className={cn(
                            "min-h-11 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                          )}
                          onClick={() =>
                            trackLandingNavClicked({
                              target_section: link.href.replace("/#", ""),
                              source: "header_mobile",
                            })
                          }
                        />
                      }
                    >
                      {link.label}
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-2 border-t p-4">
                  <LoginLink
                    variant="secondary"
                    fullWidth
                    className="min-h-11"
                    location="header_mobile"
                  />
                  <SheetClose
                    render={
                      <Button
                        className="min-h-11 w-full"
                        nativeButton={false}
                        render={
                          <a
                            {...getSignupLinkProps()}
                            aria-label="Começar"
                            onClick={() =>
                              trackLandingCta({
                                cta: "signup",
                                location: "header_mobile",
                              })
                            }
                          />
                        }
                      />
                    }
                  >
                    Começar
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
