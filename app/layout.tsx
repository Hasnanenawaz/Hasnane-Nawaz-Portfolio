import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { GlobalEffects } from "@/components/portfolio/global-effects";
import { LoadingScreen } from "@/components/portfolio/loading-screen";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.person}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.person, url: siteConfig.url }],
  creator: siteConfig.person,
  keywords: siteConfig.keywords,
  icons: {
    icon: "/hasnane.png",
    shortcut: "/hasnane.png",
    apple: "/hasnane.png",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body className={`${fraunces.variable} ${spaceGrotesk.variable}`}>
        <LoadingScreen />
        <Script
          id="person-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteConfig.personSchema) }}
        />
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteConfig.websiteSchema) }}
        />
        <Script
          id="service-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteConfig.professionalServiceSchema) }}
        />
        <GlobalEffects />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
