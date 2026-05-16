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
        width: 64, height: 64, borderRadius: 16, flexShrink: 0,
        background: "linear-gradient(135deg, #002147 0%, #004080 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: 20, fontWeight: 700,
      }}>{initials}</div>
    );
  }
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <img src={photo} alt={name} style={{
        width: 64, height: 64, borderRadius: 16, objectFit: "cover", objectPosition: "top",
        display: "block", background: "#f0f0f0",
      }}
        onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
      <div style={{
        display: "none", width: 64, height: 64, borderRadius: 16, position: "absolute", inset: 0,
        background: "linear-gradient(135deg, #002147 0%, #004080 100%)",
        alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20, fontWeight: 700,
      }}>{initials}</div>
    </div>
  );
}

export default function ProfileCard({ profile, onClick }) {
  return (
    <article onClick={() => onClick(profile)} className="apple-card fade-in"
      style={{ padding: 20, cursor: "pointer", display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Header row */}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <Avatar photo={profile.photo} name={profile.name} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--apple-dark)", letterSpacing: "-0.02em", lineHeight: 1.3, marginBottom: 2 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--andi-gold)", marginBottom: 6 }}>
            {profile.role}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <svg style={{ width: 11, height: 11, color: "var(--apple-light)", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span style={{ fontSize: 11, color: "var(--apple-mid)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{profile.company}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <svg style={{ width: 11, height: 11, color: "var(--apple-light)", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span style={{ fontSize: 11, color: "var(--apple-light)" }}>{profile.sector}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p style={{ fontSize: 12, color: "var(--apple-mid)", lineHeight: 1.6, margin: 0,
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {profile.bio}
      </p>

      {/* Certifications */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {profile.certifications.slice(0, 2).map((cert) => {
          const p = CERT_PALETTE[cert] || { bg: "#f3f4f6", color: "#374151" };
          return (
            <span key={cert} className="pill" style={{ background: p.bg, color: p.color, padding: "3px 10px" }}>
              ✓ {cert}
            </span>
          );
        })}
        {profile.certifications.length > 2 && (
          <span className="pill" style={{ background: "rgba(0,0,0,0.05)", color: "var(--apple-mid)", padding: "3px 10px" }}>
            +{profile.certifications.length - 2} más
          </span>
        )}
      </div>

      {/* Skills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, paddingTop: 10, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        {profile.skills.slice(0, 3).map((skill) => (
          <span key={skill} style={{ fontSize: 11, color: "var(--apple-light)", background: "rgba(0,0,0,0.04)", padding: "3px 9px", borderRadius: 100 }}>
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}
