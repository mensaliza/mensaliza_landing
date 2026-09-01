import Link from "next/link";

type LegalPageShellProps = {
  title: string;
  breadcrumbLabel: string;
  children: React.ReactNode;
};

export function LegalPageShell({
  title,
  breadcrumbLabel,
  children,
}: LegalPageShellProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link
              href="/"
              className="font-medium text-primary transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Início
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {breadcrumbLabel}
          </li>
        </ol>
      </nav>
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h1>
        <p className="text-sm text-foreground/72">
          Última atualização: julho de 2026
        </p>
      </header>
      <div className="flex flex-col gap-6 text-base leading-relaxed text-foreground/72 [&_a]:font-medium [&_a]:text-primary hover:[&_a]:text-foreground [&_a]:underline-offset-4 hover:[&_a]:underline [&_h2]:mt-2 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-[-0.01em] [&_h2]:text-foreground [&_h2]:text-balance [&_li]:text-pretty [&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-2 [&_ol]:pl-5 [&_p]:text-pretty [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5">
        {children}
      </div>
    </div>
  );
}
