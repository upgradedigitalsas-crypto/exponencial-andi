import { useEffect, useState } from "react";

const CERT_PALETTE = {
  "Liderazgo Exponencial":       { bg: "#ede9fe", color: "#5b21b6" },
  "Transformación Digital":      { bg: "#e0e7ff", color: "#3730a3" },
  "Innovación y Tendencias":     { bg: "#fef3c7", color: "#92400e" },
  "Gestión del Cambio":          { bg: "#d1fae5", color: "#065f46" },
  "Sostenibilidad Empresarial":  { bg: "#dcfce7", color: "#166534" },
  "Estrategia y Competitividad": { bg: "#f3e8ff", color: "#6d28d9" },
  "Comunicación Ejecutiva":      { bg: "#fce7f3", color: "#9d174d" },
  "Mentalidad de Crecimiento":   { bg: "#ffedd5", color: "#9a3412" },
};

function Avatar({ photo, name }) {
  const initials = name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
  if (!photo) {
    return (
      <div style={{
        width: 80, height: 80, borderRadius: 20, flexShrink: 0,
        background: "linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: 24, fontWeight: 700,
      }}>{initials}</div>
    );
  }
  return (
    <img src={photo} alt={name} style={{
      width: 80, height: 80, borderRadius: 20, objectFit: "cover", objectPosition: "top",
      display: "block", border: "3px solid #fff",
      boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
    }} />
  );
}

export default function ProfileModal({ profile, onClose }) {
  const [photoZoom, setPhotoZoom] = useState(false);

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
    /* Outer — scroll container, NOT flexbox so top never clips */
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        overflowY: "auto",
        padding: "32px 16px 40px",
      }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }} />

      {/* Sheet — grows with content, outer scrolls */}
      <div
        className="modal-sheet"
        style={{
          position: "relative",
          background: "#fff",
          borderRadius: 20,
          maxWidth: 560,
          width: "100%",
          margin: "0 auto",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner */}
        <div style={{
          height: 110,
          background: "linear-gradient(135deg, #0f0f0f 0%, #1e1b4b 55%, #3b0764 100%)",
          position: "relative", overflow: "hidden",
        }}>
          {/* Purple blob */}
          <div style={{
            position: "absolute", top: "-30%", right: "-5%", width: 280, height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.55) 0%, transparent 70%)",
            filter: "blur(50px)",
          }} />
          <div style={{
            position: "absolute", bottom: "-40%", left: "5%", width: 200, height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(76,29,149,0.6) 0%, transparent 70%)",
            filter: "blur(45px)",
          }} />
          {/* Close button */}
          <button onClick={onClose} style={{
            position: "absolute", top: 14, right: 14,
            width: 28, height: 28, borderRadius: "50%",
            background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "rgba(255,255,255,0.85)",
          }}>
            <svg style={{ width: 13, height: 13 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Avatar — clickable para ampliar */}
          <div
            style={{ position: "absolute", bottom: -40, left: 24, cursor: profile.photo ? "zoom-in" : "default" }}
            onClick={(e) => { if (profile.photo) { e.stopPropagation(); setPhotoZoom(true); } }}
            title={profile.photo ? "Clic para ampliar foto" : ""}
          >
            <Avatar photo={profile.photo} name={profile.name} />
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "52px 24px 28px" }}>
          {/* Identity */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-primary)" }}>
                {profile.name}
              </h2>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-purple)", marginTop: 3 }}>{profile.role}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{profile.company}</span>
                <span style={{ color: "var(--border)" }}>·</span>
                <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{profile.sector}</span>
              </div>
            </div>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: "var(--brand-purple-light)", color: "var(--brand-purple)",
              fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 100,
              border: "1px solid rgba(124,58,237,0.2)", whiteSpace: "nowrap",
            }}>
              ✦ Exponencial ANDI
            </span>
          </div>

          <div style={{ height: 1, background: "var(--border)", marginBottom: 18 }} />

          {/* Bio */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 8 }}>Acerca de</div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "var(--text-secondary)" }}>{profile.bio}</p>
          </div>

          {/* Certifications */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 10 }}>
              Certificaciones del Programa
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {profile.certifications.map((cert) => {
                const p = CERT_PALETTE[cert] || { bg: "#f3f4f6", color: "#374151" };
                return (
                  <span key={cert} style={{
                    fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 100,
                    background: p.bg, color: p.color,
                  }}>
                    ✓ {cert}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 10 }}>
              Habilidades Clave
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {profile.skills.map((skill) => (
                <span key={skill} style={{
                  fontSize: 12, color: "var(--text-secondary)",
                  background: "var(--bg)", padding: "5px 12px", borderRadius: 100,
                  border: "1px solid var(--border)",
                }}>{skill}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          {(profile.linkedin || profile.email) && (
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 18 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 12 }}>Contacto</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    background: "#0A66C2", color: "#fff", fontSize: 13, fontWeight: 600,
                    padding: "9px 16px", borderRadius: 10, textDecoration: "none",
                  }}>
                    <svg style={{ width: 14, height: 14 }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
                {profile.email && (
                  <a href={`mailto:${profile.email}`} style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    background: "var(--bg)", color: "var(--text-primary)", fontSize: 13, fontWeight: 600,
                    padding: "9px 16px", borderRadius: 10, textDecoration: "none",
                    border: "1px solid var(--border)",
                  }}>
                    <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Photo lightbox */}
      {photoZoom && profile.photo && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(0,0,0,0.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "zoom-out",
          }}
          onClick={() => setPhotoZoom(false)}
        >
          <img
            src={profile.photo}
            alt={profile.name}
            style={{
              maxWidth: "min(480px, 90vw)",
              maxHeight: "80dvh",
              borderRadius: 20,
              objectFit: "cover",
              objectPosition: "top",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
            }}
          />
          <button
            onClick={() => setPhotoZoom(false)}
            style={{
              position: "absolute", top: 20, right: 20,
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
            }}
          >
            <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div style={{ position: "absolute", bottom: 24, color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
            {profile.name}
          </div>
        </div>
      )}
    </div>
  );
}
