import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { productImageMap } from "@/data/productImages";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
        <p className="font-body text-muted-foreground mb-8">Explore our products and add something you love!</p>
        <Link to="/shop" className="herb-btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Shopping Cart</h1>

      <div className="herb-card p-4 md:p-6 mb-6">
        <div className="space-y-4">
          {items.map(item => {
            const img = productImageMap[item.product.id];
            return (
              <div key={item.product.id} className="flex items-center gap-3 md:gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-secondary/30 flex items-center justify-center shrink-0 overflow-hidden">
                  {img ? (
                    <img src={img} alt={item.product.name} className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <span className="text-2xl">🌿</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product.id}`} className="font-display text-sm md:text-base font-semibold text-foreground hover:text-primary line-clamp-2">
                    {item.product.name}
                  </Link>
                  <p className="font-body text-xs text-muted-foreground">{item.product.category}</p>
                </div>
                <div className="flex items-center border border-border rounded-full bg-muted/30">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2 text-muted-foreground hover:text-foreground">
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="px-2 font-sans text-sm font-semibold min-w-[1.5rem] text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-2 text-muted-foreground hover:text-foreground">
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <span className="font-sans font-semibold text-foreground min-w-[3.5rem] text-right text-sm md:text-base">₹{item.product.price * item.quantity}</span>
                <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="herb-card p-4 md:p-6">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">Order Summary</h2>
        <div className="space-y-3 mb-4 font-body text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span className="font-medium text-foreground">₹{totalPrice}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
        </div>
        <div className="border-t border-border pt-4 mb-6">
          <div className="flex justify-between font-sans font-bold text-foreground text-lg">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>
        <Link to="/checkout" className="herb-btn-primary w-full text-center block py-4 text-base font-semibold rounded-xl">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
