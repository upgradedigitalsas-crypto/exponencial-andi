import { useEffect } from "react";

const CERT_PALETTE = {
  "Liderazgo Exponencial":       { bg: "#e8f0fe", color: "#1a56db" },
  "Transformación Digital":      { bg: "#ede9fe", color: "#6d28d9" },
  "Innovación y Tendencias":     { bg: "#fef3c7", color: "#92400e" },
  "Gestión del Cambio":          { bg: "#d1fae5", color: "#065f46" },
  "Sostenibilidad Empresarial":  { bg: "#dcfce7", color: "#166534" },
  "Estrategia y Competitividad": { bg: "#e0e7ff", color: "#3730a3" },
  "Comunicación Ejecutiva":      { bg: "#fce7f3", color: "#9d174d" },
  "Mentalidad de Crecimiento":   { bg: "#ffedd5", color: "#9a3412" },
};

function Avatar({ photo, name }) {
  const initials = name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
  if (!photo) {
    return (
      <div style={{
        width: 96, height: 96, borderRadius: 24, flexShrink: 0,
        background: "linear-gradient(135deg, #002147 0%, #004080 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: 28, fontWeight: 700,
      }}>{initials}</div>
    );
  }
  return (
    <img src={photo} alt={name} style={{
      width: 96, height: 96, borderRadius: 24, objectFit: "cover", objectPosition: "top",
      boxShadow: "0 4px 20px rgba(0,0,0,0.15)", display: "block",
    }} />
  );
}

export default function ProfileModal({ profile, onClose }) {
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!profile) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      overflowY: "auto",
      padding: "24px 16px",
    }} onClick={onClose}>
      {/* Backdrop */}
      <div style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }} />

      {/* Sheet — centrado con margin auto para que el scroll funcione */}
      <div style={{
        position: "relative", background: "#fff", borderRadius: 28,
        maxWidth: 600, width: "100%", margin: "0 auto",
        boxShadow: "0 40px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.04)",
      }} onClick={(e) => e.stopPropagation()}>

        {/* Dark banner */}
        <div style={{
          height: 120, borderRadius: "28px 28px 0 0",
          background: "linear-gradient(135deg, #1d1d1f 0%, #002147 60%, #003d7a 100%)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 80% 50%, rgba(244,160,36,0.3) 0%, transparent 60%)",
          }} />
          {/* Close button */}
          <button onClick={onClose} style={{
            position: "absolute", top: 16, right: 16,
            width: 30, height: 30, borderRadius: "50%",
            background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "rgba(255,255,255,0.8)", transition: "background 0.2s",
          }}>
            <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Avatar anchor */}
          <div style={{ position: "absolute", bottom: -48, left: 28 }}>
            <div style={{ outline: "4px solid #fff", borderRadius: 28, display: "inline-block" }}>
              <Avatar photo={profile.photo} name={profile.name} />
            </div>
          </div>
        </div>

        <div style={{ padding: "60px 28px 32px" }}>
          {/* Identity */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--apple-dark)" }}>
                {profile.name}
              </h2>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--andi-gold)", marginTop: 4 }}>{profile.role}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, color: "var(--apple-mid)" }}>{profile.company}</span>
                <span style={{ color: "rgba(0,0,0,0.15)" }}>·</span>
                <span style={{ fontSize: 13, color: "var(--apple-light)" }}>{profile.sector}</span>
              </div>
            </div>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: "rgba(244,160,36,0.10)", color: "#b36200", fontSize: 12, fontWeight: 700,
              padding: "6px 14px", borderRadius: 100, border: "1px solid rgba(244,160,36,0.2)",
              whiteSpace: "nowrap",
            }}>
              <svg style={{ width: 12, height: 12 }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Exponencial ANDI
            </span>
          </div>

          <div style={{ height: 1, background: "rgba(0,0,0,0.06)", marginBottom: 20 }} />

          {/* Bio */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--apple-light)", marginBottom: 8 }}>Acerca de</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "var(--apple-mid)" }}>{profile.bio}</p>
          </div>

          {/* Certifications */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--apple-light)", marginBottom: 10 }}>
              Certificaciones del Programa
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {profile.certifications.map((cert) => {
                const p = CERT_PALETTE[cert] || { bg: "#f3f4f6", color: "#374151" };
                return (
                  <span key={cert} style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: p.bg, color: p.color,
                    fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 100,
                  }}>
                    <svg style={{ width: 12, height: 12 }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {cert}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--apple-light)", marginBottom: 10 }}>
              Habilidades Clave
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {profile.skills.map((skill) => (
                <span key={skill} style={{
                  fontSize: 13, color: "var(--apple-mid)",
                  background: "rgba(0,0,0,0.04)", padding: "6px 14px", borderRadius: 100,
                  border: "1px solid rgba(0,0,0,0.06)",
                }}>{skill}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          {(profile.linkedin || profile.email) && (
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--apple-light)", marginBottom: 12 }}>Contacto</div>
              <div style={{ display: "flex", gap: 10 }}>
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "#0A66C2", color: "#fff", fontSize: 13, fontWeight: 600,
                    padding: "9px 18px", borderRadius: 12, textDecoration: "none",
                    boxShadow: "0 2px 8px rgba(10,102,194,0.3)",
                  }}>
                    <svg style={{ width: 15, height: 15 }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
                {profile.email && (
                  <a href={`mailto:${profile.email}`} style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "rgba(0,0,0,0.05)", color: "var(--apple-dark)", fontSize: 13, fontWeight: 600,
                    padding: "9px 18px", borderRadius: 12, textDecoration: "none",
                    border: "1px solid rgba(0,0,0,0.08)",
                  }}>
                    <svg style={{ width: 15, height: 15 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Correo
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
