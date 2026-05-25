export default function SearchBar({ value, onChange, total, filtered }) {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <svg
        style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "var(--text-tertiary)", pointerEvents: "none" }}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar nombre, empresa, rol o habilidad..."
        className="flat-input"
        style={{ width: "100%", padding: "11px 100px 11px 40px", fontSize: 14 }}
      />
      {/* Counter badge inside input */}
      <div style={{
        position: "absolute", right: value ? 38 : 14, top: "50%", transform: "translateY(-50%)",
        fontSize: 12, color: "var(--text-tertiary)", whiteSpace: "nowrap", pointerEvents: "none",
      }}>
        <span style={{ fontWeight: 700, color: "var(--text-secondary)" }}>{filtered}</span>
        <span> / {total}</span>
      </div>
      {value && (
        <button onClick={() => onChange("")} style={{
          position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
          background: "var(--text-tertiary)", border: "none", borderRadius: "50%",
          width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#fff", padding: 0,
        }}>
          <svg style={{ width: 9, height: 9 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
