import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Calendar, CheckCircle } from "lucide-react";
import schoolBuilding from "@/assets/school-building.jpg";

const steps = [
  { step: "01", title: "Enquiry", desc: "Visit the school or fill the online enquiry form." },
  { step: "02", title: "Application", desc: "Collect and submit the application form with required documents." },
  { step: "03", title: "Assessment", desc: "Student assessment/interaction for age-appropriate evaluation." },
  { step: "04", title: "Admission", desc: "Complete the admission formalities and fee payment." },
];

const documents = [
  "Birth Certificate (Original + Copy)",
  "Transfer Certificate from previous school",
  "Report Card of last class attended",
  "Aadhar Card of student and parents",
  "4 Passport size photographs",
  "Caste Certificate (if applicable)",
];

const Admissions = () => {
  return (
    <Layout>
      <section className="relative h-[40vh] min-h-[300px]">
        <img src={schoolBuilding} alt="Admissions" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground">Admissions</h1>
            <p className="text-primary-foreground/80 font-body mt-2">Session 2025-26 Now Open</p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding">
        <div className="container-school">
          <ScrollReveal>
            <SectionHeading label="Process" title="Admission Process" description="Simple four-step process to join our school family." />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-card rounded-xl p-6 card-hover text-center relative">
                  <div className="font-display text-5xl font-bold text-accent mb-4">{s.step}</div>
                  <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Documents & CTA */}
      <section className="section-padding bg-accent/50">
        <div className="container-school">
          <div className="grid lg:grid-cols-2 gap-12">
            <ScrollReveal>
              <SectionHeading label="Documents" title="Required Documents" centered={false} />
              <ul className="space-y-3">
                {documents.map((doc, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground font-body">
                    <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
                <Calendar className="w-10 h-10 text-secondary mb-4" />
                <h3 className="font-display text-2xl font-bold mb-3">Important Dates</h3>
                <ul className="space-y-3 font-body text-sm text-primary-foreground/80">
                  <li className="flex justify-between border-b border-primary-foreground/10 pb-2">
                    <span>Registration Opens</span><span>January 15, 2025</span>
                  </li>
                  <li className="flex justify-between border-b border-primary-foreground/10 pb-2">
                    <span>Last Date for Application</span><span>March 31, 2025</span>
                  </li>
                  <li className="flex justify-between border-b border-primary-foreground/10 pb-2">
                    <span>Admission Test</span><span>April 10, 2025</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Session Begins</span><span>June 1, 2025</span>
                  </li>
                </ul>
                <Link to="/contact" className="mt-6 inline-block">
                  <Button variant="hero" size="lg">
                    Enquire Now <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admissions;
