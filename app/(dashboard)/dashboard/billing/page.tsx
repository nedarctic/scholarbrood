import { GetSubscription } from '@/app/(app)/lib/paypal/subscriptions'
import type { StoredSubscription } from '@/app/(app)/types/subscription'
import { createClient } from '@/app/(app)/lib/supabase/server'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { UserResponse } from '@supabase/supabase-js'
import { Suspense } from 'react';
import { oswald } from '@/app/(app)/fonts'
import { redirect } from 'next/navigation'

async function getUserData(supabase: SupabaseClient) {
  const user: UserResponse = await supabase.auth.getUser();
  return user.data;
}

async function BillingComponent() {
  try {
    const supabase = await createClient();
    const userData = await getUserData(supabase);

    let userId;
    let subscriptions;

    if (userData.user?.id) {
      userId = userData.user.id
      subscriptions = await GetSubscription(userId);
      console.log("User ID in the billing page:", userId);
      console.log("User subscription Details:", subscriptions);
    } else {
      console.log("User ID was not found. Redirecting user to login page.");
      redirect("/auth/login");
    }
  } catch(error){
    console.error("An error occurred. Check network connection.")
  }

  return <div>Billing Page</div>;
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div className={`${oswald.className} antialiased h-screen flex flex-col justify-center items-center text-black bg-white dark:text-white dark:bg-black text-2xl`}>Loading billing details</div>}>
      <BillingComponent />
    </Suspense>
  );
}