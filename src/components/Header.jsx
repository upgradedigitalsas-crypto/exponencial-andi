const base = import.meta.env.BASE_URL;

export default function Header() {
  return (
    <header className="nav-glass sticky top-0 z-30">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

          {/* Logo imagen real */}
          <img
            src={`${base}logo-exponencial.png`}
            alt="Gobierno Corporativo Exponencial"
            style={{ height: 60, width: "auto", objectFit: "contain" }}
            className="logo-header"
          />

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 12, color: "var(--text-tertiary)" }} className="hidden sm:block">
              Directorio · ANDI Antioquia
            </span>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--brand-purple)", lineHeight: 1 }}>
                Cohorte
              </span>
              <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text-primary)", lineHeight: 1 }}>
                2025
              </span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
