import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getSignupLinkProps } from "@/lib/site-urls";
import { cn } from "@/lib/utils";

type SignupButtonProps = {
  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline" | "secondary" | "ghost";
  showIcon?: boolean;
  label?: string;
};

export function SignupButton({
  className,
  size = "lg",
  variant = "default",
  showIcon = true,
  label = "Começar agora",
}: SignupButtonProps) {
  const signupLink = getSignupLinkProps();

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("demo-cta-motion", className)}
      nativeButton={false}
      render={
        <a
          {...signupLink}
          aria-label={
            signupLink.target === "_blank"
              ? `${label} (abre em nova aba)`
              : label
          }
        />
      }
    >
      {label}
      {showIcon ? <ArrowRightIcon data-icon="inline-end" /> : null}
    </Button>
  );
}
