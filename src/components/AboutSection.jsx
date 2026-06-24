import { useEffect, useRef } from "react";
import { profiles } from "../data/profiles";

const base = import.meta.env.BASE_URL;

/* Reveal hook — each element animates in once it enters the viewport */
function useReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Start hidden
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

function useRevealFrom(direction = "bottom", delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tx = direction === "left" ? "-48px" : direction === "right" ? "48px" : "0";
    const ty = direction === "bottom" ? "40px" : "0";
    el.style.opacity = "0";
    el.style.transform = `translate(${tx}, ${ty})`;
    el.style.transition = `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translate(0, 0)";
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [direction, delay]);
  return ref;
}

export default function AboutSection() {
  const refLogo     = useReveal(0);
  const refHeadline = useReveal(120);
  const refSub      = useReveal(220);
  const refDivider  = useReveal(300);
  const refN1       = useReveal(360);
  const refN2       = useReveal(440);
  const refN3       = useReveal(520);
  const refLeft     = useRevealFrom("left",  200);
  const refRight    = useRevealFrom("right", 280);

  return (
    <section style={{ background: "#fff", borderBottom: "1px solid var(--border)", padding: "72px 20px 80px", overflow: "hidden" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Logo */}
        <div ref={refLogo} style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <img
            src={`${base}logo-andi-futuro.png`}
            alt="ANDI del Futuro"
            style={{ height: 100, width: "auto", objectFit: "contain" }}
          />
        </div>

        {/* Big headline */}
        <div ref={refHeadline} style={{ textAlign: "center", marginBottom: 20 }}>
          <p style={{
            margin: 0,
            fontSize: "clamp(22px, 3.5vw, 36px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
            color: "var(--text-primary)",
          }}>
            Talento especializado en gobierno corporativo<br className="hidden sm:block" />
            {" "}para fortalecer tus juntas directivas.
          </p>
        </div>

        {/* Subtext */}
        <div ref={refSub} style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{
            margin: "0 auto",
            maxWidth: 580,
            fontSize: 15,
            lineHeight: 1.75,
            color: "var(--text-secondary)",
            fontWeight: 400,
          }}>
            Una iniciativa de{" "}
            <strong style={{ color: "var(--text-primary)" }}>ANDI del Futuro</strong>{" "}
            para facilitar las estrategias de gobierno corporativo en empresas colombianas,
            conectando organizaciones con líderes certificados listos para transformar
            sus juntas directivas.
          </p>
        </div>

        {/* Stats row */}
        <div ref={refDivider} style={{ height: 1, background: "var(--border)", marginBottom: 48 }} />

        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(32px, 6vw, 80px)", flexWrap: "wrap", marginBottom: 64 }}>
          <div ref={refN1} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--brand-purple)", lineHeight: 1 }}>
              {profiles.length}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-tertiary)", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Líderes certificados
            </div>
          </div>

          <div style={{ width: 1, background: "var(--border)", alignSelf: "stretch", minHeight: 48, display: "flex" }} />

          <div ref={refN2} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--brand-purple)", lineHeight: 1 }}>
              9
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-tertiary)", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Comités de junta
            </div>
          </div>

          <div style={{ width: 1, background: "var(--border)", alignSelf: "stretch", minHeight: 48, display: "flex" }} />

          <div ref={refN3} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--brand-purple)", lineHeight: 1 }}>
              12
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-tertiary)", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Sectores industriales
            </div>
          </div>
        </div>

        {/* Two-column text blocks */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48 }}>

          {/* Directorio */}
          <div ref={refLeft}>
            <div style={{ width: 32, height: 3, background: "var(--brand-purple)", borderRadius: 2, marginBottom: 20 }} />
            <h3 style={{ margin: "0 0 12px", fontSize: 18, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text-primary)" }}>
              Directorio de Talento ADF
            </h3>
            <p style={{ margin: 0, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75 }}>
              Conecta con los {profiles.length} líderes certificados, seleccionados
              por su experiencia en juntas directivas, gobierno corporativo y capacidad de generar
              valor estratégico desde los órganos de gobierno.
            </p>
          </div>

          {/* Gobierno corporativo */}
          <div ref={refRight}>
            <div style={{ width: 32, height: 3, background: "var(--brand-purple)", borderRadius: 2, marginBottom: 20 }} />
            <h3 style={{ margin: "0 0 12px", fontSize: 18, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text-primary)" }}>
              Gobierno corporativo de alto impacto
            </h3>
            <p style={{ margin: 0, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75 }}>
              Líderes con experiencia real en juntas directivas, gobierno corporativo
              y transformación empresarial —listos para aportar visión estratégica
              en empresas de alto crecimiento.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
