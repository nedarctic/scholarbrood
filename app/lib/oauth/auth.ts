"use client";

import { createClient } from "../supabase/client";

export const dynamic = "force-dynamic"

export async function signInWithGoogle() {
  const client = createClient();
  const { error } = await client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/api/auth/callback`,
    },
  });

  if (error) throw error;
}