"use client";

import { useEffect, useRef } from "react";
import { Clock, Video, Phone, Calendar, ArrowRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const weekDays = [
  { day: "Monday", hours: "9:00 AM - 6:00 PM", isOpen: true },
  { day: "Tuesday", hours: "9:00 AM - 6:00 PM", isOpen: true },
  { day: "Wednesday", hours: "9:00 AM - 6:00 PM", isOpen: true },
  { day: "Thursday", hours: "9:00 AM - 6:00 PM", isOpen: true },
  { day: "Friday", hours: "9:00 AM - 6:00 PM", isOpen: true },
  { day: "Saturday", hours: "By Appointment", isOpen: true, isLimited: true },
  { day: "Sunday", hours: "Closed", isOpen: false },
];

const meetingOptions = [
  {
    icon: Video,
    title: "Video Call",
    description: "Zoom, Google Meet, or Teams",
    availability: "Available anytime",
  },
  {
    icon: Phone,
    title: "Phone Call",
    description: "Direct line to our team",
    availability: "During business hours",
  },
  {
    icon: Calendar,
    title: "In-Person Meeting",
    description: "Visit our studio",
    availability: "By appointment",
  },
];

export default function BusinessHours() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-bh-content], [data-bh-day], [data-bh-option]", {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from("[data-bh-content]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-bh-content]",
          start: "top 80%",
        },
      });

      gsap.from("[data-bh-day]", {
        y: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-bh-schedule]",
          start: "top 80%",
        },
      });

      gsap.from("[data-bh-option]", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-bh-options]",
          start: "top 80%",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const today = new Date().getDay();
  const adjustedToday = today === 0 ? 6 : today - 1; // Convert to 0-6 (Mon-Sun)

  return (
    <section ref={rootRef} className="relative bg-[#050505] text-white pt-32 md:pt-40 pb-28 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute bottom-20 left-[10%] w-[500px] h-[500px] rounded-full bg-[#CCFF00]/[0.015] blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5 mb-16">
          <span className="relative w-2.5 h-2.5 rounded-full bg-[#CCFF00]">
            <span className="absolute inset-0 rounded-full bg-[#CCFF00] animate-ping opacity-40" />
          </span>
          <span className="text-sm text-gray-400 tracking-widest uppercase font-medium">
            Office Hours
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Schedule */}
          <div data-bh-content>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              When we're available
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Our team is available during business hours for calls, meetings, and support. We also accommodate weekend appointments when needed.
            </p>

            <div data-bh-schedule className="space-y-3">
              {weekDays.map((day, index) => (
                <div
                  key={day.day}
                  data-bh-day
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                    index === adjustedToday
                      ? "bg-[#CCFF00]/10 border-[#CCFF00]/30"
                      : "bg-white/[0.04] border-white/[0.1] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        day.isOpen
                          ? day.isLimited
                            ? "bg-yellow-400"
                            : "bg-[#CCFF00]"
                          : "bg-red-400"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        index === adjustedToday ? "text-[#CCFF00]" : "text-white"
                      }`}
                    >
                      {day.day}
                      {index === adjustedToday && (
                        <span className="ml-2 text-xs bg-[#CCFF00] text-black px-2 py-0.5 rounded-full">
                          Today
                        </span>
                      )}
                    </span>
                  </div>
                  <span
                    className={`text-sm ${
                      day.isOpen ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {day.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Meeting Options */}
          <div className="lg:pt-16">
            <span className="inline-block text-xs md:text-sm tracking-widest uppercase text-[#CCFF00] mb-4">
              Connect With Us
            </span>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-6">
              How would you like to meet?
            </h3>
            <p className="text-lg text-gray-400 mb-10">
              We offer flexible meeting options to suit your preferences and schedule. Choose the format that works best for you.
            </p>

            <div data-bh-options className="space-y-4">
              {meetingOptions.map((option) => (
                <div
                  key={option.title}
                  data-bh-option
                  className="group p-6 rounded-3xl bg-white/[0.04] border border-white/[0.1] hover:border-[#CCFF00]/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(204,255,0,0.1)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#CCFF00]/20 transition-colors">
                      <option.icon className="w-6 h-6 text-[#CCFF00]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-medium text-lg group-hover:text-[#CCFF00] transition-colors">
                          {option.title}
                        </h4>
                        <span className="text-xs text-[#CCFF00] bg-[#CCFF00]/10 px-2 py-1 rounded-full">
                          {option.availability}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm">{option.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#CCFF00]/10 to-transparent border border-[#CCFF00]/20">
              <p className="text-gray-300 mb-4">
                Ready to schedule a meeting? Book a time that works for you.
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#CCFF00] text-black font-medium rounded-full hover:bg-[#b8e600] transition-colors group">
                Book a Meeting
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
