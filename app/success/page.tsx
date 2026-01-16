"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SubscriptionDetails {
  id: string;
  status: string;
  planId: string;
  planName: string;
  startTime: string;
  subscriber: {
    email_address: string;
    name: {
      given_name: string;
      surname: string;
    };
  };
  billingInfo: {
    nextBillingTime: string;
    failedPayments: number;
    cyclesCompleted: number;
  };
}

export default function SuccessPage() {
  const supabase = createClient();
  const router = useRouter();

  const [authChecked, setAuthChecked] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 
  // Check user authentication

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/auth/login");
        return;
      }

      setAuthChecked(true);
    };

    checkAuth();
  }, [router, supabase]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("subscriptionId");
    setSubscriptionId(id);
  }, []);

  // Fetch subscription details
  useEffect(() => {
    if (!subscriptionId) return;

    const fetchSubscriptionDetails = async () => {
      try {
        const response = await fetch(`/api/paypal/subscription/${subscriptionId}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "Failed to fetch subscription details");

        setSubscription(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionDetails();
  }, [subscriptionId]);

  // Render loading, error, or success state
  if (!authChecked || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-700">Loading...</h1>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold text-red-600">Error</h1>
        <p className="text-red-500">{error}</p>
        <Link
          href="/"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-green-600">
            Subscription Successful!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome to the {subscription?.planName || "Pro"} plan! Your subscription has been activated.
          </p>
        </div>

        {/* Subscription details */}
        {subscription && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
            <section className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-2">Subscription Details</h2>
              <p className="text-gray-600">ID: {subscription.id}</p>
              <p className="text-gray-600">
                Status:{" "}
                <span className="capitalize font-medium text-green-600">{subscription.status}</span>
              </p>
              <p className="text-gray-600">
                Start Date: {new Date(subscription.startTime).toLocaleDateString()}
              </p>
            </section>

            <section className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-2">Subscriber Information</h2>
              <p className="text-gray-600">
                Name: {subscription.subscriber.name.given_name} {subscription.subscriber.name.surname}
              </p>
              <p className="text-gray-600">Email: {subscription.subscriber.email_address}</p>
            </section>

            <section className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-2">Billing Information</h2>
              <p className="text-gray-600">
                Next Billing Date: {new Date(subscription.billingInfo.nextBillingTime).toLocaleDateString()}
              </p>
              <p className="text-gray-600">Failed Payments: {subscription.billingInfo.failedPayments}</p>
              <p className="text-gray-600">Cycles Completed: {subscription.billingInfo.cyclesCompleted}</p>
            </section>
          </div>
        )}

        {/* Links */}
        <div className="mt-8 text-center flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/billing"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            View Billing →
          </Link>
          <Link
            href="/"
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
