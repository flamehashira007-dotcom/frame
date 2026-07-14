import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import ServicesHero from "@/components/services/ServicesHero";
import ServiceDisciplines from "@/components/services/ServiceDisciplines";
import ServicesOverview from "@/components/services/ServicesOverview";
import MarketingChannels from "@/components/services/MarketingChannels";
import TechStack from "@/components/services/TechStack";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServicesFAQ from "@/components/services/ServicesFAQ";
import ServicesCTA from "@/components/services/ServicesCTA";
import ScrollRefresh from "@/components/ScrollRefresh";

export const metadata = {
  title: "Services — Ezando® Studio",
  description:
    "Branding, design, web development, SEO, and performance marketing — one studio, one system.",
};

export default function ServicesPage() {
  return (
    <main>
      <ScrollProgress />
      <ScrollRefresh />
      <Navbar />
      <ServicesHero />
      <ServicesOverview />
      <ServiceDisciplines />
      <MarketingChannels />
      <TechStack />
      <ServiceProcess />
      <ServicesFAQ />
      <ServicesCTA />
      <Footer />
    </main>
  );
}