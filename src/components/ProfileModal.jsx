import { useEffect } from "react";

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
      <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-[#002147] to-[#003d7a] flex items-center justify-center text-white text-3xl font-black shadow-lg">
        {initials}
      </div>
    );
  }
  return (
    <img src={photo} alt={name} className="w-28 h-28 rounded-3xl object-cover object-top shadow-lg ring-4 ring-white" />
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-[#002147]/20 backdrop-blur-md" />
      <div
        className="relative glass-strong rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: "0 25px 60px rgba(10,33,99,0.18), 0 0 0 1px rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner */}
        <div className="h-28 rounded-t-3xl relative overflow-hidden" style={{ background: "linear-gradient(135deg, #002147 0%, #003d7a 60%, #00539b 100%)" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 80% 50%, rgba(244,160,36,0.35) 0%, transparent 60%)" }} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white/80 hover:text-white transition-all border border-white/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute -bottom-14 left-6">
            <div className="ring-4 ring-white rounded-3xl shadow-xl">
              <Avatar photo={profile.photo} name={profile.name} />
            </div>
          </div>
        </div>

        <div className="pt-16 px-6 pb-8">
          {/* Identity */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-black text-[#002147]">{profile.name}</h2>
              <p className="text-[#F4A024] font-semibold text-base mt-0.5">{profile.role}</p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="text-[#002147]/60 text-sm">{profile.company}</span>
                <span className="text-[#002147]/20">·</span>
                <span className="text-[#002147]/40 text-sm">{profile.sector}</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-[#F4A024]/12 text-[#c47d00] text-xs font-bold px-3 py-1.5 rounded-full border border-[#F4A024]/25 shrink-0">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Exponencial ANDI
            </span>
          </div>

          <div className="h-px bg-[#002147]/6 mb-6" />

          <div className="mb-6">
            <h3 className="text-[10px] font-bold text-[#002147]/30 uppercase tracking-[0.2em] mb-2">Acerca de</h3>
            <p className="text-[#002147]/65 text-sm leading-relaxed">{profile.bio}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-[10px] font-bold text-[#002147]/30 uppercase tracking-[0.2em] mb-3">Certificaciones del Programa</h3>
            <div className="flex flex-wrap gap-2">
              {profile.certifications.map((cert) => (
                <span key={cert} className={`cert-tag inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${CERT_COLORS[cert] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {cert}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-[10px] font-bold text-[#002147]/30 uppercase tracking-[0.2em] mb-3">Habilidades Clave</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span key={skill} className="text-sm text-[#002147]/60 bg-[#002147]/5 border border-[#002147]/8 px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {(profile.linkedin || profile.email) && (
            <div className="border-t border-[#002147]/6 pt-5">
              <h3 className="text-[10px] font-bold text-[#002147]/30 uppercase tracking-[0.2em] mb-3">Contacto</h3>
              <div className="flex gap-3">
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-white bg-[#0A66C2] px-4 py-2 rounded-xl hover:bg-[#0956a8] transition-colors shadow-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
                {profile.email && (
                  <a href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 text-sm text-[#002147]/70 bg-[#002147]/6 px-4 py-2 rounded-xl hover:bg-[#002147]/10 transition-colors border border-[#002147]/8">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
