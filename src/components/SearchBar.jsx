export default function SearchBar({ value, onChange, total, filtered }) {
  return (
    <div className="glass sticky top-16 z-20 shadow-sm border-b border-[#002147]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-2xl w-full">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-[#002147]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Buscar por nombre, empresa, rol o habilidad..."
              className="glass-input w-full pl-11 pr-10 py-2.5 rounded-xl text-sm transition-all"
            />
            {value && (
              <button
                onClick={() => onChange("")}
                className="absolute inset-y-0 right-3 flex items-center text-[#002147]/30 hover:text-[#002147]/70 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <div className="text-sm text-[#002147]/40 whitespace-nowrap">
            <span className="font-bold text-[#002147]/80">{filtered}</span> de {total} perfiles
          </div>
        </div>
      </div>
    </div>
  );
}
