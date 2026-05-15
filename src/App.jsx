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
    <div className="fixed inset-0 z-40 flex" onClick={onClose}>
      <div className="absolute inset-0 bg-[#002147]/20 backdrop-blur-md" />
      <div className="relative ml-auto w-72 h-full overflow-y-auto p-5 glass-strong shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-[#002147]/90 text-sm">Filtros</h2>
          <button onClick={onClose} className="text-[#002147]/40 hover:text-[#002147]/80 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {hasActive && <button onClick={onClear} className="text-[10px] text-[#F4A024] font-semibold mb-4 block hover:text-[#c47d00] transition-colors">Limpiar filtros</button>}
        {[
          { key: "certifications", label: "Certificaciones", opts: CERT_OPTS },
          { key: "sectors", label: "Sector", opts: SECTOR_OPTS },
          { key: "roles", label: "Rol", opts: ROLE_OPTS },
        ].map(({ key, label, opts }) => (
          <div key={key} className="mb-5">
            <h3 className="text-[10px] font-bold text-[#002147]/35 uppercase tracking-[0.2em] mb-2.5">{label}</h3>
            <div className="space-y-1">
              {opts.map((opt) => {
                const active = filters[key].includes(opt);
                return (
                  <button key={opt}
                    onClick={() => { const c = filters[key]; onFilterChange(key, active ? c.filter((v) => v !== opt) : [...c, opt]); }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between gap-2 border ${active ? "bg-[#002147]/8 text-[#002147] border-[#002147]/20 font-semibold" : "text-[#002147]/50 hover:text-[#002147]/80 hover:bg-[#002147]/4 border-transparent"}`}
                  >
                    {opt}
                    {active && <svg className="w-3 h-3 shrink-0 text-[#F4A024]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
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

export default function App() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [selected, setSelected] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const hasActiveFilters = filters.certifications.length > 0 || filters.sectors.length > 0 || filters.roles.length > 0;

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return profiles.filter((p) => {
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.company.toLowerCase().includes(q) || p.role.toLowerCase().includes(q) || p.skills.some((s) => s.toLowerCase().includes(q)) || p.sector.toLowerCase().includes(q);
      const matchesCerts = filters.certifications.length === 0 || filters.certifications.some((c) => p.certifications.includes(c));
      const matchesSectors = filters.sectors.length === 0 || filters.sectors.includes(p.sector);
      const matchesRoles = filters.roles.length === 0 || filters.roles.includes(p.role);
      return matchesQuery && matchesCerts && matchesSectors && matchesRoles;
    });
  }, [query, filters]);

  const handleFilterChange = (key, values) => setFilters((prev) => ({ ...prev, [key]: values }));
  const clearFilters = () => { setFilters(EMPTY_FILTERS); setQuery(""); };
  const totalActive = filters.certifications.length + filters.sectors.length + filters.roles.length;

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: "linear-gradient(145deg, #eef2ff 0%, #f0f9ff 35%, #fdf4ff 65%, #f0fdf4 100%)" }}>

      {/* Ambient blobs — light mode */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{ position:"absolute", top:"-10%", left:"-5%", width:"45%", height:"45%", background:"radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", filter:"blur(60px)" }} />
        <div style={{ position:"absolute", top:"30%", right:"-10%", width:"40%", height:"40%", background:"radial-gradient(circle, rgba(244,160,36,0.10) 0%, transparent 70%)", filter:"blur(70px)" }} />
        <div style={{ position:"absolute", bottom:"5%", left:"20%", width:"35%", height:"35%", background:"radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%)", filter:"blur(60px)" }} />
        <div style={{ position:"absolute", bottom:"15%", right:"10%", width:"30%", height:"30%", background:"radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)", filter:"blur(50px)" }} />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <Header />
        <SearchBar value={query} onChange={setQuery} total={profiles.length} filtered={filtered.length} />

        {/* Hero */}
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-3xl px-8 py-7 shadow-md" style={{ boxShadow: "0 8px 32px rgba(10,33,99,0.08), inset 0 1px 0 rgba(255,255,255,1)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black text-[#002147] tracking-tight">
                    Directorio de Talento
                    <span className="text-[#F4A024]"> Exponencial</span>
                  </h1>
                  <p className="text-[#002147]/45 text-sm mt-2 max-w-lg leading-relaxed">
                    Conecta con líderes certificados del programa Exponencial ANDI — perfiles especializados listos para impulsar tu empresa.
                  </p>
                </div>
                <div className="flex gap-8 shrink-0">
                  {[{ val: profiles.length, label: "Perfiles" }, { val: 8, label: "Certificaciones" }, { val: 12, label: "Sectores" }].map(({ val, label }) => (
                    <div key={label} className="text-center">
                      <p className="text-4xl font-black text-[#002147]">{val}</p>
                      <p className="text-[11px] text-[#002147]/35 mt-0.5 uppercase tracking-widest">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex gap-5">
            <div className="hidden lg:block">
              <FilterPanel filters={filters} onFilterChange={handleFilterChange} onClear={clearFilters} hasActiveFilters={hasActiveFilters} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="lg:hidden flex items-center justify-between mb-4">
                <p className="text-sm text-[#002147]/40"><span className="font-bold text-[#002147]/70">{filtered.length}</span> perfiles</p>
                <button onClick={() => setMobileFiltersOpen(true)} className="flex items-center gap-2 text-sm font-medium text-[#002147]/70 glass px-4 py-2 rounded-xl shadow-sm hover:bg-white/80 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                  Filtros
                  {totalActive > 0 && <span className="bg-[#F4A024] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">{totalActive}</span>}
                </button>
              </div>

              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {[...filters.certifications, ...filters.sectors, ...filters.roles].map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 bg-[#002147]/8 text-[#002147] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#002147]/12">
                      {tag}
                      <button onClick={() => { const key = filters.certifications.includes(tag) ? "certifications" : filters.sectors.includes(tag) ? "sectors" : "roles"; handleFilterChange(key, filters[key].filter((v) => v !== tag)); }} className="hover:text-[#002147]/40 transition-colors ml-0.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <svg className="w-7 h-7 text-[#002147]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                  <h3 className="text-[#002147]/60 font-semibold mb-1">Sin resultados</h3>
                  <p className="text-[#002147]/35 text-sm mb-4">Intenta con otros términos o ajusta los filtros.</p>
                  <button onClick={clearFilters} className="text-sm text-[#F4A024] font-semibold hover:text-[#c47d00] transition-colors">Limpiar búsqueda</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {filtered.map((profile) => (
                    <ProfileCard key={profile.id} profile={profile} onClick={setSelected} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className="text-center text-[11px] text-[#002147]/25 py-8 tracking-widest uppercase">
          © {new Date().getFullYear()} Programa Exponencial · ANDI Seccional Antioquia
        </footer>
      </div>

      <MobileFilters filters={filters} onFilterChange={handleFilterChange} onClear={clearFilters} hasActive={hasActiveFilters} open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} />
      {selected && <ProfileModal profile={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
