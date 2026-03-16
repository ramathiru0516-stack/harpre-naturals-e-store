import { Link } from "react-router-dom";
import { Leaf, Shield, Heart, Sparkles } from "lucide-react";
import { categories, getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import heroBg from "@/assets/hero-bg.jpg";

const benefits = [
  { icon: Leaf, title: "100% Natural Ingredients", desc: "Every product uses pure, natural ingredients" },
  { icon: Shield, title: "Safe for Skin & Hair", desc: "Gentle formulas tested for all skin types" },
  { icon: Heart, title: "Handmade Products", desc: "Crafted with love and traditional methods" },
  { icon: Sparkles, title: "Traditional Formulas", desc: "Inspired by Ayurveda and home remedies" },
];

const Index = () => {
  const featured = getFeaturedProducts();

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-xl">
            <span className="herb-badge mb-4 inline-block">Natural • Handmade • Chemical Free</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Pure Herbal Wellness for Everyday Life
            </h1>
            <p className="font-body text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
              Discover traditional herbal skincare, haircare, and natural food products made from authentic ingredients.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="herb-btn-primary">Shop Now</Link>
              <Link to="/categories" className="herb-btn-outline">Explore Categories</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="herb-section-title text-center mb-3">Featured Categories</h2>
        <p className="text-center font-body text-muted-foreground mb-10">Explore our wide range of natural products</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.slice(0, 10).map(cat => (
            <Link
              key={cat.slug}
              to={`/shop?category=${cat.slug}`}
              className="herb-card p-4 text-center hover:border-primary/30 transition-all group"
            >
              <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">{cat.icon}</span>
              <h3 className="font-display text-sm font-semibold text-foreground">{cat.name}</h3>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/categories" className="font-body text-sm text-primary hover:underline">View All Categories →</Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="cream-gradient py-16">
        <div className="container mx-auto px-4">
          <h2 className="herb-section-title text-center mb-10">Why Harpre Naturals?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(b => (
              <div key={b.title} className="text-center p-6">
                <div className="w-14 h-14 rounded-full herb-gradient flex items-center justify-center mx-auto mb-4">
                  <b.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground mb-2">{b.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="herb-section-title text-center mb-3">Featured Products</h2>
        <p className="text-center font-body text-muted-foreground mb-10">Handpicked favorites from our collection</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="text-center mt-8">
          <Link to="/shop" className="herb-btn-primary">View All Products</Link>
        </div>
      </section>

      {/* About Preview */}
      <section className="cream-gradient py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="herb-section-title mb-6">About Harpre Naturals</h2>
          <p className="font-body text-muted-foreground leading-relaxed mb-8">
            Harpre Naturals provides traditional herbal skincare, haircare, and natural food products made from authentic ingredients inspired by Ayurveda and home remedies. Every product is handmade with love, ensuring purity and quality.
          </p>
          <Link to="/about" className="herb-btn-outline">Learn More</Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
