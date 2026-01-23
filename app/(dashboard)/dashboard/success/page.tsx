"use client";

import { oswald } from "@/app/fonts";
import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";

export const dynamic = "force-dynamic"

export default function SuccessPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  return (
    <div
      className={`${oswald.className} min-h-screen flex flex-col items-center justify-center`}
    >
      <h1 className="text-3xl font-bold mb-4">Success!</h1>

      {user ? (
        <p className="text-lg">Thank you, {user.email}</p>
      ) : (
        <p className="text-lg">Finalizing your session…</p>
      )}
    </div>
  );
}
