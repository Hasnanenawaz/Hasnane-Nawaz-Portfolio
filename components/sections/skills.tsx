import { skillGroups } from "@/lib/portfolio-data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Skills() {
  return (
    <section id="skills" className="section-pad">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Skills"
            title="Built for growth work that touches content, community, and sales."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.06}>
              <article className="brutal-card h-full p-5">
                <h3 className="border-b-2 border-foreground pb-4 font-display text-xl font-black uppercase md:text-3xl">
                  {group.title}
                </h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  {group.items.map((skill) => (
                    <span key={skill} className="border-2 border-foreground bg-muted px-3 py-2 text-sm font-bold">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
