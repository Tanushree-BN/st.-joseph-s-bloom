import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { GraduationCap, Heart, Target, Eye } from "lucide-react";
import schoolBuilding from "@/assets/school-building.jpg";
import studentsClassroom from "@/assets/students-classroom.jpg";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px]">
        <img src={schoolBuilding} alt="School Building" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground">About Our School</h1>
            <p className="text-primary-foreground/80 font-body mt-2">Nurturing Excellence Since 1995</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-school">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <SectionHeading label="Our Story" title="A Tradition of Excellence" centered={false} />
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>St Joseph Public School, established in 1995, is a CBSE-affiliated institution located in the serene town of Narasimharajapura, Chikkamagaluru District, Karnataka.</p>
                <p>Founded with the vision of providing quality education to the children of this region, the school has grown from a small institution to one of the most respected educational establishments in the district.</p>
                <p>We are committed to fostering an environment where students are encouraged to explore, question, and innovate while being rooted in strong moral values and cultural heritage.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <img src={studentsClassroom} alt="Students" className="rounded-2xl shadow-xl" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding bg-accent/50">
        <div className="container-school">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Our Mission", description: "To provide holistic education that empowers students with knowledge, skills, and values to become responsible global citizens." },
              { icon: Eye, title: "Our Vision", description: "To be a center of excellence in education, nurturing creative thinkers and compassionate leaders of tomorrow." },
              { icon: Heart, title: "Our Values", description: "Integrity, respect, compassion, perseverance, and a commitment to lifelong learning guide everything we do." },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-card rounded-xl p-8 text-center card-hover">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-5">
                    <item.icon className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section-padding">
        <div className="container-school max-w-4xl">
          <ScrollReveal>
            <SectionHeading label="Our Journey" title="Milestones" description="Key moments that shaped St Joseph Public School." />
          </ScrollReveal>
          <div className="space-y-8">
            {[
              { year: "1995", event: "School founded with 50 students and a vision for quality education." },
              { year: "2002", event: "Received CBSE affiliation, marking a new chapter of academic excellence." },
              { year: "2010", event: "Expanded campus with new science labs, library, and sports facilities." },
              { year: "2018", event: "Inaugurated smart classrooms and computer lab with modern technology." },
              { year: "2024", event: "Celebrated 25+ years of nurturing young minds with 1500+ students." },
            ].map((m, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="flex gap-6 items-start">
                  <div className="shrink-0 w-20 h-20 rounded-xl bg-primary flex items-center justify-center">
                    <span className="font-display text-lg font-bold text-primary-foreground">{m.year}</span>
                  </div>
                  <div className="pt-2">
                    <GraduationCap className="w-5 h-5 text-secondary mb-2" />
                    <p className="text-muted-foreground font-body">{m.event}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
