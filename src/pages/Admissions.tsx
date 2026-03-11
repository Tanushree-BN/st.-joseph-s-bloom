import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, FileText, Calendar, CheckCircle, Download, Send } from "lucide-react";
import { toast } from "sonner";
import { addAdmission } from "@/lib/store";
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
  const [showOnlineForm, setShowOnlineForm] = useState(false);
  const [form, setForm] = useState({
    studentName: "", parentName: "", email: "", phone: "", dob: "", gradeApplying: "", address: "", previousSchool: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.studentName || !form.parentName || !form.email || !form.phone || !form.gradeApplying) {
      toast.error("Please fill in all required fields.");
      return;
    }
    addAdmission(form);
    toast.success("Application submitted successfully! We will contact you soon.");
    setForm({ studentName: "", parentName: "", email: "", phone: "", dob: "", gradeApplying: "", address: "", previousSchool: "" });
    setShowOnlineForm(false);
  };

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
                <div className="bg-card rounded-xl p-6 card-hover text-center">
                  <div className="font-display text-5xl font-bold text-accent mb-4">{s.step}</div>
                  <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Download & Online Form */}
      <section className="section-padding bg-accent/50">
        <div className="container-school">
          <div className="grid lg:grid-cols-2 gap-12">
            <ScrollReveal>
              <SectionHeading label="Documents" title="Required Documents" centered={false} />
              <ul className="space-y-3 mb-8">
                {documents.map((doc, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground font-body">
                    <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <a href="/admission-form.pdf" download>
                  <Button variant="copper" size="lg">
                    <Download className="w-4 h-4 mr-2" /> Download Admission Form
                  </Button>
                </a>
                <Button variant="outline" size="lg" onClick={() => setShowOnlineForm(true)}>
                  <Send className="w-4 h-4 mr-2" /> Fill Online Form
                </Button>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
                <Calendar className="w-10 h-10 text-secondary mb-4" />
                <h3 className="font-display text-2xl font-bold mb-3">Important Dates</h3>
                <ul className="space-y-3 font-body text-sm text-primary-foreground/80">
                  <li className="flex justify-between border-b border-primary-foreground/10 pb-2"><span>Registration Opens</span><span>January 15, 2025</span></li>
                  <li className="flex justify-between border-b border-primary-foreground/10 pb-2"><span>Last Date for Application</span><span>March 31, 2025</span></li>
                  <li className="flex justify-between border-b border-primary-foreground/10 pb-2"><span>Admission Test</span><span>April 10, 2025</span></li>
                  <li className="flex justify-between"><span>Session Begins</span><span>June 1, 2025</span></li>
                </ul>
                <Link to="/contact" className="mt-6 inline-block">
                  <Button variant="hero" size="lg">Enquire Now <ArrowRight className="w-4 h-4 ml-1" /></Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Online Admission Form Dialog */}
      {showOnlineForm && (
        <div className="fixed inset-0 z-50 bg-foreground/60 flex items-center justify-center p-4" onClick={() => setShowOnlineForm(false)}>
          <div className="bg-card rounded-2xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-2xl font-bold mb-6">Online Admission Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium font-body mb-1 block">Student Name *</label>
                  <Input value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} placeholder="Student's full name" />
                </div>
                <div>
                  <label className="text-sm font-medium font-body mb-1 block">Parent/Guardian Name *</label>
                  <Input value={form.parentName} onChange={(e) => setForm({ ...form, parentName: e.target.value })} placeholder="Parent's full name" />
                </div>
                <div>
                  <label className="text-sm font-medium font-body mb-1 block">Email *</label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
                </div>
                <div>
                  <label className="text-sm font-medium font-body mb-1 block">Phone *</label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="text-sm font-medium font-body mb-1 block">Date of Birth</label>
                  <Input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium font-body mb-1 block">Grade Applying For *</label>
                  <select value={form.gradeApplying} onChange={(e) => setForm({ ...form, gradeApplying: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="">Select Grade</option>
                    {["Pre-Primary", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10"].map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium font-body mb-1 block">Address</label>
                <Textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Full address" rows={2} />
              </div>
              <div>
                <label className="text-sm font-medium font-body mb-1 block">Previous School</label>
                <Input value={form.previousSchool} onChange={(e) => setForm({ ...form, previousSchool: e.target.value })} placeholder="Name of previous school" />
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="copper" type="submit" size="lg">Submit Application</Button>
                <Button variant="outline" size="lg" type="button" onClick={() => setShowOnlineForm(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Admissions;
