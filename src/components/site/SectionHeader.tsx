import type { ReactNode } from "react";

export function SectionHeader({
  kicker,
  title,
  subtitle,
  children,
  align = "left",
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={`mb-12 flex flex-col gap-2 ${align === "center" ? "items-center text-center" : ""}`}>
      {kicker && (
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
          <span className="inline-block h-px w-6 bg-gold/50" />
          {kicker}
        </div>
      )}
      <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">{title}</h2>
      {subtitle && <p className="khmer text-sm text-foreground/60">{subtitle}</p>}
      {children}
    </div>
  );
}
