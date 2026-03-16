import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  return (
    <div className="herb-card group overflow-hidden flex flex-col">
      <Link to={`/product/${product.id}`} className="block aspect-square bg-muted overflow-hidden">
        <div className="w-full h-full flex items-center justify-center bg-secondary/50 group-hover:scale-105 transition-transform duration-500">
          <span className="text-4xl">{product.categorySlug === "herbal-soaps" ? "🧼" : product.categorySlug === "hair-oils" ? "💧" : product.categorySlug === "herbal-gels" ? "✨" : product.categorySlug === "lip-balms" ? "💋" : product.categorySlug === "masala-powders" ? "🌶️" : product.categorySlug === "pickles" ? "🫙" : product.categorySlug === "honey" ? "🍯" : "🌿"}</span>
        </div>
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
