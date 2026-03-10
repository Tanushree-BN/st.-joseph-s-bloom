import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Calendar, Clock } from "lucide-react";
import annualDay from "@/assets/annual-day.jpg";
import scienceLab from "@/assets/science-lab.jpg";
import artClass from "@/assets/art-class.jpg";
import sportsGround from "@/assets/sports-ground.jpg";

const newsItems = [
  { title: "Annual Day Celebrations 2025", date: "March 5, 2025", description: "A grand celebration showcasing student talents in dance, drama, and music. Chief guest was the District Commissioner who praised the school's efforts.", image: annualDay, type: "Event" },
  { title: "Science Exhibition Winners", date: "February 20, 2025", description: "Our students won top prizes at the inter-school science exhibition held at Chikkamagaluru. Projects on renewable energy and water conservation were highlighted.", image: scienceLab, type: "Achievement" },
  { title: "Art Competition Results", date: "February 10, 2025", description: "Outstanding performances by our young artists at the district-level art competition. Three students secured top positions.", image: artClass, type: "Achievement" },
  { title: "Sports Day 2025", date: "January 25, 2025", description: "An exciting day of athletics, relay races, and team sports. Students showed exceptional sportsmanship and athletic prowess.", image: sportsGround, type: "Event" },
];

const upcomingEvents = [
  { title: "Parent-Teacher Meeting", date: "March 15, 2025", time: "10:00 AM - 1:00 PM" },
  { title: "Inter-School Quiz Competition", date: "March 22, 2025", time: "9:00 AM - 3:00 PM" },
  { title: "School Annual Exam Begins", date: "April 1, 2025", time: "9:00 AM" },
  { title: "Summer Camp Registration", date: "April 15, 2025", time: "All Day" },
];

const NewsEvents = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-school">
          <ScrollReveal>
            <SectionHeading label="Stay Updated" title="News & Events" description="Latest happenings at St Joseph Public School." />
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* News */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="font-display text-2xl font-semibold">Latest News</h3>
              {newsItems.map((item, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className="bg-card rounded-xl overflow-hidden card-hover flex flex-col sm:flex-row">
                    <img src={item.image} alt={item.title} className="w-full sm:w-48 h-48 sm:h-auto object-cover" />
                    <div className="p-5 flex-1">
                      <span className="inline-block px-3 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold mb-2">
                        {item.type}
                      </span>
                      <h4 className="font-display text-lg font-semibold mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {item.date}
                      </p>
                      <p className="text-sm text-muted-foreground font-body">{item.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Upcoming Events */}
            <div>
              <h3 className="font-display text-2xl font-semibold mb-4">Upcoming Events</h3>
              <div className="bg-card rounded-xl p-5 space-y-4 card-hover">
                {upcomingEvents.map((event, i) => (
                  <div key={i} className={`pb-4 ${i < upcomingEvents.length - 1 ? "border-b border-border" : ""}`}>
                    <h4 className="font-display font-semibold text-sm">{event.title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {event.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NewsEvents;
