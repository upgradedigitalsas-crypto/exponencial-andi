const base = import.meta.env.BASE_URL;

export default function Header() {
  return (
    <header className="nav-glass sticky top-0 z-30">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>

          {/* Logo imagen real */}
          <img
            src={`${base}logo-exponencial.png`}
            alt="Gobierno Corporativo Exponencial"
            style={{ height: 38, width: "auto", objectFit: "contain" }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12, color: "var(--text-tertiary)" }} className="hidden sm:block">
              Directorio · ANDI Antioquia
            </span>
            <span style={{
              fontSize: 11, fontWeight: 700, color: "var(--brand-purple)",
              background: "var(--brand-purple-light)", padding: "4px 12px",
              borderRadius: 100, border: "1px solid rgba(124,58,237,0.2)",
            }}>
              Cohorte 2025
            </span>
          </div>

        </div>
      </div>
    </header>
  );
}
