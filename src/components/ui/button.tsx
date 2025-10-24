"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 " +
    "relative overflow-hidden group select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 active:scale-[0.98] " +
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-b from-gold/95 to-gold text-white shadow-sm",
          "hover:from-gold hover:to-gold/90 hover:shadow-md hover:-translate-y-[1px]",
          "focus-visible:ring-offset-2 focus-visible:ring-gold/40",
        ].join(" "),
        outline: [
          "border border-gold/60 text-charcoal bg-transparent",
          "hover:bg-gold/10 hover:text-charcoal hover:shadow-sm",
        ].join(" "),
        ghost: [
          "text-charcoal hover:bg-gold/10",
          "hover:text-charcoal/90 transition",
        ].join(" "),
        link: "text-gold underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-6 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Omit native drag + animation DOM event props to avoid name conflicts with Framer Motion
type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragLeave"
  | "onDragOver"
  | "onDrop"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onTransitionEnd"
>;

export interface ButtonProps
  extends NativeButtonProps,
    VariantProps<typeof buttonVariants> {
  /**
   * Render the button as the child element using Radix Slot.
   * Example: <Button asChild><a href="/contact">Contact</a></Button>
   */
  asChild?: boolean;
}

/* Framer Motion variants (typed & with literal "spring") */
const motionVariants = {
  rest: { y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" },
  hover: {
    y: -2,
    boxShadow: "0 4px 20px rgba(201,162,93,0.35)",
    transition: { type: "spring" as const, stiffness: 300, damping: 18 },
  },
  tap: {
    scale: 0.97,
    boxShadow: "0 2px 8px rgba(201,162,93,0.25)",
    transition: { type: "spring" as const, stiffness: 400, damping: 22 },
  },
} satisfies Variants;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className);
    const [hovered, setHovered] = React.useState(false);
    const [pulseKey, setPulseKey] = React.useState(0);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setPulseKey((k) => k + 1); // trigger pulse ripple
      onClick?.(e);
    };

    // Enhance only when rendering a real <button> (not Slot)
    if (!asChild) {
      return (
        <motion.button
          ref={ref}
          data-slot="button"
          className={cn("relative group overflow-hidden", classes)}
          variants={motionVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onClick={handleClick}
          {...props}
        >
          {/* Label */}
          <span className="relative z-10">{props.children}</span>

          {/* Single shimmer sweep per hover */}
          <motion.span
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0, x: "-100%" }}
            animate={
              hovered
                ? { opacity: [0, 1, 0], x: ["-100%", "100%"] }
                : { opacity: 0, x: "-100%" }
            }
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              background:
                "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
            }}
          />

          {/* Pulse ripple (on click) */}
          <AnimatePresence>
            <motion.span
              key={pulseKey}
              className="absolute inset-0 rounded-lg"
              initial={{ opacity: 0.4, scale: 0.9 }}
              animate={{ opacity: 0, scale: 1.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                background:
                  "radial-gradient(circle at center, rgba(201,162,93,0.35) 0%, transparent 70%)",
              }}
            />
          </AnimatePresence>
        </motion.button>
      );
    }

    // Fallback for asChild (e.g., renders <a> via Slot)
    const Comp = Slot as unknown as "button";
    return (
      <Comp ref={ref} data-slot="button" className={classes} {...props}>
        <span className="relative z-10">{props.children}</span>
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </Comp>
    );
  }
);
Button.displayName = "Button";
