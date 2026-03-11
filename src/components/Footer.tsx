import { Link } from "react-router-dom";
import { Clock, Facebook, Instagram, Youtube, Linkedin, ChevronRight } from "lucide-react";
import schoolLogo from "@/assets/images/logo.png";
import stJoseph from "@/assets/images/joseph.jpg";

const values = [
  "Solidarity",
  "Faith in God",
  "Nurturing the whole person",
  "Mature Love and Respect",
  "Love for justice and peace",
  "Academic Excellence without compromise",
];

const timings = [
  { day: "Monday – Friday", time: "8:00 AM – 4:00 PM" },
  { day: "Saturday", time: "8:00 AM – 1:00 PM" },
  { day: "Sunday", time: "Closed" },
  { day: "Office Hours", time: "9:00 AM – 3:00 PM" },
];

const Footer = () => {
  return (
    <footer className="gradient-primary text-primary-foreground">
      <div className="container-school py-16">
        {/* Top section: St Joseph image + school info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
          {/* St Joseph carrying Baby Jesus image */}
          <div className="shrink-0 flex flex-col items-center gap-2">
            <div className="w-28 h-36 rounded-xl overflow-hidden border-2 border-primary-foreground/20 shadow-lg bg-primary-foreground/10 flex items-center justify-center">
              <img
                src={stJoseph}
                alt="St Joseph carrying Baby Jesus"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* School intro */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src={schoolLogo} alt="School Logo" className="h-14 w-14 object-contain brightness-200" />
              <div>
                <p className="font-display text-xl font-bold">St Joseph Public School</p>
                <p className="text-sm text-primary-foreground/70">ICSE Affiliated</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed max-w-md">
              St. Joseph Public School is fully dedicated to St. Joseph our patron and guide who is an ever rejuvenating and excellent model for hard work and determination and a true icon who stands for justice and love.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Our Values */}
          <div>
            <h3 className="font-display text-xl font-bold uppercase mb-5">Our Values</h3>
            <ul className="space-y-2.5">
              {values.map((value, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-primary-foreground/80">
                  <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-secondary" />
                  {value}
                </li>
              ))}
            </ul>
          </div>

          {/* School Timings */}
          <div>
            <h3 className="font-display text-xl font-bold uppercase mb-5">School Timings</h3>
            <ul className="space-y-3">
              {timings.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-primary-foreground/80">
                  <Clock className="w-4 h-4 mt-0.5 shrink-0 text-secondary" />
                  <div>
                    <p className="font-semibold text-primary-foreground/90">{t.day}</p>
                    <p>{t.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-xl font-bold uppercase mb-5">Contact Details</h3>
            <ul className="space-y-4">
              <li className="text-sm text-primary-foreground/80">
                <span className="font-semibold text-primary-foreground">Address :</span><br />
                St Joseph Public School Narasimharajapura<br />
                Deepti Circle, Nagalapura, Narasimharajapura,<br />
                Chikmagalur dt. Karnataka – 577134
              </li>
              <li className="text-sm text-primary-foreground/80">
                <span className="font-semibold text-primary-foreground">Contact Number : </span>
                <a href="tel:9448982159" className="hover:text-primary-foreground transition-colors">9448982159</a>
              </li>
              <li className="text-sm text-primary-foreground/80">
                <span className="font-semibold text-primary-foreground">Email : </span>
                <a href="mailto:sjpschool.nrp@gmail.com" className="hover:text-primary-foreground transition-colors">sjpschool.nrp@gmail.com</a>
              </li>
            </ul>
            <div className="flex gap-3 mt-5">
              {[
                { Icon: Instagram, href: "#" },
                { Icon: Facebook, href: "#" },
                { Icon: Youtube, href: "#" },
                { Icon: Linkedin, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-primary-foreground/10 flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex flex-col gap-1 items-center">
            <p className="text-sm text-primary-foreground/60">
              Copyright © 2025 St Joseph Public School. All rights reserved.
            </p>
            <p className="text-sm text-primary-foreground/60">
              Design & developed by <a href="https://www.mitrasoftwares.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors underline underline-offset-2">Mitra Softwares</a>
            </p>
          </div>
          <div className="flex gap-6 justify-center">
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
