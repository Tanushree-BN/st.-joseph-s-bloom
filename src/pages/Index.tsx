import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Users, Trophy, BookOpen, ArrowRight, Star, ChevronLeft, ChevronRight, Microscope, Monitor, Library, Dumbbell, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import schoolBuilding from "@/assets/img1/st build.jpg";
import studentsClassroom from "@/assets/img1/classroom1.jpg";
import scienceLab from "@/assets/img1/st chem lab.jpg";
import library from "@/assets/img1/st lib new.jpg";
import sportsGround from "@/assets/img1/st playground.jpg";
import annualDay from "@/assets/img1/3.jpg";
import artClass from "@/assets/img1/art1.jpg";
import computerLab from "@/assets/img1/st comp.jpg";

const heroSlides = [
  { image: schoolBuilding, title: "Welcome to St Joseph Public School", subtitle: "Nurturing Minds, Building Futures", cta: "Explore Our School" },
  { image: studentsClassroom, title: "Excellence in Education", subtitle: "ICSE affiliated institution committed to academic brilliance", cta: "View Academics" },
  { image: sportsGround, title: "Holistic Development", subtitle: "Sports, arts, and co-curricular activities for all-round growth", cta: "Our Facilities" },
];

const stats = [
  { icon: Users, value: "1500+", label: "Students" },
  { icon: GraduationCap, value: "85+", label: "Expert Teachers" },
  { icon: Trophy, value: "25+", label: "Years of Excellence" },
  { icon: BookOpen, value: "100%", label: "Board Results" },
];

const facilities = [
  { icon: Microscope, title: "Science Labs", description: "State-of-the-art physics, chemistry & biology laboratories", image: scienceLab },
  { icon: Monitor, title: "Computer Lab", description: "Modern computer lab with latest technology", image: computerLab },
  { icon: Library, title: "Library", description: "Extensive collection of books and digital resources", image: library },
  { icon: Dumbbell, title: "Sports Complex", description: "Multi-sport facilities for physical excellence", image: sportsGround },
];

const galleryImages = [annualDay, artClass, studentsClassroom, scienceLab, library, computerLab];

const news = [
  { title: "Annual Day Celebrations 2025", date: "March 5, 2025", description: "A grand celebration showcasing student talents in dance, drama, and music.", image: annualDay },
  { title: "Science Exhibition Winners", date: "February 20, 2025", description: "Our students won top prizes at the inter-school science exhibition.", image: scienceLab },
  { title: "Art Competition Results", date: "February 10, 2025", description: "Outstanding performances by our young artists at the district level.", image: artClass },
];

