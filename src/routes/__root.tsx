import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { I18nProvider } from "../lib/i18n";
import { Nav } from "../components/site/Nav";
import { Footer } from "../components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-deep px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-gold">404</h1>
        <h2 className="mt-4 font-display text-xl font-semibold uppercase tracking-widest text-foreground">
          Position not found
        </h2>
        <p className="mt-2 text-sm text-foreground/60">
          The page you're looking for has been redeployed or doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-gold px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-colors hover:bg-foreground"
          >
            Return to HQ
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-deep px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold uppercase tracking-widest text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-foreground/60">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-gold px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-navy-deep"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-white/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground hover:bg-white/5"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    // derive site URL from environment when available so social previews use absolute URLs
    // fall back to a reasonable Netlify preview domain if not set
    const siteUrl = (import.meta.env.VITE_SITE_URL as string) ?? "https://cambodiaspeed.netlify.app";

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "CSAT Academy — Tactical Training & Workforce Deployment in Cambodia" },
        {
          name: "description",
          content:
            "Cambodian Speed Accurate Tactical Co., Ltd. — professional training in security, firefighting, drone operation, and Chinese language, with direct deployment to partner companies.",
        },
        { name: "author", content: "Cambodian Speed Accurate Tactical Co., Ltd." },
        { property: "og:title", content: "CSAT Academy — Tactical Training & Workforce Deployment" },
        {
          property: "og:description",
          content:
            "Professional workforce training and deployment academy in Cambodia. Security, firefighting, drone, and Chinese language programs.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: siteUrl },
        { property: "og:image", content: `${siteUrl}/logo.png` },
        { property: "og:image:alt", content: "CSAT Academy logo" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "CSAT Academy — Tactical Training & Deployment" },
        { name: "twitter:description", content: "Professional training and workforce deployment in Cambodia." },
        { name: "twitter:image", content: `${siteUrl}/logo.png` },
        { name: "theme-color", content: "#0b1220" },
      ],
      links: [
        { rel: "icon", href: "/logo.png" },
        { rel: "apple-touch-icon", href: "/logo.png" },
        { rel: "manifest", href: "/manifest.json" },
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500;600;700&family=Kantumruy+Pro:wght@400;500;700&display=swap",
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <div className="flex min-h-screen flex-col bg-navy-deep">
          <Nav />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </I18nProvider>
    </QueryClientProvider>
  );
}
