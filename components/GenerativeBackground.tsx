"use client";

import { useRef, useEffect } from "react";
import { gsap, prefersReducedMotion, isCoarsePointer } from "@/lib/gsap";

export default function GenerativeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      draw(w, h);
    };

    const draw = (w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const mainRadius = h * 0.72;
      const cy = h;

      const arcHalfWidth = Math.PI / 2;

      const startAngle = -Math.PI / 2 - arcHalfWidth;
      const endAngle = -Math.PI / 2 + arcHalfWidth;

      const arcPeakY = cy - mainRadius;
      const glow = ctx.createRadialGradient(
        cx, arcPeakY + 60, 20,
        cx, arcPeakY + 60, 350
      );
      glow.addColorStop(0, "rgba(210, 255, 0, 0.010)");
      glow.addColorStop(0.3, "rgba(180, 230, 0, 0.03)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      const ringSpacing = 12;
      const dotSpacing = 20;
      const maxRings = 55;

      for (let i = 1; i <= maxRings; i++) {
        const radius = mainRadius + i * ringSpacing;
        const ringTopY = cy - radius;

        if (ringTopY < -60) break;

        const distFactor = i / (maxRings * 0.6);
        let baseOpacity = Math.max(0, 1 - distFactor * 1.4) * 0.9;
        if (i <= 3) baseOpacity *= 1.7;
        if (baseOpacity < 0.01) continue;

        const arcLen = radius * (endAngle - startAngle);
        const numDots = Math.floor(arcLen / dotSpacing);

        for (let j = 0; j <= numDots; j++) {
          const t = j / numDots;
          const angle = startAngle + t * (endAngle - startAngle);

          const x = cx + radius * Math.cos(angle);
          const y = cy + radius * Math.sin(angle);

          if (x < -80 || x > w + 80 || y < -80 || y > h + 80) continue;

          const edgeT = Math.abs(t - 0.5) * 2;
          const edgeFade = 1 - Math.pow(edgeT, 3.5);
          const opacity = baseOpacity * edgeFade;
          if (opacity < 0.01) continue;

          const size = 1.0 + Math.max(0, 1 - distFactor) * 0.9;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(204, 255, 0, ${opacity})`;
          ctx.fill();
        }
      }

      const arcGrad = ctx.createLinearGradient(0, 0, w, 0);
      arcGrad.addColorStop(0, "rgba(220, 255, 40, 0)");
      arcGrad.addColorStop(0.05, "rgba(220, 255, 40, 0.95)");
      arcGrad.addColorStop(0.95, "rgba(220, 255, 40, 0.95)");
      arcGrad.addColorStop(1, "rgba(220, 255, 40, 0)");

      const drawArc = (width: number, alpha: number, style?: CanvasGradient) => {
        ctx.beginPath();
        ctx.arc(cx, cy, mainRadius, startAngle, endAngle);
        ctx.lineWidth = width;
        ctx.strokeStyle = style || `rgba(230, 255, 60, ${alpha})`;
        ctx.lineCap = "round";
        ctx.stroke();
      };

      drawArc(50, 0.03);
      drawArc(26, 0.06);
      drawArc(11, 0.11);
      drawArc(2.6, 0.95, arcGrad);
      drawArc(1.0, 0.5);

      const bottomMask = ctx.createLinearGradient(0, h * 0.72, 0, h);
      bottomMask.addColorStop(0, "rgba(5, 5, 5, 0)");
      bottomMask.addColorStop(0.6, "rgba(5, 5, 5, 0.75)");
      bottomMask.addColorStop(1, "rgba(5, 5, 5, 1)");
      ctx.fillStyle = bottomMask;
      ctx.fillRect(0, h * 0.72, w, h * 0.28);
    };

    resize();
    window.addEventListener("resize", resize);

    // ── Mouse parallax + idle drift (GSAP) ──
    const xTo = gsap.quickTo(canvas, "x", { duration: 1.2, ease: "power2.out" });
    const yTo = gsap.quickTo(canvas, "y", { duration: 1.2, ease: "power2.out" });

    const parallax = (e: MouseEvent) => {
      const relX = (e.clientX / window.innerWidth - 0.5) * 2;
      const relY = (e.clientY / window.innerHeight - 0.5) * 2;
      xTo(relX * -18);
      yTo(relY * -12);
    };

    const enableParallax = !prefersReducedMotion() && !isCoarsePointer();
    if (enableParallax) window.addEventListener("mousemove", parallax);

    const idle = !prefersReducedMotion()
      ? gsap.to(canvas, {
          y: "+=10",
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      : null;

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", parallax);
      idle?.kill();
      gsap.killTweensOf(canvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}