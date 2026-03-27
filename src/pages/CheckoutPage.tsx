import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { productImageMap } from "@/data/productImages";
import { Link } from "react-router-dom";
import { CheckCircle, Copy, Minus, Plus, Leaf, Heart } from "lucide-react";

const UPI_ID = "harvinheyansh-1@okicici";
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${UPI_ID}`;

const CheckoutPage = () => {
  const { items, totalPrice, clearCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", pincode: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [adminWhatsappLinks, setAdminWhatsappLinks] = useState<string[]>([]);
  const [customerWhatsappLink, setCustomerWhatsappLink] = useState("");

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const orderId = crypto.randomUUID();
    const fullAddress = `${form.address}, ${form.city} - ${form.pincode}`;

    try {
      const { error: orderError } = await supabase.from("orders").insert({
        id: orderId,
        user_id: user?.id || null,
        customer_name: form.name,
        customer_email: "",
        customer_phone: form.phone,
        customer_address: fullAddress,
        payment_method: "upi",
        total_amount: totalPrice,
      });
      if (orderError) throw orderError;

      const orderItems = items.map(item => ({
        order_id: orderId,
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      }));
      await supabase.from("order_items").insert(orderItems);

      const { data: notifData } = await supabase.functions.invoke("order-notification", {
        body: {
          customerName: form.name,
          customerPhone: form.phone,
          customerAddress: fullAddress,
          items: orderItems,
          totalAmount: totalPrice,
          paymentMethod: "upi",
        },
      });

      if (notifData?.adminWhatsappLinks) {
        setAdminWhatsappLinks(notifData.adminWhatsappLinks);
        window.open(notifData.adminWhatsappLinks[0], "_blank");
      }
      if (notifData?.customerWhatsappLink) {
        setCustomerWhatsappLink(notifData.customerWhatsappLink);
      }

      clearCart();
      setSubmitted(true);
    } catch (err) {
      console.error("Order error:", err);
      alert("There was an error placing your order. Please try again.");
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-md">
        <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
        <h1 className="font-display text-3xl font-bold text-foreground mb-4">Order Placed!</h1>
        <p className="font-body text-muted-foreground mb-6">Thank you for your order. We'll contact you shortly to confirm.</p>

        {customerWhatsappLink && (
          <div className="space-y-3 mb-4">
            <p className="font-body text-sm font-semibold text-foreground">📩 Receive your order confirmation:</p>
            <a href={customerWhatsappLink} target="_blank" rel="noopener noreferrer" className="herb-btn-primary inline-block w-full text-center">
              💚 Get Thank You Message on WhatsApp
            </a>
          </div>
        )}

        {adminWhatsappLinks.length > 0 && (
          <div className="space-y-3 mb-4">
            <p className="font-body text-sm text-muted-foreground">Send order details to Harpre Naturals:</p>
            <a href={adminWhatsappLinks[0]} target="_blank" rel="noopener noreferrer" className="herb-btn-outline inline-block w-full text-center">
              📱 Send to 8667611271
            </a>
            {adminWhatsappLinks[1] && (
              <a href={adminWhatsappLinks[1]} target="_blank" rel="noopener noreferrer" className="herb-btn-outline inline-block w-full text-center">
                📱 Send to 9790623268
              </a>
            )}
          </div>
        )}

        <div className="mt-4">
          <Link to="/shop" className="herb-btn-outline">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-display text-2xl text-foreground mb-4">No items to checkout</h1>
        <Link to="/shop" className="herb-btn-primary">Go to Shop</Link>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground";

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Step 1 - Products */}
        <div className="herb-card p-4 md:p-6">
          <h2 className="font-display text-lg font-bold text-foreground mb-4">1. Select Products</h2>
          <div className="space-y-3">
            {items.map(item => {
              const img = productImageMap[item.product.id];
              return (
                <div key={item.product.id} className="flex items-center justify-between gap-3 p-3 rounded-xl border border-border bg-muted/20">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {img && (
                      <img src={img} alt={item.product.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="font-display text-sm font-semibold text-foreground truncate">{item.product.name}</p>
                      <p className="font-sans text-sm font-bold text-primary">₹{item.product.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center border border-border rounded-full bg-muted/40 shrink-0">
                    <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2 text-muted-foreground hover:text-foreground">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-3 font-sans text-sm font-semibold min-w-[1.5rem] text-center">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-2 text-muted-foreground hover:text-foreground">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2 - Delivery Details */}
        <div className="herb-card p-4 md:p-6">
          <h2 className="font-display text-lg font-bold text-foreground mb-4">2. Delivery Details</h2>
          <div className="space-y-3">
            <input required placeholder="Your Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputClass} />
            <input required placeholder="Phone Number (10 digits)" type="tel" pattern="[0-9]{10}" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inputClass} />
            <textarea required placeholder="Complete Delivery Address" rows={3} value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className={inputClass} />
            <div className="grid grid-cols-2 gap-3">
              <input required placeholder="City" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} className={inputClass} />
              <input required placeholder="Pincode" type="text" pattern="[0-9]{6}" value={form.pincode} onChange={e => setForm(f => ({ ...f, pincode: e.target.value }))} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Step 3 - Payment via UPI */}
        <div className="herb-card p-4 md:p-6">
          <h2 className="font-display text-lg font-bold text-foreground mb-4">3. Payment via UPI</h2>
          <div className="rounded-xl border border-border p-4 text-center mb-4">
            <p className="font-body text-sm text-muted-foreground mb-3">Scan to pay securely</p>
            <div className="flex justify-center mb-4">
              <img src={QR_URL} alt="UPI QR Code" className="w-48 h-48 rounded-lg bg-white p-2 shadow-sm" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-sm text-foreground">{UPI_ID}</span>
              <button type="button" onClick={copyUPI} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <Copy className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            {copied && <p className="text-xs text-primary mt-1">Copied!</p>}
          </div>

          <p className="font-body text-sm text-muted-foreground text-center mb-2">
            Total: <span className="font-bold text-foreground text-lg">₹{totalPrice}</span>
          </p>
        </div>

        {/* Confirm Order Button */}
        <button type="submit" disabled={submitting} className="herb-btn-primary w-full py-4 text-base font-bold rounded-xl">
          {submitting ? "Placing Order..." : "Confirm Order ✅"}
        </button>
        <p className="font-body text-xs text-muted-foreground text-center">
          You will be redirected to WhatsApp to complete your order.
        </p>
      </form>

      {/* Trust Badges */}
      <div className="flex justify-center gap-8 mt-8 pb-8">
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Leaf className="h-5 w-5 text-primary" />
          </div>
          <span className="font-body text-xs text-muted-foreground">100% Natural</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <span className="font-body text-xs text-muted-foreground">Handmade Product</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
