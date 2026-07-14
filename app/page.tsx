import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import GenerativeBackground from "@/components/GenerativeBackground";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Features from "@/components/Features";
import ProjectShowcase from "@/components/ProjectShowcase";
import OurServices from "@/components/OurServices";
import OurProcess from "@/components/OurProcess";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />

      <section className="relative min-h-screen bg-[#050505] text-white overflow-hidden flex flex-col">
        <GenerativeBackground />
        <HeroSection />
      </section>

      <WhyChooseUs />
      <Features />
      <ProjectShowcase />
      <OurServices />
      <OurProcess />
      <CTASection />
      <Footer />
    </main>
  );
}