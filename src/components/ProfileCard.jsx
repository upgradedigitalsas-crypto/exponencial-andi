const CERT_PALETTE = {
  "Estrategia e innovación":         { bg: "#ede9fe", color: "#5b21b6" },
  "Transformación digital":          { bg: "#e0e7ff", color: "#3730a3" },
  "Auditoría y riesgo":              { bg: "#fef3c7", color: "#92400e" },
  "Sostenibilidad y ASG":            { bg: "#d1fae5", color: "#065f46" },
  "Compensación y talento":          { bg: "#fce7f3", color: "#9d174d" },
  "Legal":                           { bg: "#f0fdf4", color: "#166534" },
  "Nuevos negocios":                 { bg: "#ffedd5", color: "#9a3412" },
  "Procesos":                        { bg: "#f3e8ff", color: "#6d28d9" },
  "Inclusión, diversidad y equidad": { bg: "#fdf2f8", color: "#701a75" },
};

function Avatar({ photo, name }) {
  const initials = name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
  if (!photo) {
    return (
      <div style={{
        width: 52, height: 52, borderRadius: 14, flexShrink: 0,
        background: "linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)",
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
        background: "linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)",
        alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 17, fontWeight: 700,
      }}>{name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()}</div>
    </div>
  );
}

export default function ProfileCard({ profile, onClick, index = 0 }) {
  const delay = Math.min(index * 55, 420);
  return (
    <article
      onClick={() => onClick(profile)}
      className="flat-card fade-in"
      style={{ padding: "18px 18px 16px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 12, animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Avatar photo={profile.photo} name={profile.name} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.3 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--brand-purple)", marginTop: 2 }}>
            {profile.role}
          </div>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {profile.company} · {profile.city}
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

      {/* Committees */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {profile.committees.slice(0, 2).map((c) => {
          const p = CERT_PALETTE[c] || { bg: "#f3f4f6", color: "#374151" };
          return (
            <span key={c} style={{
              fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 100,
              background: p.bg, color: p.color,
            }}>
              {c}
            </span>
          );
        })}
        {profile.committees.length > 2 && (
          <span style={{
            fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 100,
            background: "var(--bg)", color: "var(--text-tertiary)", border: "1px solid var(--border)",
          }}>
            +{profile.committees.length - 2}
          </span>
        )}
      </div>

      {/* Skills + availability */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, borderTop: "1px solid var(--border)", paddingTop: 10, alignItems: "center" }}>
        {profile.skills.slice(0, 3).map((skill) => (
          <span key={skill} style={{
            fontSize: 11, color: "var(--text-secondary)",
            background: "var(--bg)", padding: "3px 9px", borderRadius: 100,
          }}>{skill}</span>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 600, color: "var(--text-tertiary)", whiteSpace: "nowrap" }}>
          ⏱ {profile.availability}
        </span>
      </div>
    </article>
  );
}
