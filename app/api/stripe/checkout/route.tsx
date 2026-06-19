// app/api/stripe/checkout/route.tsx
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(request: NextRequest) {
  try {
    const { items, customerInfo } = await request.json();

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "cad",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Use fallback URL if env variable is missing
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
      customer_email: customerInfo.email,
      shipping_address_collection: {
        allowed_countries: ["CA", "US"],
      },
      metadata: {
        customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
      },
    });

    return NextResponse.json({ url: session.url, onSuccess:true });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ 
      error: error.message || "Failed to create checkout session", onSuccess: false 
    }, { status: 500});
  }
}