import { useState, useMemo } from "react";
import { profiles } from "./data/profiles";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import ProfileCard from "./components/ProfileCard";
import ProfileModal from "./components/ProfileModal";
import AboutSection from "./components/AboutSection";

const EMPTY_FILTERS = { certifications: [], sectors: [], roles: [] };
const CERT_OPTS = ["Liderazgo Exponencial","Transformación Digital","Innovación y Tendencias","Gestión del Cambio","Sostenibilidad Empresarial","Estrategia y Competitividad","Comunicación Ejecutiva","Mentalidad de Crecimiento"];
const SECTOR_OPTS = ["Tecnología","Consultoría","Manufactura","Energía","Logística","Marketing Digital","Legal","Retail / Moda","Gremio / Asociación","Biotecnología","Servicios Empresariales","Educación"];
const ROLE_OPTS = ["Gerente General","Director Comercial","Director de Innovación","Gerente de Operaciones","Director de Transformación Digital","Líder de Proyectos","Gerente de Talento Humano","Director Financiero","Fundador / CEO","Gerente de Sostenibilidad"];

/* Mobile filter drawer */
function MobileFilters({ filters, onFilterChange, onClear, hasActive, open, onClose }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 40, display: "flex" }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }} />
      <div
        style={{
          position: "relative", marginLeft: "auto", width: 300, height: "100%",
          overflowY: "auto", background: "#fff", padding: "20px 16px",
          boxShadow: "-16px 0 48px rgba(0,0,0,0.12)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>Filtros</span>
          <button onClick={onClose} style={{
            background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "50%",
            width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "var(--text-secondary)",
          }}>
            <svg style={{ width: 13, height: 13 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {hasActive && (
          <button onClick={onClear} style={{
            fontSize: 12, color: "var(--andi-gold)", fontWeight: 600,
            background: "none", border: "none", cursor: "pointer", fontFamily: "inherit",
            marginBottom: 16, padding: 0,
          }}>
            Limpiar filtros
          </button>
        )}
        {[
          { key: "certifications", label: "Certificaciones", opts: CERT_OPTS },
          { key: "sectors", label: "Sector", opts: SECTOR_OPTS },
          { key: "roles", label: "Rol", opts: ROLE_OPTS },
        ].map(({ key, label, opts }) => (
          <div key={key} style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 6, paddingLeft: 4 }}>
              {label}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {opts.map((opt) => {
                const active = filters[key].includes(opt);
                return (
                  <button key={opt}
                    onClick={() => { const c = filters[key]; onFilterChange(key, active ? c.filter(v => v !== opt) : [...c, opt]); }}
                    className={`filter-btn ${active ? "active" : ""}`}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {opt}
                    {active && (
                      <svg style={{ width: 12, height: 12, flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#a78bfa", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 5, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [selected, setSelected] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const hasActiveFilters = filters.certifications.length > 0 || filters.sectors.length > 0 || filters.roles.length > 0;
  const totalActive = filters.certifications.length + filters.sectors.length + filters.roles.length;

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return profiles.filter((p) => {
      const matchesQuery = !q || [p.name, p.company, p.role, p.sector, ...p.skills].some(s => s.toLowerCase().includes(q));
      const matchesCerts = !filters.certifications.length || filters.certifications.some(c => p.certifications.includes(c));
      const matchesSectors = !filters.sectors.length || filters.sectors.includes(p.sector);
      const matchesRoles = !filters.roles.length || filters.roles.includes(p.role);
      return matchesQuery && matchesCerts && matchesSectors && matchesRoles;
    });
  }, [query, filters]);

  const handleFilterChange = (key, values) => setFilters(prev => ({ ...prev, [key]: values }));
  const clearFilters = () => { setFilters(EMPTY_FILTERS); setQuery(""); };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Header />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #4C1D95 60%, #6D28D9 100%)", padding: "64px 20px 72px", position: "relative", overflow: "hidden" }}>

        {/* Apple-style noise grain overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
          opacity: 0.09,
          mixBlendMode: "overlay",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12, marginBottom: 52 }}>
            <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#f5f5f7", lineHeight: 1.1 }}>
              Directorio de Talento<br />
              <span style={{ color: "#a78bfa" }}>Exponencial</span>
            </h1>
            <p style={{ margin: 0, fontSize: "clamp(14px, 2vw, 17px)", color: "rgba(255,255,255,0.45)", maxWidth: 480, lineHeight: 1.65, fontWeight: 400 }}>
              Conecta con líderes certificados listos para impulsar la transformación de tu empresa.
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(24px, 5vw, 72px)", flexWrap: "wrap", alignItems: "center" }}>
            <StatCard value={profiles.length} label="Perfiles" />
            <div style={{ width: 1, background: "rgba(255,255,255,0.07)", alignSelf: "stretch", minHeight: 40 }} />
            <StatCard value="8" label="Certificaciones" />
            <div style={{ width: 1, background: "rgba(255,255,255,0.07)", alignSelf: "stretch", minHeight: 40 }} />
            <StatCard value="12" label="Sectores" />
            <div style={{ width: 1, background: "rgba(255,255,255,0.07)", alignSelf: "stretch", minHeight: 40 }} />
            <StatCard value="10+" label="Roles" />
          </div>
        </div>
      </section>

      <AboutSection />

      {/* Main */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px 80px" }}>

        {/* Search bar — full width, above filters+grid */}
        <div style={{ marginBottom: 24 }}>
          <SearchBar value={query} onChange={setQuery} total={profiles.length} filtered={filtered.length} />
        </div>

        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>

          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} onClear={clearFilters} hasActiveFilters={hasActiveFilters} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Mobile top bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }} className="lg:hidden">
              <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                <strong style={{ color: "var(--text-primary)" }}>{filtered.length}</strong> perfiles
              </span>
              <button onClick={() => setMobileFiltersOpen(true)} style={{
                display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600,
                color: "var(--text-primary)", background: "#fff",
                border: "1px solid var(--border)", padding: "7px 14px", borderRadius: 100,
                cursor: "pointer", fontFamily: "inherit",
              }}>
                <svg style={{ width: 13, height: 13 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filtros
                {totalActive > 0 && (
                  <span style={{
                    background: "var(--brand-purple)", color: "#fff",
                    fontSize: 10, fontWeight: 800, width: 17, height: 17,
                    borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {totalActive}
                  </span>
                )}
              </button>
            </div>

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {[...filters.certifications, ...filters.sectors, ...filters.roles].map((tag) => (
                  <span key={tag} style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    background: "var(--brand-purple)", color: "#fff",
                    fontSize: 11, fontWeight: 600, padding: "4px 10px 4px 12px", borderRadius: 100,
                  }}>
                    {tag}
                    <button onClick={() => {
                      const key = filters.certifications.includes(tag) ? "certifications" : filters.sectors.includes(tag) ? "sectors" : "roles";
                      handleFilterChange(key, filters[key].filter(v => v !== tag));
                    }} style={{
                      background: "rgba(255,255,255,0.18)", border: "none", borderRadius: "50%",
                      width: 15, height: 15, display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", padding: 0, color: "#fff",
                    }}>
                      <svg style={{ width: 8, height: 8 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
                <button onClick={clearFilters} style={{
                  fontSize: 12, color: "var(--text-secondary)", background: "none",
                  border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
                }}>
                  Limpiar todo
                </button>
              </div>
            )}

            {/* Results label */}
            <div style={{ marginBottom: 14 }}>
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                {hasActiveFilters || query
                  ? `${filtered.length} resultado${filtered.length !== 1 ? "s" : ""}`
                  : "Todos los perfiles"}
              </h2>
            </div>

            {/* Grid — 1 col mobile, 2 col tablet, 3 col large */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "72px 0" }}>
                <div className="flat-card" style={{ width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                  <svg style={{ width: 24, height: 24, color: "var(--text-tertiary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>Sin resultados</div>
                <div style={{ fontSize: 13, color: "var(--text-tertiary)", marginBottom: 18 }}>Ajusta los filtros o prueba con otro término.</div>
                <button onClick={clearFilters} style={{ fontSize: 13, fontWeight: 600, color: "var(--andi-navy)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  Limpiar búsqueda
                </button>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                gap: 12,
              }}
                className="sm:grid-cols-2 xl:grid-cols-3"
              >
                {filtered.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} onClick={setSelected} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Partner logos */}
      <section style={{ borderTop: "1px solid var(--border)", background: "#fff", padding: "40px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-tertiary)", textAlign: "center", marginBottom: 28 }}>
            Aliados del Programa
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(24px, 5vw, 60px)", flexWrap: "wrap" }}>
            {/* ANDI Antioquia */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.75 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#002147", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 9, fontWeight: 900, color: "#fff", letterSpacing: "0.04em" }}>ANDI</span>
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: "var(--text-secondary)", textAlign: "center", maxWidth: 80, lineHeight: 1.3 }}>ANDI Antioquia</span>
            </div>
            <div style={{ width: 1, height: 40, background: "var(--border)" }} />
            {/* ADF */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.75 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#1e3a5f", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 10, fontWeight: 900, color: "#fff", letterSpacing: "0.04em" }}>ADF</span>
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: "var(--text-secondary)", textAlign: "center", maxWidth: 80, lineHeight: 1.3 }}>ADF</span>
            </div>
            <div style={{ width: 1, height: 40, background: "var(--border)" }} />
            {/* Cámara de Comercio */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.75 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#c0392b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 8, fontWeight: 900, color: "#fff", letterSpacing: "0.02em", textAlign: "center", lineHeight: 1.2 }}>CCM</span>
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: "var(--text-secondary)", textAlign: "center", maxWidth: 80, lineHeight: 1.3 }}>Cámara de Comercio</span>
            </div>
            <div style={{ width: 1, height: 40, background: "var(--border)" }} />
            {/* CESA */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.75 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#6d28d9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 10, fontWeight: 900, color: "#fff", letterSpacing: "0.04em" }}>CESA</span>
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: "var(--text-secondary)", textAlign: "center", maxWidth: 80, lineHeight: 1.3 }}>CESA · Sello de Calidad</span>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "20px 20px", textAlign: "center", background: "var(--bg)" }}>
        <p style={{ margin: 0, fontSize: 12, color: "var(--text-tertiary)", letterSpacing: "0.04em" }}>
          © {new Date().getFullYear()} Programa Exponencial · ANDI Seccional Antioquia
        </p>
      </footer>

      <MobileFilters filters={filters} onFilterChange={handleFilterChange} onClear={clearFilters} hasActive={hasActiveFilters} open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} />
      {selected && <ProfileModal profile={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
