import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export function Container({
  as: Component = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        // fallback to 80rem if variable not set
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        "max-w-[var(--container-max,80rem)]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}