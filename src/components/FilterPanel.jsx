import { CERTIFICATIONS, SECTORS, ROLES } from "../data/profiles";

function FilterGroup({ title, options, selected, onToggle }) {
  return (
    <div className="mb-5">
      <h3 className="text-[10px] font-bold text-[#002147]/35 uppercase tracking-[0.2em] mb-2.5">{title}</h3>
      <div className="space-y-1">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => onToggle(opt)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between gap-2 border ${
                active
                  ? "bg-[#002147]/8 text-[#002147] border-[#002147]/20 font-semibold"
                  : "text-[#002147]/50 hover:text-[#002147]/80 hover:bg-[#002147]/4 border-transparent"
              }`}
            >
              <span className="leading-tight">{opt}</span>
              {active && (
                <svg className="w-3 h-3 shrink-0 text-[#F4A024]" fill="currentColor" viewBox="0 0 20 20">
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
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange(key, updated);
  };

  return (
    <aside className="w-56 shrink-0">
      <div className="glass rounded-2xl p-4 sticky top-[105px] shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[#002147]/90 text-sm tracking-tight">Filtros</h2>
          {hasActiveFilters && (
            <button
              onClick={onClear}
              className="text-[10px] text-[#F4A024] font-semibold hover:text-[#c47d00] transition-colors"
            >
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
