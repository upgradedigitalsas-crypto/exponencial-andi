import { useEffect, useState } from "react";
const base = import.meta.env.BASE_URL;

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

const TIPOS = ["Proyecto", "Contratación", "Alianza estratégica", "Mentoría"];

function Avatar({ photo, name, onClick }) {
  const initials = name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
  const style = {
    width: 80, height: 80, borderRadius: 20, flexShrink: 0,
    cursor: photo ? "zoom-in" : "default",
    border: "3px solid #fff",
    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
  };
  if (!photo) {
    return (
      <div onClick={onClick} style={{
        ...style, cursor: "default",
        background: "linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: 24, fontWeight: 700,
      }}>{initials}</div>
    );
  }
  return (
    <img src={photo} alt={name} onClick={onClick}
      style={{ ...style, objectFit: "cover", objectPosition: "top", display: "block" }} />
  );
}

/* ── Input compartido ── */
function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "9px 12px", fontSize: 13,
  border: "1.5px solid var(--border)", borderRadius: 10,
  fontFamily: "inherit", color: "var(--text-primary)",
  background: "var(--bg)", outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

/* ── Step 2: formulario ── */
function ContactForm({ profile, onBack, onSuccess }) {
  const [tipo, setTipo] = useState("Proyecto");
  const [form, setForm] = useState({ nombre: "", empresa: "", email: "", mensaje: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.nombre.trim())  e.nombre  = "Requerido";
    if (!form.email.trim())   e.email   = "Requerido";
    if (!form.mensaje.trim()) e.mensaje = "Requerido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setBusy(true);

    // mailto: fallback — funcional sin backend
    const subject = encodeURIComponent(`[Exponencial] Solicitud de ${tipo} — ${form.nombre}`);
    const body = encodeURIComponent(
      `Tipo: ${tipo}\nDe: ${form.nombre}${form.empresa ? ` (${form.empresa})` : ""}\nEmail: ${form.email}\n\n${form.mensaje}`
    );
    const to = profile.email || "";
    if (to) window.open(`mailto:${to}?subject=${subject}&body=${body}`, "_blank");

    setTimeout(() => { setBusy(false); onSuccess(tipo); }, 600);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Back */}
      <button type="button" onClick={onBack} style={{
        display: "inline-flex", alignItems: "center", gap: 5, background: "none",
        border: "none", cursor: "pointer", color: "var(--text-tertiary)", fontSize: 12,
        fontFamily: "inherit", fontWeight: 600, padding: 0, width: "fit-content",
      }}>
        <svg style={{ width: 13, height: 13 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
        Volver al perfil
      </button>

      {/* Header */}
      <div style={{ paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
        <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
          Contactar a {profile.name.split(" ")[0]}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 2 }}>
          {profile.role} · {profile.company}
        </div>
      </div>

      {/* Tipo de solicitud */}
      <Field label="Tipo de solicitud">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {TIPOS.map((t) => (
            <button key={t} type="button" onClick={() => setTipo(t)} style={{
              fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 100, cursor: "pointer",
              border: "1.5px solid",
              borderColor: tipo === t ? "var(--brand-purple)" : "var(--border)",
              background: tipo === t ? "var(--brand-purple-light)" : "transparent",
              color: tipo === t ? "var(--brand-purple)" : "var(--text-secondary)",
              fontFamily: "inherit", transition: "all 0.15s",
            }}>{t}</button>
          ))}
        </div>
      </Field>

      {/* Nombre */}
      <Field label="Tu nombre *">
        <input value={form.nombre} onChange={set("nombre")} placeholder="Juan Pérez"
          style={{ ...inputStyle, borderColor: errors.nombre ? "#ef4444" : "var(--border)" }}
          onFocus={(e) => { e.target.style.borderColor = "var(--brand-purple)"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.12)"; }}
          onBlur={(e)  => { e.target.style.borderColor = errors.nombre ? "#ef4444" : "var(--border)"; e.target.style.boxShadow = "none"; }}
        />
        {errors.nombre && <span style={{ fontSize: 11, color: "#ef4444" }}>{errors.nombre}</span>}
      </Field>

      {/* Empresa */}
      <Field label="Tu empresa">
        <input value={form.empresa} onChange={set("empresa")} placeholder="Opcional"
          style={inputStyle}
          onFocus={(e) => { e.target.style.borderColor = "var(--brand-purple)"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.12)"; }}
          onBlur={(e)  => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
        />
      </Field>

      {/* Email */}
      <Field label="Tu email *">
        <input type="email" value={form.email} onChange={set("email")} placeholder="tu@empresa.com"
          style={{ ...inputStyle, borderColor: errors.email ? "#ef4444" : "var(--border)" }}
          onFocus={(e) => { e.target.style.borderColor = "var(--brand-purple)"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.12)"; }}
          onBlur={(e)  => { e.target.style.borderColor = errors.email ? "#ef4444" : "var(--border)"; e.target.style.boxShadow = "none"; }}
        />
        {errors.email && <span style={{ fontSize: 11, color: "#ef4444" }}>{errors.email}</span>}
      </Field>

      {/* Mensaje */}
      <Field label="Mensaje *">
        <textarea value={form.mensaje} onChange={set("mensaje")} rows={4}
          placeholder={`Hola ${profile.name.split(" ")[0]}, me gustaría explorar una posible colaboración...`}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6, borderColor: errors.mensaje ? "#ef4444" : "var(--border)" }}
          onFocus={(e) => { e.target.style.borderColor = "var(--brand-purple)"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.12)"; }}
          onBlur={(e)  => { e.target.style.borderColor = errors.mensaje ? "#ef4444" : "var(--border)"; e.target.style.boxShadow = "none"; }}
        />
        {errors.mensaje && <span style={{ fontSize: 11, color: "#ef4444" }}>{errors.mensaje}</span>}
      </Field>

      <button type="submit" disabled={busy} style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        background: busy ? "var(--border)" : "var(--brand-purple)",
        color: busy ? "var(--text-tertiary)" : "#fff",
        fontSize: 14, fontWeight: 700, padding: "12px 20px", borderRadius: 12,
        border: "none", cursor: busy ? "not-allowed" : "pointer",
        fontFamily: "inherit", transition: "background 0.2s",
      }}>
        {busy ? "Enviando..." : `Enviar solicitud de ${tipo}`}
        {!busy && (
          <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14m-6-6l6 6-6 6" />
          </svg>
        )}
      </button>
    </form>
  );
}

/* ── Step 3: éxito ── */
function SuccessStep({ profile, tipo, onClose }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "20px 0 8px", gap: 14 }}>
      <div style={{
        width: 60, height: 60, borderRadius: "50%", background: "#d1fae5",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg style={{ width: 28, height: 28, color: "#065f46" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <div style={{ fontSize: 17, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
          ¡Solicitud enviada!
        </div>
        <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 6, lineHeight: 1.6, maxWidth: 340 }}>
          Tu solicitud de <strong>{tipo}</strong> fue enviada a{" "}
          <strong>{profile.name.split(" ")[0]}</strong>. Pronto recibirás respuesta.
        </div>
      </div>
      {profile.linkedin && (
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: "#0A66C2", color: "#fff", fontSize: 13, fontWeight: 600,
          padding: "9px 16px", borderRadius: 10, textDecoration: "none", marginTop: 4,
        }}>
          <svg style={{ width: 14, height: 14 }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Conectar en LinkedIn
        </a>
      )}
      <button onClick={onClose} style={{
        fontSize: 13, color: "var(--text-tertiary)", background: "none",
        border: "none", cursor: "pointer", fontFamily: "inherit", marginTop: 4,
      }}>
        Cerrar
      </button>
    </div>
  );
}

/* ══ Modal principal ══ */
export default function ProfileModal({ profile, onClose }) {
  const [photoZoom, setPhotoZoom] = useState(false);
  const [step, setStep]           = useState("profile"); // "profile" | "form" | "success"
  const [tipo, setTipo]           = useState("");

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        if (photoZoom) { setPhotoZoom(false); return; }
        if (step === "form") { setStep("profile"); return; }
        onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, photoZoom, step]);

  if (!profile) return null;

  return (
    <>
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "24px 16px",
        }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }} />

        {/* Sheet */}
        <div
          style={{
            position: "relative", zIndex: 1,
            background: "#fff",
            borderRadius: 20,
            maxWidth: 560, width: "100%",
            maxHeight: "calc(100dvh - 48px)",
            display: "flex", flexDirection: "column",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Banner (siempre visible) ── */}
          <div style={{
            height: 110, flexShrink: 0,
            background: "linear-gradient(135deg, #1e1b4b 0%, #4C1D95 100%)",
            position: "relative",
          }}>
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
            <div style={{ position: "absolute", bottom: -40, left: 24 }}>
              <Avatar
                photo={profile.photo}
                name={profile.name}
                onClick={(e) => { if (profile.photo) { e.stopPropagation(); setPhotoZoom(true); } }}
              />
            </div>
          </div>

          {/* ── Contenido scrolleable ── */}
          <div style={{ flex: 1, overflowY: "auto", padding: step === "profile" ? "52px 24px 28px" : "24px 24px 28px" }}>

            {/* STEP: profile */}
            {step === "profile" && (
              <>
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
                  <img
                    src={`${base}logo-exponencial.png`}
                    alt="Exponencial"
                    style={{ height: 36, width: "auto", objectFit: "contain", flexShrink: 0 }}
                  />
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

                {/* Contact + CTA */}
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 18 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 12 }}>Contacto</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                    {profile.linkedin && (
                      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        background: "#0A66C2", color: "#fff", fontSize: 13, fontWeight: 600,
                        padding: "9px 16px", borderRadius: 10, textDecoration: "none",
                      }}>
                        <svg style={{ width: 14, height: 14 }} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        Ver en LinkedIn
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

                    {/* ── CTA principal ── */}
                    <button
                      onClick={() => setStep("form")}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        background: "linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)",
                        color: "#fff", fontSize: 13, fontWeight: 700,
                        padding: "9px 18px", borderRadius: 10,
                        border: "none", cursor: "pointer", fontFamily: "inherit",
                        boxShadow: "0 4px 14px rgba(124,58,237,0.35)",
                        marginLeft: "auto",
                      }}
                    >
                      Solicitar proyecto
                      <svg style={{ width: 13, height: 13 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14m-6-6l6 6-6 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* STEP: form */}
            {step === "form" && (
              <ContactForm
                profile={profile}
                onBack={() => setStep("profile")}
                onSuccess={(t) => { setTipo(t); setStep("success"); }}
              />
            )}

            {/* STEP: success */}
            {step === "success" && (
              <SuccessStep profile={profile} tipo={tipo} onClose={onClose} />
            )}
          </div>
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
          <button onClick={() => setPhotoZoom(false)} style={{
            position: "absolute", top: 20, right: 20,
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
          }}>
            <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div style={{ position: "absolute", bottom: 24, color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
            {profile.name}
          </div>
        </div>
      )}
    </>
  );
}
