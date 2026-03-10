import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import schoolLogo from "@/assets/school-logo.png";

const Footer = () => {
  return (
    <footer className="gradient-primary text-primary-foreground">
      <div className="container-school py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* School Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={schoolLogo} alt="School Logo" className="h-12 w-12 object-contain brightness-200" />
              <div>
                <h3 className="font-display text-lg font-bold">St Joseph Public School</h3>
                <p className="text-sm text-primary-foreground/70">CBSE Affiliated</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Nurturing young minds with excellence in education, character building, and holistic development since 1995.
            </p>
            <div className="flex gap-3 mt-5">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About School", path: "/about" },
                { label: "Admissions", path: "/admissions" },
                { label: "Academics", path: "/academics" },
                { label: "Gallery", path: "/gallery" },
                { label: "Mandatory Disclosure", path: "/mandatory-disclosure" },
                { label: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-secondary" />
                Narasimharajapura, Chikkamagaluru District, Karnataka, India - 577134
              </li>
              <li>
                <a href="tel:+918181818181" className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <Phone className="w-4 h-4 shrink-0 text-secondary" />
                  +91 81818 18181
                </a>
              </li>
              <li>
                <a href="mailto:info@stjosephps.edu.in" className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <Mail className="w-4 h-4 shrink-0 text-secondary" />
                  info@stjosephps.edu.in
                </a>
              </li>
            </ul>
          </div>

          {/* School Hours */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">School Hours</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/80">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>8:00 AM - 3:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>8:00 AM - 12:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
            <div className="mt-5 p-3 rounded-lg bg-primary-foreground/10">
              <p className="text-xs text-primary-foreground/70">Office Hours</p>
              <p className="text-sm font-medium">Mon - Sat: 8:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} St Joseph Public School. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/mandatory-disclosure" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Mandatory Disclosure
            </Link>
            <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
