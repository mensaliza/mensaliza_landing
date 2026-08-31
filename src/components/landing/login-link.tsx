import { Button } from "@/components/ui/button";
import { getLoginLinkProps } from "@/lib/site-urls";
import { cn } from "@/lib/utils";

type LoginLinkProps = {
  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline" | "secondary" | "ghost";
  fullWidth?: boolean;
};

export function LoginLink({
  className,
  size = "sm",
  variant = "ghost",
  fullWidth = false,
}: LoginLinkProps) {
  const loginLink = getLoginLinkProps();

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(fullWidth && "w-full", className)}
      nativeButton={false}
      render={<a {...loginLink} />}
    >
      Entrar
    </Button>
  );
}
