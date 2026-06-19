import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

// CAR IMAGES
import car1 from "@/assets/car1.png";
import car2 from "@/assets/car2.png";
import car3 from "@/assets/car3.png";
import car4 from "@/assets/car4.png";
import car5 from "@/assets/car5.png";
import car6 from "@/assets/car6.png";
import car7 from "@/assets/car7.png";
import car8 from "@/assets/car8.png";

// LOGO IMAGES
import logoav1 from "@/assets/logoav1.png";
import logoav2 from "@/assets/logoav2.png";
import logohat from "@/assets/logohat.png";
import logohat2 from "@/assets/logohat2.png";
import logomoto from "@/assets/logomoto.png";

const carImages = [
  car1,
  car2,
  car3,
  car4,
  car5,
  car6,
  car7,
  car8,
];

const logoImages = [
  logoav1,
  logoav2,
  logohat,
  logohat2,
  logomoto,
];

export const Route = createFileRoute("/images")({
  head: () => ({
    meta: [
      { title: "Image Gallery — CSAT Academy" },
      {
        name: "description",
        content: "A responsive gallery showing cars and logos.",
      },
    ],
  }),
  component: ImagesPage,
});

function ImagesPage() {
  const { t } = useI18n();

  return (
    <>
      {/* HEADER */}
      <section className="border-b border-white/5 bg-navy py-20">
        <div className="container-page">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
            {t("nav_images")}
          </div>

          <h1 className="mt-3 font-display text-4xl font-bold uppercase text-foreground md:text-5xl">
            {t("images_title")}
          </h1>

          <p className="mt-4 max-w-2xl text-foreground/70">
            {t("images_lead")}
          </p>
        </div>
      </section>

      {/* CARS */}
      <section className="bg-navy-deep py-16">
        <div className="container-page">
          <h2 className="mb-6 text-xl font-bold uppercase tracking-widest text-gold">
            Cars
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {carImages.map((img, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-card"
              >
                <img
                  src={img}
                  alt="car"
                  className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="bg-navy py-16">
        <div className="container-page">
          <h2 className="mb-6 text-xl font-bold uppercase tracking-widest text-gold">
            Logos
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {logoImages.map((img, index) => (
              <div
                key={index}
                className="flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <img
                  src={img}
                  alt="logo"
                  className="h-24 w-auto object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}