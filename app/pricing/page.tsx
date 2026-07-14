import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollRefresh from "@/components/ScrollRefresh";
import Footer from "@/components/Footer";
import PricingHero from "@/components/pricing/PricingHero";
import PricingPackages from "@/components/pricing/PricingPackages";
import PricingCompare from "@/components/pricing/PricingCompare";
import PricingAddons from "@/components/pricing/PricingAddons";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import PricingCTA from "@/components/pricing/PricingCTA";

export const metadata = {
  title: "Pricing — Ezando® Studio",
  description:
    "Transparent pricing for branding, design, web development, SEO, and growth. Four plans — pick the scope that matches your stage.",
};

export default function PricingPage() {
  return (
    <main>
      <ScrollProgress />
      <ScrollRefresh />
      <Navbar />
      <PricingHero />
      <PricingPackages />
      <PricingCompare />
      <PricingAddons />
      <PricingFAQ />
      <PricingCTA />
      <Footer />
    </main>
  );
}
