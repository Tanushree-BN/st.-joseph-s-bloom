import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { X, Plus, Trash2, Edit2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { getGallery, getCategories, addGalleryImage, updateGalleryImage, deleteGalleryImage, addCategory, isAdminLoggedIn, type GalleryImage } from "@/lib/store";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const isAdmin = isAdminLoggedIn();

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setImages(getGallery());
    setCategories(getCategories());
  }, []);

  const filtered = activeCategory === "All" ? images : images.filter((img) => img.category === activeCategory);

  const handleAddImage = () => {
    if (!newTitle || !newCategory || !newImageUrl) {
      toast.error("Please fill in all fields.");
      return;
    }
    addGalleryImage({ src: newImageUrl, title: newTitle, category: newCategory });
    setImages(getGallery());
    setNewTitle(""); setNewCategory(""); setNewImageUrl("");
    setDialogOpen(false);
    toast.success("Image added successfully!");
  };

  const handleUpdateImage = () => {
    if (!editingImage) return;
    updateGalleryImage(editingImage.id, { title: editingImage.title, category: editingImage.category });
    setImages(getGallery());
    setEditingImage(null);
    toast.success("Image updated!");
  };

  const handleDeleteImage = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this image?");
    if (!confirmed) return;
    deleteGalleryImage(id);
    setImages(getGallery());
    toast.success("Image deleted!");
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    addCategory(newCategoryName.trim());
    setCategories(getCategories());
    setNewCategoryName("");
    toast.success("Category added!");
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-school">
          <ScrollReveal>
            <SectionHeading label="Gallery" title="Life at St Joseph" description="Explore our vibrant school life through photos." />
          </ScrollReveal>

          {/* Admin Controls */}
          {isAdmin && (
            <div className="mb-6 flex flex-wrap gap-3 items-center bg-accent/50 rounded-xl p-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="copper" size="sm"><Plus className="w-4 h-4 mr-1" /> Add Image</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Add Gallery Image</DialogTitle></DialogHeader>
                  <div className="space-y-3">
                    <Input placeholder="Image URL" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} />
                    <Input placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                    <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="">Select Category</option>
                      {categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <Button variant="copper" className="w-full" onClick={handleAddImage}>Add Image</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <div className="flex gap-2 items-center">
                <Input placeholder="New category name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="w-40 h-9" />
                <Button variant="outline" size="sm" onClick={handleAddCategory}>Add Category</Button>
              </div>
            </div>
          )}

          {/* Edit Modal */}
          {editingImage && (
            <Dialog open={!!editingImage} onOpenChange={() => setEditingImage(null)}>
              <DialogContent>
                <DialogHeader><DialogTitle>Edit Image</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <Input value={editingImage.title} onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })} />
                  <select value={editingImage.category} onChange={(e) => setEditingImage({ ...editingImage, category: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    {categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <Button variant="copper" className="w-full" onClick={handleUpdateImage}>Save Changes</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground hover:bg-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img, i) => (
              <ScrollReveal key={`${img.id}-${i}`} delay={i * 40}>
                <div className="group relative aspect-square rounded-xl overflow-hidden">
                  <button onClick={() => setLightboxImage(img.src)} className="w-full h-full">
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-end p-3">
                      <span className="text-primary-foreground font-body text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">{img.title}</span>
                    </div>
                  </button>
                  {isAdmin && (
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditingImage(img)} className="w-7 h-7 rounded-full bg-primary-foreground/90 flex items-center justify-center hover:bg-primary-foreground">
                        <Edit2 className="w-3 h-3 text-foreground" />
                      </button>
                      <button onClick={() => handleDeleteImage(img.id)} className="w-7 h-7 rounded-full bg-destructive/90 flex items-center justify-center hover:bg-destructive">
                        <Trash2 className="w-3 h-3 text-destructive-foreground" />
                      </button>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4" onClick={() => setLightboxImage(null)}>
          <button className="absolute top-6 right-6 text-primary-foreground hover:text-secondary transition-colors"><X className="w-8 h-8" /></button>
          <img src={lightboxImage} alt="Gallery preview" className="max-w-full max-h-[85vh] rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
