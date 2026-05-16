export default function Header() {
  return (
    <header className="nav-glass sticky top-0 z-30">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: "linear-gradient(135deg, #F4A024, #e8880a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 8, fontWeight: 900, color: "#fff", letterSpacing: "0.04em",
              flexShrink: 0,
            }}>ANDI</div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "var(--andi-gold)", textTransform: "uppercase", lineHeight: 1 }}>Programa</div>
              <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--andi-navy)", lineHeight: 1.1 }}>Exponencial</div>
            </div>
          </div>

          <span style={{ fontSize: 13, color: "var(--text-tertiary)", fontWeight: 400 }} className="hidden sm:block">
            Directorio de Talento · ANDI Antioquia
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              fontSize: 12, fontWeight: 600, color: "var(--andi-navy)",
              background: "var(--andi-navy-light)", padding: "5px 12px",
              borderRadius: 100, border: "1px solid rgba(0,33,71,0.12)",
            }} className="hidden sm:block">
              Cohorte 2025
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
