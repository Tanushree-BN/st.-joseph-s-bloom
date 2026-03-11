// localStorage-based store for admin data

export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: string;
}

export interface NewsEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  type: "Event" | "Achievement" | "News";
  isUpcoming?: boolean;
  time?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  read: boolean;
}

export interface AdmissionForm {
  id: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  dob: string;
  gradeApplying: string;
  address: string;
  previousSchool: string;
  date: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
}

const KEYS = {
  gallery: "sjps_gallery",
  news: "sjps_news",
  contacts: "sjps_contacts",
  admissions: "sjps_admissions",
  categories: "sjps_categories",
  adminLoggedIn: "sjps_admin_logged_in",
};

function get<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function set(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Auth
export const adminLogin = (username: string, password: string): boolean => {
  if (username === "admin" && password === "admin123") {
    set(KEYS.adminLoggedIn, true);
    return true;
  }
  return false;
};

export const isAdminLoggedIn = (): boolean => get(KEYS.adminLoggedIn, false);
export const adminLogout = () => localStorage.removeItem(KEYS.adminLoggedIn);

// Categories
const defaultCategories = ["All", "NSS", "Campus", "Academics", "Events", "Sports", "Cultural", "Activities"];
export const getCategories = (): string[] => get(KEYS.categories, defaultCategories);
export const addCategory = (cat: string) => {
  const cats = getCategories();
  if (!cats.includes(cat)) {
    set(KEYS.categories, [...cats, cat]);
  }
};
export const deleteCategory = (cat: string) => {
  const cats = getCategories().filter(c => c !== cat && c !== "All");
  set(KEYS.categories, ["All", ...cats]);
};

// Gallery
import schoolBuilding from "@/assets/school-building.jpg";
import studentsClassroom from "@/assets/students-classroom.jpg";
import scienceLab from "@/assets/science-lab.jpg";
import libraryImg from "@/assets/library.jpg";
import sportsGround from "@/assets/sports-ground.jpg";
import annualDay from "@/assets/annual-day.jpg";
import artClass from "@/assets/art-class.jpg";
import computerLab from "@/assets/computer-lab.jpg";

const defaultGallery: GalleryImage[] = [
  { id: "g1", src: schoolBuilding, category: "Campus", title: "School Building" },
  { id: "g2", src: studentsClassroom, category: "Academics", title: "Classroom Session" },
  { id: "g3", src: scienceLab, category: "Academics", title: "Science Lab" },
  { id: "g4", src: libraryImg, category: "Academics", title: "Library" },
  { id: "g5", src: sportsGround, category: "Sports", title: "Sports Ground" },
  { id: "g6", src: annualDay, category: "Events", title: "Annual Day" },
  { id: "g7", src: artClass, category: "Activities", title: "Art Class" },
  { id: "g8", src: computerLab, category: "Academics", title: "Computer Lab" },
  { id: "g9", src: schoolBuilding, category: "Campus", title: "Main Campus" },
  { id: "g10", src: studentsClassroom, category: "Cultural", title: "Cultural Event" },
  { id: "g11", src: scienceLab, category: "Academics", title: "Chemistry Lab" },
  { id: "g12", src: sportsGround, category: "Sports", title: "Athletics Track" },
  { id: "g13", src: annualDay, category: "Events", title: "Prize Distribution" },
  { id: "g14", src: artClass, category: "NSS", title: "NSS Camp" },
  { id: "g15", src: computerLab, category: "Academics", title: "Digital Learning" },
  { id: "g16", src: libraryImg, category: "Academics", title: "Reading Hour" },
];

export const getGallery = (): GalleryImage[] => {
  const stored = get<GalleryImage[] | null>(KEYS.gallery, null);
  if (stored === null) {
    set(KEYS.gallery, defaultGallery);
    return defaultGallery;
  }
  return stored;
};

export const addGalleryImage = (img: Omit<GalleryImage, "id">) => {
  const images = getGallery();
  const newImg = { ...img, id: `g_${Date.now()}` };
  set(KEYS.gallery, [newImg, ...images]);
  return newImg;
};

export const updateGalleryImage = (id: string, updates: Partial<GalleryImage>) => {
  const images = getGallery().map(img => img.id === id ? { ...img, ...updates } : img);
  set(KEYS.gallery, images);
};

export const deleteGalleryImage = (id: string) => {
  set(KEYS.gallery, getGallery().filter(img => img.id !== id));
};

// News
const defaultNews: NewsEvent[] = [
  { id: "n1", title: "Annual Day Celebrations 2025", date: "March 5, 2025", description: "A grand celebration showcasing student talents in dance, drama, and music.", image: annualDay, type: "Event" },
  { id: "n2", title: "Science Exhibition Winners", date: "February 20, 2025", description: "Our students won top prizes at the inter-school science exhibition.", image: scienceLab, type: "Achievement" },
  { id: "n3", title: "Art Competition Results", date: "February 10, 2025", description: "Outstanding performances by our young artists at the district level.", image: artClass, type: "Achievement" },
  { id: "n4", title: "Sports Day 2025", date: "January 25, 2025", description: "An exciting day of athletics, relay races, and team sports.", image: sportsGround, type: "Event" },
];

const defaultUpcoming: NewsEvent[] = [
  { id: "u1", title: "Parent-Teacher Meeting", date: "March 15, 2025", time: "10:00 AM - 1:00 PM", description: "", type: "Event", isUpcoming: true },
  { id: "u2", title: "Inter-School Quiz Competition", date: "March 22, 2025", time: "9:00 AM - 3:00 PM", description: "", type: "Event", isUpcoming: true },
  { id: "u3", title: "School Annual Exam Begins", date: "April 1, 2025", time: "9:00 AM", description: "", type: "Event", isUpcoming: true },
  { id: "u4", title: "Summer Camp Registration", date: "April 15, 2025", time: "All Day", description: "", type: "Event", isUpcoming: true },
];

export const getNews = (): NewsEvent[] => {
  const stored = get<NewsEvent[] | null>(KEYS.news, null);
  if (stored === null) {
    const all = [...defaultNews, ...defaultUpcoming];
    set(KEYS.news, all);
    return all;
  }
  return stored;
};

export const addNewsEvent = (item: Omit<NewsEvent, "id">) => {
  const news = getNews();
  const newItem = { ...item, id: `n_${Date.now()}` };
  set(KEYS.news, [newItem, ...news]);
  return newItem;
};

export const updateNewsEvent = (id: string, updates: Partial<NewsEvent>) => {
  set(KEYS.news, getNews().map(n => n.id === id ? { ...n, ...updates } : n));
};

export const deleteNewsEvent = (id: string) => {
  set(KEYS.news, getNews().filter(n => n.id !== id));
};

// Contact submissions
export const getContactSubmissions = (): ContactSubmission[] => get(KEYS.contacts, []);

export const addContactSubmission = (sub: Omit<ContactSubmission, "id" | "date" | "read">) => {
  const subs = getContactSubmissions();
  const newSub = { ...sub, id: `c_${Date.now()}`, date: new Date().toLocaleString(), read: false };
  set(KEYS.contacts, [newSub, ...subs]);
  return newSub;
};

export const markContactRead = (id: string) => {
  set(KEYS.contacts, getContactSubmissions().map(c => c.id === id ? { ...c, read: true } : c));
};

export const deleteContact = (id: string) => {
  set(KEYS.contacts, getContactSubmissions().filter(c => c.id !== id));
};

// Admissions
export const getAdmissions = (): AdmissionForm[] => get(KEYS.admissions, []);

export const addAdmission = (form: Omit<AdmissionForm, "id" | "date" | "status">) => {
  const forms = getAdmissions();
  const newForm = { ...form, id: `a_${Date.now()}`, date: new Date().toLocaleString(), status: "pending" as const };
  set(KEYS.admissions, [newForm, ...forms]);
  return newForm;
};

export const updateAdmissionStatus = (id: string, status: AdmissionForm["status"]) => {
  set(KEYS.admissions, getAdmissions().map(a => a.id === id ? { ...a, status } : a));
};

export const deleteAdmission = (id: string) => {
  set(KEYS.admissions, getAdmissions().filter(a => a.id !== id));
};
