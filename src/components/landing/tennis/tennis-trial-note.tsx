import { CheckIcon } from "lucide-react";

import { tennisTrialFacts } from "@/lib/tennis-landing-content";
import { cn } from "cn";

type TennisTrialNoteProps = {
  className?: string;
  id?: string;
};

export function TennisTrialNote({ className, id }: TennisTrialNoteProps) {
  return (
    <ul id={id} className={cn("flex max-w-xl flex-col gap-1.5", className)}>
      {tennisTrialFacts.map((fact) => (
        <li
          key={fact}
          className="flex items-start gap-2 text-left text-sm leading-snug text-foreground/80 text-pretty"
        >
          <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
          <span>{fact}</span>
        </li>
      ))}
    </ul>
  );
}
