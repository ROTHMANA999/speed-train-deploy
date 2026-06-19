import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react"; // ថែម Loader2 សម្រាប់បង្ហាញពេលកំពុងរង់ចាំ Database
import { useI18n } from "@/lib/i18n";
import { programs } from "@/lib/programs";
import { supabase } from "@/lib/supabase"; // 1. Import supabase client ដែលយើងបានបង្កើត

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply / Enroll — CSAT Academy" },
      { name: "description", content: "Apply to enroll in a CSAT Academy training program." },
      { property: "og:title", content: "Apply / Enroll — CSAT Academy" },
      { property: "og:description", content: "Submit your enrollment application." },
    ],
  }),
  component: ApplyPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name required").max(100),
  phone: z.string().trim().min(6, "Phone required").max(20),
  gender: z.enum(["male", "female"]),
  program: z.string().min(1, "Select a program"),
  address: z.string().trim().min(2, "Address required").max(300),
});

function ApplyPage() {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // 2. ថែម state សម្រាប់ loading
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 3. ដូរទៅជា async function ដើម្បីប្រើប្រាស់ await ជាមួយ Supabase
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      gender: String(fd.get("gender") ?? ""),
      program: String(fd.get("program") ?? ""),
      address: String(fd.get("address") ?? ""),
    };
    
    const res = schema.safeParse(data);
    if (!res.success) {
      const errs: Record<string, string> = {};
      for (const i of res.error.issues) errs[String(i.path[0])] = i.message;
      setErrors(errs);
      return;
    }
    
    setErrors({});
    setLoading(true); // បើក Loading ពេលចាប់ផ្តើមផ្ញើទៅ Database

    try {
      // 4. បញ្ជូនទិន្នន័យទៅកាន់ Supabase Table ឈ្មោះ 'applications'
      const { error } = await supabase
        .from("applications")
        .insert([res.data]); // res.data គឺដកស្រង់ចេញពី Zod validation រួចរាល់

      if (error) {
        throw error;
      }

      // បើជោគជ័យ និងគ្មាន error ទេ ប្តូរទៅ screen ជោគជ័យ
      setSubmitted(true);
    } catch (error: any) {
      console.error("Error inserting data:", error);
      alert("ការចុះឈ្មោះមានបញ្ហា: " + (error.message || "សូមព្យាយាមម្តងទៀត"));
    } finally {
      setLoading(false); // បិទ Loading វិញ ទោះបីជាជោគជ័យ ឬបរាជ័យ
    }
  };

  return (
    <>
      <section className="border-b border-white/5 bg-navy py-20">
        <div className="container-page">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{t("apply_cta")}</div>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            {t("apply_title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-foreground/70">{t("apply_lead")}</p>
        </div>
      </section>

      <section className="bg-navy-deep py-20">
        <div className="container-page max-w-3xl">
          {submitted ? (
            <div className="flex flex-col items-center border border-gold/30 bg-card p-12 text-center">
              <CheckCircle2 className="size-12 text-gold" />
              <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-foreground">
                Application Received
              </h2>
              <p className="mt-3 max-w-md text-sm text-foreground/70">{t("f_thanks")}</p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="grid grid-cols-1 gap-6 border border-white/10 bg-card p-8 md:grid-cols-2 md:p-10"
            >
              <Field label={t("f_name")} error={errors.name}>
                <input name="name" type="text" required maxLength={100} className="form-input" />
              </Field>
              
              <Field label={t("f_phone")} error={errors.phone}>
                <input name="phone" type="tel" required maxLength={20} className="form-input" />
              </Field>

              <Field label={t("f_gender")} error={errors.gender}>
                <div className="flex gap-6 py-3">
                  <label className="flex items-center gap-2 text-sm text-foreground/80">
                    <input type="radio" name="gender" value="male" required className="accent-gold" />
                    {t("f_male")}
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground/80">
                    <input type="radio" name="gender" value="female" className="accent-gold" />
                    {t("f_female")}
                  </label>
                </div>
              </Field>

              <Field label={t("f_program")} error={errors.program}>
                <select name="program" required className="form-input">
                  <option value="">—</option>
                  {programs.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.title.en} / {p.title.km}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="md:col-span-2">
                <Field label={t("f_address")} error={errors.address}>
                  <textarea name="address" required maxLength={300} rows={3} className="form-input resize-none" />
                </Field>
              </div>

              <div className="md:col-span-2">
                <Field label={t("f_id")}>
                  <input
                    name="id_file"
                    type="file"
                    accept="image/*,.pdf"
                    className="block w-full text-xs text-foreground/70 file:mr-3 file:cursor-pointer file:border-0 file:bg-gold file:px-4 file:py-2 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:text-navy-deep"
                  />
                </Field>
              </div>

              {/* 5. កែប្រែប៊ូតុង Submit ឱ្យដើរជាមួយ Loading state */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading} // បិទមិនឱ្យចុចដដែលៗពេលកំពុងផ្ញើទិន្នន័យ
                  className="w-full bg-gold py-4 text-xs font-bold uppercase tracking-[0.3em] text-navy-deep transition-colors hover:bg-foreground flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Please wait...
                    </>
                  ) : (
                    t("f_submit")
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <style>{`
        .form-input {
          width: 100%;
          background: var(--color-navy-deep);
          border: 1px solid oklch(1 0 0 / 0.1);
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: var(--color-foreground);
          outline: none;
          transition: border-color 150ms;
        }
        .form-input:focus { border-color: var(--color-gold); }
      `}</style>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/55">{label}</span>
      {children}
      {error && <span className="block text-[10px] font-medium text-destructive">{error}</span>}
    </label>
  );
}