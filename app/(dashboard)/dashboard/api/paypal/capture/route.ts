import { NextRequest, NextResponse } from "next/server";
import { getPayPalAccessToken_Sandbox } from "@/app/(app)/lib/paypal/paypal";
import type { PayPalOrderCapture } from "@/app/(dashboard)/dashboard/types/paypal";
import { createClient } from "@/app/(app)/lib/supabase/server";

export async function POST(req: NextRequest) {
    const supabase = await createClient();

    // Get logged-in user
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { orderID } = await req.json();

        if (!orderID || typeof orderID !== "string") {
            return NextResponse.json(
                { error: "Missing or invalid orderID" },
                { status: 400 }
            );
        }

        const accessToken = await getPayPalAccessToken_Sandbox();

        const captureUrl = `${process.env.PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`;

        const response = await fetch(captureUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                // Optional: helps with idempotency if you retry on network failure
                "PayPal-Request-Id": `capture-${orderID}-${Date.now()}`,
            },
            // Body usually empty for simple capture
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("PayPal capture failed:", errorData);
            return NextResponse.json(
                {
                    error: errorData.message || "Failed to capture PayPal order",
                    details: errorData,
                },
                { status: response.status }
            );
        }

        const result: PayPalOrderCapture = await response.json();
        console.log("Order details from the order capture route:", result);

        // In production you would:
        // - Save to database (orderID, capture ID, amount, payer email, status)
        // - Send confirmation email
        // - Unlock digital download, etc.

        // save to database
        console.log("Order details from the order capture route:", result);

        return NextResponse.json({
            success: true,
            orderID: result.id,
            status: result.status,
            payer: result.payer,
            captureID: result.purchase_units?.[0]?.payments?.captures?.[0].id ?? null,
        });
    } catch (err: any) {
        console.error("Capture route error:", err);
        return NextResponse.json(
            { error: "Internal server error", details: err.message },
            { status: 500 }
        );
    }
}