import { useState, useMemo } from "react";
import { profiles } from "./data/profiles";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import ProfileCard from "./components/ProfileCard";
import ProfileModal from "./components/ProfileModal";

const EMPTY_FILTERS = { certifications: [], sectors: [], roles: [] };
const CERT_OPTS = ["Liderazgo Exponencial","Transformación Digital","Innovación y Tendencias","Gestión del Cambio","Sostenibilidad Empresarial","Estrategia y Competitividad","Comunicación Ejecutiva","Mentalidad de Crecimiento"];
const SECTOR_OPTS = ["Tecnología","Consultoría","Manufactura","Energía","Logística","Marketing Digital","Legal","Retail / Moda","Gremio / Asociación","Biotecnología","Servicios Empresariales","Educación"];
const ROLE_OPTS = ["Gerente General","Director Comercial","Director de Innovación","Gerente de Operaciones","Director de Transformación Digital","Líder de Proyectos","Gerente de Talento Humano","Director Financiero","Fundador / CEO","Gerente de Sostenibilidad"];

function MobileFilters({ filters, onFilterChange, onClear, hasActive, open, onClose }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 40, display: "flex" }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }} />
      <div style={{ position: "relative", marginLeft: "auto", width: 280, height: "100%", overflowY: "auto", background: "#fff", padding: 20, boxShadow: "-20px 0 60px rgba(0,0,0,0.15)" }}
        onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--apple-dark)" }}>Filtros</span>
          <button onClick={onClose} style={{ background: "rgba(0,0,0,0.06)", border: "none", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--apple-mid)" }}>
            <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {hasActive && <button onClick={onClear} style={{ fontSize: 12, color: "var(--andi-gold)", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", marginBottom: 16, padding: 0 }}>Limpiar filtros</button>}
        {[{ key: "certifications", label: "Certificaciones", opts: CERT_OPTS }, { key: "sectors", label: "Sector", opts: SECTOR_OPTS }, { key: "roles", label: "Rol", opts: ROLE_OPTS }].map(({ key, label, opts }) => (
          <div key={key} style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--apple-light)", marginBottom: 8, paddingLeft: 4 }}>{label}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {opts.map((opt) => {
                const active = filters[key].includes(opt);
                return (
                  <button key={opt} onClick={() => { const c = filters[key]; onFilterChange(key, active ? c.filter((v) => v !== opt) : [...c, opt]); }}
                    className={`filter-btn ${active ? "active" : ""}`}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {opt}
                    {active && <svg style={{ width: 13, height: 13, color: "var(--andi-gold)", flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
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
      <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--andi-gold)", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [selected, setSelected] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const hasActiveFilters = filters.certifications.length > 0 || filters.sectors.length > 0 || filters.roles.length > 0;

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return profiles.filter((p) => {
      const matchesQuery = !q || [p.name, p.company, p.role, p.sector, ...p.skills].some((s) => s.toLowerCase().includes(q));
      const matchesCerts = !filters.certifications.length || filters.certifications.some((c) => p.certifications.includes(c));
      const matchesSectors = !filters.sectors.length || filters.sectors.includes(p.sector);
      const matchesRoles = !filters.roles.length || filters.roles.includes(p.role);
      return matchesQuery && matchesCerts && matchesSectors && matchesRoles;
    });
  }, [query, filters]);

  const handleFilterChange = (key, values) => setFilters((prev) => ({ ...prev, [key]: values }));
  const clearFilters = () => { setFilters(EMPTY_FILTERS); setQuery(""); };
  const totalActive = filters.certifications.length + filters.sectors.length + filters.roles.length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--apple-bg)" }}>
      <Header />
      <SearchBar value={query} onChange={setQuery} total={profiles.length} filtered={filtered.length} />

      {/* Hero — Apple dark section */}
      <section style={{ background: "var(--apple-dark)", padding: "72px 24px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16, marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(244,160,36,0.15)", border: "1px solid rgba(244,160,36,0.25)", borderRadius: 100, padding: "5px 14px", marginBottom: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--andi-gold)" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--andi-gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Programa Exponencial · ANDI</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#f5f5f7", lineHeight: 1.1 }}>
              Directorio de Talento<br />
              <span style={{ color: "var(--andi-gold)" }}>Exponencial</span>
            </h1>
            <p style={{ margin: 0, fontSize: "clamp(15px, 2vw, 19px)", color: "rgba(255,255,255,0.5)", maxWidth: 540, lineHeight: 1.6, fontWeight: 400 }}>
              Conecta con líderes certificados listos para impulsar la transformación de tu empresa.
            </p>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(32px, 6vw, 80px)", flexWrap: "wrap" }}>
            <StatCard value={profiles.length} label="Perfiles" />
            <div style={{ width: 1, background: "rgba(255,255,255,0.08)", alignSelf: "stretch" }} />
            <StatCard value="8" label="Certificaciones" />
            <div style={{ width: 1, background: "rgba(255,255,255,0.08)", alignSelf: "stretch" }} />
            <StatCard value="12" label="Sectores" />
            <div style={{ width: 1, background: "rgba(255,255,255,0.08)", alignSelf: "stretch" }} />
            <StatCard value="10+" label="Roles" />
          </div>
        </div>
      </section>

      {/* Main content */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 80px" }}>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>

          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} onClear={clearFilters} hasActiveFilters={hasActiveFilters} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Mobile controls row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }} className="lg:hidden">
              <span style={{ fontSize: 13, color: "var(--apple-mid)" }}>
                <strong style={{ color: "var(--apple-dark)" }}>{filtered.length}</strong> perfiles
              </span>
              <button onClick={() => setMobileFiltersOpen(true)} style={{
                display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600,
                color: "var(--apple-dark)", background: "#fff", border: "1px solid rgba(0,0,0,0.08)",
                padding: "7px 14px", borderRadius: 100, cursor: "pointer", fontFamily: "inherit",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
                <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filtros
                {totalActive > 0 && (
                  <span style={{ background: "var(--andi-navy)", color: "#fff", fontSize: 10, fontWeight: 800, width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {totalActive}
                  </span>
                )}
              </button>
            </div>

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                {[...filters.certifications, ...filters.sectors, ...filters.roles].map((tag) => (
                  <span key={tag} style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: "var(--andi-navy)", color: "#fff",
                    fontSize: 12, fontWeight: 600, padding: "5px 12px 5px 14px", borderRadius: 100,
                  }}>
                    {tag}
                    <button onClick={() => {
                      const key = filters.certifications.includes(tag) ? "certifications" : filters.sectors.includes(tag) ? "sectors" : "roles";
                      handleFilterChange(key, filters[key].filter((v) => v !== tag));
                    }} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0, color: "#fff" }}>
                      <svg style={{ width: 8, height: 8 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
                <button onClick={clearFilters} style={{ fontSize: 12, color: "var(--apple-mid)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>
                  Limpiar todo
                </button>
              </div>
            )}

            {/* Results section label */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--apple-dark)" }}>
                {hasActiveFilters || query ? `${filtered.length} resultado${filtered.length !== 1 ? "s" : ""}` : "Todos los perfiles"}
              </h2>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <div className="apple-card" style={{ width: 64, height: 64, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <svg style={{ width: 28, height: 28, color: "var(--apple-light)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div style={{ fontSize: 17, fontWeight: 600, color: "var(--apple-dark)", marginBottom: 6 }}>Sin resultados</div>
                <div style={{ fontSize: 14, color: "var(--apple-light)", marginBottom: 20 }}>Ajusta los filtros o prueba con otro término.</div>
                <button onClick={clearFilters} style={{ fontSize: 14, fontWeight: 600, color: "var(--andi-navy)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  Limpiar búsqueda
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                {filtered.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} onClick={setSelected} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(0,0,0,0.06)", padding: "24px", textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: 12, color: "var(--apple-light)", letterSpacing: "0.05em" }}>
          © {new Date().getFullYear()} Programa Exponencial · ANDI Seccional Antioquia
        </p>
      </footer>

      <MobileFilters filters={filters} onFilterChange={handleFilterChange} onClear={clearFilters} hasActive={hasActiveFilters} open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} />
      {selected && <ProfileModal profile={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
