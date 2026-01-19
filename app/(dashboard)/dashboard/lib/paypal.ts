import type { PayPalOrderCapture } from "../types/paypal";
import type { SupabaseClient } from "@supabase/supabase-js";

// store order details
export const storeOrderDetails = async (
  order: PayPalOrderCapture,
  supabase: SupabaseClient,
  userId: string | undefined
) => {
  if (!userId) {
    console.error("No userId provided to storeOrderDetails");
    return null;
  }

  const record = {
    user_id: userId,                  // UUID from Supabase auth
    paypal_order_id: order.id,        // PayPal string ID
    status: order.status,
    payment_source: order.payment_source ?? null,
    purchase_units: order.purchase_units ?? null,
    payer: order.payer ?? null,
    links: order.links ?? null,
  };

  const { data, error } = await supabase
    .from("paypal_order_captures")
    .upsert(record, { onConflict: "paypal_order_id" }) // text column
    .select()
    .single();

  if (error) {
    console.error("Store order error:", error);
    return null;
  }

  return data;
};


// fetch stored order details using order id
export const fetchOrderDetails = async (userId: string, supabase: SupabaseClient): Promise<PayPalOrderCapture | null> => {

    const { data, error } = await supabase
        .from("paypal_order_captures")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (error) {
        console.error("Retrieve order error:", error);
        return null;
    }

    console.log("User ID:", userId);
    console.log("Get order data:", data);
    return data;
}
