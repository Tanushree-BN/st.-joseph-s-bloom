import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Target, Eye, BookOpen } from "lucide-react";
import schoolBuilding from "@/assets/school-building.jpg";
import studentsClassroom from "@/assets/students-classroom.jpg";

const topConcerns = [
  "Class rooms with smart boards",
  "School transport facility",
  "Computer education",
  "Special Vedic Maths training",
  "Abacus coaching classes",
  "Yoga Classes",
  "Art and craft training",
  "Karate coaching",
  "Carnatic Music training",
  "Classical dance training",
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px]">
        <img src={schoolBuilding} alt="School Building" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground">About St Joseph Public School</h1>
            <p className="text-primary-foreground/80 font-body mt-2">Nurturing Excellence Since 1995</p>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Curriculum */}
      <section className="section-padding">
        <div className="container-school">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: "Our Vision",
                description: "St. Joseph Public School visualises 'light of the mind, light of the world' as our motto. Love as the pedagogy to realize the desired dreams and everything would be actualise through team work and mutual cooperation to be true in mind and to be true to the world."
              },
              {
                icon: Target,
                title: "Our Mission",
                description: "St. Joseph Public School is a nurturing ground to expand the horizon of wisdom so as to excel in everything we do and to expand the innovative quest for offering substantial and meticulous contribution to the people around us."
              },
              {
                icon: BookOpen,
                title: "Our Curriculum",
                description: "St. Joseph Public School follows ICSE syllabus so that the students can benefit from global standards and equip themselves to reach out the demands of the time from initial stage to their holistic and all round formation and development."
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-card rounded-xl p-8 text-center card-hover h-full">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-5">
                    <item.icon className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-secondary">{item.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed text-justify">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-accent/50">
        <div className="container-school">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <SectionHeading label="Our Story" title="A Tradition of Excellence" centered={false} />
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>St Joseph Public School, established in 1995, is an ICSE-affiliated institution located in the serene town of Narasimharajapura, Chikkamagaluru District, Karnataka.</p>
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

      {/* Our Top Concerns */}
      <section className="section-padding">
        <div className="container-school">
          <ScrollReveal>
            <SectionHeading label="What We Offer" title="Our Top Concerns" />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 max-w-4xl mx-auto">
            {topConcerns.map((concern, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div className="flex items-center gap-3 py-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0" />
                  <span className="font-body text-foreground font-medium">{concern}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <p className="text-center text-muted-foreground font-body leading-relaxed mt-10 max-w-4xl mx-auto">
              St. Joseph Public School is fully dedicated to St. Joseph our patron and guide who is an ever rejuvenating and excellent model for hard work and determination and a true icon who stands for justice and love.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default About;
