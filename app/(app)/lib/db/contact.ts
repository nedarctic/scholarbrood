import type { SupabaseClient } from "@supabase/supabase-js";
import { NewContactMessage } from "@/app/(app)/types/contact";

export async function storeContactMessage(supabase: SupabaseClient, contactMessage: NewContactMessage) {
  
    const { data, error } = await supabase
    .from("contact_messages")
    .insert({
      name: contactMessage.name.trim(),
      email: contactMessage.email.toLowerCase().trim(),
      subject: contactMessage.subject.trim(),
      message: contactMessage.message.trim(),
    });

  if (error) {
    throw new Error(error.message);
  }
  console.log("Store contact data:", data);
  return data;
}
