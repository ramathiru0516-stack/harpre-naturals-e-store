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

    const whatsappMessage = encodeURIComponent(
      `🛒 *New Order - Harpre Naturals*\n\n` +
      `*Customer:* ${customerName}\n` +
      `*Phone:* ${customerPhone}\n` +
      `*Email:* ${customerEmail}\n` +
      `*Address:* ${customerAddress}\n\n` +
      `*Items:*\n${itemsList}\n\n` +
      `*Total:* ₹${totalAmount}\n` +
      `*Payment:* ${paymentMethod}`
    );

    const whatsappLinks = [
      `https://wa.me/918667611271?text=${whatsappMessage}`,
      `https://wa.me/919790623268?text=${whatsappMessage}`,
    ];

    // Log for debugging
    console.log("Order notification processed for:", customerName, "Total:", totalAmount);

    return new Response(
      JSON.stringify({ 
        success: true, 
        whatsappLinks,
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
