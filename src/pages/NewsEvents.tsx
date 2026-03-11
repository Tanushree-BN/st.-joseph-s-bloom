import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Calendar, Clock, Plus, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { getNews, addNewsEvent, updateNewsEvent, deleteNewsEvent, isAdminLoggedIn, type NewsEvent } from "@/lib/store";

const NewsEvents = () => {
  const [allNews, setAllNews] = useState<NewsEvent[]>([]);
  const isAdmin = isAdminLoggedIn();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsEvent | null>(null);
  const [form, setForm] = useState({ title: "", date: "", description: "", image: "", type: "Event" as NewsEvent["type"], isUpcoming: false, time: "" });

  useEffect(() => { setAllNews(getNews()); }, []);

  const newsItems = allNews.filter(n => !n.isUpcoming);
  const upcomingEvents = allNews.filter(n => n.isUpcoming);

  const resetForm = () => setForm({ title: "", date: "", description: "", image: "", type: "Event", isUpcoming: false, time: "" });

  const handleAdd = () => {
    if (!form.title || !form.date) { toast.error("Title and date are required."); return; }
    addNewsEvent(form);
    setAllNews(getNews());
    resetForm();
    setDialogOpen(false);
    toast.success("Added successfully!");
  };

  const handleUpdate = () => {
    if (!editingItem) return;
    updateNewsEvent(editingItem.id, editingItem);
    setAllNews(getNews());
    setEditingItem(null);
    toast.success("Updated!");
  };

  const handleDelete = (id: string) => {
    deleteNewsEvent(id);
    setAllNews(getNews());
    toast.success("Deleted!");
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-school">
          <ScrollReveal>
            <SectionHeading label="Stay Updated" title="News & Events" description="Latest happenings at St Joseph Public School." />
          </ScrollReveal>

          {isAdmin && (
            <div className="mb-6 bg-accent/50 rounded-xl p-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="copper" size="sm"><Plus className="w-4 h-4 mr-1" /> Add News/Event</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Add News/Event</DialogTitle></DialogHeader>
                  <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                    <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                    <Input placeholder="Date (e.g. March 5, 2025)" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                    <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    <Input placeholder="Image URL (optional)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as NewsEvent["type"] })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="Event">Event</option>
                      <option value="Achievement">Achievement</option>
                      <option value="News">News</option>
                    </select>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={form.isUpcoming} onChange={(e) => setForm({ ...form, isUpcoming: e.target.checked })} />
                      Upcoming Event
                    </label>
                    {form.isUpcoming && (
                      <Input placeholder="Time (e.g. 10:00 AM - 1:00 PM)" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
                    )}
                    <Button variant="copper" className="w-full" onClick={handleAdd}>Add</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {/* Edit Dialog */}
          {editingItem && (
            <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
              <DialogContent>
                <DialogHeader><DialogTitle>Edit</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <Input value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} />
                  <Input value={editingItem.date} onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })} />
                  <Textarea value={editingItem.description} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} />
                  <Button variant="copper" className="w-full" onClick={handleUpdate}>Save</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="font-display text-2xl font-semibold">Latest News</h3>
              {newsItems.map((item, i) => (
                <ScrollReveal key={item.id} delay={i * 80}>
                  <div className="bg-card rounded-xl overflow-hidden card-hover flex flex-col sm:flex-row relative group">
                    {item.image && <img src={item.image} alt={item.title} className="w-full sm:w-48 h-48 sm:h-auto object-cover" />}
                    <div className="p-5 flex-1">
                      <span className="inline-block px-3 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold mb-2">{item.type}</span>
                      <h4 className="font-display text-lg font-semibold mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</p>
                      <p className="text-sm text-muted-foreground font-body">{item.description}</p>
                    </div>
                    {isAdmin && (
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEditingItem(item)} className="w-7 h-7 rounded-full bg-primary-foreground/90 flex items-center justify-center"><Edit2 className="w-3 h-3" /></button>
                        <button onClick={() => handleDelete(item.id)} className="w-7 h-7 rounded-full bg-destructive/90 flex items-center justify-center"><Trash2 className="w-3 h-3 text-destructive-foreground" /></button>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <div>
              <h3 className="font-display text-2xl font-semibold mb-4">Upcoming Events</h3>
              <div className="bg-card rounded-xl p-5 space-y-4 card-hover">
                {upcomingEvents.map((event, i) => (
                  <div key={event.id} className={`pb-4 relative group ${i < upcomingEvents.length - 1 ? "border-b border-border" : ""}`}>
                    <h4 className="font-display font-semibold text-sm">{event.title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {event.date}</span>
                      {event.time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.time}</span>}
                    </div>
                    {isAdmin && (
                      <div className="absolute top-0 right-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEditingItem(event)} className="w-6 h-6 rounded-full bg-accent flex items-center justify-center"><Edit2 className="w-3 h-3" /></button>
                        <button onClick={() => handleDelete(event.id)} className="w-6 h-6 rounded-full bg-destructive/90 flex items-center justify-center"><Trash2 className="w-3 h-3 text-destructive-foreground" /></button>
                      </div>
                    )}
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
