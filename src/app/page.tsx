import { sanityClient } from "@/lib/sanity";
import HomeHero from "@/components/home/HomeHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PitchCard {
  title: string;
  body: string;
}

interface HomePageData {
  heroTitle?: string;
  heroSubtitle?: string;
  ctaLabel?: string;
  pitchCards?: PitchCard[];
}

export const metadata = {
  title: "Pokémon Card Fund – Overview",
  description: "Vault-secured, strategy-first Pokémon investing.",
};

const query = `*[_type == "homePage"][0]{
  heroTitle,
  heroSubtitle,
  ctaLabel,
  pitchCards[]{ title, body }
}`;

export default async function Home() {
  const data = await sanityClient.fetch<HomePageData>(
    query,
    {},
    { next: { tags: ["home"] } }
  );

  return (
    <main className="space-y-16 md:space-y-20">
      <HomeHero />
    </main>
  );
}
