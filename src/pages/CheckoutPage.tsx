import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });
  const [payment, setPayment] = useState("upi");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [adminWhatsappLinks, setAdminWhatsappLinks] = useState<string[]>([]);
  const [customerWhatsappLink, setCustomerWhatsappLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const orderId = crypto.randomUUID();

    try {
      // Save order to database
      const { error: orderError } = await supabase
        .from("orders")
        .insert({
          id: orderId,
          user_id: user?.id || null,
          customer_name: form.name,
          customer_email: form.email,
          customer_phone: form.phone,
          customer_address: form.address,
          payment_method: payment,
          total_amount: totalPrice,
        });

      if (orderError) throw orderError;

      // Save order items
      const orderItems = items.map(item => ({
        order_id: orderId,
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      }));

      await supabase.from("order_items").insert(orderItems);

      // Send notification via edge function
      const { data: notifData } = await supabase.functions.invoke("order-notification", {
        body: {
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          customerAddress: form.address,
          items: orderItems,
          totalAmount: totalPrice,
          paymentMethod: payment,
        },
      });

      if (notifData?.adminWhatsappLinks) {
        setAdminWhatsappLinks(notifData.adminWhatsappLinks);
        // Auto-open admin WhatsApp link
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

        {payment === "upi" && (
          <div className="herb-card p-4 mb-6 text-left">
            <p className="font-display text-sm font-semibold text-foreground mb-2">UPI Payment Details</p>
            <p className="font-body text-sm text-muted-foreground">UPI ID: harvinheyansh-1@okicici</p>
            <p className="font-body text-xs text-muted-foreground mt-1">Please send ₹{totalPrice} and share the screenshot.</p>
          </div>
        )}

        {payment === "bank" && (
          <div className="herb-card p-4 mb-6 text-left">
            <p className="font-display text-sm font-semibold text-foreground mb-2">Bank Transfer Details</p>
            <p className="font-body text-sm text-muted-foreground">Account Name: Harpre Naturals</p>
            <p className="font-body text-sm text-muted-foreground">Account No: 5010047907515</p>
            <p className="font-body text-sm text-muted-foreground">IFSC: HDFC0000403</p>
            <p className="font-body text-sm text-muted-foreground">Bank: HDFC Bank</p>
          </div>
        )}

        {whatsappLinks.length > 0 && (
          <div className="space-y-3 mb-4">
            <p className="font-body text-sm text-muted-foreground">Send order details via WhatsApp to confirm:</p>
            <a href={whatsappLinks[0]} target="_blank" rel="noopener noreferrer" className="herb-btn-primary inline-block w-full text-center">
              📱 Send to 8667611271
            </a>
            {whatsappLinks[1] && (
              <a href={whatsappLinks[1]} target="_blank" rel="noopener noreferrer" className="herb-btn-outline inline-block w-full text-center">
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

  const inputClass = "w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="herb-section-title mb-6">Checkout</h1>

      {!user && (
        <div className="herb-card p-4 mb-6 flex items-center justify-between">
          <p className="font-body text-sm text-muted-foreground">Have an account? Sign in to track your orders.</p>
          <Link to="/login" className="herb-btn-outline text-sm py-2 px-4">Sign In</Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="herb-card p-6">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Delivery Information</h2>
            <div className="space-y-4">
              <input required placeholder="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputClass} />
              <input required placeholder="Phone Number" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inputClass} />
              <input required placeholder="Email Address" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass} />
              <textarea required placeholder="Delivery Address" rows={3} value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className={inputClass} />
            </div>
          </div>

          <div className="herb-card p-6">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Payment Method</h2>
            <div className="space-y-3">
              {[
                { value: "upi", label: "UPI Payment", desc: "UPI ID: harvinheyansh-1@okicici" },
                { value: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives" },
                { value: "bank", label: "Bank Transfer", desc: "HDFC Bank – A/C: 5010047907515, IFSC: HDFC0000403" },
              ].map(opt => (
                <label key={opt.value} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${payment === opt.value ? "border-primary bg-primary/5" : "border-border"}`}>
                  <input type="radio" name="payment" value={opt.value} checked={payment === opt.value} onChange={() => setPayment(opt.value)} className="mt-1 accent-primary" />
                  <div>
                    <span className="font-display text-sm font-semibold text-foreground">{opt.label}</span>
                    <p className="font-body text-xs text-muted-foreground">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="herb-card p-6 sticky top-20">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">{item.product.name} × {item.quantity}</span>
                  <span className="text-foreground font-medium">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between font-sans font-bold text-foreground text-lg"><span>Total</span><span>₹{totalPrice}</span></div>
            </div>
            <button type="submit" disabled={submitting} className="herb-btn-primary w-full text-center">
              {submitting ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
