"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export default function ScrollRefresh() {
  useEffect(() => {
    // Refresh after fonts + images settle
    const refresh = () => ScrollTrigger.refresh();

    refresh();
    const t1 = setTimeout(refresh, 300);
    const t2 = setTimeout(refresh, 1000);

    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    // Refresh when any image finishes loading
    const imgs = Array.from(document.images);
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", refresh, { once: true });
    });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return null;
}