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
        width: 52, height: 52, borderRadius: 14, flexShrink: 0,
        background: "linear-gradient(135deg, #002147 0%, #004080 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: 17, fontWeight: 700,
      }}>{initials}</div>
    );
  }
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <img src={photo} alt={name} style={{
        width: 52, height: 52, borderRadius: 14, objectFit: "cover", objectPosition: "top",
        display: "block", background: "#f0f0f0",
      }} onError={(e) => {
        e.target.style.display = "none";
        e.target.nextSibling.style.display = "flex";
      }} />
      <div style={{
        display: "none", width: 52, height: 52, borderRadius: 14, position: "absolute", inset: 0,
        background: "linear-gradient(135deg, #002147 0%, #004080 100%)",
        alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 17, fontWeight: 700,
      }}>{initials}</div>
    </div>
  );
}

export default function ProfileCard({ profile, onClick }) {
  return (
    <article
      onClick={() => onClick(profile)}
      className="flat-card fade-in"
      style={{ padding: "18px 18px 16px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 12 }}
    >
      {/* Header */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Avatar photo={profile.photo} name={profile.name} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.3 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--andi-gold)", marginTop: 2 }}>
            {profile.role}
          </div>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {profile.company} · {profile.sector}
          </div>
        </div>
      </div>

      {/* Bio */}
      <p style={{
        fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0,
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
      }}>
        {profile.bio}
      </p>

      {/* Certs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {profile.certifications.slice(0, 2).map((cert) => {
          const p = CERT_PALETTE[cert] || { bg: "#f3f4f6", color: "#374151" };
          return (
            <span key={cert} style={{
              fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 100,
              background: p.bg, color: p.color,
            }}>
              {cert}
            </span>
          );
        })}
        {profile.certifications.length > 2 && (
          <span style={{
            fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 100,
            background: "var(--bg)", color: "var(--text-tertiary)",
            border: "1px solid var(--border)",
          }}>
            +{profile.certifications.length - 2}
          </span>
        )}
      </div>

      {/* Skills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, borderTop: "1px solid var(--border)", paddingTop: 10 }}>
        {profile.skills.slice(0, 3).map((skill) => (
          <span key={skill} style={{
            fontSize: 11, color: "var(--text-secondary)",
            background: "var(--bg)", padding: "3px 9px", borderRadius: 100,
          }}>
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}
