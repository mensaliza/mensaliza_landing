import { audienceLine, audienceProfessions } from "@/lib/landing-content";

/**
 * Who it is for, as a slow strip of professions the visitor can spot theirs in.
 * The list is drawn twice so the loop is seamless; screen readers get the sentence instead.
 * With reduced motion the strip stops and wraps into rows.
 */
export function ProfessionsMarquee() {
  const chips = audienceProfessions.map((profession) => (
    <li
      key={profession}
      className="flex h-11 shrink-0 items-center rounded-full bg-muted px-5 text-[15px] font-medium whitespace-nowrap text-foreground/80"
    >
      {profession}
    </li>
  ));

  return (
    <div className="professions-marquee -mx-4 sm:-mx-6 lg:mx-0">
      <p className="sr-only">{audienceLine}</p>
      <div aria-hidden className="professions-marquee-track">
        <ul className="flex list-none gap-2.5 p-0 pr-2.5">{chips}</ul>
        <ul className="professions-marquee-copy flex list-none gap-2.5 p-0 pr-2.5">{chips}</ul>
      </div>
    </div>
  );
}
