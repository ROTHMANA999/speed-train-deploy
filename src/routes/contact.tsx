import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact CSAT Academy" },
      { name: "description", content: "Get in touch with CSAT Academy in Phnom Penh, Cambodia." },
      { property: "og:title", content: "Contact CSAT Academy" },
      { property: "og:description", content: "Phone, email, Telegram, and location for CSAT Academy." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(2).max(1000),
});

function ContactPage() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const res = schema.safeParse(data);
    if (!res.success) {
      const errs: Record<string, string> = {};
      for (const i of res.error.issues) errs[String(i.path[0])] = i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  };

  return (
    <>
      <section className="border-b border-white/5 bg-navy py-20">
        <div className="container-page">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{t("nav_contact")}</div>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            {t("contact_title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-foreground/70">{t("contact_lead")}</p>
        </div>
      </section>

      <section className="bg-navy-deep py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <InfoCard Icon={Phone} label={t("c_phone")} value="+855 (0) 12 345 678" />
            <InfoCard Icon={Mail} label={t("c_email")} value="info@csat-academy.com" />
            <InfoCard Icon={Send} label={t("c_telegram")} value="@CSAT_Academy" />
            <InfoCard Icon={MapPin} label={t("c_address")} value="Phnom Penh, Kingdom of Cambodia" />

            <div className="overflow-hidden border border-white/10">
              <iframe
                title="CSAT Academy location"
                src="https://www.google.com/maps?q=Phnom+Penh+Cambodia&output=embed"
                className="h-64 w-full grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div>
            {sent ? (
              <div className="flex flex-col items-center border border-gold/30 bg-card p-12 text-center">
                <CheckCircle2 className="size-12 text-gold" />
                <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-foreground">
                  Message Sent
                </h2>
                <p className="mt-3 max-w-md text-sm text-foreground/70">
                  Thank you. We will respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5 border border-white/10 bg-card p-8">
                <Field label={t("f_name")} error={errors.name}>
                  <input name="name" type="text" required maxLength={100} className="contact-input" />
                </Field>
                <Field label={t("c_email")} error={errors.email}>
                  <input name="email" type="email" required maxLength={255} className="contact-input" />
                </Field>
                <Field label={t("c_message")} error={errors.message}>
                  <textarea name="message" required maxLength={1000} rows={5} className="contact-input resize-none" />
                </Field>
                <button
                  type="submit"
                  className="w-full bg-gold py-4 text-xs font-bold uppercase tracking-[0.3em] text-navy-deep transition-colors hover:bg-foreground"
                >
                  {t("c_send")}
                </button>
              </form>
            )}
          </div>
        </div>
        <style>{`
          .contact-input {
            width: 100%;
            background: var(--color-navy-deep);
            border: 1px solid oklch(1 0 0 / 0.1);
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
            color: var(--color-foreground);
            outline: none;
            transition: border-color 150ms;
          }
          .contact-input:focus { border-color: var(--color-gold); }
        `}</style>
      </section>
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

function InfoCard({ Icon, label, value }: { Icon: typeof Phone; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 border border-white/5 bg-card p-5">
      <div className="grid size-10 shrink-0 place-items-center border border-gold/30 bg-gold/10">
        <Icon className="size-4 text-gold" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">{label}</div>
        <div className="mt-1 truncate text-sm text-foreground">{value}</div>
      </div>
    </div>
  );
}
