import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getDemoLinkProps } from "@/lib/site-urls";
import { cn } from "cn";

type DemoButtonProps = {
  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline" | "secondary" | "ghost";
  showIcon?: boolean;
  /** Pre-selects pricing tier in the demo form via ?assinantes= */
  assinantes?: string;
};

export function DemoButton({
  className,
  size = "lg",
  variant = "default",
  showIcon = true,
  assinantes,
}: DemoButtonProps) {
  const demoLink = getDemoLinkProps(assinantes);

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("demo-cta-motion", className)}
      nativeButton={false}
      render={
        <a
          {...demoLink}
          aria-label={
            demoLink.target === "_blank"
              ? "Agendar demonstração (abre em nova aba)"
              : "Agendar demonstração"
          }
        />
      }
    >
      Agendar demonstração
      {showIcon ? <ArrowRightIcon data-icon="inline-end" /> : null}
    </Button>
  );
}
