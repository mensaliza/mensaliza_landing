"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";

import { LoginLink } from "@/components/landing/login-link";
import { SignupButton } from "@/components/landing/signup-button";
import { WhatsAppIcon } from "@/components/landing/whatsapp-floating-button";
import { Logo } from "@/components/logo";
import { headerNavLinks } from "@/lib/landing-content";
import { trackLandingCta, trackLandingNavClicked } from "@/lib/landing-analytics";
import {
  getLoginLinkProps,
  getWhatsAppHref,
  SUPPORT_WHATSAPP_DISPLAY,
} from "@/lib/site-urls";
import { cn } from "cn";

const SIGNUP_LABEL = "Começar grátis";

const SECTION_LINKS = headerNavLinks.filter((link) => link.href.startsWith("/#"));

type HeaderHref = (typeof headerNavLinks)[number]["href"];

type SiteHeaderProps = {
  /** When true, header starts flush/transparent over the hero and becomes a floating bar on scroll. */
  blendWithHero?: boolean;
};

/** The section whose box crosses a line at 35% of the viewport height. */
function getActiveSectionHref(): HeaderHref | null {
  const probe = window.innerHeight * 0.35;
  let current: HeaderHref | null = null;

  for (const link of SECTION_LINKS) {
    const section = document.getElementById(link.href.slice(2));
    if (!section) continue;
    const rect = section.getBoundingClientRect();
    if (rect.top <= probe && rect.bottom > probe) current = link.href;
  }

  return current;
}

