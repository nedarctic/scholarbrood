import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";
import { storePayPalOrder } from "@/app/lib/db/paypal";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const body = await req.json();

    const orderID = body?.orderID?.toString().trim();
    if (!orderID) {
      return NextResponse.json({ error: "Missing PayPal order ID" }, { status: 400 });
    }

    // Store PayPal order in DB
    const result = await storePayPalOrder(supabase, { paypalOrderId: orderID });

    return NextResponse.json({ success: true, paypalOrderId: result.paypalOrderId }, { status: 201 });
  } catch (error: any) {
    console.error("PayPal capture error:", error);
    return NextResponse.json({ error: "Failed to capture PayPal order" }, { status: 500 });
  }
}
