import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Web & Design Portfolio — Ezando® Studio",
  description: "Branding, UI/UX, and web design work.",
};

export default function WebDesignDeckPage() {
  return (
    <main>
      <Navbar />

      <section className="relative bg-[#050505] text-white min-h-screen pt-32 md:pt-36 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-violet-500/[0.025] blur-[160px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          {/* Header bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors w-fit"
            >
              <span className="w-9 h-9 rounded-full border border-white/[0.12] flex items-center justify-center group-hover:border-[#CCFF00]/40 group-hover:bg-[#CCFF00]/[0.06] transition-all duration-300">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </span>
              Back to portfolio
            </Link>
<a
            
              href="/portfolio/web-design.pdf"
              download
              className="group inline-flex items-center gap-3 bg-white/[0.05] hover:bg-[#CCFF00] hover:text-black border border-white/[0.12] px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 w-fit"
            >
              Download PDF
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>

          <div className="mb-8">
            <span className="text-[11px] tracking-wider uppercase font-medium px-3 py-1.5 rounded-full bg-violet-400/[0.12] border border-violet-400/25 text-violet-300">
              Web &amp; Design
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-5">
              Brands, interfaces, and the sites they ship into
            </h1>
          </div>

          {/* Viewer */}
          <div
            className="relative rounded-3xl overflow-hidden border border-white/[0.10] bg-white/[0.02]"
            style={{ boxShadow: "0 30px 90px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent z-10" />

            <object
              data="/portfolio/web-design.pdf#view=FitH"
              type="application/pdf"
              className="w-full h-[75vh] min-h-[600px]"
            >
              {/* Fallback — mobile browsers mostly can't embed PDFs */}
              <div className="flex flex-col items-center justify-center gap-5 py-24 px-8 text-center">
                <p className="text-sm text-gray-400 max-w-sm">
                  Your browser can&apos;t display the PDF inline. Open it in a new tab
                  or download it instead.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/portfolio/web-design.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#CCFF00] hover:bg-[#b8e600] text-black px-6 py-3 rounded-full font-semibold text-sm transition-colors"
                  >
                    Open in new tab
                  </a>
                  <a
                    href="/portfolio/web-design.pdf"
                    download
                    className="bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] px-6 py-3 rounded-full font-semibold text-sm transition-colors"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            </object>
          </div>

          <p className="text-center text-sm text-gray-500 mt-10">
            Want the marketing side too?{" "}
            <Link href="/portfolio" className="text-[#CCFF00] hover:underline underline-offset-4">
              Grab that deck
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}