import { useI18n } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useI18n();

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className="inline-flex items-center gap-1 rounded-sm border border-white/10 bg-white/[0.03] p-0.5"
    >
      <button
        type="button"
        onClick={() => setLang("km")}
        aria-pressed={lang === "km"}
        className={`flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors ${
          lang === "km" ? "bg-gold text-navy-deep" : "text-foreground/60 hover:text-foreground"
        }`}
      >
        <FlagKH /> KH
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors ${
          lang === "en" ? "bg-gold text-navy-deep" : "text-foreground/60 hover:text-foreground"
        }`}
      >
        <FlagUK /> EN
      </button>
    </div>
  );
}

function FlagKH() {
  return (
    <svg viewBox="0 0 18 12" className="h-3 w-4 rounded-[1px]" aria-hidden>
      <rect width="18" height="12" fill="#032ea1" />
      <rect y="3" width="18" height="6" fill="#e00025" />
      <rect x="7" y="5" width="4" height="2" fill="#fff" />
    </svg>
  );
}
function FlagUK() {
  return (
    <svg viewBox="0 0 18 12" className="h-3 w-4 rounded-[1px]" aria-hidden>
      <rect width="18" height="12" fill="#012169" />
      <path d="M0 0L18 12M18 0L0 12" stroke="#fff" strokeWidth="2" />
      <path d="M9 0V12M0 6H18" stroke="#fff" strokeWidth="3" />
      <path d="M9 0V12M0 6H18" stroke="#c8102e" strokeWidth="1.5" />
    </svg>
  );
}
