"use client";

import { MenuIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { LoginLink } from "@/components/landing/login-link";
import { SignupButton, type SignupButtonProps } from "@/components/landing/signup-button";
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
import {
  sectionFromHref,
  trackLandingCta,
  trackLandingNavClicked,
  type LandingAudience,
  type LandingCtaLocation,
} from "@/lib/landing-analytics";
import { getSignupLinkProps, type SignupSearchParams } from "@/lib/site-urls";
import { cn } from "cn";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

const headerLinkClassName =
  "rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

export type HeaderNavLink = { label: string; href: string };

/** Signup target and tracking for the header CTAs. Home uses the defaults. */
export type HeaderSignup = Pick<
  SignupButtonProps,
  "plan" | "billingInterval" | "audience" | "campaignRef"
> & {
  label?: string;
  location?: LandingCtaLocation;
  mobileLocation?: LandingCtaLocation;
};

type SiteHeaderProps = {
  /** When true, header starts flush/transparent over the hero and becomes a floating cell on scroll. */
  blendWithHero?: boolean;
  links?: readonly HeaderNavLink[];
  signup?: HeaderSignup;
  audience?: LandingAudience;
};

function MobileHeaderSignupLink({
  searchParams,
  signup,
}: {
  searchParams: SignupSearchParams | null;
  signup: HeaderSignup;
}) {
  const label = signup.label ?? "Começar";
  return (
    <SheetClose
      render={
        <Button
          className="min-h-11 w-full"
          nativeButton={false}
          render={
            <a
              {...getSignupLinkProps({
                searchParams,
                plan: signup.plan,
                interval: signup.billingInterval,
                campaignRef: signup.campaignRef,
              })}
              aria-label={label}
              onClick={() =>
                trackLandingCta({
                  cta: "signup",
                  location: signup.mobileLocation ?? "header_mobile",
                  plan: signup.plan,
                  billing_interval: signup.billingInterval,
                  audience: signup.audience,
                })
              }
            />
          }
        />
      }
    >
      {label}
    </SheetClose>
  );
}

function MobileHeaderSignupLinkWithParams({ signup }: { signup: HeaderSignup }) {
  const searchParams = useSearchParams();
  return <MobileHeaderSignupLink searchParams={searchParams} signup={signup} />;
}

export function SiteHeader({
  blendWithHero = false,
  links = navLinks,
  signup = {},
  audience,
}: SiteHeaderProps) {
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
          "site-header-bar relative mx-auto flex w-full max-w-5xl items-center justify-between gap-3 rounded-2xl border px-3 sm:px-5 py-2 md:py-3",
          floating
            ? "border-border bg-background/95 backdrop-blur-sm"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="flex flex-1 items-center md:items-end justify-between gap-12">
          <Link
            href="/"
            className="flex-none rounded-sm text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-label="Mensaliza — início"
          >
            <Logo size={isMobile ? "md" : "md"} />
          </Link>

          <nav
            aria-label="Navegação principal"
            className="hidden mt-1 items-end gap-4 lg:flex xl:gap-5"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={headerLinkClassName}
                onClick={() =>
                  trackLandingNavClicked({
                    target_section: sectionFromHref(link.href),
                    source: "header",
                    audience,
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
              location={signup.location ?? "header"}
            />
            <SignupButton
              size="sm"
              showIcon={false}
              label={signup.label ?? "Começar"}
              className="hidden min-h-8 px-3 sm:inline-flex"
              location={signup.location ?? "header"}
              plan={signup.plan}
              billingInterval={signup.billingInterval}
              audience={signup.audience}
              campaignRef={signup.campaignRef}
            />

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    className={cn(
                      "size-9 lg:hidden",
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
                  {links.map((link) => (
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
                              target_section: sectionFromHref(link.href),
                              source: "header_mobile",
                              audience,
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
                    location={signup.mobileLocation ?? "header_mobile"}
                  />
                  <Suspense
                    fallback={<MobileHeaderSignupLink searchParams={null} signup={signup} />}
                  >
                    <MobileHeaderSignupLinkWithParams signup={signup} />
                  </Suspense>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
