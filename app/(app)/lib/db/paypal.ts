import type { SupabaseClient } from "@supabase/supabase-js";

export async function storePayPalOrder(
    supabase: SupabaseClient,
    { paypalOrderId }: { paypalOrderId: string }
) {
    const { data, error } = await supabase
        .from("new_paypal_orders")
        .insert({ paypal_order_id: paypalOrderId })
        .select()
        .single();

    if (error) throw error;
    return data;
}
