import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Microscope, Monitor, BookOpen, Dumbbell, Bus, Music, Palette, Brain, Swords, Theater, FlaskConical, Beaker, Atom, Building2 } from "lucide-react";
import scienceLab from "@/assets/img1/st phy lab.jpg";
import chemLab from "@/assets/img1/st chem lab.jpg";
import bioLab from "@/assets/img1/bio lab.jpg";
import computerLab from "@/assets/img1/st comp.jpg";
import library from "@/assets/img1/st lib new.jpg";
import sportsGround from "@/assets/img1/st playground.jpg";
import schoolBuilding from "@/assets/img1/st build.jpg";
import studentsClassroom from "@/assets/img1/classroom1.jpg";
import artClass from "@/assets/img1/art1.jpg";
import annualDay from "@/assets/img1/3.jpg";
import miniAuditorium from "@/assets/img1/st mini aud.jpg";
import conferenceRoom from "@/assets/img1/st con room.jpg";
import karate from "@/assets/img1/karr.jpeg";
import yoga from "@/assets/img1/yoga.jpg";
import classicalDance from "@/assets/img1/dance.jpg";
import carnaticMusic from "@/assets/img1/carnatic1.jpg";
import abacus from "@/assets/img1/abacus.jpg";
import transport from "@/assets/img1/bus.jpg";
import vedic from "@/assets/img1/vedic.jpg";
import smartBoard from "@/assets/img1/SmartBoard.jpg";

const infrastructure = [
  { image: schoolBuilding, title: "Main Building" },
  { image: studentsClassroom, title: "Academic Block" },
  { image: annualDay, title: "Auditorium Block" },
];

const allFacilities = [
  { icon: Monitor, title: "Class Rooms with Smart Boards", image: smartBoard },
  { icon: Brain, title: "Special Vedic Maths Training", image: vedic },
  { icon: Bus, title: "School Transport Facility", image: transport },
  { icon: Monitor, title: "Computer Laboratory", image: computerLab },
  { icon: Brain, title: "Abacus Coaching Classes", image: abacus },
  { icon: Palette, title: "Art and Craft Training", image: artClass },
  { icon: Music, title: "Carnatic Music Training", image: carnaticMusic },
  { icon: Dumbbell, title: "Yoga Classes", image: yoga },
  { icon: Theater, title: "Classical Dance Training", image: classicalDance },
  { icon: Swords, title: "Karate Coaching", image: karate },
  { icon: BookOpen, title: "Library", image: library },
  { icon: Dumbbell, title: "Playground", image: sportsGround },
  { icon: Building2, title: "Mini Auditorium", image: miniAuditorium },
  { icon: Building2, title: "Conference Room", image: conferenceRoom },
  { icon: FlaskConical, title: "Physics Laboratory", image: scienceLab },
  { icon: Beaker, title: "Chemistry Laboratory", image: chemLab },
  { icon: Atom, title: "Biology Laboratory", image: bioLab },
];

const Facilities = () => {
  return (
    <Layout>
      <section className="relative h-[40vh] min-h-[300px]">
        <img src={schoolBuilding} alt="Facilities" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground">Our Facilities</h1>
            <p className="text-primary-foreground/80 font-body mt-2">Modern Infrastructure for Modern Learning</p>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="section-padding">
        <div className="container-school">
          <ScrollReveal>
            <SectionHeading label="Infrastructure" title="Our Campus Buildings" description="Well-designed buildings that provide a conducive learning environment." />
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {infrastructure.map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="group rounded-xl overflow-hidden card-hover">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 font-display text-xl font-bold text-primary-foreground">{item.title}</h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="section-padding bg-accent/50">
        <div className="container-school">
          <ScrollReveal>
            <SectionHeading label="Facilities" title="What We Offer" description="Comprehensive facilities to support academic and co-curricular excellence." />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {allFacilities.map((f, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div className="group bg-card rounded-xl overflow-hidden card-hover">
                  <div className="relative h-40 overflow-hidden">
                    <img src={f.image} alt={f.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                      <f.icon className="w-4 h-4 text-secondary-foreground" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-sm font-semibold">{f.title}</h3>
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

export default Facilities;
