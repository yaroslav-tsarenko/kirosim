import Link from "next/link";

export function Breadcrumbs({ trail }: { trail: Array<{ name: string; path: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="readout">
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map((t, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={t.path} className="flex items-center gap-2">
              {last ? (
                <span className="text-ink" aria-current="page">{t.name}</span>
              ) : (
                <Link href={t.path} className="transition-colors hover:text-signal">{t.name}</Link>
              )}
              {!last ? <span aria-hidden className="text-hairline-strong">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
