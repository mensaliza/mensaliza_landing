import Link from "next/link";

type Crumb = { name: string; path?: string };

const linkClassName =
  "font-medium text-primary transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

export function BlogBreadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={item.name} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.path ? (
              <Link href={item.path} className={linkClassName}>
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="line-clamp-1 text-foreground">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
