import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { FileText } from "lucide-react";

const disclosureItems = [
  { label: "Name of the School", value: "St Joseph Public School" },
  { label: "Affiliation No.", value: "830XXX" },
  { label: "School Code", value: "XXXXX" },
  { label: "Address", value: "Narasimharajapura, Chikkamagaluru District, Karnataka - 577134" },
  { label: "Principal", value: "Fr. Thomas Joseph" },
  { label: "School Email", value: "info@stjosephps.edu.in" },
  { label: "Contact No.", value: "+91 81818 18181" },
  { label: "Year of Establishment", value: "1995" },
  { label: "Board of Affiliation", value: "CBSE, New Delhi" },
  { label: "Status of Affiliation", value: "Provisional / Permanent" },
  { label: "Classes", value: "I to X" },
  { label: "Medium of Instruction", value: "English" },
  { label: "Type of School", value: "Co-educational" },
  { label: "Area of School Campus", value: "3 Acres (approx)" },
];

const MandatoryDisclosure = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-school max-w-4xl">
          <ScrollReveal>
            <SectionHeading label="CBSE Requirement" title="Mandatory Disclosure" description="Information as required by CBSE for public disclosure." />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
              <div className="gradient-primary p-5 flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary-foreground" />
                <h3 className="font-display text-lg font-semibold text-primary-foreground">School Information</h3>
              </div>
              <div className="divide-y divide-border">
                {disclosureItems.map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center px-6 py-4">
                    <span className="font-body font-semibold text-sm w-full sm:w-1/3 text-foreground">{item.label}</span>
                    <span className="font-body text-sm text-muted-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default MandatoryDisclosure;
