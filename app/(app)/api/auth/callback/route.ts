import { NextResponse } from "next/server";
import { createClient } from "@/app/(app)/lib/supabase/server";

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/login?error=missing_code`);
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      `${origin}/auth/login?error=oauth_failed`
    );
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}
