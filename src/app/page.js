import { sanityClient } from "@/lib/sanity";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const query = `*[_type == "homePage"][0]{
  heroTitle,
  heroSubtitle,
  ctaLabel,
  pitchCards[]{ title, body }
}`;

export default async function Home() {
  const data = await sanityClient.fetch(query);

  return (
    <main className="space-y-10">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-wider text-slate-500">Pokémon Fund</p>
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
          {data?.heroTitle ?? "Pokémon Alternative Investment Fundy"}
        </h1>
        <p className="text-slate-600 max-w-2xl">
          {data?.heroSubtitle ?? "Strategy-first, vault-secured Pokémon investing."}
        </p>
        <div className="pt-2">
          <Button>{data?.ctaLabel ?? "Learn More"}</Button>
        </div>
      </header>

      {Array.isArray(data?.pitchCards) && data.pitchCards.length > 0 && (
        <section className="grid gap-4 sm:grid-cols-2 max-w-3xl">
          {data.pitchCards.map((c, i) => (
            <Card key={i} className="p-6 text-left">
              <CardContent>
                <h3 className="text-lg font-medium mb-2">{c.title}</h3>
                <p className="text-slate-600">{c.body}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </main>
  );
}