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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/landing-content";
import { trackLandingCta, trackLandingNavClicked } from "@/lib/landing-analytics";
import { getSignupLinkProps } from "@/lib/site-urls";
import { cn } from "@/lib/utils";
import Link from "next/link";

type SiteHeaderProps = {
  /** When true, header starts flush/transparent over the hero and becomes a floating cell on scroll. */
  blendWithHero?: boolean;
};

export function SiteHeader({ blendWithHero = false }: SiteHeaderProps) {
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
        "site-header-shell sticky top-0 z-40 w-full",
        floating ? "px-4 pt-3 sm:px-6 sm:pt-3.5" : "px-0 pt-0"
      )}
    >
      <div
        className={cn(
          "site-header-bar relative mx-auto flex w-full items-center justify-between gap-3 sm:gap-4",
          floating
            ? "h-14 max-w-5xl rounded-2xl border border-border bg-background/95 px-3 backdrop-blur-sm sm:h-15 sm:px-5"
            : "h-16 max-w-6xl border border-transparent bg-transparent px-4 sm:px-6 lg:px-8"
        )}
      >
        <div className="flex items-center gap-4">
          <Link href="/" className="flex-none text-foreground" aria-label="Mensaliza — início">
            <Logo size="sm" />
          </Link>

          <nav
            aria-label="Navegação principal"
            className="hidden lg:flex items-end gap-4 xl:gap-5 mt-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
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
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LoginLink variant="secondary" className="hidden sm:inline-flex" location="header" />
          <SignupButton
            size="sm"
            showIcon={false}
            label="Começar grátis"
            className="hidden sm:inline-flex"
            location="header"
          />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className={cn(
                    "lg:hidden",
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
                <LoginLink variant="secondary" fullWidth location="header_mobile" />
                <SheetClose
                  render={
                    <Button
                      className="w-full"
                      nativeButton={false}
                      render={
                        <a
                          {...getSignupLinkProps()}
                          aria-label="Começar grátis"
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
                  Começar grátis
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
