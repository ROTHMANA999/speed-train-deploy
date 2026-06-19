import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import logo from "@/assets/logo.png";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-white/5 bg-navy-deep">
      <div className="container-page grid grid-cols-1 gap-12 py-16 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="CSAT Academy Logo"
              className="h-14 w-14 object-contain"
            />
            <div>
              <div className="font-display text-2x2 font-bold tracking-tight text-foreground">
                ខេមបូឌាន ស្ពីជ អាកឃ្យូរ៉េត​ ថាកថៀល ឯ.ក
              </div>
              <p className="khmer text-xs text-gold">
                CAMBODIAN SPEED ACCURATE TACTIALCO.,LTD
              </p>
            </div>
          </div>

          <p className="mt-4 max-w-xs text-xs leading-relaxed text-foreground/60">
            {t("brand_tag")}
          </p>
        </div>

        <div>
          <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
            {t("nav_programs")}
          </div>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/programs" hash="security-guard" className="text-foreground/70 hover:text-gold">
                Security Guard / សន្តិសុខ
              </Link>
            </li>
            <li>
              <Link to="/programs" hash="firefighting" className="text-foreground/70 hover:text-gold">
                Firefighting / ពន្លត់អគ្គីភ័យ
              </Link>
            </li>
            <li>
              <Link to="/programs" hash="drone-operation" className="text-foreground/70 hover:text-gold">
                Drone / ដ្រូន
              </Link>
            </li>
            <li>
              <Link to="/programs" hash="chinese-language" className="text-foreground/70 hover:text-gold">
                Chinese / ភាសាចិន
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
            {t("nav_contact")}
          </div>
          <ul className="space-y-2 text-xs text-foreground/70">
            <li>Phnom Penh, Cambodia</li>
            <li>+855 023 975 678</li>
            <li>cambodianspeed@gmail.com</li>
            <li>
              <a
                href="https://t.me/Combodia_ccc"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                Telegram:Combodia_ccc
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-6 text-[10px] uppercase tracking-widest text-foreground/40 md:flex-row md:items-center">
          <div>
            © {new Date().getFullYear()} Cambodian Speed Accurate Tactical Co., Ltd. — {t("footer_rights")}
          </div>
          <div>Training • Recruitment • Deployment</div>
        </div>
      </div>
    </footer>
  );
}