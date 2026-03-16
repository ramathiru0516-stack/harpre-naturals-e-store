import { Leaf, Heart, Shield, Sparkles } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const AboutPage = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <img src={logo} alt="Harpre Naturals" className="h-24 w-24 rounded-full mx-auto mb-6 border-4 border-secondary" />
        <h1 className="herb-section-title mb-4">About Harpre Naturals</h1>
        <p className="font-body text-muted-foreground leading-relaxed">
          Harpre Naturals provides traditional herbal skincare, haircare, and natural food products made from authentic ingredients inspired by Ayurveda and home remedies. Every product is handmade with love, ensuring the highest quality and purity.
        </p>
      </div>

      <div className="cream-gradient rounded-2xl p-8 mb-12">
        <h2 className="font-display text-2xl font-semibold text-foreground text-center mb-8">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { icon: Leaf, title: "100% Natural", desc: "We use only pure, natural ingredients sourced responsibly." },
            { icon: Heart, title: "Handmade with Love", desc: "Every product is crafted by hand using traditional methods." },
            { icon: Shield, title: "Safe & Gentle", desc: "Chemical-free formulas safe for all skin and hair types." },
            { icon: Sparkles, title: "Ayurvedic Wisdom", desc: "Inspired by centuries-old Ayurvedic and herbal traditions." },
          ].map(v => (
            <div key={v.title} className="flex gap-4">
              <div className="w-12 h-12 rounded-full herb-gradient flex items-center justify-center shrink-0">
                <v.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-foreground mb-1">{v.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
        <p className="font-body text-muted-foreground leading-relaxed">
          To bring the goodness of nature to every household through pure, handmade, chemical-free herbal products. We believe in the power of traditional recipes and natural ingredients to provide safe, effective care for your skin, hair, and overall wellness.
        </p>
      </div>
    </div>
  </div>
);

export default AboutPage;
