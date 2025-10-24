"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";

type NavItem = { label: string; href: string };

interface Props {
  brandName?: string;
  nav?: NavItem[];
}

export default function TopbarClient({ brandName, nav = [] }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close mobile on route change
  useEffect(() => setOpen(false), [pathname]);

  // Close on Escape + lock body scroll when open
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Animated hamburger (to X)
  const Hamburger = ({ isOpen }: { isOpen: boolean }) => (
    <button
      className="md:hidden relative inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300/80 bg-white text-charcoal shadow-sm transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
      onClick={() => setOpen((v) => !v)}
      aria-expanded={isOpen}
      aria-controls="mobile-nav"
      aria-label="Toggle navigation"
    >
      <span className="sr-only">Menu</span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="overflow-visible"
      >
        <motion.path
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={{
            closed: { d: "M 3 6 L 21 6" },
            open: { d: "M 5 5 L 19 19" },
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.path
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={{
            closed: { d: "M 3 12 L 21 12", opacity: 1 },
            open: { d: "M 12 12 L 12 12", opacity: 0 },
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.path
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={{
            closed: { d: "M 3 18 L 21 18" },
            open: { d: "M 5 19 L 19 5" },
          }}
          transition={{ duration: 0.2 }}
        />
      </svg>
    </button>
  );

  return (
    <>
      {/* Solid white header, fixed height (no grey ever) */}
      <header className="sticky top-0 z-50 h-20 border-b border-black/5 bg-white shadow-sm">
        <Container className="flex h-full items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="group inline-flex items-center gap-3"
            aria-label="Go to homepage"
          >
            <span className="font-serif text-lg tracking-wide text-charcoal transition-colors group-hover:text-charcoal/80">
              {brandName}
            </span>
            <span className="relative hidden h-1 w-6 rounded bg-gold/0 transition-all duration-300 group-hover:bg-gold/70 sm:inline-block" />
            <span className="sr-only">Home</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {nav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative text-sm tracking-wide text-charcoal/80 transition-colors hover:text-charcoal"
                  aria-current={active ? "page" : undefined}
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 origin-left rounded-full transition-all duration-300 ${
                      active
                        ? "w-full bg-gold"
                        : "w-0 bg-gold group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="rounded-xl bg-gold px-4 py-2 text-white text-sm font-medium shadow-sm transition hover:shadow-md hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
            >
              Register Interest
            </Link>
          </nav>

          {/* Mobile toggle */}
          <Hamburger isOpen={open} />
        </Container>
      </header>

      {/* Mobile overlay (keeps header above it) */}
      <motion.div
        aria-hidden={!open}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
        style={{ pointerEvents: open ? "auto" : "none" }}
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => setOpen(false)}
      />

      {/* Mobile drawer positioned directly UNDER the header */}
      <motion.nav
        id="mobile-nav"
        className="md:hidden fixed left-0 right-0 z-50 top-20 rounded-b-2xl bg-white shadow-card"
        initial={false}
        animate={{
          y: open ? 0 : -24,
          opacity: open ? 1 : 0,
          scale: open ? 1 : 0.98,
          pointerEvents: open ? "auto" : "none",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.6 }}
      >
        <Container className="py-4">
          <div className="flex flex-col gap-1">
            {nav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-3 text-base transition ${
                    active
                      ? "bg-slate-100 text-charcoal"
                      : "text-charcoal/80 hover:bg-slate-50 hover:text-charcoal"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-2 rounded-xl bg-gold px-4 py-3 text-white text-sm font-medium shadow-sm"
            >
              Register Interest
            </Link>
          </div>
          <div className="pb-2 md:pb-0" />
        </Container>
      </motion.nav>
    </>
  );
}
