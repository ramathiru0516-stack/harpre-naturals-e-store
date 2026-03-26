import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import { getProductById } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { productImageMap } from "@/data/productImages";

const categoryEmojis: Record<string, string> = {
  "herbal-soaps": "🧼", "hair-oils": "💧", "herbal-gels": "✨",
  "lip-balms": "💋", "masala-powders": "🌶️", "pickles": "🫙",
  "honey": "🍯", "face-packs": "🌿", "hair-packs": "🌾",
  "herbal-powders": "🫧", "pre-mix-foods": "🍲",
  "shampoo-conditioner": "🧴", "special-products": "⭐",
};

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const image = product ? productImageMap[product.id] : undefined;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-display text-2xl text-foreground mb-4">Product not found</h1>
        <Link to="/shop" className="herb-btn-primary">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/shop" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {image ? (
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img src={image} alt={product.name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="aspect-square bg-secondary/50 rounded-2xl flex items-center justify-center">
            <span className="text-8xl">{categoryEmojis[product.categorySlug] || "🌿"}</span>
          </div>
        )}

        <div>
          <span className="herb-badge mb-3 inline-block">{product.category}</span>
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">{product.name}</h1>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-sans text-3xl font-bold text-foreground">₹{product.price}</span>
            {product.mrp && <span className="font-sans text-lg text-muted-foreground line-through">₹{product.mrp}</span>}
            {product.weight && <span className="font-body text-sm text-muted-foreground">/ {product.weight}</span>}
          </div>

          <p className="font-body text-muted-foreground leading-relaxed mb-6">{product.description}</p>

          {product.ingredients && (
            <div className="mb-4">
              <h3 className="font-display text-sm font-semibold text-foreground mb-1">Ingredients</h3>
              <p className="font-body text-sm text-muted-foreground">{product.ingredients}</p>
            </div>
          )}

          {product.benefits && (
            <div className="mb-6">
              <h3 className="font-display text-sm font-semibold text-foreground mb-1">Benefits</h3>
              <p className="font-body text-sm text-muted-foreground">{product.benefits}</p>
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-border rounded-full">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-2 text-muted-foreground hover:text-foreground"><Minus className="h-4 w-4" /></button>
              <span className="px-4 font-sans font-medium">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="p-2 text-muted-foreground hover:text-foreground"><Plus className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="flex gap-3 flex-col sm:flex-row">
            <button
              onClick={() => addToCart(product, qty)}
              className="herb-btn-outline gap-2 flex-1"
            >
              <ShoppingCart className="h-5 w-5" /> Add to Cart
            </button>
            <button
              onClick={() => { addToCart(product, qty); navigate("/checkout"); }}
              className="herb-btn-primary gap-2 flex-1"
            >
              <Zap className="h-5 w-5" /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
