import { About } from "@/components/sections/about";
import { Approach } from "@/components/sections/approach";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { MarqueeSection } from "@/components/sections/marquee-section";
import { Projects } from "@/components/sections/projects";
import { Proof } from "@/components/sections/proof";
import { Skills } from "@/components/sections/skills";
import { Testimonials } from "@/components/sections/testimonials";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Who is Hasnane Nawaz?", acceptedAnswer: { "@type": "Answer", text: "A social media marketer and growth strategist based in Durg, Chhattisgarh, India. He builds engaged communities, generates qualified leads, and runs revenue-focused campaigns across Telegram, WhatsApp, Facebook, and Meta Ads." } },
      { "@type": "Question", name: "What results has he achieved?", acceptedAnswer: { "@type": "Answer", text: "He grew a Telegram and WhatsApp community from 10,000 to 50,000+ members in 4 months, raised monthly revenue from Rs. 40,000 to Rs. 3,10,000 in 2 months by managing 30 sales callers, scaled a legal-education community by 300% in 2 months, and grew a Facebook page from 1,000 to 7,000+ followers through Meta Ads." } },
      { "@type": "Question", name: "What services does he offer?", acceptedAnswer: { "@type": "Answer", text: "Social media marketing, community growth strategy, lead generation, content planning and copywriting, Meta Ads campaign management, CPC optimization, sales-team coordination, and ROI-focused execution." } },
    ],
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: siteConfig.personSchema,
    dateCreated: "2024-12-01",
    dateModified: new Date().toISOString().split("T")[0],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }} />
      <main>
        <Hero />
        <MarqueeSection />
        <About />
        <Approach />
        <Experience />
        <Skills />
        <Projects />
        <Proof />
        <Faq />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
