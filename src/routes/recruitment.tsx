import { createFileRoute, Link } from "@tanstack/react-router";
import { UserCheck, BadgeCheck, Send, Building2, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/recruitment")({
  head: () => ({
    meta: [
      { title: "Recruitment & Deployment — CSAT Academy" },
      {
        name: "description",
        content:
          "How CSAT Academy moves trainees from enrollment to certified placement with partner companies across Cambodia.",
      },
      { property: "og:title", content: "Recruitment & Deployment — CSAT Academy" },
      {
        property: "og:description",
        content: "Training → Certification → Deployment → Partner Companies.",
      },
    ],
  }),
  component: RecruitmentPage,
});

const steps = [
  {
    Icon: UserCheck,
    n: "01",
    titleKey: "step_train" as const,
    body: {
      en: "Trainees complete an intensive, discipline-focused curriculum led by experienced instructors at our facility.",
      km: "សិក្ខាកាមឆ្លងកាត់កម្មវិធីបណ្តុះបណ្តាលប្រកបដោយវិន័យជាមួយគ្រូបង្គោលដែលមានបទពិសោធន៍។",
    },
  },
  {
    Icon: BadgeCheck,
    n: "02",
    titleKey: "step_cert" as const,
    body: {
      en: "Successful trainees receive a formal CSAT certificate validating their skills and readiness.",
      km: "សិក្ខាកាមជោគជ័យទទួលបានវិញ្ញាបនប័ត្រផ្លូវការពី CSAT។",
    },
  },
  {
    Icon: Send,
    n: "03",
    titleKey: "step_deploy" as const,
    body: {
      en: "We deploy certified personnel to partner sites, matched by skill set, language ability, and location.",
      km: "យើងដាក់ពង្រាយបុគ្គលិកដែលមានវិញ្ញាបនប័ត្រទៅកាន់ទីតាំងដៃគូ។",
    },
  },
  {
    Icon: Building2,
    n: "04",
    titleKey: "step_partners" as const,
    body: {
      en: "Partner companies receive vetted, trained personnel ready for active duty from day one.",
      km: "ក្រុមហ៊ុនដៃគូទទួលបានបុគ្គលិកបានបណ្តុះបណ្តាល ត្រៀមរួចសម្រាប់ការបំពេញការងារ។",
    },
  },
];

function RecruitmentPage() {
  const { t, lang } = useI18n();

  return (
    <>
      <section className="border-b border-white/5 bg-navy py-20">
        <div className="container-page">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Pipeline</div>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            {t("recruit_title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-foreground/70">{t("recruit_lead")}</p>
        </div>
      </section>

      <section className="bg-navy-deep py-20">
        <div className="container-page">
          <SectionHeader kicker="Workflow" title={t("workflow_title")} subtitle="ដំណើរការបួនជំហាន" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="flex flex-col border border-white/5 bg-card p-6">
                <div className="flex items-center justify-between">
                  <div className="grid size-12 place-items-center border border-gold/30 bg-gold/10">
                    <s.Icon className="size-5 text-gold" />
                  </div>
                  <span className="font-display text-3xl font-bold text-gold/30">{s.n}</span>
                </div>
                <div className="mt-6 font-display text-lg font-bold uppercase tracking-wider text-foreground">
                  {t(s.titleKey)}
                </div>
                <p className="mt-3 text-sm text-foreground/65">{s.body[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-navy py-20">
        <div className="container-page grid gap-12 md:grid-cols-2">
          <div>
            <SectionHeader kicker="Job Matching" title={t("match_title")} subtitle="ការផ្គូផ្គងការងារ" />
            <p className="text-base leading-relaxed text-foreground/75">{t("match_body")}</p>
          </div>
          <div className="border border-gold/20 bg-card p-10">
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
              Are you a partner company?
            </h3>
            <p className="mt-3 text-sm text-foreground/70">
              Reach out to discuss workforce needs. We supply trained, certified personnel for security,
              safety, drone, and bilingual roles across Cambodia.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-3 bg-gold px-6 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-navy-deep hover:bg-foreground"
            >
              Contact Us <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
