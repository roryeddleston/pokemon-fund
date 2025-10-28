import { client } from "@/sanity/lib/client";
import { NAV_QUERY } from "@/sanity/lib/queries";
import TopbarClient from "./TopbarClient";

export const revalidate = 60;

export default async function TopbarServer() {
  const navDoc = await client.fetch<{
    brandName?: string;
    nav?: { label: string; href: string }[];
  }>(NAV_QUERY, {}, { next: { revalidate } });

  return (
    <TopbarClient
      brandName={navDoc?.brandName || "Pokémon Card Fund"}
      nav={
        navDoc?.nav || [
          { label: "Overview", href: "/" },
          { label: "Market", href: "/market" },
          { label: "Thesis", href: "/thesis" },
          { label: "Structure & Terms", href: "/terms" },
          { label: "Risk", href: "/risk" },
          { label: "Contact", href: "/contact" },
        ]
      }
    />
  );
}
