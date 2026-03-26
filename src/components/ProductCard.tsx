import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Zap } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { productImageMap } from "@/data/productImages";

const categoryEmojis: Record<string, string> = {
  "herbal-soaps": "🧼", "hair-oils": "💧", "herbal-gels": "✨",
  "lip-balms": "💋", "masala-powders": "🌶️", "pickles": "🫙",
  "honey": "🍯", "face-packs": "🌿", "hair-packs": "🌾",
  "herbal-powders": "🫧", "pre-mix-foods": "🍲",
  "shampoo-conditioner": "🧴", "special-products": "⭐",
};

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const image = productImageMap[product.id];

  const handleBuyNow = () => {
    addToCart(product, 1);
    navigate("/checkout");
  };

  return (
    <div className="herb-card group overflow-hidden flex flex-col">
      <Link to={`/product/${product.id}`} className="block aspect-square bg-muted overflow-hidden">
        {image ? (
          <img src={image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary/50 group-hover:scale-105 transition-transform duration-500">
            <span className="text-4xl">{categoryEmojis[product.categorySlug] || "🌿"}</span>
          </div>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <span className="herb-badge mb-2 self-start">{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-base font-semibold text-foreground mb-1 hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <p className="font-body text-xs text-muted-foreground mb-3 line-clamp-2 flex-1">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="font-sans font-semibold text-foreground">₹{product.price}</span>
            {product.mrp && <span className="font-sans text-xs text-muted-foreground line-through">₹{product.mrp}</span>}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
