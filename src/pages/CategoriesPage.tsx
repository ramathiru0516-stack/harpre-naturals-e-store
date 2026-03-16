import { Link } from "react-router-dom";
import { categories } from "@/data/products";

const CategoriesPage = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="herb-section-title mb-2">Categories</h1>
    <p className="font-body text-muted-foreground mb-8">Explore products by category</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map(cat => (
        <Link
          key={cat.slug}
          to={`/shop?category=${cat.slug}`}
          className="herb-card p-6 text-center hover:border-primary/30 transition-all group"
        >
          <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform">{cat.icon}</span>
          <h2 className="font-display text-lg font-semibold text-foreground mb-2">{cat.name}</h2>
          <p className="font-body text-sm text-muted-foreground">{cat.description}</p>
        </Link>
      ))}
    </div>
  </div>
);

export default CategoriesPage;
