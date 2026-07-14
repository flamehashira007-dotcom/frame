"use client";

import { useEffect, useRef } from "react";
import { MapPin, Navigation, Clock, Car, Train } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const transportOptions = [
  {
    icon: Car,
    label: "By Car",
    description: "Free parking available in basement",
    time: "30 min from airport",
  },
  {
    icon: Train,
    label: "Public Transit",
    description: "Metro station 5 min walk",
    time: "Connected to all major hubs",
  },
];

export default function OfficeLocation() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-ol-content], [data-ol-map], [data-ol-transport]", {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from("[data-ol-content]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-ol-content]",
          start: "top 80%",
        },
      });

      gsap.from("[data-ol-map]", {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-ol-map]",
          start: "top 80%",
        },
      });

      gsap.from("[data-ol-transport]", {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-ol-transport-list]",
          start: "top 85%",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="map"
      className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-[#CCFF00]/[0.015] blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5 mb-16">
          <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
            <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
          </span>
          <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
            Visit Us
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - Content */}
          <div data-ol-content className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
                Our studio location
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                Located in the heart of Ahmedabad's creative district, our studio is designed to inspire collaboration and innovation.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#CCFF00]" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Address</h3>
                  <p className="text-gray-500">
                    123 Creative Street, Design District<br />
                    Ahmedabad, Gujarat 380001<br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#CCFF00]" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Office Hours</h3>
                  <p className="text-gray-500">
                    Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                    Saturday: By appointment only<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center flex-shrink-0">
                  <Navigation className="w-5 h-5 text-[#CCFF00]" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Getting Here</h3>
                  <p className="text-gray-500">
                    15 minutes from Ahmedabad International Airport<br />
                    5 minutes walk from the nearest metro station
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Map Placeholder & Transport */}
          <div className="space-y-8">
            {/* Map */}
            <div
              data-ol-map
              className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white/[0.04] border border-white/[0.1]"
            >
              {/* Stylized Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-white/[0.02]">
                {/* Grid pattern */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(204,255,0,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(204,255,0,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                  }}
                />
              </div>

              {/* Location Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  {/* Pulse rings */}
                  <div className="absolute inset-0 -m-8">
                    <div className="w-16 h-16 rounded-full bg-[#CCFF00]/20 animate-ping" style={{ animationDuration: "2s" }} />
                  </div>
                  <div className="absolute inset-0 -m-12">
                    <div className="w-24 h-24 rounded-full bg-[#CCFF00]/10 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
                  </div>
                  {/* Pin */}
                  <div className="relative w-14 h-14 rounded-full bg-[#CCFF00] flex items-center justify-center shadow-[0_0_40px_rgba(204,255,0,0.5)]">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                </div>
              </div>

              {/* Bottom info bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#CCFF00]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Ezando Studio</p>
                    <p className="text-gray-500 text-sm">123 Creative Street, Ahmedabad</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transport Options */}
            <div data-ol-transport-list className="space-y-4">
              <h3 className="text-lg font-medium text-white mb-4">How to get here</h3>
              {transportOptions.map((option) => (
                <div
                  key={option.label}
                  data-ol-transport
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:border-[#CCFF00]/20 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center flex-shrink-0">
                    <option.icon className="w-5 h-5 text-[#CCFF00]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium">{option.label}</span>
                      <span className="text-[#CCFF00] text-sm">{option.time}</span>
                    </div>
                    <p className="text-gray-500 text-sm">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