function toAnalyticsTarget(href: string) {
  return href.replace(/^\/#?/, "");
}

export function SiteHeader({ blendWithHero = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const menuId = useId();

  const [atTop, setAtTop] = useState(blendWithHero);
  const [sectionHref, setSectionHref] = useState<HeaderHref | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const [indicator, setIndicator] = useState({ x: 0, visible: false, instant: true });

  const activeHref: HeaderHref | null = pathname.startsWith("/blog")
    ? "/blog"
    : isHome
      ? sectionHref
      : null;

  /* Scroll state: blend over the hero + scrollspy for in-page sections. */
  useEffect(() => {
    let frame = 0;

    const sync = () => {
      frame = 0;
      setAtTop(blendWithHero && window.scrollY < 8);
      setSectionHref(isHome ? getActiveSectionHref() : null);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [blendWithHero, isHome]);

  /* Active-section capsule: slides between links, fades when nothing is active. */
  const measureIndicator = useCallback(() => {
    const nav = navRef.current;
    const link = activeHref ? linkRefs.current.get(activeHref) : undefined;

    setIndicator((prev) => {
      // offsetWidth is 0 while the desktop nav is display:none (below lg).
      if (!nav || !link || link.offsetWidth === 0) return { ...prev, visible: false };
      const x = link.offsetLeft + link.offsetWidth / 2;
      // Jump into place when appearing, slide when moving between links.
      return { x, visible: true, instant: !prev.visible };
    });
  }, [activeHref]);

  useLayoutEffect(() => {
    measureIndicator();
  }, [measureIndicator]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    // Nav width changes (font load, breakpoint switch from display:none).
    const observer = new ResizeObserver(() => measureIndicator());
    observer.observe(nav);
    window.addEventListener("resize", measureIndicator);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureIndicator);
    };
  }, [measureIndicator]);

  /* Mobile menu: scroll lock, Escape, and auto-close at desktop width. */
  const closeMenu = useCallback(() => {
    // Unlock synchronously so in-page hash navigation can scroll right away.
    document.documentElement.style.overflow = "";
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        triggerRef.current?.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 64rem)");
    const onBreakpoint = () => {
      if (desktop.matches) closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [menuOpen, closeMenu]);

  const transparent = atTop && !menuOpen;
  const loginLink = getLoginLinkProps();

  return (
    <header
      data-at-top={transparent ? "true" : "false"}
      data-floating={transparent ? "false" : "true"}
      className={cn(
        "top-0 w-full px-4 pt-3 sm:px-6",
        blendWithHero ? "fixed" : "sticky",
        menuOpen ? "z-50" : "z-40"
      )}
    >
      <div
        className={cn(
          "site-header-bar relative mx-auto grid w-full grid-cols-[1fr_auto] items-center gap-4 rounded-2xl border lg:grid-cols-[1fr_auto_1fr]",
          transparent
            ? "max-w-6xl border-transparent bg-transparent py-3 pr-0 pl-0"
            : "site-header-bar--floating max-w-5xl border-border/70 bg-background/85 py-2 pr-2 pl-4 backdrop-blur-md sm:pl-5"
        )}
      >
        <Link
          href="/"
          className="justify-self-start rounded-md text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-label="Mensaliza — início"
          onClick={closeMenu}
        >
          <Logo size="md" />
        </Link>

        <nav
          ref={navRef}
          aria-label="Navegação principal"
          className="relative hidden items-center gap-1 lg:flex"
        >
          {headerNavLinks.map((link) => {
            const active = link.href === activeHref;
            return (
              <Link
                key={link.href}
                ref={(node) => {
                  if (node) linkRefs.current.set(link.href, node);
                  else linkRefs.current.delete(link.href);
                }}
                href={link.href}
                aria-current={active ? (link.href === "/blog" ? "page" : "location") : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() =>
                  trackLandingNavClicked({
                    target_section: toAnalyticsTarget(link.href),
                    source: "header",
                  })
                }
              >
                {link.label}
              </Link>
            );
          })}
          <span
            aria-hidden
            data-instant={indicator.instant ? "true" : "false"}
            className="site-header-indicator pointer-events-none absolute bottom-0 left-0 h-[3px] w-4 rounded-full bg-primary"
            style={{
              transform: `translate3d(${indicator.x - 8}px, 0, 0) scaleX(${indicator.visible ? 1 : 0.4})`,
              opacity: indicator.visible ? 1 : 0,
            }}
          />
        </nav>

        <div className="flex items-center gap-1 justify-self-end sm:gap-2">
          <LoginLink
            variant="ghost"
            className="hidden h-9 min-h-9 px-3 text-sm text-muted-foreground hover:bg-transparent hover:text-foreground sm:inline-flex"
            location="header"
          />
          <SignupButton
            size="default"
            showIcon={false}
            label={SIGNUP_LABEL}
            className="hidden h-9 min-h-9 px-4 sm:inline-flex"
            location="header"
          />

          <button
            ref={triggerRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            className="grid size-11 place-items-center rounded-xl text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 lg:hidden"
          >
            <span aria-hidden className="relative block h-4 w-5">
              <span
                className="site-header-burger-line absolute top-1/2 left-0 -mt-px h-0.5 w-5 rounded-full bg-current"
                style={{ transform: menuOpen ? "rotate(45deg)" : "translate3d(0, -4px, 0)" }}
              />
              <span
                className="site-header-burger-line absolute top-1/2 left-0 -mt-px h-0.5 w-5 rounded-full bg-current"
                style={{ transform: menuOpen ? "rotate(-45deg)" : "translate3d(0, 4px, 0)" }}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id={menuId}
        inert={!menuOpen}
        data-open={menuOpen ? "true" : "false"}
        className="site-header-menu fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-background px-4 pt-24 sm:px-6 lg:hidden"
      >
        <nav aria-label="Menu mobile" className="mx-auto w-full max-w-5xl">
          <ul className="flex flex-col">
            {headerNavLinks.map((link) => {
              const active = link.href === activeHref;
              return (
                <li key={link.href} className="border-b border-border/70">
                  {/* Plain anchor: native hash scrolling runs after the scroll lock is released. */}
                  <a
                    href={link.href}
                    aria-current={active ? (link.href === "/blog" ? "page" : "location") : undefined}
                    className="flex min-h-16 items-center gap-3 rounded-md font-heading text-2xl font-medium tracking-[-0.01em] text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    onClick={() => {
                      trackLandingNavClicked({
                        target_section: toAnalyticsTarget(link.href),
                        source: "header_mobile",
                      });
                      closeMenu();
                    }}
                  >
                    {link.label}
                    {active ? (
                      <span aria-hidden className="h-[3px] w-4 rounded-full bg-primary" />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mx-auto mt-auto flex w-full max-w-5xl flex-col gap-4 pt-10 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div onClickCapture={closeMenu}>
            <SignupButton
              label={SIGNUP_LABEL}
              className="w-full text-base"
              location="header_mobile"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <a
              {...loginLink}
              className="rounded-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              onClick={() => {
                trackLandingCta({ cta: "login", location: "header_mobile" });
                closeMenu();
              }}
            >
              Entrar
            </a>
          </p>
          <a
            href={getWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-border/70 px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <WhatsAppIcon className="size-4 text-success" />
            Dúvidas? Fale com a gente no WhatsApp
            <span className="sr-only">({SUPPORT_WHATSAPP_DISPLAY}, abre em nova aba)</span>
          </a>
        </div>
      </div>
    </header>
  );
}
