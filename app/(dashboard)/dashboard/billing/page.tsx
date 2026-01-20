import { GetSubscription } from '@/app/(app)/lib/paypal/subscriptions'
import type { StoredSubscription } from '@/app/(app)/types/subscription'
import { getPayPalPlanName } from '@/app/(app)/lib/paypal/paypal'
import { createClient } from '@/app/(app)/lib/supabase/server'
import { Suspense } from 'react'
import { oswald } from '@/app/(app)/fonts'
import { redirect } from 'next/navigation'
import type {
  SupabaseClient,
  UserResponse,
  User
} from '@supabase/supabase-js'

export const dynamic = "force-dynamic"

async function getUserData(supabase: SupabaseClient): Promise<User | null> {
  const { data, error }: UserResponse = await supabase.auth.getUser()
  if (error) console.error(error)
  return data.user
}

function formatDate(date?: string) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase()

  const styles =
    normalized === 'active'
      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
      : normalized === 'cancelled'
      ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
      : normalized === 'failed'
      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'

  return (
    <span className={`px-4 py-1 rounded-full text-sm font-semibold ${styles}`}>
      {status}
    </span>
  )
}

async function BillingComponent() {
  const supabase = await createClient()
  const user = await getUserData(supabase)

  if (!user) redirect('/login')

  const subscription: StoredSubscription | null =
    await GetSubscription(user.id)

  if (!subscription) {
    return (
      <main
        className={`${oswald.className} min-h-screen flex items-center justify-center bg-white dark:bg-[#1C1C30]`}
      >
        <div className="max-w-md text-center p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl">
          <h1 className="text-2xl font-bold mb-4">No Active Subscription</h1>
          <p className="text-gray-600 dark:text-gray-300">
            You currently do not have an active subscription.
          </p>
        </div>
      </main>
    )
  }

  const planName = getPayPalPlanName(subscription.plan_id)

  return (
    <main
      className={`${oswald.className} min-h-screen bg-white dark:bg-[#1C1C30] text-gray-900 dark:text-gray-100 px-6 py-20`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Billing & Subscription
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Manage your plan, billing status, and payment details
          </p>
        </header>

        {/* Main Card */}
        <section className="rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl p-8 sm:p-12 bg-white dark:bg-[#1C1C30]/80">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                {planName}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Subscription ID: {subscription.paypal_subscription_id}
              </p>
            </div>

            <StatusBadge status={subscription.status} />
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Start Date
              </p>
              <p className="text-lg font-semibold">
                {formatDate(subscription.start_time)}
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Next Billing Date
              </p>
              <p className="text-lg font-semibold">
                {formatDate(subscription.next_billing_time)}
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last Payment
              </p>
              <p className="text-lg font-semibold">
                {subscription.last_payment
                  ? `${subscription.last_payment.amount.value} ${subscription.last_payment.amount.currency_code}`
                  : '—'}
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Subscriber
              </p>
              <p className="text-lg font-semibold">
                {subscription.subscriber_name
                  ? `${subscription.subscriber_name.given_name} ${subscription.subscriber_name.surname}`
                  : user.email}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            {subscription.links?.map(
              (link, id) =>
                link.rel === 'approve' && (
                  <a
                    key={id}
                    href={link.href}
                    target="_blank"
                    className="inline-flex items-center justify-center px-8 py-4 bg-[#E8B85F] text-[#1C1C30] font-semibold rounded-full shadow-xl hover:shadow-2xl transition"
                  >
                    Manage in PayPal
                  </a>
                )
            )}

            <a
              href="mailto:info@scholarbrood.com"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#E8B85F] text-[#E8B85F] font-semibold rounded-full hover:bg-[#E8B85F] hover:text-[#1C1C30] transition"
            >
              Contact Billing Support
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}

export default function BillingPage() {
  return (
    <Suspense
      fallback={
        <div
          className={`${oswald.className} h-screen flex items-center justify-center bg-white dark:bg-[#1C1C30] text-2xl`}
        >
          Loading billing details…
        </div>
      }
    >
      <BillingComponent />
    </Suspense>
  )
}
