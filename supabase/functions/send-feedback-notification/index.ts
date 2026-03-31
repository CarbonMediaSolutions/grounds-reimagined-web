import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      overall_experience,
      staff_helpful,
      product_quality,
      store_experience,
      found_everything,
      email,
      phone,
    } = await req.json();

    const positive = ["Excellent", "Good", "Yes, absolutely", "Yes"];
    const answers = [overall_experience, staff_helpful, product_quality, store_experience, found_everything];
    const positiveCount = answers.filter((a: string) => positive.includes(a)).length;
    const sentiment = positiveCount >= 3 ? "✅ Positive" : "⚠️ Negative";

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const contactInfo = [
      email ? `Email: ${email}` : null,
      phone ? `Phone: ${phone}` : null,
    ].filter(Boolean).join("<br/>") || "None provided";

    const html = `
      <h2>New Feedback Response — ${sentiment}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px;">
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold;">Overall Experience</td><td style="padding:6px 12px;border:1px solid #ddd;">${overall_experience}</td></tr>
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold;">Staff Helpful</td><td style="padding:6px 12px;border:1px solid #ddd;">${staff_helpful}</td></tr>
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold;">Product Quality</td><td style="padding:6px 12px;border:1px solid #ddd;">${product_quality}</td></tr>
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold;">Store Experience</td><td style="padding:6px 12px;border:1px solid #ddd;">${store_experience}</td></tr>
        <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold;">Found Everything</td><td style="padding:6px 12px;border:1px solid #ddd;">${found_everything}</td></tr>
      </table>
      <h3 style="margin-top:16px;">Contact Info</h3>
      <p>${contactInfo}</p>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "The Grounds Feedback <onboarding@resend.dev>",
        to: ["info@grounds.co.za"],
        subject: `${sentiment} — New Customer Feedback`,
        html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend API error:", data);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: data }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error sending feedback notification:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
