import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Shield, Flame, Plane, Languages, Clock, ListChecks, Briefcase, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { programs } from "@/lib/programs";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Training Programs — CSAT Academy" },
      {
        name: "description",
        content:
          "Four professional training tracks: Security Guard, Firefighting, Drone Operation, and Chinese Language — taught bilingually in Cambodia.",
      },
      { property: "og:title", content: "Training Programs — CSAT Academy" },
      { property: "og:description", content: "Security, firefighting, drone, and Chinese language training." },
    ],
  }),
  component: ProgramsPage,
});

const icons: Record<string, typeof Shield> = {
  "security-guard": Shield,
  firefighting: Flame,
  "drone-operation": Plane,
  "chinese-language": Languages,
};

function ProgramsPage() {
  const { t, lang } = useI18n();

  // smooth scroll to hash on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }, []);

  return (
    <>
      <section className="border-b border-white/5 bg-navy py-20">
        <div className="container-page">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{t("programs_kicker")}</div>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            Training Programs
          </h1>
          <p className="khmer mt-2 text-lg text-foreground/70">កម្មវិធីបណ្តុះបណ្តាល</p>
          <p className="mt-4 max-w-2xl text-base text-foreground/65">{t("programs_lead")}</p>

          <nav className="mt-8 flex flex-wrap gap-2">
            {programs.map((p) => (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                className="border border-white/10 bg-card/50 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-foreground/70 transition-colors hover:border-gold/50 hover:text-gold"
              >
                {p.code} · {p.title.en}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {programs.map((p, i) => {
        const Icon = icons[p.slug] ?? Shield;
        return (
          <section
            key={p.slug}
            id={p.slug}
            className={`scroll-mt-20 border-b border-white/5 py-20 ${i % 2 === 0 ? "bg-navy-deep" : "bg-navy"}`}
          >
            <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <div className="grid size-16 place-items-center border border-gold/30 bg-gold/10">
                  <Icon className="size-7 text-gold" />
                </div>
                <div className="mt-6 font-mono text-[10px] uppercase tracking-widest text-gold">{p.code}</div>
                <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
                  {p.title.en}
                </h2>
                <p className="khmer mt-2 text-lg text-foreground/70">{p.title.km}</p>

                <div className="mt-8 inline-flex items-center gap-3 border border-gold/30 bg-card/50 px-4 py-3">
                  <Clock className="size-4 text-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">
                    {t("duration")}
                  </span>
                  <span className="text-sm font-semibold text-foreground">{p.duration[lang]}</span>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-base leading-relaxed text-foreground/80">{p.description.en}</p>
                  <p className="khmer mt-4 text-base leading-loose text-foreground/65">{p.description.km}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="border border-white/5 bg-card p-6">
                    <div className="flex items-center gap-2">
                      <ListChecks className="size-4 text-gold" />
                      <div className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
                        {t("requirements")}
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {p.requirements.map((r) => (
                        <li key={r.en} className="flex gap-2 text-sm text-foreground/75">
                          <span className="mt-1.5 size-1.5 shrink-0 bg-gold" />
                          <span>{r[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border border-white/5 bg-card p-6">
                    <div className="flex items-center gap-2">
                      <Briefcase className="size-4 text-gold" />
                      <div className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
                        {t("careers")}
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {p.careers.map((c) => (
                        <li key={c.en} className="flex gap-2 text-sm text-foreground/75">
                          <span className="mt-1.5 size-1.5 shrink-0 bg-gold" />
                          <span>{c[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  to="/apply"
                  className="inline-flex items-center gap-3 bg-gold px-6 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-navy-deep transition-colors hover:bg-foreground"
                >
                  {t("apply_cta")} <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