const quickFacts = [
  { label: "Student-teacher ratio:", detail: "Small classes with personalised attention" },
  { label: "Language support:", detail: "English-medium with heritage-language options" },
  { label: "Safety:", detail: "CCTV, secure entry, trained staff" },
  { label: "Transport:", detail: "Route-based buses across the district" },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      {/* Hero Slider */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={currentSlide} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0">
            <img src={heroSlides[currentSlide].image} alt={heroSlides[currentSlide].title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 flex items-center">
          <div className="container-school">
            <motion.div key={`text-${currentSlide}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/90 text-secondary-foreground text-sm font-semibold mb-6">ICSE Affiliated School</span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-4">{heroSlides[currentSlide].title}</h2>
              <p className="text-lg text-primary-foreground/80 font-body mb-8">{heroSlides[currentSlide].subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/admissions"><Button variant="hero" size="lg">{heroSlides[currentSlide].cta} <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
                <Link to="/contact"><Button variant="hero-outline" size="lg">Contact Us</Button></Link>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)} className="w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur flex items-center justify-center hover:bg-primary-foreground/30 transition-colors">
            <ChevronLeft className="w-5 h-5 text-primary-foreground" />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? "w-8 bg-secondary" : "w-2 bg-primary-foreground/40"}`} />
            ))}
          </div>
          <button onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)} className="w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur flex items-center justify-center hover:bg-primary-foreground/30 transition-colors">
            <ChevronRight className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-16 z-10">
        <div className="container-school">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-card rounded-xl p-6 text-center card-hover">
                  <stat.icon className="w-8 h-8 text-secondary mx-auto mb-3" />
                  <div className="font-display text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-body mt-1">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome + Quick School Facts */}
      <section className="section-padding">
        <div className="container-school">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <ScrollReveal className="lg:col-span-3">
              <SectionHeading label="Welcome" title="A place to discover, question and become" centered={false} />
              <p className="text-muted-foreground font-body leading-relaxed mb-6">
                At St Joseph Public School we cultivate curiosity and resilience. Our focus is to equip young learners with the tools to inquire confidently and act responsibly. We balance academic rigour with life skills so pupils leave ready for the next step — academically able, morally grounded and socially compassionate.
              </p>
              <div className="space-y-2 mb-6">
                <p className="text-muted-foreground font-body"><strong className="text-foreground">Age groups:</strong> Pre-primary to Grade 10 (ICSE pathway)</p>
                <p className="text-muted-foreground font-body"><strong className="text-foreground">Key strengths:</strong> Individual attention, experiential learning, strong co-curriculars</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/admissions"><Button variant="copper" size="lg">Admissions Open</Button></Link>
                <Link to="/contact"><Button variant="outline" size="lg">Visit Campus</Button></Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200} className="lg:col-span-2">
              <div className="bg-card rounded-xl p-6 card-hover">
                <h3 className="font-display text-xl font-semibold text-secondary mb-2">Quick School Facts</h3>
                <p className="text-sm text-muted-foreground font-body mb-5">Non-repeating, factual highlights for parents at glance</p>
                <div className="space-y-4">
                  {quickFacts.map((fact, i) => (
                    <div key={i} className="border-l-4 border-secondary pl-4">
                      <p className="text-sm font-body">
                        <strong className="text-foreground">{fact.label}</strong>{" "}
                        <span className="text-muted-foreground">{fact.detail}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-accent/50">
        <div className="container-school">
          <ScrollReveal>
            <SectionHeading label="Why Choose Us" title="What makes us different" description="We provide an environment that fosters curiosity, creativity, and confidence." />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Experienced Faculty", desc: "Highly qualified teachers with years of experience in ICSE curriculum.", icon: GraduationCap },
              { title: "Modern Infrastructure", desc: "Well-equipped labs, smart classrooms, and spacious campus.", icon: Monitor },
              { title: "Holistic Development", desc: "Equal emphasis on academics, sports, arts, and moral values.", icon: Star },
              { title: "Safe Environment", desc: "CCTV monitored campus with trained security personnel.", icon: Users },
              { title: "Co-Curricular Activities", desc: "Wide range of clubs, competitions, and events throughout the year.", icon: Trophy },
              { title: "Value-Based Education", desc: "Instilling strong moral values and character in every student.", icon: BookOpen },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-card rounded-xl p-6 card-hover group">
                  <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-secondary transition-colors duration-300">
                    <item.icon className="w-6 h-6 text-accent-foreground group-hover:text-secondary-foreground transition-colors duration-300" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm font-body">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Preview */}
      <section className="section-padding">
        <div className="container-school">
          <ScrollReveal>
            <SectionHeading label="Our Facilities" title="World-Class Infrastructure" description="Modern facilities to support learning and overall development." />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((f, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="group rounded-xl overflow-hidden card-hover bg-card">
                  <div className="relative h-48 overflow-hidden">
                    <img src={f.image} alt={f.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <f.icon className="w-5 h-5 text-secondary-foreground" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                    <p className="text-sm text-muted-foreground font-body mt-1">{f.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/facilities"><Button variant="copper">View All Facilities <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section-padding gradient-primary">
        <div className="container-school">
          <ScrollReveal>
            <SectionHeading label="Gallery" title="Life at St Joseph" description="Glimpses of vibrant school life, events, and celebrations." light />
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="relative group rounded-xl overflow-hidden aspect-[4/3]">
                  <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300" />
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/gallery"><Button variant="hero" size="lg">View Full Gallery <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section className="section-padding">
        <div className="container-school">
          <ScrollReveal>
            <SectionHeading label="Latest Updates" title="News & Events" description="Stay informed about what's happening at St Joseph Public School." />
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-card rounded-xl overflow-hidden card-hover group">
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">{item.date}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-secondary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground font-body">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/news-events"><Button variant="copper">View All News <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-accent/50">
        <div className="container-school">
          <ScrollReveal>
            <SectionHeading label="Testimonials" title="What Parents Say" description="Hear from our school community." />
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Mrs. Lakshmi Devi", role: "Parent of Class X Student", quote: "St Joseph has been instrumental in shaping my child's future. The teachers are dedicated and the environment is wonderful." },
              { name: "Mr. Rajesh Kumar", role: "Parent of Class VII Student", quote: "The holistic approach to education and the emphasis on values make this school stand apart from others." },
              { name: "Mrs. Priya Sharma", role: "Parent of Class V Student", quote: "My daughter loves going to school every day. The extra-curricular activities and events keep children engaged and happy." },
            ].map((t, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-card rounded-xl p-6 card-hover">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (<Star key={j} className="w-4 h-4 fill-secondary text-secondary" />))}
                  </div>
                  <p className="text-muted-foreground font-body italic mb-4">"{t.quote}"</p>
                  <div>
                    <p className="font-display font-semibold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Request Visit CTA */}
      <section className="section-padding bg-accent/30">
        <div className="container-school">
          <ScrollReveal>
            <div className="bg-primary rounded-2xl p-8 sm:p-12 text-center text-primary-foreground">
              <MapPin className="w-10 h-10 text-secondary mx-auto mb-4" />
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
                Want to see the campus in person? Book a tour or request an info pack.
              </h2>
              <Link to="/contact">
                <Button variant="hero" size="lg" className="mt-4">
                  Request Visit
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-secondary">
        <div className="container-school text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-4">Admissions Open for 2025-26</h2>
            <p className="text-lg text-secondary-foreground/80 font-body mb-8 max-w-2xl mx-auto">Give your child the gift of quality education. Join the St Joseph Public School family today.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/admissions"><Button variant="hero-outline" size="lg" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10">Apply Now <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
              <Link to="/contact"><Button size="lg" className="rounded-full bg-primary-foreground text-foreground hover:bg-primary-foreground/90">Get in Touch</Button></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
