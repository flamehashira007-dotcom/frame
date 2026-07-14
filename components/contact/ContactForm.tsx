"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const budgets = ["< $5k", "$5k – $15k", "$15k – $50k", "$50k+"];
const services = [
  "Branding", "UI/UX", "Web Design", "Web Development",
  "SEO & Ads", "Content & Email", "Video & Motion", "Not sure yet",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [budget, setBudget] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-cf-card]", { opacity: 1, y: 0, clearProps: "filter" });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to("[data-cf-card]", {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-cf-card]", start: "top 88%", once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const nextErrors: Record<string, string> = {};
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name) nextErrors.name = "Tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "That doesn't look like a valid email.";
    if (message.length < 10) nextErrors.message = "A sentence or two is enough — just not zero.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      // Replace with your actual endpoint, e.g.:
      // await fetch("/api/contact", { method: "POST", body: data });
      await new Promise((r) => setTimeout(r, 1100));
      setStatus("success");
      form.reset();
      setBudget(null);
      setService(null);
    } catch {
      setStatus("error");
    }
  }

  // Magnetic submit
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse || prefersReducedMotion()) return;
    const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3" });
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
    };
    const onLeave = () => { xTo(0); yTo(0); };
    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(btn);
    };
  }, []);

  return (
    <div ref={rootRef}>
      <div
        data-cf-card
        style={{ opacity: 0, transform: "translateY(50px)", filter: "blur(10px)" }}
        className="relative rounded-[2rem] p-8 md:p-10 border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-white/[0.03] backdrop-blur-xl overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-[#CCFF00]/[0.05] blur-[100px] pointer-events-none" />

        {status === "success" ? (
          <div className="relative flex flex-col items-center text-center py-16 px-4">
            <span className="w-14 h-14 rounded-full bg-[#CCFF00]/15 border border-[#CCFF00]/40 flex items-center justify-center mb-6">
              <Check className="w-6 h-6 text-[#CCFF00]" />
            </span>
            <h3 className="text-2xl font-semibold mb-2">Message sent.</h3>
            <p className="text-sm text-gray-400 max-w-sm">
              We&apos;ll reply within 24 hours. Keep an eye on the inbox you gave us —
              first responses sometimes land in spam.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-8 text-sm text-gray-400 hover:text-white underline underline-offset-4 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="relative space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field label="Name" name="name" placeholder="Jane Doe" error={errors.name} />
              <Field label="Email" name="email" type="email" placeholder="jane@company.com" error={errors.email} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field label="Company" name="company" placeholder="Optional" required={false} />
              <Field label="Website" name="website" placeholder="Optional" required={false} />
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-gray-500 font-medium mb-3">
                What do you need?
              </label>
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setService(s === service ? null : s)}
                    className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-300 ${
                      service === s
                        ? "bg-[#CCFF00] text-black border-[#CCFF00]"
                        : "bg-white/[0.04] text-gray-400 border-white/[0.12] hover:border-white/[0.25] hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <input type="hidden" name="service" value={service ?? ""} />
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-gray-500 font-medium mb-3">
                Rough budget
              </label>
              <div className="flex flex-wrap gap-2">
                {budgets.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setBudget(b === budget ? null : b)}
                    className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-300 ${
                      budget === b
                        ? "bg-[#CCFF00] text-black border-[#CCFF00]"
                        : "bg-white/[0.04] text-gray-400 border-white/[0.12] hover:border-white/[0.25] hover:text-white"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
              <input type="hidden" name="budget" value={budget ?? ""} />
            </div>

            <Field
              label="What's not working?"
              name="message"
              as="textarea"
              placeholder="Tell us what's broken, what you've tried, or just what you want to be true in six months."
              error={errors.message}
            />

            {status === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong sending that — mind trying again in a moment?
              </p>
            )}

            <button
              ref={btnRef}
              type="submit"
              disabled={status === "submitting"}
              className="group/btn w-full sm:w-auto flex items-center justify-center gap-3 bg-[#CCFF00] hover:bg-[#b8e600] disabled:opacity-60 disabled:cursor-not-allowed text-black px-8 py-4 rounded-full font-semibold text-base transition-colors shadow-[0_0_40px_rgba(204,255,0,0.2)]"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending
                </>
              ) : (
                <>
                  Send message
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label, name, type = "text", placeholder, error, as, required = true,
}: {
  label: string; name: string; type?: string; placeholder?: string;
  error?: string; as?: "textarea"; required?: boolean;
}) {
  const shared =
    "w-full bg-white/[0.05] border rounded-2xl px-4 py-3.5 text-sm text-white placeholder:text-gray-500 outline-none transition-colors duration-200 focus:bg-white/[0.08]";
  const borderColor = error ? "border-red-400/60 focus:border-red-400" : "border-white/[0.12] focus:border-[#CCFF00]/50";

  return (
    <div>
      <label htmlFor={name} className="block text-xs tracking-widest uppercase text-gray-500 font-medium mb-2">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          placeholder={placeholder}
          className={`${shared} ${borderColor} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`${shared} ${borderColor}`}
        />
      )}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}