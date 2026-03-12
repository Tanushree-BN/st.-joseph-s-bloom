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
  gender: string;
  dob: string;
  nationality: string;
  aadhaarNo: string;
  religionCaste: string;
  motherTongue: string;
  bloodGroup: string;
  fatherName: string;
  motherName: string;
  email: string;
  phone: string;
  gradeApplying: string;
  address: string;
  previousSchool: string;
  transportRequired: string;
  date: string;
  status: "not-viewed" | "viewed";
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
import schoolBuilding from "@/assets/img1/st build.jpg";
import studentsClassroom from "@/assets/img1/classroom1.jpg";
import scienceLab from "@/assets/img1/st chem lab.jpg";
import libraryImg from "@/assets/img1/st lib new.jpg";
import sportsGround from "@/assets/img1/st playground.jpg";
import annualDay from "@/assets/img1/3.jpg";
import artClass from "@/assets/img1/art1.jpg";
import computerLab from "@/assets/img1/st comp.jpg";
import danceImg from "@/assets/img1/dance.jpg";
import yogaImg from "@/assets/img1/yoga.jpg";
import abacusImg from "@/assets/img1/abacus.jpg";
import carnaticImg from "@/assets/img1/carnatic1.jpg";
import smartBoardImg from "@/assets/img1/SmartBoard.jpg";
import bioLabImg from "@/assets/img1/bio lab.jpg";
import mathLabImg from "@/assets/img1/math.jpg";
import vedicClassImg from "@/assets/img1/vedic.jpg";
import schoolBusImg from "@/assets/img1/bus.jpg";
import physicsLabImg from "@/assets/img1/st phy lab.jpg";
import conferenceRoomImg from "@/assets/img1/st con room.jpg";
import miniAuditoriumImg from "@/assets/img1/st mini aud.jpg";

const defaultGallery: GalleryImage[] = [
  { id: "g1", src: schoolBuilding, category: "Campus", title: "School Building" },
  { id: "g2", src: studentsClassroom, category: "Academics", title: "Classroom Session" },
  { id: "g3", src: scienceLab, category: "Academics", title: "Physics/Chemistry Lab" },
  { id: "g4", src: libraryImg, category: "Academics", title: "Library" },
  { id: "g5", src: sportsGround, category: "Sports", title: "Sports Ground" },
  { id: "g6", src: annualDay, category: "Events", title: "Annual Day" },
  { id: "g7", src: artClass, category: "Activities", title: "Art Class" },
  { id: "g8", src: computerLab, category: "Academics", title: "Computer Lab" },
  { id: "g9", src: danceImg, category: "Cultural", title: "Classical Dance" },
  { id: "g10", src: yogaImg, category: "Sports", title: "Yoga Session" },
  { id: "g11", src: carnaticImg, category: "Cultural", title: "Carnatic Music" },
  { id: "g12", src: abacusImg, category: "Academics", title: "Abacus Training" },
  { id: "g13", src: smartBoardImg, category: "Academics", title: "Smart Classroom" },
  { id: "g14", src: bioLabImg, category: "Academics", title: "Biology Lab" },
  { id: "g15", src: schoolBuilding, category: "Campus", title: "Main Campus" },
  { id: "g16", src: annualDay, category: "Events", title: "Prize Distribution" },
  { id: "g17", src: mathLabImg, category: "Academics", title: "Mathematics Activity" },
  { id: "g18", src: vedicClassImg, category: "Activities", title: "Vedic Learning Session" },
  { id: "g19", src: schoolBusImg, category: "Campus", title: "School Transport" },
  { id: "g20", src: physicsLabImg, category: "Academics", title: "Physics Lab" },
  { id: "g21", src: conferenceRoomImg, category: "Campus", title: "Conference Room" },
  { id: "g22", src: miniAuditoriumImg, category: "Events", title: "Mini Auditorium" },
];

export const getGallery = (): GalleryImage[] => {
  const stored = get<GalleryImage[] | null>(KEYS.gallery, null);
  if (stored === null) {
    set(KEYS.gallery, defaultGallery);
    return defaultGallery;
  }

  const existingIds = new Set(stored.map(img => img.id));
  const missingDefaults = defaultGallery.filter(img => !existingIds.has(img.id));
  if (missingDefaults.length > 0) {
    const merged = [...stored, ...missingDefaults];
    set(KEYS.gallery, merged);
    return merged;
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
  const newForm = { ...form, id: `a_${Date.now()}`, date: new Date().toLocaleString(), status: "not-viewed" as const };
  set(KEYS.admissions, [newForm, ...forms]);
  return newForm;
};

export const markAdmissionViewed = (id: string) => {
  set(KEYS.admissions, getAdmissions().map(a => a.id === id ? { ...a, status: "viewed" as const } : a));
};

export const updateAdmissionStatus = (id: string, status: AdmissionForm["status"]) => {
  set(KEYS.admissions, getAdmissions().map(a => a.id === id ? { ...a, status } : a));
};

export const deleteAdmission = (id: string) => {
  set(KEYS.admissions, getAdmissions().filter(a => a.id !== id));
};
