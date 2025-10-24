"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type DivRef = React.ElementRef<"div">;
type DivProps = React.ComponentPropsWithoutRef<"div">;

/* -------------------------------- <Card> -------------------------------- */
export const Card = React.forwardRef<DivRef, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

/* ------------------------------ <CardHeader> ----------------------------- */
export const CardHeader = React.forwardRef<DivRef, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

/* ------------------------------- <CardTitle> ----------------------------- */
export const CardTitle = React.forwardRef<DivRef, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-title"
      className={cn("font-semibold leading-none", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

/* --------------------------- <CardDescription> --------------------------- */
export const CardDescription = React.forwardRef<DivRef, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

/* ------------------------------- <CardAction> ---------------------------- */
export const CardAction = React.forwardRef<DivRef, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
);
CardAction.displayName = "CardAction";

/* ------------------------------ <CardContent> ---------------------------- */
export const CardContent = React.forwardRef<DivRef, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

/* ------------------------------- <CardFooter> ---------------------------- */
export const CardFooter = React.forwardRef<DivRef, DivProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";
