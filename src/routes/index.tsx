import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Shield, Flame, Plane, Languages, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/hero-academy.jpg";
import { useI18n } from "@/lib/i18n";
import { programs } from "@/lib/programs";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CSAT Academy — Tactical Training & Deployment in Cambodia" },
      {
        name: "description",
        content:
          "Professional security, firefighting, drone, and Chinese language training with direct deployment to partner companies across Cambodia.",
      },
      { property: "og:title", content: "CSAT Academy — Tactical Training & Deployment" },
      {
        property: "og:description",
        content:
          "Bilingual training academy in Cambodia. Train, certify, and deploy with CSAT.",
      },
    ],
  }),
  component: HomePage,
});

const programIcons: Record<string, typeof Shield> = {
  "security-guard": Shield,
  firefighting: Flame,
  "drone-operation": Plane,
  "chinese-language": Languages,
};

function HomePage() {
  const { t, lang } = useI18n();

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="CSAT Academy tactical personnel in formation"
            className="h-full w-full object-cover opacity-50"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-transparent" />
        </div>

        <div className="container-page relative flex min-h-[88vh] flex-col justify-center py-24">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-3 border-l-2 border-gold pl-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                {t("hero_kicker")}
              </span>
            </div>
            <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-foreground md:text-7xl">
              {t("hero_title_1")}{" "}
              <span className="text-gold">{t("hero_title_2")}</span>
            </h1>
            <p className="khmer mt-6 text-base text-foreground/70 md:text-lg">
              {lang === "en" ? dictKm("hero_title_1") + " " + dictKm("hero_title_2") : "Training Elite Workforce"}
            </p>
            <div className="hairline my-8 max-w-xs" />
            <p className="max-w-xl text-base leading-relaxed text-foreground/75">{t("hero_lead")}</p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/apply"
                className="group inline-flex items-center gap-3 bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.25em] text-navy-deep transition-all hover:bg-foreground"
              >
                {t("apply_cta")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 border border-white/15 px-7 py-4 text-xs font-bold uppercase tracking-[0.25em] text-foreground transition-colors hover:bg-white/5"
              >
                {t("view_programs")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="border-y border-white/5 bg-navy">
        <div className="container-page grid gap-12 py-20 md:grid-cols-2">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
              {t("brand_tag")}
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
              {t("intro_title")}
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-foreground/75">{t("intro_body")}</p>
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
              {([
                ["04", "Programs"],
                ["KH+EN", "Bilingual"],
                ["100%", "Deployment"],
              ] as const).map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-2xl font-bold text-gold">{n}</div>
                  <div className="text-[10px] uppercase tracking-widest text-foreground/50">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-navy-deep py-24">
        <div className="container-page">
          <SectionHeader
            kicker={t("programs_kicker")}
            title={t("programs_kicker")}
            subtitle="កម្មវិធីបណ្តុះបណ្តាលជំនាញចំនួនបួន"
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {programs.map((p) => {
              const Icon = programIcons[p.slug] ?? Shield;
              return (
                <Link
                  key={p.slug}
                  to="/programs"
                  hash={p.slug}
                  className="group flex flex-col border border-white/5 bg-card p-6 transition-all hover:border-gold/50"
                >
                  <div className="mb-8 flex items-start justify-between">
                    <div className="grid size-12 place-items-center border border-gold/30 bg-gold/10">
                      <Icon className="size-5 text-gold" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-tighter text-foreground/40">
                      {p.code}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
                    {p.title.en}
                  </h3>
                  <p className="khmer mt-1 text-sm text-gold">{p.title.km}</p>
                  <p className="mt-4 text-xs leading-relaxed text-foreground/60">{p.short[lang]}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/50">
                      {t("duration")}: {p.duration[lang]}
                    </span>
                    <ArrowRight className="size-3.5 text-gold opacity-60 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="border-y border-white/5 bg-navy">
        <div className="container-page py-20">
          <SectionHeader
            kicker="Pipeline"
            title={t("workflow_title")}
            subtitle="ពីការបណ្តុះបណ្តាលដល់ការដាក់ការងារ"
            align="center"
          />
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { n: "01", k: t("step_train") },
              { n: "02", k: t("step_cert") },
              { n: "03", k: t("step_deploy") },
              { n: "04", k: t("step_partners") },
            ].map((s) => (
              <div key={s.n} className="border border-white/5 bg-card/50 p-6 text-center">
                <div className="font-display text-4xl font-bold text-gold/30">{s.n}</div>
                <div className="mt-2 font-display text-sm font-bold uppercase tracking-widest text-foreground">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why CTA */}
      <section className="bg-navy-deep py-24">
        <div className="container-page grid gap-12 md:grid-cols-2">
          <div>
            <SectionHeader kicker="Why CSAT" title={t("why_title")} subtitle="ហេតុអ្វីជ្រើសរើសយើង" />
            <ul className="space-y-5">
              {([["why_1_t", "why_1_b"], ["why_2_t", "why_2_b"], ["why_3_t", "why_3_b"]] as const).map(([tk, bk]) => (
                <li key={tk} className="flex gap-4">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" />
                  <div>
                    <div className="font-display font-bold uppercase tracking-wider text-foreground">{t(tk)}</div>
                    <div className="text-sm text-foreground/65">{t(bk)}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center border border-gold/20 bg-card p-10">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{t("apply_cta")}</div>
            <h3 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
              Ready to enroll?
            </h3>
            <p className="khmer mt-2 text-foreground/70">ត្រៀមខ្លួនចុះឈ្មោះហើយឬនៅ?</p>
            <p className="mt-4 text-sm text-foreground/65">
              Submit your application today. Our team will contact you to complete enrollment and confirm your program start date.
            </p>
            <Link
              to="/apply"
              className="mt-8 inline-flex w-fit items-center gap-3 bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.25em] text-navy-deep transition-colors hover:bg-foreground"
            >
              {t("apply_cta")} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// helper to get Khmer for a given dict key without changing current lang
import { dict } from "@/lib/i18n";
function dictKm(k: keyof typeof dict) {
  return dict[k].km;
}
