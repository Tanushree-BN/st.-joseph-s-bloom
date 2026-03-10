import { useState } from "react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { X } from "lucide-react";
import schoolBuilding from "@/assets/school-building.jpg";
import studentsClassroom from "@/assets/students-classroom.jpg";
import scienceLab from "@/assets/science-lab.jpg";
import library from "@/assets/library.jpg";
import sportsGround from "@/assets/sports-ground.jpg";
import annualDay from "@/assets/annual-day.jpg";
import artClass from "@/assets/art-class.jpg";
import computerLab from "@/assets/computer-lab.jpg";

const categories = ["All", "Campus", "Academics", "Events", "Sports"];

const images = [
  { src: schoolBuilding, category: "Campus", title: "School Building" },
  { src: studentsClassroom, category: "Academics", title: "Classroom" },
  { src: scienceLab, category: "Academics", title: "Science Lab" },
  { src: library, category: "Academics", title: "Library" },
  { src: sportsGround, category: "Sports", title: "Sports Ground" },
  { src: annualDay, category: "Events", title: "Annual Day" },
  { src: artClass, category: "Academics", title: "Art Class" },
  { src: computerLab, category: "Academics", title: "Computer Lab" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filtered = activeCategory === "All" ? images : images.filter((img) => img.category === activeCategory);

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-school">
          <ScrollReveal>
            <SectionHeading label="Gallery" title="Life at St Joseph" description="Explore our vibrant school life through photos." />
          </ScrollReveal>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground hover:bg-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img, i) => (
              <ScrollReveal key={`${img.title}-${i}`} delay={i * 60}>
                <button
                  onClick={() => setLightboxImage(img.src)}
                  className="group relative aspect-square rounded-xl overflow-hidden w-full"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-end p-3">
                    <span className="text-primary-foreground font-body text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {img.title}
                    </span>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button className="absolute top-6 right-6 text-primary-foreground hover:text-secondary transition-colors">
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightboxImage}
            alt="Gallery preview"
            className="max-w-full max-h-[85vh] rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
