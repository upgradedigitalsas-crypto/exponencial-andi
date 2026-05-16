export default function Header() {
  return (
    <header className="nav-glass sticky top-0 z-30">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", color: "var(--andi-gold)", textTransform: "uppercase", marginBottom: 1 }}>
                Programa
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--andi-navy)" }}>
                Exponencial
              </div>
            </div>
            <div style={{ width: 1, height: 24, background: "rgba(0,0,0,0.1)" }} className="hidden sm:block" />
            <span style={{ fontSize: 13, color: "var(--apple-mid)", fontWeight: 400 }} className="hidden sm:block">
              Directorio de Talento ANDI
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ textAlign: "right" }} className="hidden md:block">
              <div style={{ fontSize: 9, color: "var(--apple-light)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Impulsado por</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--andi-navy)" }}>ANDI Antioquia</div>
            </div>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: "linear-gradient(135deg, #F4A024, #e8880a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9, fontWeight: 900, color: "#fff",
              letterSpacing: "0.05em",
              boxShadow: "0 2px 8px rgba(244,160,36,0.35)",
            }}>
              ANDI
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
