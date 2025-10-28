import Link from "next/link";
import { Container } from "@/components/ui/container";

const COLUMNS = [
  {
    title: "Fund",
    links: [
      { label: "Overview", href: "/" },
      { label: "Thesis", href: "/thesis" },
      { label: "Structure & Terms", href: "/terms" },
      { label: "Risk", href: "/risk" },
    ],
  },
  {
    title: "Market",
    links: [{ label: "Market Data", href: "/market" }],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Documents",
    links: [
      { label: "Request the Deck", href: "/contact" },
      // Add these when ready:
      // { label: "One-pager (PDF)", href: "/one-pager.pdf" },
      // { label: "Due-diligence FAQ", href: "/ddq" },
    ],
  },
] as const;

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms-website" },
  { label: "Cookies", href: "/cookies" },
  { label: "Disclosures", href: "/disclosures" },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 bg-white">
      <Container className="py-10">
        {/* Top — brand + columns */}
        <div className="grid gap-8 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="font-serif text-lg text-charcoal">
              Pokémon Card Fund
            </div>
            <p className="mt-2 max-w-xs text-sm text-charcoal/70">
              Strategy-first, vault-secured PSA-graded Pokémon investing.
            </p>

            <div className="mt-4 space-y-1 text-sm text-charcoal/70">
              <p>
                <Link
                  href="/contact"
                  className="text-charcoal/80 hover:text-charcoal soft-link"
                >
                  Contact
                </Link>
              </p>
              <p>London, United Kingdom</p>
              <p className="mt-1">
                <Link
                  href="/linkedin"
                  className="text-charcoal/80 hover:text-charcoal soft-link"
                >
                  LinkedIn
                </Link>
              </p>
            </div>
          </div>

          {/* Columns */}
          <div className="md:col-span-8">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
              {COLUMNS.map((col) => (
                <nav key={col.title} aria-label={col.title}>
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-charcoal/60">
                    {col.title}
                  </h4>
                  <ul className="space-y-2">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="text-sm text-charcoal/80 hover:text-charcoal"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-black/5" />

        {/* Disclaimers */}
        <div className="space-y-3 text-xs leading-relaxed text-charcoal/65">
          <p>
            For professional/eligible investors only. This material is for
            information purposes and does not constitute an offer or
            solicitation to invest. Past performance is not indicative of future
            results.
          </p>
          <p>
            Pokémon is a trademark of Nintendo/Creatures/Game Freak. This fund
            is not affiliated with or endorsed by those companies.
          </p>
        </div>

        {/* Bottom row */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-charcoal/60">
            © {year} Pokémon Card Fund. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-4" aria-label="Legal">
            {LEGAL_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs text-charcoal/70 hover:text-charcoal"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
