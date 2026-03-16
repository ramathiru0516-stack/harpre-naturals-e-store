import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "";
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory) result = result.filter(p => p.categorySlug === activeCategory);
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    return result;
  }, [activeCategory, search]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="herb-section-title mb-2">Shop</h1>
      <p className="font-body text-muted-foreground mb-6">Browse our complete range of natural products</p>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-full border border-border bg-muted/50 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <select
          value={activeCategory}
          onChange={e => { setSearchParams(e.target.value ? { category: e.target.value } : {}); }}
          className="px-4 py-2 rounded-full border border-border bg-muted/50 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="">All Categories</option>
          {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
      </div>

      <p className="font-body text-sm text-muted-foreground mb-4">{filtered.length} products found</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="font-display text-xl text-muted-foreground">No products found</p>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
