import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollRefresh from "@/components/ScrollRefresh";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioDecks from "@/components/portfolio/PortfolioDecks";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Portfolio — Ezando® Studio",
  description:
    "Our marketing and web design work, collected into two decks. View or download.",
};

export default function PortfolioPage() {
  return (
    <main>
      <ScrollProgress />
      <ScrollRefresh />
      <Navbar />
      <PortfolioHero />
      <PortfolioDecks />
      <Footer />
    </main>
  );
}