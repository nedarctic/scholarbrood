import type { SupabaseClient } from "@supabase/supabase-js";

export async function storeOrder(
  supabase: SupabaseClient,
  order: {
    service: string;
    name: string;
    email: string;
    details: string;
    files?: string[];
  }
) {
  const { error } = await supabase
    .from("new_orders")
    .insert({
      service: order.service,
      name: order.name,
      email: order.email,
      details: order.details,
      files: order.files || [],
    });

  if (error) {
    if (error.code === "23505") {
      throw new Error("This order has already been submitted.");
    }
    throw new Error(error.message);
  }

  // If you really need the inserted row → run a separate .select() with .single()
  // but usually not necessary for a public order form
  return { success: true }; // or whatever you need
}
