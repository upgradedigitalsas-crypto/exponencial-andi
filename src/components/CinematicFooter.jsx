import { useEffect, useRef, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const base = import.meta.env.BASE_URL;

// Magnetic button — follows cursor with elastic snap-back
const MagneticButton = forwardRef(({ className = "", children, as: Component = "button", style, ...props }, forwardedRef) => {
  const localRef = useRef(null);

  useEffect(() => {
    const element = localRef.current;
    if (!element) return;
    const ctx = gsap.context(() => {
      const onMove = (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(element, { x: x * 0.4, y: y * 0.4, rotationX: -y * 0.15, rotationY: x * 0.15, scale: 1.05, ease: "power2.out", duration: 0.4 });
      };
      const onLeave = () => {
        gsap.to(element, { x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1, ease: "elastic.out(1,0.3)", duration: 1.2 });
      };
      element.addEventListener("mousemove", onMove);
      element.addEventListener("mouseleave", onLeave);
      return () => { element.removeEventListener("mousemove", onMove); element.removeEventListener("mouseleave", onLeave); };
    }, element);
    return () => ctx.revert();
  }, []);

  return (
    <Component
      ref={(node) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      className={"cf-magnetic " + className}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
});
MagneticButton.displayName = "MagneticButton";

const MarqueeItem = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 40, padding: "0 24px", whiteSpace: "nowrap" }}>
    <span>Gobierno Corporativo</span>
    <span style={{ color: "var(--brand-purple)", opacity: 0.6 }}>✦</span>
    <span>Líderes Certificados</span>
    <span style={{ color: "var(--brand-purple)", opacity: 0.4 }}>✦</span>
    <span>Juntas Directivas</span>
    <span style={{ color: "var(--brand-purple)", opacity: 0.6 }}>✦</span>
    <span>Impacto Estratégico</span>
    <span style={{ color: "var(--brand-purple)", opacity: 0.4 }}>✦</span>
    <span>ANDI del Futuro</span>
    <span style={{ color: "var(--brand-purple)", opacity: 0.6 }}>✦</span>
  </div>
);

const LEGAL_LINKS = [
  { label: "Política de privacidad", href: "#privacidad" },
  { label: "Términos de uso", href: "#terminos" },
  { label: "Habeas Data", href: "#habeas-data" },
];

export default function CinematicFooter() {
  const wrapperRef = useRef(null);
  const giantTextRef = useRef(null);
  const headingRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.85, opacity: 0 },
        { y: "0vh", scale: 1, opacity: 1, ease: "power1.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 80%", end: "bottom bottom", scrub: 1 } }
      );
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 40%", end: "bottom bottom", scrub: 1 } }
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", height: "100vh", width: "100%", clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <footer className="cf-wrapper" style={{
        position: "fixed", bottom: 0, left: 0,
        width: "100%", height: "100vh",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        overflow: "hidden",
        background: "var(--bg)",
        color: "var(--text-primary)",
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}>

        {/* Aurora glow */}
        <div className="cf-aurora" style={{
          position: "absolute", left: "50%", top: "50%",
          height: "60vh", width: "80vw",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%", filter: "blur(80px)",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* Grid background */}
        <div className="cf-bg-grid" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }} />

        {/* Giant background text */}
        <div ref={giantTextRef} className="cf-giant-text" style={{
          position: "absolute", bottom: "-5vh", left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap", zIndex: 0,
          pointerEvents: "none", userSelect: "none",
        }}>
          ADF
        </div>

        {/* Scrolling marquee */}
        <div style={{
          position: "absolute", top: 48, left: 0, width: "100%",
          overflow: "hidden",
          borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
          background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)",
          padding: "14px 0", zIndex: 10,
          transform: "rotate(-2deg) scale(1.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
        }}>
          <div className="cf-marquee" style={{
            display: "flex", width: "max-content",
            fontSize: 11, fontWeight: 700,
            letterSpacing: "0.25em", color: "var(--text-secondary)",
            textTransform: "uppercase",
          }}>
            <MarqueeItem /><MarqueeItem /><MarqueeItem />
          </div>
        </div>

        {/* Center content */}
        <div style={{
          position: "relative", zIndex: 10,
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "0 24px",
          maxWidth: 860, margin: "0 auto", width: "100%",
        }}>
          {/* Logo ANDI del Futuro */}
          <img
            src={`${base}logo-andi-futuro.png`}
            alt="ANDI del Futuro"
            style={{ height: 68, width: "auto", objectFit: "contain", marginBottom: 28, opacity: 0.9 }}
          />

          <h2 ref={headingRef} className="cf-heading-glow" style={{
            fontSize: "clamp(28px, 5.5vw, 68px)",
            fontWeight: 900, letterSpacing: "-0.04em",
            margin: "0 0 36px", textAlign: "center", lineHeight: 1.1,
          }}>
            ¿Listo para transformar<br />
            <span style={{ color: "var(--brand-purple)" }}>tu junta directiva?</span>
          </h2>

          <div ref={linksRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>

            {/* Primary CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
              <MagneticButton
                as="a" href="mailto:andidelfuturo@andi.com.co"
                className="cf-pill"
                style={{ padding: "16px 32px", borderRadius: 100, fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 10, color: "var(--text-primary)", textDecoration: "none" }}
              >
                <svg style={{ width: 20, height: 20, color: "var(--brand-purple)", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Postular mi perfil
              </MagneticButton>

              <MagneticButton
                as="a" href="mailto:andidelfuturo@andi.com.co"
                className="cf-pill"
                style={{ padding: "16px 32px", borderRadius: 100, fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 10, color: "var(--text-primary)", textDecoration: "none" }}
              >
                <svg style={{ width: 20, height: 20, color: "var(--brand-purple)", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contactar a ADF
              </MagneticButton>
            </div>

            {/* Legal links */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop: 4 }}>
              {LEGAL_LINKS.map(({ label, href }) => (
                <MagneticButton
                  key={label} as="a" href={href}
                  className="cf-pill-sm"
                  style={{ padding: "9px 18px", borderRadius: 100, fontWeight: 600, fontSize: 11, color: "var(--text-secondary)", textDecoration: "none" }}
                >
                  {label}
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          position: "relative", zIndex: 20, width: "100%",
          padding: "20px 32px",
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between", gap: 12,
          borderTop: "1px solid var(--border)",
        }}>
          <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
            © {new Date().getFullYear()} ANDI del Futuro · Directorio de Talento · Todos los derechos reservados
          </p>

          <div className="cf-pill-sm" style={{ padding: "9px 18px", borderRadius: 100, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-tertiary)" }}>Diseñado por</span>
            <span className="cf-heartbeat" style={{ fontSize: 14, color: "#ef4444" }}>❤</span>
            <span style={{ fontWeight: 900, fontSize: 12, color: "var(--text-primary)" }}>Upgrade Digital</span>
          </div>

          <MagneticButton
            as="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="cf-pill-sm"
            style={{ width: 42, height: 42, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", border: "none", cursor: "pointer", padding: 0 }}
          >
            <svg style={{ width: 17, height: 17 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </MagneticButton>
        </div>
      </footer>
    </div>
  );
}
