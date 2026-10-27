import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ActionBar } from "@/components/layout/ActionBar";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { TransitionProvider } from "@/components/motion/Transition";
import { Interactions } from "@/components/motion/Interactions";
import { PromoPopup } from "@/components/popup/PromoPopup";
import { business, hours, IS_LIVE, SITE_URL } from "@/content/site";

const fredoka = Fredoka({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-fredoka",
});

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

const description =
  "Funland Indoor Playground in Markham: a giant play structure for kids ages 1 to 13, a cozy toddler area, three party rooms, birthday party packages and private events. Rain or shine, the fun never stops!";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Funland Indoor Playground – The Best place to have fun!",
    template: "%s – Funland Indoor Playground",
  },
  description,
  applicationName: business.name,
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_CA",
    title: "Funland Indoor Playground – The Best place to have fun!",
    description,
    images: [{ url: "/images/play/hall-2.jpg", width: 1300, height: 867 }],
  },
  twitter: { card: "summary_large_image", title: "Funland Indoor Playground", description },
  alternates: { canonical: "/" },
  ...(IS_LIVE ? {} : { robots: { index: false, follow: false } }),
};

export const viewport: Viewport = {
  themeColor: "#fff8ee",
  colorScheme: "light",
};

/* Runs before first paint: flags JS (so reveal targets start hidden) and repeat
   visits in this session (so the intro loader is skipped). */
const preflight = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('funland-intro'))d.classList.add('intro-seen')}catch(e){}})();`;

function BusinessJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "AmusementPark",
    "@id": `${SITE_URL}/#business`,
    name: business.name,
    url: SITE_URL,
    image: `${SITE_URL}/images/play/hall-2.jpg`,
    logo: `${SITE_URL}/images/brand/funland-logo.png`,
    description,
    telephone: "+1-905-868-0888",
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.line1,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postal,
      addressCountry: "CA",
    },
    openingHoursSpecification: hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayIdx.map((d) => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d]),
      opens: h.open,
      closes: h.close,
    })),
    sameAs: [business.socials.facebook, business.socials.instagram],
    areaServed: business.serving.map((c) => ({ "@type": "City", name: c })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" suppressHydrationWarning className={`${fredoka.variable} ${nunito.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preflight }} />
        <BusinessJsonLd />
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[95] -translate-y-24 rounded-full border-[3px] border-ink bg-sun px-5 py-3 font-display font-semibold focus:translate-y-0"
        >
          Skip to content
        </a>
        <TransitionProvider>
          <SmoothScroll />
          <Interactions />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <ActionBar />
          <PromoPopup />
        </TransitionProvider>
      </body>
    </html>
  );
}
