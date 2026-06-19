import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";
import logo from "@/assets/logo.png";

export function Nav() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const links: { to: string; key: Parameters<typeof t>[0] }[] = [
    { to: "/", key: "nav_home" },
    { to: "/about", key: "nav_about" },
    { to: "/programs", key: "nav_programs" },
    { to: "/recruitment", key: "nav_recruit" },
    { to: "/images", key: "nav_images" },
    { to: "/contact", key: "nav_contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-navy-deep/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img
            src={logo}
            alt="Company logo"
            className="h-9 w-9 shrink-0 rounded-sm object-cover"
          />
          <div className="hidden min-w-0 leading-tight sm:block">
            <div className="truncate text-[11px] font-bold uppercase tracking-widest text-foreground">
              ខេមបូឌាន ស្ពីជ អាកឃ្យូរ៉េត​ ថាកថៀល ឯ.ក
            </div>
            <div className="khmer truncate text-[10px] text-gold">CAMBODIAN SPEED ACCURATE TACTIALCO.,LTD</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-gold" }}
              inactiveProps={{ className: "text-foreground/70 hover:text-foreground" }}
              className="text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors"
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Link
            to="/apply"
            className="hidden bg-gold px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-colors hover:bg-foreground sm:inline-block"
          >
            {t("apply_cta")}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center border border-white/10 text-foreground/80 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-navy-deep lg:hidden">
          <nav className="container-page flex flex-col py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-gold" }}
                className="py-2 text-sm font-semibold uppercase tracking-widest text-foreground/80"
              >
                {t(l.key)}
              </Link>
            ))}
            <Link
              to="/apply"
              onClick={() => setOpen(false)}
              className="mt-3 bg-gold px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-navy-deep"
            >
              {t("apply_cta")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
