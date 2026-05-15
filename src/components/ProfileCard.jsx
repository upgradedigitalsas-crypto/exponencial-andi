const CERT_COLORS = {
  "Liderazgo Exponencial":       "bg-blue-50 text-blue-700 border-blue-200",
  "Transformación Digital":      "bg-violet-50 text-violet-700 border-violet-200",
  "Innovación y Tendencias":     "bg-amber-50 text-amber-700 border-amber-200",
  "Gestión del Cambio":          "bg-teal-50 text-teal-700 border-teal-200",
  "Sostenibilidad Empresarial":  "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Estrategia y Competitividad": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Comunicación Ejecutiva":      "bg-pink-50 text-pink-700 border-pink-200",
  "Mentalidad de Crecimiento":   "bg-orange-50 text-orange-700 border-orange-200",
};

function Avatar({ photo, name }) {
  const initials = name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
  if (!photo) {
    return (
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#002147] to-[#003d7a] flex items-center justify-center text-white text-lg font-bold shrink-0 shadow-md">
        {initials}
      </div>
    );
  }
  return (
    <div className="relative shrink-0">
      <img
        src={photo}
        alt={name}
        className="w-16 h-16 rounded-2xl object-cover object-top shadow-md ring-2 ring-white"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
      <div className="hidden w-16 h-16 rounded-2xl bg-gradient-to-br from-[#002147] to-[#003d7a] items-center justify-center text-white text-lg font-bold absolute inset-0 shadow-md">
        {initials}
      </div>
    </div>
  );
}

export default function ProfileCard({ profile, onClick }) {
  return (
    <article
      onClick={() => onClick(profile)}
      className="glass-card rounded-2xl p-4 flex flex-col gap-3 cursor-pointer shadow-sm"
    >
      <div className="flex gap-3 items-start">
        <Avatar photo={profile.photo} name={profile.name} />
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-[#002147]/95 text-sm leading-tight line-clamp-2">{profile.name}</h2>
          <p className="text-xs text-[#F4A024] font-semibold mt-0.5">{profile.role}</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <svg className="w-3 h-3 text-[#002147]/25 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-[11px] text-[#002147]/50 truncate">{profile.company}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <svg className="w-3 h-3 text-[#002147]/25 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-[11px] text-[#002147]/40">{profile.sector}</span>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-[#002147]/45 leading-relaxed line-clamp-2">{profile.bio}</p>

      <div className="flex flex-wrap gap-1">
        {profile.certifications.slice(0, 2).map((cert) => (
          <span key={cert} className={`cert-tag inline-flex items-center px-2 py-0.5 rounded-lg text-[9px] font-semibold border ${CERT_COLORS[cert] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
            ✓ {cert}
          </span>
        ))}
        {profile.certifications.length > 2 && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[9px] font-semibold bg-[#002147]/5 text-[#002147]/40 border border-[#002147]/8">
            +{profile.certifications.length - 2}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1 pt-2 border-t border-[#002147]/5">
        {profile.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="text-[10px] text-[#002147]/40 bg-[#002147]/4 px-2 py-0.5 rounded-full border border-[#002147]/6">
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}
