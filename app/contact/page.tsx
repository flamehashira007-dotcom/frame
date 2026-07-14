import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollRefresh from "@/components/ScrollRefresh";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFAQ from "@/components/contact/ContactFAQ";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact — Ezando® Studio",
  description:
    "Tell us what's not working. We reply within 24 hours and the first call includes a free audit.",
};

export default function ContactPage() {
  return (
    <main>
      <ScrollProgress />
      <ScrollRefresh />
      <Navbar />
      <ContactHero />
      <div className="relative bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <div className="lg:col-span-2 h-full">
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
      <ContactFAQ />
      <Footer />
    </main>
  );
}