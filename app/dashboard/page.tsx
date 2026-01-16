import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { InfoIcon, User, Shield, BookOpen, FileText, CheckCircle, ArrowRight } from "lucide-react";
import { FetchDataSteps } from "@/app/components/tutorial/fetch-data-steps";
import { Suspense } from "react";
import { isActiveSubscription } from "@/app/lib/paypal/subscriptions";
import { GetSubscription } from "@/app/lib/paypal/subscriptions";
import { oswald } from "@/app/fonts";
import { getPayPalPlanName } from "@/app/lib/paypal/paypal";

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

  if (!isActiveSubscription(subscription)) {
    redirect("/dashboard");
  }

  return subscription;
}

export default async function DashboardPage() {
  const subscription = await SubscriptionDetails();

  const payPalPlanName = getPayPalPlanName(subscription?.plan_id || "");

  return (
    <main
      className={`${oswald.className} min-h-screen overflow-x-hidden font-sans
        bg-white dark:bg-[#1C1C30]
        text-gray-900 dark:text-gray-100
        transition-colors duration-500`}
    >
      {/* Dashboard Hero */}
      <section className="relative pt-[110px] pb-[55px] px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Welcome to Your <span className="text-[#E8B85F]">Dashboard</span>
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Manage your subscription, access premium features, and track your academic projects
            </p>
          </div>

          {/* Protected Page Alert */}
          <div className="w-full mb-12">
            <div className="bg-gradient-to-r from-[#E8B85F]/10 to-[#1C1C30]/10 dark:from-[#E8B85F]/5 dark:to-[#1C1C30]/20 border-l-4 border-[#E8B85F] p-6 rounded-2xl shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E8B85F]/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-[#E8B85F]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <InfoIcon size="20" className="text-[#E8B85F]" />
                    Protected Dashboard
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    This is a protected page that you can only see as an authenticated user.
                    Your data is secured with enterprise-grade encryption.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Status */}
          {subscription && (
            <div className="mb-12">
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/5 border-2 border-green-500/20 rounded-3xl p-8 shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Premium Plan Active</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        You have full access to all ScholarBrood features
                      </p>
                    </div>
                  </div>
                  <div className="px-6 py-3 bg-green-500/20 text-green-700 dark:text-green-400 rounded-full font-semibold">
                    Subscription Active
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Details Card */}
            <div className="lg:col-span-2">
              <div className="p-8 bg-white dark:bg-[#1C1C30]/80 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#E8B85F]/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-[#E8B85F]" />
                  </div>
                  <h2 className="text-2xl font-bold">Your User Details</h2>
                </div>
                <pre className="text-sm font-mono p-6 rounded-2xl bg-gray-50 dark:bg-[#1C1C30]/50 border border-gray-200 dark:border-gray-700 max-h-96 overflow-auto">
                  <Suspense
                    fallback={
                      <div className="text-center py-8">
                        <div className="w-8 h-8 border-2 border-[#E8B85F] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-gray-600 dark:text-gray-400">Loading user details...</p>
                      </div>
                    }
                  >
                    <UserDetails />
                  </Suspense>
                </pre>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="p-8 bg-white dark:bg-[#1C1C30]/80 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl">
                <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <a
                    href="/services"
                    className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#E8B85F]/5 to-transparent hover:from-[#E8B85F]/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E8B85F]/20 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-[#E8B85F]" />
                      </div>
                      <span className="font-semibold">Browse Services</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#E8B85F] transition-colors" />
                  </a>

                  <a
                    href="/order"
                    className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#E8B85F]/5 to-transparent hover:from-[#E8B85F]/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E8B85F]/20 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#E8B85F]" />
                      </div>
                      <span className="font-semibold">Start New Order</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#E8B85F] transition-colors" />
                  </a>

                  <a
                    href="/billing"
                    className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#E8B85F]/5 to-transparent hover:from-[#E8B85F]/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E8B85F]/20 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-[#E8B85F]" />
                      </div>
                      <span className="font-semibold">Manage Billing</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#E8B85F] transition-colors" />
                  </a>
                </div>
              </div>

              {/* Current Plan Status */}
              {subscription && (
                <div className="p-8 bg-gradient-to-br from-[#E8B85F]/10 to-[#1C1C30]/10 dark:from-[#E8B85F]/5 dark:to-[#1C1C30]/20 rounded-3xl border border-[#E8B85F]/20 shadow-xl">
                  <h3 className="text-xl font-bold mb-4">Your Plan</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Plan Name</span>
                      <span className="font-bold text-[#E8B85F]">{payPalPlanName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Status</span>
                      <span className="px-3 py-1 bg-green-500/20 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
                        Active
                      </span>
                    </div>
                    <a
                      href="/billing"
                      className="block w-full text-center py-3 bg-[#E8B85F] text-[#1C1C30] rounded-full font-semibold hover:shadow-xl transition-all duration-300 mt-6"
                    >
                      View Billing Details
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps Section */}
          <div className="mt-12 p-8 bg-white dark:bg-[#1C1C30]/80 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#E8B85F]/10 flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-[#E8B85F]" />
              </div>
              <h2 className="text-2xl font-bold">Next Steps</h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <FetchDataSteps />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#E8B85F]/10 to-[#1C1C30]/10 dark:from-[#E8B85F]/5 dark:to-[#1C1C30]/20 rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Start Your Next <span className="text-[#E8B85F]">Academic Project?</span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Take advantage of your premium subscription with our expert academic support services.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/order"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#E8B85F] text-[#1C1C30] rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Start New Order
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#E8B85F] text-[#E8B85F] rounded-full text-lg font-semibold hover:bg-[#E8B85F] hover:text-[#1C1C30] transition-all duration-300"
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