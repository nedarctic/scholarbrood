"use client";

import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";

export const dynamic = "force-dynamic"

export function useSupabaseUser() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const client = createClient();

  useEffect(() => {
    const session = client.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}