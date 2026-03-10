import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import principalImg from "@/assets/principal.jpg";

const PrincipalMessage = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-school max-w-5xl">
          <ScrollReveal>
            <SectionHeading label="From the Principal's Desk" title="Principal's Message" />
          </ScrollReveal>
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <ScrollReveal className="lg:col-span-1">
              <div className="text-center">
                <img src={principalImg} alt="Principal" className="w-48 h-48 rounded-2xl object-cover mx-auto shadow-xl mb-4" />
                <h3 className="font-display text-xl font-semibold">Fr. Thomas Joseph</h3>
                <p className="text-sm text-muted-foreground">Principal</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200} className="lg:col-span-2">
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p className="text-lg text-foreground font-medium italic font-display">
                  "Education is the most powerful weapon which you can use to change the world."
                </p>
                <p>Dear Parents and Students,</p>
                <p>It gives me immense pleasure to welcome you to St Joseph Public School, Narasimharajapura. Our school stands as a testament to the transformative power of education in shaping the future of our children.</p>
                <p>At St Joseph Public School, we believe that every child is blessed with unique talents and abilities. Our role as educators is to identify and nurture these talents, providing the right environment for their holistic development.</p>
                <p>Our dedicated team of teachers works tirelessly to create an engaging learning environment that encourages critical thinking, creativity, and collaboration. We emphasize not just academic excellence but also character building, social responsibility, and physical fitness.</p>
                <p>We invite parents to partner with us in this noble journey of nurturing the leaders of tomorrow. Together, we can make a meaningful difference in the lives of our children.</p>
                <p className="font-semibold text-foreground">With warm regards,<br />Fr. Thomas Joseph<br />Principal, St Joseph Public School</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrincipalMessage;
