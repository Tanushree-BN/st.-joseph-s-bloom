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
                  "My dear parents, teachers, students and well-wishers"
                </p>
                <p>
                  It brings me immense joy and happiness to be a part of this great mission of educating and upbringing our little ones as true and responsible citizens of our great nation. As we all know well that the focus of the world is now towards the hub of knowledge so much so the possession of this web space highlights our quest to grow from better to the best in pursuit of knowledge. Let this site help teachers, students, and parents to track the happenings of the School.
                </p>
                <p>
                  We live in an era of profound scientific explosions where people are inter-connected and networked. As we juggle the world in our fingertips today, we find ourselves in a cyber-era which connects us through 5G, Wi-Fi, Li-Fi technologies. The fact that we possess this web space highlights the reality of the standard and growth of our institution. As Pope Benedict XVI notes, media is a mixed blessing and it can develop a world consensus or culture. Let this initiative lead to a new culture focused on the central teaching of Jesus, loving, fostering, and educating humanity.
                </p>
                <p>
                  As a Catholic school, we promote Christian values which provide an excellent foundation for later life. We care about each individual child and work hard to meet everyone's needs. We listen carefully and are committed to helping and supporting children and people around us who may need us in times of difficulty. We learn how to support our local and wider community and are aware of others' needs.
                </p>
                <p className="font-semibold text-foreground">
                  With warm regards,<br />
                  Fr. Thomas Joseph<br />
                  Principal, St Joseph Public School
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrincipalMessage;
