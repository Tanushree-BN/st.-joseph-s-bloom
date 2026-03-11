import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { BookOpen, Calculator, FlaskConical, Globe, Palette, Dumbbell } from "lucide-react";
import studentsClassroom from "@/assets/img1/classroom1.jpg";

const programs = [
  { icon: BookOpen, title: "Primary (I-V)", subjects: ["English", "Hindi", "Kannada", "Mathematics", "EVS", "Computer Science", "Art & Craft"] },
  { icon: Calculator, title: "Middle School (VI-VIII)", subjects: ["English", "Hindi", "Kannada", "Mathematics", "Science", "Social Science", "Computer Science"] },
  { icon: FlaskConical, title: "Secondary (IX-X)", subjects: ["English", "Hindi/Kannada", "Mathematics", "Science", "Social Science", "IT/Computer"] },
];

const Academics = () => {
  return (
    <Layout>
      <section className="relative h-[40vh] min-h-[300px]">
        <img src={studentsClassroom} alt="Academics" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground">Academics</h1>
            <p className="text-primary-foreground/80 font-body mt-2">CBSE Curriculum | Grades I to X</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-school">
          <ScrollReveal>
            <SectionHeading label="Programs" title="Academic Programs" description="Comprehensive curriculum designed for holistic learning." />
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((prog, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-card rounded-xl p-6 card-hover">
                  <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4">
                    <prog.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-4">{prog.title}</h3>
                  <ul className="space-y-2">
                    {prog.subjects.map((sub, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Co-curricular */}
      <section className="section-padding bg-accent/50">
        <div className="container-school">
          <ScrollReveal>
            <SectionHeading label="Beyond Academics" title="Co-Curricular Activities" description="We believe in the all-round development of every student." />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Palette, title: "Arts & Culture", desc: "Drawing, painting, music, dance, and drama activities." },
              { icon: Dumbbell, title: "Sports & Games", desc: "Cricket, football, basketball, athletics, and yoga." },
              { icon: Globe, title: "Clubs & Societies", desc: "Science club, eco club, literary club, and social service." },
              { icon: FlaskConical, title: "Science Exhibitions", desc: "Annual science fairs showcasing student innovation." },
              { icon: BookOpen, title: "Quiz & Debates", desc: "Inter-school and intra-school competitions." },
              { icon: Calculator, title: "Olympiads", desc: "Participation in national and international olympiads." },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="bg-card rounded-xl p-6 card-hover group">
                  <item.icon className="w-8 h-8 text-secondary mb-3" />
                  <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Academics;
