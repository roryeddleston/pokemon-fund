import "./globals.css";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Pokémon Alternative Investment Fund",
  description: "Strategy-first, vault-secured Pokémon investing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-white text-slate-900 antialiased">
        <Container className="py-8">{children}</Container>
      </body>
    </html>
  );
}