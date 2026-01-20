import { redirect } from "next/navigation";
import { createClient } from "@/app/(app)/lib/supabase/server";
import { InfoIcon, Shield, BookOpen, FileText, CheckCircle, ArrowRight } from "lucide-react";
import { isActiveSubscription } from "@/app/(app)/lib/paypal/subscriptions";
import { GetSubscription } from "@/app/(app)/lib/paypal/subscriptions";
import { oswald } from "@/app/(app)/fonts";
import { getPayPalPlanName } from "@/app/(app)/lib/paypal/paypal";
import Link from "next/link";

const supabase = async () => await createClient();

async function UserDetails() {
  const { data, error } = await (await supabase()).auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

async function SubscriptionDetails() {
  const { data: { user } } = await (await supabase()).auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const subscription = await GetSubscription(user.id);

  if (!isActiveSubscription(subscription) || isActiveSubscription(subscription) === null) {
    redirect("/subscriptions");
  }

  return subscription;
}

export default async function DashboardPage() {
  const subscription = await SubscriptionDetails();
  const payPalPlanName = getPayPalPlanName(subscription?.plan_id || "");

  return (
    <main
      className={`${oswald.className} min-h-screen font-sans bg-white dark:bg-[#1C1C30] text-gray-900 dark:text-gray-100 transition-colors duration-500`}
    >
      {/* Dashboard Hero */}
      <section className="relative pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center md:text-left">
              Welcome to Your <span className="text-[#E8B85F]">Dashboard</span>
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center md:text-left max-w-3xl mx-auto md:mx-0">
              Manage your subscription, access premium features, and track your academic projects
            </p>
          </div>

          {/* Protected Page Alert */}
          <div className="w-full mb-12">
            <div className="bg-gradient-to-r from-[#E8B85F]/10 to-[#1C1C30]/10 dark:from-[#E8B85F]/5 dark:to-[#1C1C30]/20 border-l-4 border-[#E8B85F] p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E8B85F]/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-[#E8B85F]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <InfoIcon size="20" className="text-[#E8B85F]" />
                  Protected Dashboard
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  This is a protected page that you can only see as an authenticated user.
                  Your data is secured with enterprise-grade encryption.
                </p>
              </div>
            </div>
          </div>

          {/* Subscription Status */}
          {subscription && (
            <div className="mb-12">
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/5 border-2 border-green-500/20 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold">{payPalPlanName} Plan Active</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        You have full access to all ScholarBrood features
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2 sm:px-6 sm:py-3 bg-green-500/20 text-green-700 dark:text-green-400 rounded-full font-semibold text-sm sm:text-base">
                    Subscription Active
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions + Current Plan */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Quick Actions */}
            <div className="flex-1 p-6 sm:p-8 bg-white dark:bg-[#1C1C30]/80 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl">
              <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <Link
                  href="/services"
                  className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#E8B85F]/5 to-transparent hover:from-[#E8B85F]/10 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E8B85F]/20 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-[#E8B85F]" />
                    </div>
                    <span className="font-semibold text-sm sm:text-base">Browse Services</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#E8B85F] transition-colors" />
                </Link>

                <Link
                  href="/order"
                  className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#E8B85F]/5 to-transparent hover:from-[#E8B85F]/10 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E8B85F]/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#E8B85F]" />
                    </div>
                    <span className="font-semibold text-sm sm:text-base">Start New Order</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#E8B85F] transition-colors" />
                </Link>

                <Link
                  href="/dashboard/billing"
                  className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#E8B85F]/5 to-transparent hover:from-[#E8B85F]/10 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E8B85F]/20 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-[#E8B85F]" />
                    </div>
                    <span className="font-semibold text-sm sm:text-base">Manage Billing</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#E8B85F] transition-colors" />
                </Link>
              </div>
            </div>

            {/* Current Plan Status */}
            {subscription && (
              <div className="flex-1 p-6 sm:p-8 bg-gradient-to-br from-[#E8B85F]/10 to-[#1C1C30]/10 dark:from-[#E8B85F]/5 dark:to-[#1C1C30]/20 rounded-3xl border border-[#E8B85F]/20 shadow-xl">
                <h3 className="text-xl font-bold mb-4">Your Plan</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span className="text-gray-600 dark:text-gray-400">Plan Name</span>
                    <span className="font-bold text-[#E8B85F]">{payPalPlanName}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span className="text-gray-600 dark:text-gray-400">Status</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
                      Active
                    </span>
                  </div>
                  <Link
                    href="/dashboard/billing"
                    className="block w-full text-center py-3 bg-[#E8B85F] text-[#1C1C30] rounded-full font-semibold hover:shadow-xl transition-all duration-300 mt-4 sm:mt-6"
                  >
                    View Billing Details
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#E8B85F]/10 to-[#1C1C30]/10 dark:from-[#E8B85F]/5 dark:to-[#1C1C30]/20 rounded-3xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Start Your Next <span className="text-[#E8B85F]">Academic Project?</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Take advantage of your premium subscription with our expert academic support services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <a
                href="/order"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#E8B85F] text-[#1C1C30] rounded-full text-lg sm:text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Start New Order
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#E8B85F] text-[#E8B85F] rounded-full text-lg sm:text-xl font-semibold hover:bg-[#E8B85F] hover:text-[#1C1C30] transition-all duration-300"
              >
                Browse All Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
