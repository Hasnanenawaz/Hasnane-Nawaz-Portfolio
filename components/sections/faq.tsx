"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Who is Hasnane Nawaz?",
    a: "A social media marketer and growth strategist based in Durg, Chhattisgarh, India. He builds engaged communities, generates qualified leads, and runs revenue-focused campaigns across Telegram, WhatsApp, Facebook, and Meta Ads. He's also pursuing BA LLB, which gives him a research and persuasion edge in content strategy.",
  },
  {
    q: "What results has he achieved?",
    a: "He grew a Telegram and WhatsApp community from 10,000 to 50,000+ members in 4 months, raised monthly revenue from Rs. 40,000 to Rs. 3,10,000 in 2 months by managing 30 sales callers, scaled a legal-education community by 300% in 2 months, and grew a Facebook page from 1,000 to 7,000+ followers through Meta Ads. He has run 20+ Meta ad campaigns; two visa campaigns at Stamp2Fly turned ₹4,000 of ad spend into ₹50,000 in revenue (12.5x return).",
  },
  {
    q: "Does he do SEO and AI search optimisation?",
    a: "Yes. As Marketing Executive at Yoga For Cure, he works on SEO, AEO (answer engine optimisation) and GEO (generative engine optimisation), so the site shows up on Google and in AI tools like ChatGPT and Perplexity.",
  },
  {
    q: "What services does he offer?",
    a: "Social media marketing, community growth strategy, lead generation, content planning and copywriting, Meta Ads campaign management, CPC optimization, sales-team coordination, and ROI-focused execution. He's open to full-time roles, internships, and freelance projects.",
  },
  {
    q: "Which companies has he worked with?",
    a: "Yoga For Cure (Marketing Executive), STAMP2FLY (Marketing & Sales Intern), Budding Mariners (Marketing & Sales Head), The Jus Anima (Social Media & Community Growth Manager), Voodaz (Marketing & Sales Head), and Cureable (Content Writer Intern).",
  },
  {
    q: "What makes him different?",
    a: "He combines the persuasion and research skills of a law student with the execution mindset of a sales operator. He doesn't just manage content, he builds repeatable systems around audience intent, lead capture, caller coordination, and conversion follow-through, producing measurable revenue outcomes.",
  },
];

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section className="section" id="faq" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <span className="label rv">FAQ</span>
        <h2 className="h2 rv rv-d1">
          Common <span className="serif">questions</span>, direct answers.
        </h2>
        <div className="faq rv rv-d2">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item${openIdx === i ? " open" : ""}`}>
              <button className="faq-q" aria-expanded={openIdx === i} onClick={() => toggle(i)}>
                {faq.q}
                <span className="ic" aria-hidden="true">+</span>
              </button>
              <div
                className="faq-a"
                style={{ maxHeight: openIdx === i ? "600px" : undefined }}
              >
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
