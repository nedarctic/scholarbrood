import type { SupabaseClient } from "@supabase/supabase-js";
import { NewNewsletterSubscription } from "@/app/(app)/types/newslettersubs";

export async function storeNewsletterSubscription(
  supabase: SupabaseClient,
  subscription: NewNewsletterSubscription
) {
  const { data, error } = await supabase
    .from("newsletter_subscriptions")
    .insert({
      email: subscription.email.toLowerCase().trim(),
    });

  if (error) {
    // 23505 = unique_violation (Postgres)
    if (error.code === "23505") {
      throw new Error("You are already subscribed.");
    }

    throw new Error(error.message);
  }

  return data;
}
