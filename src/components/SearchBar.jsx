export default function SearchBar({ value, onChange, total, filtered }) {
  return (
    <div className="nav-glass sticky top-[56px] z-20">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "10px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ position: "relative", flex: 1, maxWidth: 560 }}>
            <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "var(--text-tertiary)", pointerEvents: "none" }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Buscar nombre, empresa, rol o habilidad..."
              className="flat-input"
              style={{ width: "100%", padding: "9px 34px 9px 36px", fontSize: 14 }}
            />
            {value && (
              <button onClick={() => onChange("")} style={{
                position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                background: "var(--text-tertiary)", border: "none", borderRadius: "50%",
                width: 17, height: 17, display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#fff", padding: 0,
              }}>
                <svg style={{ width: 9, height: 9 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-tertiary)", whiteSpace: "nowrap", marginLeft: "auto" }}>
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{filtered}</span> de {total}
          </div>
        </div>
      </div>
    </div>
  );
}
