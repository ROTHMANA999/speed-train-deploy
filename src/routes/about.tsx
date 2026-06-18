import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Award } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CSAT Academy — Vision, Mission & Values" },
      {
        name: "description",
        content:
          "Learn about Cambodian Speed Accurate Tactical Co., Ltd., our vision and mission to train and deploy elite workforce in Cambodia.",
      },
      { property: "og:title", content: "About CSAT Academy" },
      { property: "og:description", content: "Vision, mission, and values of CSAT Academy." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  return (
    <>
      <section className="border-b border-white/5 bg-navy py-20">
        <div className="container-page">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">CSAT Academy</div>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            {t("about_title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-foreground/70">{t("about_overview")}</p>
        </div>
      </section>

      <section className="bg-navy-deep py-20">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <div className="border border-white/5 bg-card p-8">
            <Eye className="size-6 text-gold" />
            <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-foreground">
              {t("vision_title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">{t("vision_body")}</p>
          </div>
          <div className="border border-white/5 bg-card p-8">
            <Target className="size-6 text-gold" />
            <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-foreground">
              {t("mission_title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">{t("mission_body")}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-navy py-20">
        <div className="container-page">
          <SectionHeader
            kicker="Advantages"
            title={t("why_title")}
            subtitle="ហេតុអ្វីជ្រើសរើសយើង"
            align="center"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {([
              ["why_1_t", "why_1_b"],
              ["why_2_t", "why_2_b"],
              ["why_3_t", "why_3_b"],
            ] as const).map(([tk, bk]) => (
              <div key={tk} className="border border-white/5 bg-card p-8">
                <Award className="size-5 text-gold" />
                <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-wider text-foreground">
                  {t(tk)}
                </h3>
                <p className="mt-3 text-sm text-foreground/65">{t(bk)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
