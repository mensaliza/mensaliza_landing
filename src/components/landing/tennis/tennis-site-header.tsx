import Link from "next/link";

import { LoginLink } from "@/components/landing/login-link";
import { TennisSignupButton } from "@/components/landing/tennis/tennis-signup-button";
import { Logo } from "@/components/logo";

export function TennisSiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mr-auto rounded-sm text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-label="Mensaliza — início"
        >
          <Logo />
        </Link>
        <LoginLink
          location="tennis_header"
          variant="outline"
          size="lg"
          className="hidden shrink-0 px-3 sm:inline-flex"
        />
        <TennisSignupButton
          location="tennis_header"
          showIcon={false}
          className="h-9 px-3 sm:h-11 sm:px-4"
        />
      </div>
    </header>
  );
}
