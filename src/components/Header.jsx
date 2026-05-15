export default function Header() {
  return (
    <header className="glass sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-bold tracking-[0.35em] text-[#F4A024] uppercase">Programa</span>
              <span className="text-2xl font-black tracking-tight text-[#002147]">Exponencial</span>
            </div>
            <div className="h-7 w-px bg-[#002147]/10 hidden sm:block" />
            <span className="text-sm text-[#002147]/40 hidden sm:block font-medium tracking-wide">
              Directorio de Talento ANDI
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-[9px] text-[#002147]/30 uppercase tracking-widest">Impulsado por</p>
              <p className="text-sm font-bold text-[#002147]/80">ANDI Antioquia</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F4A024] to-[#e8880a] flex items-center justify-center font-black text-white text-[10px] shadow-md">
              ANDI
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
