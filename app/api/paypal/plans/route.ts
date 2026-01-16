import { NextResponse } from "next/server";
import { getPayPalAccessToken_Sandbox } from "@/lib/paypal/paypal";

const PAYPAL_BASE =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

export async function GET() {
  try {
    const accessToken = await getPayPalAccessToken_Sandbox();

    // 1️⃣ Fetch all plans
    const listRes = await fetch(`${PAYPAL_BASE}/v1/billing/plans`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const listData = await listRes.json();

    // 2️⃣ Fetch details for each plan (pricing + interval)
    const plans = await Promise.all(
      listData.plans
        .filter((plan: any) => plan.status === "ACTIVE")
        .map(async (plan: any) => {
          const detailRes = await fetch(
            `${PAYPAL_BASE}/v1/billing/plans/${plan.id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          const detail = await detailRes.json();

          const billingCycle = detail.billing_cycles?.[0];
          const price = billingCycle?.pricing_scheme?.fixed_price?.value;
          const interval = billingCycle?.frequency?.interval_unit;

          return {
            id: plan.id,
            name: plan.name,
            description: plan.description,
            price: price ? Number(price) : null,
            interval, // DAY | WEEK | MONTH | YEAR
          };
        })
    );

    return NextResponse.json(plans);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch PayPal plans" },
      { status: 500 }
    );
  }
}
