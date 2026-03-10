import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import schoolLogo from "@/assets/school-logo.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Principal's Message", path: "/principal-message" },
  { label: "Academics", path: "/academics" },
  { label: "Admissions", path: "/admissions" },
  { label: "Facilities", path: "/facilities" },
  { label: "Gallery", path: "/gallery" },
  { label: "News & Events", path: "/news-events" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  return (
    <>
      {/* Top Contact Bar */}
      <div className="gradient-primary hidden md:block">
        <div className="container-school flex items-center justify-between py-2 text-sm text-primary-foreground/90">
          <div className="flex items-center gap-6">
            <a href="tel:+918181818181" className="flex items-center gap-1.5 hover:text-primary-foreground transition-colors">
              <Phone className="w-3.5 h-3.5" />
              +91 81818 18181
            </a>
            <a href="mailto:info@stjosephps.edu.in" className="flex items-center gap-1.5 hover:text-primary-foreground transition-colors">
              <Mail className="w-3.5 h-3.5" />
              info@stjosephps.edu.in
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-primary-foreground/70">
            <MapPin className="w-3.5 h-3.5" />
            Narasimharajapura, Chikkamagaluru, Karnataka
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-card/95 backdrop-blur-md shadow-lg"
            : "bg-card"
        }`}
      >
        <div className="container-school flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={schoolLogo} alt="St Joseph Public School Logo" className="h-14 w-14 object-contain" />
            <div>
              <h1 className="font-display text-lg font-bold text-primary leading-tight">
                St Joseph Public School
              </h1>
              <p className="text-xs text-muted-foreground font-body">Narasimharajapura, Karnataka</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground/70 hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/admin-login">
              <Button variant="copper" size="sm" className="ml-2">
                Login
              </Button>
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileOpen && (
          <div className="lg:hidden bg-card border-t border-border animate-fade-up">
            <nav className="container-school py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground/70 hover:bg-accent/50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/admin-login" className="mt-2">
                <Button variant="copper" className="w-full">Login</Button>
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
