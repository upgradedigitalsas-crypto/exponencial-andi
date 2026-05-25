/* Logo SVG — fiel al brandbook: texto negro, curva púrpura */
function LogoMark() {
  return (
    <svg width="160" height="40" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* "GOBIERNO CORPORATIVO" */}
      <text x="0" y="11" fontFamily="-apple-system, 'Helvetica Neue', Arial, sans-serif"
        fontSize="7.5" fontWeight="600" letterSpacing="0.06em" fill="#4b5563">
        GOBIERNO CORPORATIVO
      </text>
      {/* "expo" */}
      <text x="0" y="33" fontFamily="-apple-system, 'Helvetica Neue', Arial, sans-serif"
        fontSize="22" fontWeight="900" letterSpacing="-0.03em" fill="#0f0f0f">
        expo
      </text>
      {/* Curva N exponencial en púrpura */}
      <g transform="translate(60, 6)">
        <path
          d="M6 24 C6 24 10 8 16 4 C22 0 22 0 28 20 C34 40 34 28 40 10"
          stroke="url(#purpleGrad)" strokeWidth="2.8" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
        />
        {/* Flecha */}
        <path d="M36 6 L40 10 L44 6" stroke="url(#purpleGrad)" strokeWidth="2.8"
          fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* Punto de flecha arriba */}
        <path d="M37.5 3.5 L40 10" stroke="url(#purpleGrad)" strokeWidth="2.8"
          fill="none" strokeLinecap="round" />
        <defs>
          <linearGradient id="purpleGrad" x1="6" y1="24" x2="44" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4C1D95"/>
            <stop offset="100%" stopColor="#9333EA"/>
          </linearGradient>
        </defs>
      </g>
      {/* "encial" — después de la curva */}
      <text x="107" y="33" fontFamily="-apple-system, 'Helvetica Neue', Arial, sans-serif"
        fontSize="22" fontWeight="900" letterSpacing="-0.03em" fill="#0f0f0f">
        encial
      </text>
    </svg>
  );
}

export default function Header() {
  return (
    <header className="nav-glass sticky top-0 z-30">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <LogoMark />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: "var(--text-tertiary)" }} className="hidden sm:block">
              Directorio · ANDI Antioquia
            </span>
            <span style={{
              fontSize: 11, fontWeight: 700, color: "var(--brand-purple)",
              background: "var(--brand-purple-light)", padding: "4px 12px",
              borderRadius: 100, border: "1px solid rgba(124,58,237,0.2)",
              letterSpacing: "0.02em",
            }}>
              Cohorte 2025
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
