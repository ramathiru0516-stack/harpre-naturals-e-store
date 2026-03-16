import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground mt-16">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-xl font-semibold mb-4">Harpre Naturals</h3>
          <p className="font-body text-sm opacity-80 leading-relaxed">
            Traditional herbal skincare, haircare, and natural food products made from authentic ingredients inspired by Ayurveda.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
          <div className="space-y-2">
            {[{ to: "/shop", label: "Shop" }, { to: "/categories", label: "Categories" }, { to: "/about", label: "About Us" }, { to: "/contact", label: "Contact" }].map(l => (
              <Link key={l.to} to={l.to} className="block font-body text-sm opacity-80 hover:opacity-100 transition-opacity">{l.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
          <div className="space-y-3 font-body text-sm opacity-80">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> 8667611271 / 9790623268</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> harprenaturals@gmail.com</div>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center font-body text-xs opacity-60">
        © 2026 Harpre Naturals. All rights reserved. Pure • Natural • Handcrafted
      </div>
    </div>
  </footer>
);

export default Footer;
