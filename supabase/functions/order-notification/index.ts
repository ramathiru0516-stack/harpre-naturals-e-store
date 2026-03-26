import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerName, customerEmail, customerPhone, customerAddress, items, totalAmount, paymentMethod } = await req.json();

    const itemsList = items.map((i: any) => `${i.product_name} × ${i.quantity} = ₹${i.price * i.quantity}`).join("\n");

    // Admin message with full order details
    const adminMessage = encodeURIComponent(
      `🛒 *New Order - Harpre Naturals*\n\n` +
      `*Customer:* ${customerName}\n` +
      `*Phone:* ${customerPhone}\n` +
      `*Email:* ${customerEmail}\n` +
      `*Address:* ${customerAddress}\n\n` +
      `*Items:*\n${itemsList}\n\n` +
      `*Total:* ₹${totalAmount}\n` +
      `*Payment:* ${paymentMethod}`
    );

    // Thank you message to customer
    const customerMessage = encodeURIComponent(
      `🌿 *Thank you for your order, ${customerName}!*\n\n` +
      `We're thrilled you chose *Harpre Naturals* 💚\n\n` +
      `*Your Order Summary:*\n${itemsList}\n\n` +
      `*Total:* ₹${totalAmount}\n` +
      `*Payment:* ${paymentMethod}\n\n` +
      `We'll process your order shortly and keep you updated.\n\n` +
      `For any queries, reach us at:\n📞 8667611271 / 9790623268\n📧 harprenaturals@gmail.com\n\n` +
      `_With love, Harpre Naturals 🌱_`
    );

    // Clean customer phone (remove spaces, +91 prefix if needed)
    const cleanPhone = customerPhone.replace(/\s+/g, "").replace(/^\+?91/, "");
    const customerWhatsapp = `https://wa.me/91${cleanPhone}?text=${customerMessage}`;

    const adminLinks = [
      `https://wa.me/918667611271?text=${adminMessage}`,
      `https://wa.me/919790623268?text=${adminMessage}`,
    ];

    console.log("Order notification processed for:", customerName, "Total:", totalAmount);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminWhatsappLinks: adminLinks,
        customerWhatsappLink: customerWhatsapp,
        message: "Order notification processed" 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
