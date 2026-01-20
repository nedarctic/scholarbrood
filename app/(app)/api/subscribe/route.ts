import { NextResponse } from "next/server";
import { storeNewsletterSubscription } from "@/app/(app)/lib/db/subscription";
import { createClient } from "@/app/(app)/lib/supabase/server";
import { sendNewsletterNotification } from "@/app/(app)/lib/email/sendNewsletterNotification";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const body = await req.json();

    const email = body?.email?.toString().trim();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    await storeNewsletterSubscription(supabase, { email });

    try {
      await sendNewsletterNotification(email);
    } catch (emailError) {
      console.error("Newsletter email failed:", emailError);
    }

    return NextResponse.json(
      { success: true },
      { status: 201 }
    );
  } catch (error: any) {
    const message =
      error?.message === "You are already subscribed."
        ? error.message
        : "Failed to subscribe. Please try again later.";

    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}
