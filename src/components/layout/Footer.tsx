import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Clock } from "lucide-react";
import pfLogo from "@/assets/pf-logo.png";

const services = [
  { label: "Personal Tax Filing", href: "/services/personal-tax-filing" },
  { label: "Family Tax Filing", href: "/services/family-tax-filing" },
  { label: "Business Tax Return", href: "/services/business-tax-return" },
  { label: "NTN Registration", href: "/services/ntn-registration" },
  { label: "IRIS Profile Update", href: "/services/iris-profile-update" },
  { label: "GST Registration", href: "/services/gst-registration" },
  { label: "Business Incorporation", href: "/services/business-incorporation" },
  { label: "Salary Tax Calculator", href: "/services/salary-tax-calculator" },
];

const company = [
  { label: "About Us", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F1F14] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <img src={pfLogo} alt="Pak Filer" className="w-12 h-12 rounded-xl bg-white p-1" />
              <span className="text-xl font-display font-bold">Pak Filer</span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              Pakistan's Most Trusted Tax Filing Platform. We simplify Pakistan's tax system so you can focus on what matters most. CA-certified, secure, and 100% online.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Linkedin, href: "#" },
                { Icon: Twitter, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#1A8549] hover:border-[#1A8549] transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-base mb-5">Services</h4>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s.href}>
                  <Link to={s.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-base mb-5">Company</h4>
            <ul className="space-y-3">
              {company.map(c => (
                <li key={c.href}>
                  <Link to={c.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-base mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <Mail className="w-4 h-4 mt-0.5 text-[#1A8549]" />
                <span>support@pakfiler.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <Phone className="w-4 h-4 mt-0.5 text-[#1A8549]" />
                <span>WhatsApp Available</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 text-[#1A8549]" />
                <span>Pakistan</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <Clock className="w-4 h-4 mt-0.5 text-[#1A8549]" />
                <span>Mon–Sat, 9 AM–6 PM PKT</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Pak Filer. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span>🔒 Registered with FBR</span>
            <span>✅ CA Certified Platform</span>
            <span>🇵🇰 Built in Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
