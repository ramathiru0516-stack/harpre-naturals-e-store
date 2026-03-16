import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
        <p className="font-body text-muted-foreground mb-8">Explore our products and add something you love!</p>
        <Link to="/shop" className="herb-btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="herb-section-title mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.product.id} className="herb-card p-4 flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-secondary/50 flex items-center justify-center shrink-0">
                <span className="text-2xl">🌿</span>
              </div>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.id}`} className="font-display text-sm font-semibold text-foreground hover:text-primary">{item.product.name}</Link>
                <p className="font-body text-xs text-muted-foreground">{item.product.category}</p>
              </div>
              <div className="flex items-center border border-border rounded-full">
                <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 text-muted-foreground"><Minus className="h-3 w-3" /></button>
                <span className="px-3 font-sans text-sm font-medium">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 text-muted-foreground"><Plus className="h-3 w-3" /></button>
              </div>
              <span className="font-sans font-semibold text-foreground min-w-[4rem] text-right">₹{item.product.price * item.quantity}</span>
              <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>

        <div className="herb-card p-6 h-fit sticky top-20">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4 font-body text-sm">
            <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>₹{totalPrice}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>Calculated at checkout</span></div>
          </div>
          <div className="border-t border-border pt-4 mb-6">
            <div className="flex justify-between font-sans font-bold text-foreground text-lg"><span>Total</span><span>₹{totalPrice}</span></div>
          </div>
          <Link to="/checkout" className="herb-btn-primary w-full text-center">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
