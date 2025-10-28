"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

export default function HomeHero() {
  return (
    <section className="relative overflow-visible">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_20%_0%,rgba(201,162,93,0.10),transparent_60%)]" />
      <Container>
        <div className="grid items-start gap-10 py-6 md:grid-cols-2 md:py-8 lg:py-10">
          {/* LEFT — copy (unchanged) */}
          <header className="order-2 md:order-1">
            <p className="text-xs uppercase tracking-[0.18em] text-charcoal/60">
              Pokémon Fund
            </p>

            <h1 className="relative mt-3 font-serif text-4xl leading-tight md:text-6xl">
              Vault-secured, data-led,{" "}
              <span className="relative inline-block">
                PSA-graded
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full rounded bg-gold"
                />
              </span>
              .
            </h1>

            <p className="mt-4 max-w-xl text-base text-charcoal/80">
              A closed-end strategy targeting mispriced scarcity across vintage
              and modern PSA-graded Pokémon cards, vaulted in London with full
              insurance and a five-year horizon.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="group relative">
                <Button className="relative group">
                  Request the Deck
                  <span className="btn-sheen" />
                </Button>
              </Link>
              <Link
                href="/thesis"
                className="inline-flex items-center text-sm font-medium text-charcoal/80 hover:text-charcoal"
              >
                Read the Thesis →
              </Link>
            </div>

            <p className="mt-4 text-[11px] text-charcoal/60">
              Professional investors only. Not an offer or solicitation. Past
              performance is not indicative of future results.
            </p>
          </header>

          {/* RIGHT — crisp fan, no border, no blur, subtle entrance */}
          <div className="order-1 md:order-2">
            <FanNoBlur />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -----------------------------------------
   Responsive spread so the fan never clips
------------------------------------------ */
function useResponsiveSpread() {
  const [spread, setSpread] = useState(120);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w >= 1280) setSpread(156);
      else if (w >= 1024) setSpread(140);
      else if (w >= 640) setSpread(120);
      else setSpread(100);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return spread;
}

/* -----------------------------------------
   Fan with Charizard center (no image scaling)
   - Slightly taller aspect ratio for the frame
   - Outer cards at ±5°
   - Entrance: integer-pixel slide + fade (once)
------------------------------------------ */
function FanNoBlur() {
  const prefersReduce = useReducedMotion();
  const spreadPx = useResponsiveSpread();

  const rowTopPx = 18; // one row
  const angle = 15; // very slight tilt keeps sharpness

  // Slightly taller than 490/800 → a touch more height
  const AR = "aspect-[480/800]";

  // Order: LEFT, CENTER (Charizard), RIGHT
  const LEFT = { src: "/jolteon.png", alt: "PSA slab — Jolteon" };
  const CENTER = { src: "/charizard.png", alt: "PSA slab — Charizard" };
  const RIGHT = { src: "/mario.png", alt: "PSA slab — Mario Pikachu" };

  return (
    <div
      className="
        relative mx-auto
        w-[240px] sm:w-[280px] md:w-[320px] lg:w-[340px]
        h-[340px] sm:h-[400px] md:h-[460px] lg:h-[520px]
      "
    >
      {/* subtle glow */}
      <div className="absolute -inset-12 -z-10 rounded-[36px] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(201,162,93,0.18),transparent_40%,rgba(61,111,180,0.16),transparent_70%,rgba(201,162,93,0.18))] blur-2xl" />

      {/* LEFT (Jolteon) */}
      <FanCard
        top={rowTopPx}
        ml={-spreadPx}
        z={0}
        rotate={-angle}
        img={LEFT}
        sizes="(min-width:1280px) 340px, (min-width:1024px) 300px, (min-width:640px) 260px, 220px"
        widthClasses={`w-[175px] sm:w-[200px] md:w-[225px] lg:w-[240px] ${AR}`}
        enter={{ x: -28, y: 0, delay: 0.0 }}
        prefersReduce={!!prefersReduce}
      />

      {/* CENTER (Charizard) */}
      <FanCard
        top={rowTopPx - 2}
        ml={0}
        z={10}
        rotate={0}
        img={CENTER}
        sizes="(min-width:1280px) 360px, (min-width:1024px) 320px, (min-width:640px) 280px, 240px"
        widthClasses={`w-[185px] sm:w-[210px] md:w-[240px] lg:w-[255px] ${AR}`}
        enter={{ x: 0, y: 28, delay: 0.12 }}
        prefersReduce={!!prefersReduce}
        priority
      />

      {/* RIGHT (Mario) */}
      <FanCard
        top={rowTopPx}
        ml={spreadPx}
        z={0}
        rotate={angle}
        img={RIGHT}
        sizes="(min-width:1280px) 340px, (min-width:1024px) 300px, (min-width:640px) 260px, 220px"
        widthClasses={`w-[175px] sm:w-[200px] md:w-[225px] lg:w-[240px] ${AR}`}
        enter={{ x: 28, y: 0, delay: 0.24 }}
        prefersReduce={!!prefersReduce}
      />
    </div>
  );
}

/* -----------------------------------------
   One fan card
   - No visible border or background
   - Image is object-contain (no CSS scale → no blur)
   - Entrance animates the wrapper only (integer pixels)
------------------------------------------ */
function FanCard({
  top,
  ml,
  z,
  rotate,
  img,
  sizes,
  widthClasses,
  enter,
  prefersReduce,
  priority = false,
}: {
  top: number;
  ml: number;
  z: number;
  rotate: number;
  img: { src: string; alt: string };
  sizes: string;
  widthClasses: string;
  enter: { x: number; y: number; delay: number };
  prefersReduce: boolean;
  priority?: boolean;
}) {
  const wrapStyle: CSSProperties = {
    top,
    left: "50%",
    marginLeft: ml,
    zIndex: z,
  };

  return (
    <motion.div
      style={wrapStyle}
      className="absolute -translate-x-1/2"
      initial={
        prefersReduce ? { opacity: 0 } : { opacity: 0, x: enter.x, y: enter.y }
      }
      animate={prefersReduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: prefersReduce ? 0 : 0.65,
        ease: [0.22, 1, 0.36, 1],
        delay: enter.delay,
      }}
      viewport={{ once: true, amount: 0.35 }}
    >
      <figure
        style={{ rotate: `${rotate}deg` }}
        className={`
          ${widthClasses}
          rounded-[16px] overflow-hidden
          bg-transparent
          shadow-[0_16px_48px_rgba(0,0,0,0.16)]
        `}
      >
        <div className="relative h-full w-full">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={priority}
            quality={96}
            sizes={sizes}
            className="object-contain select-none"
          />
        </div>
      </figure>
    </motion.div>
  );
}
