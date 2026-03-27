import { useState, useRef } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { productImageMap } from "@/data/productImages";
import { Link } from "react-router-dom";
import { CheckCircle, Copy, Minus, Plus, Leaf, Heart, Upload, X, Image } from "lucide-react";

const UPI_ID = "harvinheyansh-1@okicici";
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${UPI_ID}`;

const CheckoutPage = () => {
  const { items, totalPrice, clearCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", pincode: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [adminWhatsappLinks, setAdminWhatsappLinks] = useState<string[]>([]);
  const [customerWhatsappLink, setCustomerWhatsappLink] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setScreenshotFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setScreenshotPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeScreenshot = () => {
    setScreenshotFile(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!screenshotFile) {
      alert("Please upload your payment screenshot to confirm the order.");
      return;
    }
    setSubmitting(true);
    const orderId = crypto.randomUUID();
    const fullAddress = `${form.address}, ${form.city} - ${form.pincode}`;

    try {
      // Upload screenshot
      const fileExt = screenshotFile.name.split(".").pop();
      const filePath = `${orderId}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("payment-screenshots")
        .upload(filePath, screenshotFile);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("payment-screenshots")
        .getPublicUrl(filePath);
      const screenshotUrl = urlData.publicUrl;

      const { error: orderError } = await supabase.from("orders").insert({
        id: orderId,
        user_id: user?.id || null,
        customer_name: form.name,
        customer_email: "",
        customer_phone: form.phone,
        customer_address: fullAddress,
        payment_method: "upi",
        total_amount: totalPrice,
        payment_screenshot_url: screenshotUrl,
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

          {/* Upload Payment Screenshot */}
          <div className="mt-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="screenshot-upload"
            />
            {screenshotPreview ? (
              <div className="relative rounded-xl border-2 border-primary/30 bg-primary/5 p-3">
                <div className="flex items-center gap-3">
                  <img src={screenshotPreview} alt="Payment screenshot" className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-semibold text-foreground truncate">{screenshotFile?.name}</p>
                    <p className="font-body text-xs text-primary">✓ Screenshot uploaded</p>
                  </div>
                  <button type="button" onClick={removeScreenshot} className="p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <label
                htmlFor="screenshot-upload"
                className="flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-dashed border-border hover:border-primary/40 cursor-pointer transition-colors bg-muted/10"
              >
                <Upload className="h-6 w-6 text-primary" />
                <span className="font-display text-sm font-semibold text-primary">Upload Payment Screenshot</span>
                <span className="font-body text-xs text-muted-foreground">Required to confirm order</span>
              </label>
            )}
          </div>

          <p className="font-body text-sm text-muted-foreground text-center mt-4">
            Total: <span className="font-bold text-foreground text-lg">₹{totalPrice}</span>
          </p>
        </div>

        {/* Confirm Order Button */}
        <button
          type="submit"
          disabled={submitting || !screenshotFile}
          className={`w-full py-4 text-base font-bold rounded-xl transition-colors ${
            screenshotFile
              ? "herb-btn-primary"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
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
