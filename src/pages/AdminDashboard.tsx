import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Image as ImageIcon, Newspaper, Mail, GraduationCap, Plus, Trash2, Edit2, Eye, LogOut, Check, X, Calendar, Upload, FileDown } from "lucide-react";
import { jsPDF } from "jspdf";
import {
  isAdminLoggedIn, adminLogout,
  getGallery, addGalleryImage, updateGalleryImage, deleteGalleryImage,
  getCategories, addCategory, deleteCategory,
  getNews, addNewsEvent, updateNewsEvent, deleteNewsEvent,
  getContactSubmissions, markContactRead, deleteContact,
  getAdmissions, markAdmissionViewed, deleteAdmission,
  type GalleryImage, type NewsEvent, type ContactSubmission, type AdmissionForm,
} from "@/lib/store";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [news, setNews] = useState<NewsEvent[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [admissions, setAdmissions] = useState<AdmissionForm[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // Form states
  const [galleryDialog, setGalleryDialog] = useState(false);
  const [newsDialog, setNewsDialog] = useState(false);
  const [editGallery, setEditGallery] = useState<GalleryImage | null>(null);
  const [editNews, setEditNews] = useState<NewsEvent | null>(null);
  const [viewContact, setViewContact] = useState<ContactSubmission | null>(null);
  const [viewAdmission, setViewAdmission] = useState<AdmissionForm | null>(null);

  const [gForm, setGForm] = useState({ src: "", title: "", category: "" });
  const [nForm, setNForm] = useState({ title: "", date: "", description: "", image: "", type: "Event" as NewsEvent["type"], isUpcoming: false, time: "" });
  const [newCat, setNewCat] = useState("");
  const [admissionDateFilter, setAdmissionDateFilter] = useState("all");
  const [newsFilter, setNewsFilter] = useState("all");

  useEffect(() => {
    if (!isAdminLoggedIn()) { navigate("/admin-login"); return; }
    refreshData();
  }, [navigate]);

  const refreshData = () => {
    setGallery(getGallery());
    setNews(getNews());
    setContacts(getContactSubmissions());
    setAdmissions(getAdmissions());
    setCategories(getCategories());
  };

  const handleLogout = () => { adminLogout(); navigate("/admin-login"); };

  // Gallery handlers
  const handleAddGallery = () => {
    if (!gForm.src || !gForm.title || !gForm.category) { toast.error("Fill all fields"); return; }
    addGalleryImage(gForm);
    refreshData(); setGForm({ src: "", title: "", category: "" }); setGalleryDialog(false);
    toast.success("Image added!");
  };
  const handleUpdateGallery = () => {
    if (!editGallery) return;
    updateGalleryImage(editGallery.id, editGallery);
    refreshData(); setEditGallery(null); toast.success("Updated!");
  };
  const handleDeleteGallery = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this image?");
    if (!confirmed) return;
    deleteGalleryImage(id);
    refreshData();
    toast.success("Deleted!");
  };

  // News handlers
  const handleAddNews = () => {
    if (!nForm.title || !nForm.date) { toast.error("Title and date required"); return; }
    addNewsEvent(nForm);
    refreshData(); setNForm({ title: "", date: "", description: "", image: "", type: "Event", isUpcoming: false, time: "" }); setNewsDialog(false);
    toast.success("Added!");
  };
  const handleUpdateNews = () => {
    if (!editNews) return;
    updateNewsEvent(editNews.id, editNews);
    refreshData(); setEditNews(null); toast.success("Updated!");
  };
  const handleDeleteNews = (id: string) => { deleteNewsEvent(id); refreshData(); toast.success("Deleted!"); };

  // Category
  const handleAddCat = () => {
    if (!newCat.trim()) return;
    addCategory(newCat.trim()); refreshData(); setNewCat(""); toast.success("Category added!");
  };
  const handleDeleteCat = (cat: string) => { deleteCategory(cat); refreshData(); toast.success("Category deleted!"); };

  const unreadContacts = contacts.filter(c => !c.read).length;
  const unviewedAdmissions = admissions.filter(a => a.status === "not-viewed").length;

  // Helper: parse admission date string to Date
  const parseAdmissionDate = (dateStr: string) => new Date(dateStr);

  const downloadAdmissionPdf = (admission: AdmissionForm) => {
    const doc = new jsPDF();
    const left = 15;
    let y = 18;

    doc.setFontSize(16);
    doc.text("St Joseph Public School - Admission Application", left, y);
    y += 8;
    doc.setFontSize(11);

    const rows: Array<[string, string]> = [
      ["Student Name", admission.studentName],
      ["Gender", admission.gender || "N/A"],
      ["Date of Birth", admission.dob || "N/A"],
      ["Nationality", admission.nationality || "N/A"],
      ["Aadhaar No", admission.aadhaarNo || "N/A"],
      ["Religion/Caste", admission.religionCaste || "N/A"],
      ["Mother Tongue", admission.motherTongue || "N/A"],
      ["Blood Group", admission.bloodGroup || "N/A"],
      ["Father Name", admission.fatherName || "N/A"],
      ["Mother Name", admission.motherName || "N/A"],
      ["Email", admission.email || "N/A"],
      ["Phone", admission.phone || "N/A"],
      ["Grade Applying", admission.gradeApplying || "N/A"],
      ["Address", admission.address || "N/A"],
      ["Previous School", admission.previousSchool || "N/A"],
      ["Transport Required", admission.transportRequired || "No"],
      ["Submitted On", admission.date || "N/A"],
      ["Status", admission.status],
    ];

    rows.forEach(([label, value]) => {
      const line = `${label}: ${value}`;
      const wrapped = doc.splitTextToSize(line, 180) as string[];
      doc.text(wrapped, left, y);
      y += wrapped.length * 6;

      if (y > 275) {
        doc.addPage();
        y = 20;
      }
    });

    const sanitizedName = admission.studentName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    doc.save(`admission_${sanitizedName || admission.id}.pdf`);
    toast.success("Admission PDF downloaded");
  };

  const getFilteredAdmissions = () => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sorted = [...admissions].sort((a, b) => parseAdmissionDate(b.date).getTime() - parseAdmissionDate(a.date).getTime());
    if (admissionDateFilter === "all") return sorted;
    if (admissionDateFilter === "today") {
      return sorted.filter(a => parseAdmissionDate(a.date) >= startOfToday);
    }
    if (admissionDateFilter === "3days") {
      const d = new Date(startOfToday); d.setDate(d.getDate() - 2);
      return sorted.filter(a => parseAdmissionDate(a.date) >= d);
    }
    if (admissionDateFilter === "thisweek") {
      const day = startOfToday.getDay();
      const weekStart = new Date(startOfToday); weekStart.setDate(weekStart.getDate() - day);
      return sorted.filter(a => parseAdmissionDate(a.date) >= weekStart);
    }
    if (admissionDateFilter === "lastweek") {
      const day = startOfToday.getDay();
      const thisWeekStart = new Date(startOfToday); thisWeekStart.setDate(thisWeekStart.getDate() - day);
      const lastWeekStart = new Date(thisWeekStart); lastWeekStart.setDate(lastWeekStart.getDate() - 7);
      return sorted.filter(a => {
        const d = parseAdmissionDate(a.date);
        return d >= lastWeekStart && d < thisWeekStart;
      });
    }
    if (admissionDateFilter === "thismonth") {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      return sorted.filter(a => parseAdmissionDate(a.date) >= monthStart);
    }
    return sorted;
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-school">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground font-body text-sm">Manage your school website content</p>
            </div>
            <Button variant="outline" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" /> Logout</Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: ImageIcon, label: "Gallery Images", value: gallery.length, color: "text-secondary" },
              { icon: Newspaper, label: "News & Events", value: news.length, color: "text-primary" },
              { icon: Mail, label: "Messages", value: `${unreadContacts} unread`, color: "text-destructive" },
              { icon: GraduationCap, label: "Admissions", value: `${unviewedAdmissions} new`, color: "text-secondary" },
            ].map((s, i) => (
              <div key={i} className="bg-card rounded-xl p-5 card-hover">
                <s.icon className={`w-6 h-6 ${s.color} mb-2`} />
                <p className="font-display text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground font-body">{s.label}</p>
              </div>
            ))}
          </div>

          <Tabs defaultValue="gallery">
            <TabsList className="w-full justify-start mb-6 flex-wrap h-auto gap-1">
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="news">News & Events</TabsTrigger>
              <TabsTrigger value="contacts">Contact Messages</TabsTrigger>
              <TabsTrigger value="admissions">Admission Forms</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>

            {/* GALLERY TAB */}
            <TabsContent value="gallery">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-display text-xl font-semibold">Gallery Images ({gallery.length})</h2>
                <Button variant="copper" size="sm" onClick={() => setGalleryDialog(true)}><Plus className="w-4 h-4 mr-1" /> Add Image</Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {gallery.map(img => (
                  <div key={img.id} className="group relative rounded-lg overflow-hidden aspect-square bg-accent">
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <button onClick={() => setEditGallery(img)} className="w-8 h-8 rounded-full bg-card flex items-center justify-center"><Edit2 className="w-3 h-3" /></button>
                      <button onClick={() => handleDeleteGallery(img.id)} className="w-8 h-8 rounded-full bg-destructive flex items-center justify-center"><Trash2 className="w-3 h-3 text-destructive-foreground" /></button>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-foreground/60 px-2 py-1">
                      <p className="text-xs text-primary-foreground truncate">{img.title}</p>
                      <p className="text-[10px] text-primary-foreground/70">{img.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* NEWS TAB */}
            <TabsContent value="news">
              <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
                <h2 className="font-display text-xl font-semibold">News & Events ({news.length})</h2>
                <div className="flex items-center gap-2">
                  <select
                    value={newsFilter}
                    onChange={(e) => setNewsFilter(e.target.value)}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="all">All</option>
                    <option value="events">Events</option>
                    <option value="upcoming">Upcoming Events</option>
                    <option value="finished">Finished Events</option>
                    <option value="news">News</option>
                    <option value="achievements">Achievements</option>
                  </select>
                  <Button variant="copper" size="sm" onClick={() => setNewsDialog(true)}><Plus className="w-4 h-4 mr-1" /> Add</Button>
                </div>
              </div>
              {(() => {
                const today = new Date(); today.setHours(0,0,0,0);
                const events = news.filter(item => item.type === "Event");
                const upcomingEvents = events.filter(item => new Date(item.date) >= today);
                const finishedEvents = events.filter(item => new Date(item.date) < today);
                const newsItems = news.filter(item => item.type === "News");
                const achievements = news.filter(item => item.type === "Achievement");

                const showEvents = newsFilter === "all" || newsFilter === "events";
                const showUpcomingOnly = newsFilter === "upcoming";
                const showFinishedOnly = newsFilter === "finished";
                const showNews = newsFilter === "all" || newsFilter === "news";
                const showAchievements = newsFilter === "all" || newsFilter === "achievements";

                const renderItem = (item: NewsEvent, badge: React.ReactNode) => (
                  <div key={item.id} className="bg-card rounded-lg p-4 flex items-center justify-between gap-4 card-hover">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {badge}
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                        {item.time && <span className="text-xs text-muted-foreground">· {item.time}</span>}
                      </div>
                      <p className="font-display font-semibold text-sm truncate">{item.title}</p>
                      {item.description && <p className="text-xs text-muted-foreground truncate">{item.description}</p>}
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => setEditNews(item)} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-accent/80"><Edit2 className="w-3 h-3" /></button>
                      <button onClick={() => handleDeleteNews(item.id)} className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center hover:bg-destructive/20"><Trash2 className="w-3 h-3 text-destructive" /></button>
                    </div>
                  </div>
                );
                return (
                  <div className="space-y-6">
                    {showEvents && (
                      <div>
                        <h3 className="text-sm font-semibold text-secondary mb-2">Events ({events.length})</h3>
                        <div className="space-y-3">
                          {upcomingEvents.map(item => renderItem(item, <span className="px-2 py-0.5 rounded text-xs font-semibold bg-secondary/20 text-secondary">Upcoming</span>))}
                          {finishedEvents.map(item => renderItem(item, <span className="px-2 py-0.5 rounded text-xs font-semibold bg-muted text-muted-foreground">Finished</span>))}
                          {events.length === 0 && <p className="text-xs text-muted-foreground">No events yet.</p>}
                        </div>
                      </div>
                    )}

                    {showUpcomingOnly && (
                      <div>
                        <h3 className="text-sm font-semibold text-secondary mb-2">Upcoming Events ({upcomingEvents.length})</h3>
                        <div className="space-y-3">
                          {upcomingEvents.map(item => renderItem(item, <span className="px-2 py-0.5 rounded text-xs font-semibold bg-secondary/20 text-secondary">Upcoming</span>))}
                          {upcomingEvents.length === 0 && <p className="text-xs text-muted-foreground">No upcoming events.</p>}
                        </div>
                      </div>
                    )}

                    {showFinishedOnly && (
                      <div>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-2">Finished Events ({finishedEvents.length})</h3>
                        <div className="space-y-3">
                          {finishedEvents.map(item => renderItem(item, <span className="px-2 py-0.5 rounded text-xs font-semibold bg-muted text-muted-foreground">Finished</span>))}
                          {finishedEvents.length === 0 && <p className="text-xs text-muted-foreground">No finished events.</p>}
                        </div>
                      </div>
                    )}

                    {showNews && (
                      <div>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-2">News ({newsItems.length})</h3>
                        <div className="space-y-3">
                          {newsItems.map(item => renderItem(item, <span className="px-2 py-0.5 rounded text-xs font-semibold bg-accent text-accent-foreground">News</span>))}
                          {newsItems.length === 0 && <p className="text-xs text-muted-foreground">No news updates yet.</p>}
                        </div>
                      </div>
                    )}

                    {showAchievements && (
                      <div>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-2">Achievements ({achievements.length})</h3>
                        <div className="space-y-3">
                          {achievements.map(item => renderItem(item, <span className="px-2 py-0.5 rounded text-xs font-semibold bg-accent text-accent-foreground">Achievement</span>))}
                          {achievements.length === 0 && <p className="text-xs text-muted-foreground">No achievements yet.</p>}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </TabsContent>

            {/* CONTACTS TAB */}
            <TabsContent value="contacts">
              <h2 className="font-display text-xl font-semibold mb-4">Contact Messages ({contacts.length})</h2>
              {contacts.length === 0 ? (
                <p className="text-muted-foreground font-body text-center py-10">No messages yet.</p>
              ) : (
                <div className="space-y-3">
                  {contacts.map(c => (
                    <div key={c.id} className={`bg-card rounded-lg p-4 flex items-center justify-between gap-4 card-hover ${!c.read ? "border-l-4 border-secondary" : ""}`}>
                      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => { markContactRead(c.id); setViewContact(c); refreshData(); }}>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-display font-semibold text-sm">{c.name}</p>
                          {!c.read && <span className="w-2 h-2 rounded-full bg-secondary" />}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{c.message}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{c.date}</p>
                      </div>
                      <button onClick={() => { deleteContact(c.id); refreshData(); toast.success("Deleted!"); }} className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center hover:bg-destructive/20 shrink-0">
                        <Trash2 className="w-3 h-3 text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* ADMISSIONS TAB */}
            <TabsContent value="admissions">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h2 className="font-display text-xl font-semibold">Admission Applications ({admissions.length})</h2>
                <select
                  value={admissionDateFilter}
                  onChange={(e) => setAdmissionDateFilter(e.target.value)}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="3days">Last 3 Days</option>
                  <option value="thisweek">This Week</option>
                  <option value="lastweek">Last Week</option>
                  <option value="thismonth">This Month</option>
                </select>
              </div>
              {admissions.length === 0 ? (
                <p className="text-muted-foreground font-body text-center py-10">No applications yet.</p>
              ) : (
                <div className="space-y-3">
                  {getFilteredAdmissions().map(a => (
                    <div key={a.id} className={`bg-card rounded-lg p-4 flex items-center justify-between gap-4 card-hover ${a.status === "not-viewed" ? "border-l-4 border-secondary" : ""}`}>
                      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => { markAdmissionViewed(a.id); refreshData(); setViewAdmission({ ...a, status: "viewed" }); }}>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-display font-semibold text-sm">{a.studentName}</p>
                          {a.status === "not-viewed" ? (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-secondary/20 text-secondary">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" /> New
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-accent text-muted-foreground">Viewed</span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">Grade: {a.gradeApplying} | Father: {a.fatherName}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{a.date}</p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button onClick={() => { markAdmissionViewed(a.id); refreshData(); setViewAdmission(a); }} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-accent/80" title="View"><Eye className="w-3 h-3" /></button>
                        <button onClick={() => downloadAdmissionPdf(a)} className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20" title="Download PDF"><FileDown className="w-3 h-3 text-primary" /></button>
                        <button onClick={() => { deleteAdmission(a.id); refreshData(); toast.success("Deleted!"); }} className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center hover:bg-destructive/20"><Trash2 className="w-3 h-3 text-destructive" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* CATEGORIES TAB */}
            <TabsContent value="categories">
              <h2 className="font-display text-xl font-semibold mb-4">Gallery Categories</h2>
              <div className="flex gap-2 mb-4">
                <Input placeholder="New category" value={newCat} onChange={(e) => setNewCat(e.target.value)} className="max-w-xs" />
                <Button variant="copper" onClick={handleAddCat}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <span key={cat} className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                    {cat}
                    {cat !== "All" && (
                      <button onClick={() => handleDeleteCat(cat)} className="ml-1 hover:text-destructive"><X className="w-3 h-3" /></button>
                    )}
                  </span>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Gallery Add Dialog */}
      <Dialog open={galleryDialog} onOpenChange={setGalleryDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Gallery Image</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Image URL" value={gForm.src} onChange={(e) => setGForm({ ...gForm, src: e.target.value })} />
            <Input placeholder="Title" value={gForm.title} onChange={(e) => setGForm({ ...gForm, title: e.target.value })} />
            <select value={gForm.category} onChange={(e) => setGForm({ ...gForm, category: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">Select Category</option>
              {categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <Button variant="copper" className="w-full" onClick={handleAddGallery}>Add Image</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Gallery Edit Dialog */}
      {editGallery && (
        <Dialog open={!!editGallery} onOpenChange={() => setEditGallery(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>Edit Image</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input value={editGallery.title} onChange={(e) => setEditGallery({ ...editGallery, title: e.target.value })} />
              <select value={editGallery.category} onChange={(e) => setEditGallery({ ...editGallery, category: e.target.value })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                {categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <Button variant="copper" className="w-full" onClick={handleUpdateGallery}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* News Add Dialog */}
      <Dialog open={newsDialog} onOpenChange={setNewsDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add News/Event</DialogTitle></DialogHeader>
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            <Input placeholder="Title" value={nForm.title} onChange={(e) => setNForm({ ...nForm, title: e.target.value })} />
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="date"
                value={nForm.date}
                onChange={(e) => setNForm({ ...nForm, date: e.target.value })}
                className="w-full pl-9 rounded-md border border-input bg-background px-3 py-2 text-sm h-10"
              />
            </div>
            <Textarea placeholder="Description" value={nForm.description} onChange={(e) => setNForm({ ...nForm, description: e.target.value })} />
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Image</label>
              <label className="flex items-center gap-2 cursor-pointer border border-input rounded-md px-3 py-2 bg-background hover:bg-accent transition-colors">
                <Upload className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-sm text-muted-foreground truncate">{nForm.image ? "Image selected" : "Browse image..."}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => setNForm({ ...nForm, image: ev.target?.result as string });
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
              {nForm.image && <img src={nForm.image} alt="preview" className="mt-2 h-24 rounded object-cover" />}
            </div>
            <select value={nForm.type} onChange={(e) => setNForm({ ...nForm, type: e.target.value as NewsEvent["type"] })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="Event">Event</option><option value="Achievement">Achievement</option><option value="News">News</option>
            </select>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={nForm.isUpcoming} onChange={(e) => setNForm({ ...nForm, isUpcoming: e.target.checked })} /> Upcoming Event</label>
            {nForm.isUpcoming && <Input placeholder="Time (e.g. 10:00 AM – 1:00 PM)" value={nForm.time} onChange={(e) => setNForm({ ...nForm, time: e.target.value })} />}
            <Button variant="copper" className="w-full" onClick={handleAddNews}>Add</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* News Edit Dialog */}
      {editNews && (
        <Dialog open={!!editNews} onOpenChange={() => setEditNews(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>Edit News/Event</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input value={editNews.title} onChange={(e) => setEditNews({ ...editNews, title: e.target.value })} />
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type="date"
                  value={editNews.date}
                  onChange={(e) => setEditNews({ ...editNews, date: e.target.value })}
                  className="w-full pl-9 rounded-md border border-input bg-background px-3 py-2 text-sm h-10"
                />
              </div>
              <Textarea value={editNews.description} onChange={(e) => setEditNews({ ...editNews, description: e.target.value })} />
              <select
                value={editNews.type}
                onChange={(e) => setEditNews({ ...editNews, type: e.target.value as NewsEvent["type"] })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="Event">Event</option>
                <option value="Achievement">Achievement</option>
                <option value="News">News</option>
              </select>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Image</label>
                <label className="flex items-center gap-2 cursor-pointer border border-input rounded-md px-3 py-2 bg-background hover:bg-accent transition-colors">
                  <Upload className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-muted-foreground truncate">{editNews.image ? "Change image..." : "Browse image..."}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => setEditNews({ ...editNews, image: ev.target?.result as string });
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
                {editNews.image && <img src={editNews.image} alt="preview" className="mt-2 h-24 rounded object-cover" />}
              </div>
              <Button variant="copper" className="w-full" onClick={handleUpdateNews}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* View Contact Dialog */}
      {viewContact && (
        <Dialog open={!!viewContact} onOpenChange={() => setViewContact(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>Message from {viewContact.name}</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <p className="text-sm"><strong>Email:</strong> {viewContact.email}</p>
              <p className="text-sm"><strong>Phone:</strong> {viewContact.phone || "N/A"}</p>
              <p className="text-sm"><strong>Date:</strong> {viewContact.date}</p>
              <div className="bg-accent rounded-lg p-4">
                <p className="text-sm font-body">{viewContact.message}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* View Admission Dialog */}
      {viewAdmission && (
        <Dialog open={!!viewAdmission} onOpenChange={() => setViewAdmission(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>Admission: {viewAdmission.studentName}</DialogTitle></DialogHeader>
            <div className="space-y-2 text-sm grid sm:grid-cols-2 gap-x-4">
              <p><strong>Student:</strong> {viewAdmission.studentName}</p>
              <p><strong>Gender:</strong> {viewAdmission.gender || "N/A"}</p>
              <p><strong>DOB:</strong> {viewAdmission.dob || "N/A"}</p>
              <p><strong>Nationality:</strong> {viewAdmission.nationality || "N/A"}</p>
              <p><strong>Aadhaar:</strong> {viewAdmission.aadhaarNo || "N/A"}</p>
              <p><strong>Religion/Caste:</strong> {viewAdmission.religionCaste || "N/A"}</p>
              <p><strong>Blood Group:</strong> {viewAdmission.bloodGroup || "N/A"}</p>
              <p><strong>Mother Tongue:</strong> {viewAdmission.motherTongue || "N/A"}</p>
              <p><strong>Grade:</strong> {viewAdmission.gradeApplying}</p>
              <div className="sm:col-span-2 border-t pt-2 mt-2"></div>
              <p><strong>Father:</strong> {viewAdmission.fatherName}</p>
              <p><strong>Mother:</strong> {viewAdmission.motherName || "N/A"}</p>
              <p><strong>Email:</strong> {viewAdmission.email}</p>
              <p><strong>Phone:</strong> {viewAdmission.phone}</p>
              <p className="sm:col-span-2"><strong>Address:</strong> {viewAdmission.address || "N/A"}</p>
              <div className="sm:col-span-2 border-t pt-2 mt-2"></div>
              <p><strong>Previous School:</strong> {viewAdmission.previousSchool || "N/A"}</p>
              <p><strong>Transport Required:</strong> {viewAdmission.transportRequired || "No"}</p>
              <p className="sm:col-span-2 text-xs text-muted-foreground mt-2 border-t pt-2"><strong>Submitted:</strong> {viewAdmission.date}</p>
            </div>
            <Button variant="outline" className="mt-4 w-full" onClick={() => downloadAdmissionPdf(viewAdmission)}>
              <FileDown className="w-4 h-4 mr-2" /> Download as PDF
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </Layout>
  );
};

export default AdminDashboard;
