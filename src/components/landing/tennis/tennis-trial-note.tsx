import { tennisTrialConditions } from "@/lib/tennis-landing-content";
import { cn } from "cn";

type TennisTrialNoteProps = {
  className?: string;
  id?: string;
};

export function TennisTrialNote({ className, id }: TennisTrialNoteProps) {
  return (
    <p
      id={id}
      className={cn(
        "max-w-xl text-sm leading-relaxed text-foreground/80 text-pretty",
        className
      )}
    >
      {tennisTrialConditions}
    </p>
  );
}
