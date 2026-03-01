import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // If Stripe isn't configured, disable this endpoint cleanly (so Vercel can build).
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 501 }
    );
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  // Only handle what we need; ignore everything else.
  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const donationId = session.metadata?.donationId || null;
      const stripeSessionId = session.id;

      // Update donation by donationId if present, otherwise by session id.
      if (donationId) {
        await prisma.donation.update({
          where: { id: donationId },
          data: { status: "PAID" as any },
        });
      } else {
        await prisma.donation.updateMany({
          where: { stripeSessionId },
          data: { status: "PAID" as any },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    // Never crash the webhook handler—Stripe will retry; we just report failure.
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}