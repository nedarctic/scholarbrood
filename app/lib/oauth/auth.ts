"use client";

import { createClient } from "../supabase/client";

export async function signInWithGoogle() {
  const client = createClient();
  const { error } = await client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw error;
}