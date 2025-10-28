import "./globals.css";
import { Container } from "@/components/ui/container";
import Topbar from "@/components/layout/Topbar/TopbarServer";
import Footer from "@/components/layout/Footer/Footer";
import { inter, cinzel } from "@/styles/fonts";

export const metadata = {
  title: "Pokémon Alternative Investment Fund",
  description: "Strategy-first, vault-secured Pokémon investing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cinzel.variable} min-h-dvh bg-paper text-charcoal antialiased font-sans`}
      >
        <Topbar />
        <Container className="py-8">{children}</Container>
        <Footer />
      </body>
    </html>
  );
}
