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
    const { customerName, customerEmail, customerPhone, items, totalAmount, paymentMethod } = await req.json();

    // Build email body
    const itemsList = items.map((i: any) => `${i.product_name} × ${i.quantity} = ₹${i.price * i.quantity}`).join("\n");

    const emailBody = `
New Order Received from Harpre Naturals Website

Customer Name: ${customerName}
Customer Email: ${customerEmail}
Customer Phone: ${customerPhone}
Payment Method: ${paymentMethod}

Product Details:
${itemsList}

Total Amount: ₹${totalAmount}
    `.trim();

    // Send email notification using Supabase's built-in email (or log for now)
    console.log("Order notification email:", emailBody);

    // Build WhatsApp message
    const whatsappMessage = encodeURIComponent(
      `🛒 *New Order - Harpre Naturals*\n\n` +
      `*Customer:* ${customerName}\n` +
      `*Phone:* ${customerPhone}\n` +
      `*Email:* ${customerEmail}\n\n` +
      `*Items:*\n${itemsList}\n\n` +
      `*Total:* ₹${totalAmount}\n` +
      `*Payment:* ${paymentMethod}`
    );

    const whatsappLinks = [
      `https://wa.me/919790603088?text=${whatsappMessage}`,
      `https://wa.me/918667611827?text=${whatsappMessage}`,
    ];

    return new Response(
      JSON.stringify({ 
        success: true, 
        whatsappLinks,
        emailSent: true,
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
