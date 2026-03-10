import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Microscope, Monitor, Library as LibIcon, Dumbbell, Bus, Utensils } from "lucide-react";
import scienceLab from "@/assets/science-lab.jpg";
import computerLab from "@/assets/computer-lab.jpg";
import library from "@/assets/library.jpg";
import sportsGround from "@/assets/sports-ground.jpg";
import schoolBuilding from "@/assets/school-building.jpg";

const allFacilities = [
  { icon: Microscope, title: "Science Laboratories", description: "Fully equipped Physics, Chemistry, and Biology labs with modern apparatus for hands-on learning and experiments.", image: scienceLab },
  { icon: Monitor, title: "Computer Lab", description: "State-of-the-art computer lab with high-speed internet and latest software for digital literacy.", image: computerLab },
  { icon: LibIcon, title: "Library & Resource Center", description: "Extensive collection of over 10,000 books, periodicals, and digital resources for research and reading.", image: library },
  { icon: Dumbbell, title: "Sports Complex", description: "Multi-sport facility with cricket ground, basketball court, volleyball court, and athletics track.", image: sportsGround },
  { icon: Bus, title: "Transport", description: "Safe and comfortable bus service covering all major routes in and around Narasimharajapura.", image: schoolBuilding },
  { icon: Utensils, title: "Smart Classrooms", description: "Interactive digital boards and multimedia-enabled classrooms for engaging, technology-driven learning.", image: computerLab },
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

      <section className="section-padding">
        <div className="container-school">
          <ScrollReveal>
            <SectionHeading label="Infrastructure" title="World-Class Facilities" description="We provide the best infrastructure for an enriching learning experience." />
          </ScrollReveal>
          <div className="space-y-16">
            {allFacilities.map((f, i) => (
              <ScrollReveal key={i}>
                <div className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-4">
                      <f.icon className="w-7 h-7 text-accent-foreground" />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-3">{f.title}</h3>
                    <p className="text-muted-foreground font-body leading-relaxed">{f.description}</p>
                  </div>
                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <img src={f.image} alt={f.title} className="rounded-2xl shadow-xl w-full" />
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
