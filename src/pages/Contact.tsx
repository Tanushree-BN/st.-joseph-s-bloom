import { useState } from "react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Your message has been sent! We'll get back to you soon.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-school">
          <ScrollReveal>
            <SectionHeading label="Get in Touch" title="Contact Us" description="We'd love to hear from you. Reach out for any queries about admissions, academics, or general information." />
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <ScrollReveal className="space-y-6">
              {[
                { icon: MapPin, title: "Address", lines: ["St Joseph Public School", "Narasimharajapura, Chikkamagaluru", "Karnataka, India - 577134"] },
                { icon: Phone, title: "Phone", lines: ["+91 81818 18181", "+91 82828 28282"] },
                { icon: Mail, title: "Email", lines: ["info@stjosephps.edu.in", "admissions@stjosephps.edu.in"] },
                { icon: Clock, title: "Office Hours", lines: ["Mon - Fri: 8:00 AM - 4:00 PM", "Saturday: 8:00 AM - 12:30 PM"] },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm">{item.title}</h4>
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-sm text-muted-foreground font-body">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </ScrollReveal>

            {/* Form */}
            <ScrollReveal delay={200} className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium font-body mb-1.5 block">Name *</label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium font-body mb-1.5 block">Email *</label>
                    <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium font-body mb-1.5 block">Phone</label>
                    <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div>
                    <label className="text-sm font-medium font-body mb-1.5 block">Subject</label>
                    <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Admission Enquiry" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium font-body mb-1.5 block">Message *</label>
                  <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your message..." rows={5} />
                </div>
                <Button variant="copper" type="submit" size="lg">
                  Send Message <Send className="w-4 h-4 ml-1" />
                </Button>
              </form>
            </ScrollReveal>
          </div>

          {/* Map */}
          <ScrollReveal className="mt-12">
            <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15536.84!2d75.51!3d13.61!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbb!2sNarasimharajapura!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="School Location"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
