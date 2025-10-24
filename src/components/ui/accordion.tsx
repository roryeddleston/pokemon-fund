"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Re-export the Root as Accordion (keeps Radix behavior and types)
export const Accordion = AccordionPrimitive.Root;

// Types pulled from the underlying Radix components
type AccordionItemRef = React.ElementRef<typeof AccordionPrimitive.Item>;
type AccordionItemProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>;

type AccordionTriggerRef = React.ElementRef<typeof AccordionPrimitive.Trigger>;
type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>;

type AccordionContentRef = React.ElementRef<typeof AccordionPrimitive.Content>;
type AccordionContentProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>;

export const AccordionItem = React.forwardRef<AccordionItemRef, AccordionItemProps>(
  ({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
      ref={ref}
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  )
);
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef<AccordionTriggerRef, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium outline-none transition-all hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
);
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<AccordionContentRef, AccordionContentProps>(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
);
AccordionContent.displayName = "AccordionContent";