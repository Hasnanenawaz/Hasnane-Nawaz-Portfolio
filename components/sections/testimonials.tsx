import { Quote } from "lucide-react";
import { testimonials } from "@/lib/portfolio-data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonials() {
  return (
    <section className="section-pad bg-muted/55">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="What managers and mentors say."
          />
        </Reveal>
        <div className="mt-12 grid gap-5">
          {testimonials.map((testimonial) => (
            <Reveal key={testimonial.name}>
              <figure className="brutal-card p-6 md:p-8">
                <Quote className="mb-6 h-10 w-10" />
                <blockquote className="text-base leading-8 text-muted-foreground md:text-lg">{testimonial.quote}</blockquote>
                <figcaption className="mt-6 border-t-2 border-foreground pt-4">
                  <p className="font-display text-xl font-black uppercase">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{testimonial.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
