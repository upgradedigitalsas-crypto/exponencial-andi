import { CERTIFICATIONS, SECTORS, ROLES } from "../data/profiles";

function FilterGroup({ title, options, selected, onToggle }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--apple-light)", marginBottom: 8, paddingLeft: 12 }}>
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button key={opt} onClick={() => onToggle(opt)}
              className={`filter-btn ${active ? "active" : ""}`}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <span style={{ lineHeight: 1.35 }}>{opt}</span>
              {active && (
                <svg style={{ width: 13, height: 13, color: "var(--andi-gold)", flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function FilterPanel({ filters, onFilterChange, onClear, hasActiveFilters }) {
  const toggle = (key, value) => {
    const current = filters[key];
    onFilterChange(key, current.includes(value) ? current.filter((v) => v !== value) : [...current, value]);
  };

  return (
    <aside style={{ width: 210, flexShrink: 0 }}>
      <div className="apple-card" style={{ padding: "20px 12px", position: "sticky", top: 106 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, padding: "0 12px" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "var(--apple-dark)", letterSpacing: "-0.02em" }}>Filtros</span>
          {hasActiveFilters && (
            <button onClick={onClear} style={{ fontSize: 12, color: "var(--andi-gold)", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              Limpiar
            </button>
          )}
        </div>
        <FilterGroup title="Certificaciones" options={CERTIFICATIONS} selected={filters.certifications} onToggle={(v) => toggle("certifications", v)} />
        <FilterGroup title="Sector" options={SECTORS} selected={filters.sectors} onToggle={(v) => toggle("sectors", v)} />
        <FilterGroup title="Rol" options={ROLES} selected={filters.roles} onToggle={(v) => toggle("roles", v)} />
      </div>
    </aside>
  );
}
