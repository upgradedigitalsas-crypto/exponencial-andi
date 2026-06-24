import { COMMITTEES, SECTORS, COHORTS } from "../data/profiles";

function FilterGroup({ title, options, selected, onToggle }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 6, paddingLeft: 4 }}>
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button key={opt} onClick={() => onToggle(opt)}
              className={`filter-btn ${active ? "active" : ""}`}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <span style={{ lineHeight: 1.35 }}>{opt}</span>
              {active && (
                <svg style={{ width: 12, height: 12, color: "rgba(255,255,255,0.7)", flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
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
    <aside style={{ width: 200, flexShrink: 0 }}>
      <div className="flat-card" style={{ padding: "16px 10px", position: "sticky", top: 112 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, padding: "0 4px" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>Filtros</span>
          {hasActiveFilters && (
            <button onClick={onClear} style={{ fontSize: 11, color: "var(--brand-purple)", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              Limpiar
            </button>
          )}
        </div>
        <FilterGroup title="Comités de Junta" options={COMMITTEES} selected={filters.committees} onToggle={(v) => toggle("committees", v)} />
        <FilterGroup title="Sector" options={SECTORS} selected={filters.sectors} onToggle={(v) => toggle("sectors", v)} />
        <FilterGroup title="Cohorte" options={COHORTS} selected={filters.cohorts} onToggle={(v) => toggle("cohorts", v)} />
      </div>
    </aside>
  );
}
