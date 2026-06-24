import { useRef, useEffect } from "react";
import { gsap } from "gsap";

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
        width: 46, height: 46, borderRadius: 13, flexShrink: 0,
        background: "linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: 15, fontWeight: 700,
        boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
      }}>{initials}</div>
    );
  }
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <img src={photo} alt={name} style={{
        width: 46, height: 46, borderRadius: 13, objectFit: "cover", objectPosition: "top",
        display: "block", background: "#f0f0f0",
        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
      }} onError={(e) => {
        e.target.style.display = "none";
        e.target.nextSibling.style.display = "flex";
      }} />
      <div style={{
        display: "none", width: 46, height: 46, borderRadius: 13, position: "absolute", inset: 0,
        background: "linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)",
        alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 15, fontWeight: 700,
        boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
      }}>{name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()}</div>
    </div>
  );
}

export default function ProfileCard({ profile, onClick, index = 0 }) {
  const cardRef = useRef(null);
  const delay = Math.min(index * 55, 420);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        rotationX: -y * 0.05,
        rotationY: x * 0.05,
        transformPerspective: 900,
        ease: "power2.out",
        duration: 0.45,
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        rotationX: 0,
        rotationY: 0,
        ease: "elastic.out(1, 0.4)",
        duration: 1.3,
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      onClick={() => onClick(profile)}
      className="pc-card fade-in"
      style={{ animationDelay: `${delay}ms`, cursor: "pointer" }}
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

      {/* Committees + cohort badge */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {profile.cohort === "2024" && (
          <span style={{
            fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 100,
            background: "#fef9c3", color: "#854d0e", border: "1px solid #fde68a",
          }}>
            Cohorte 2024
          </span>
        )}
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
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: 10, alignItems: "center" }}>
        {profile.skills.slice(0, 3).map((skill) => (
          <span key={skill} style={{
            fontSize: 11, color: "var(--text-secondary)",
            background: "rgba(0,0,0,0.04)", padding: "3px 9px", borderRadius: 100,
            backdropFilter: "blur(4px)",
          }}>{skill}</span>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 600, color: "var(--text-tertiary)", whiteSpace: "nowrap" }}>
          ⏱ {profile.availability}
        </span>
      </div>
    </article>
  );
}
