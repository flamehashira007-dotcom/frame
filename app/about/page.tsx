import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollRefresh from "@/components/ScrollRefresh";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutValues from "@/components/about/AboutValues";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutTeam from "@/components/about/AboutTeam";
import AboutCulture from "@/components/about/AboutCulture";
import AboutCTA from "@/components/about/AboutCTA";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About — Ezando® Studio",
  description:
    "A creative studio of designers, strategists, and engineers crafting bold digital experiences from Ahmedabad to everywhere.",
};

export default function AboutPage() {
  return (
    <main>
      <ScrollProgress />
      <ScrollRefresh />
      <Navbar />
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutTimeline />
      <AboutTeam />
      <AboutCulture />
      <AboutCTA />
      <Footer />
    </main>
  );
}