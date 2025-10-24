import { sanityClient } from "@/lib/sanity";
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
    <main className="space-y-10">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-wider text-charcoal/60">
          Pokémon Fund
        </p>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight">
          {data?.heroTitle ?? "Pokémon Alternative Investment Fund"}
        </h1>
        <p className="text-charcoal/80 max-w-2xl">
          {data?.heroSubtitle ??
            "Strategy-first, vault-secured Pokémon investing."}
        </p>
        <div className="pt-2">
          <Button className="" variant="default" size="default">
            {data?.ctaLabel ?? "Learn More"}
          </Button>
        </div>
      </header>

      {Array.isArray(data?.pitchCards) && data.pitchCards.length > 0 && (
        <section className="grid gap-4 sm:grid-cols-2 max-w-3xl">
          {data.pitchCards.map((c, i) => (
            <Card key={i} className="p-6 text-left shadow-card">
              <CardContent className="">
                <h3 className="font-serif text-lg mb-2">{c.title}</h3>
                <p className="text-charcoal/80">{c.body}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </main>
  );
}
