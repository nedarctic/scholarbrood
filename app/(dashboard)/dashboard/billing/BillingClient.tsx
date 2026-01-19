"use client";

import { motion } from "framer-motion";
import { 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  Download,
  Loader2,
  RefreshCw,
  Shield
} from "lucide-react";
import { oswald } from '@/app/(app)/fonts';
import { useState } from 'react';

// Mock data structure - replace with your actual data fetching
interface BillingPageProps {
  userData: {
    email?: string;
    created_at: string;
  } | null;
  subscription: {
    plan_id: string;
    status: string;
    start_time?: string;
    next_billing_time?: string;
    last_payment?: { 
      amount: { currency_code: string; value: string }; 
      time: string 
    };
    quantity?: number;
    payer_email?: string;
  } | null;
}

export default function BillingClient() {
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data - replace with your actual data fetching
  const mockSubscription = {
    plan_id: "P-123456789",
    status: "ACTIVE",
    start_time: "2024-01-15T10:30:00Z",
    next_billing_time: "2024-02-15T10:30:00Z",
    last_payment: {
      amount: { currency_code: "USD", value: "49.99" },
      time: "2024-01-15T10:30:00Z"
    },
    quantity: 1,
    payer_email: "student@example.edu"
  };

  const mockUser = {
    email: "student@example.edu",
    created_at: "2024-01-15T10:30:00Z"
  };

  const subscription = mockSubscription;
  const userData = mockUser;

  const getPlanDetails = (planId: string) => {
    const plans: Record<string, { 
      name: string; 
      price: string; 
      features: string[];
      color: string;
    }> = {
      "P-123456789": {
        name: "Premium Academic Plan",
        price: "$49.99/month",
        features: [
          "Unlimited writing consultations",
          "Priority editing services",
          "Research proposal support",
          "Publication processing",
          "24/7 expert support"
        ],
        color: "#E8B85F"
      },
      "P-987654321": {
        name: "Basic Writing Plan",
        price: "$29.99/month",
        features: [
          "Essay writing assistance",
          "Basic editing services",
          "Standard turnaround"
        ],
        color: "#A52A2A"
      }
    };
    
    return plans[planId] || {
      name: "Custom Plan",
      price: "Custom Pricing",
      features: ["Tailored academic services"],
      color: "#1C1C30"
    };
  };

  const getStatusConfig = (status: string) => {
    const config: Record<string, { 
      color: string; 
      bgColor: string;
      icon: React.ReactNode;
      label: string;
    }> = {
      "ACTIVE": {
        color: "#10B981",
        bgColor: "rgba(16, 185, 129, 0.1)",
        icon: <CheckCircle className="w-5 h-5" />,
        label: "Active"
      },
      "PENDING": {
        color: "#F59E0B",
        bgColor: "rgba(245, 158, 11, 0.1)",
        icon: <Loader2 className="w-5 h-5 animate-spin" />,
        label: "Pending"
      },
      "CANCELLED": {
        color: "#EF4444",
        bgColor: "rgba(239, 68, 68, 0.1)",
        icon: <AlertCircle className="w-5 h-5" />,
        label: "Cancelled"
      },
      "SUSPENDED": {
        color: "#6B7280",
        bgColor: "rgba(107, 114, 128, 0.1)",
        icon: <AlertCircle className="w-5 h-5" />,
        label: "Suspended"
      }
    };
    
    return config[status] || {
      color: "#6B7280",
      bgColor: "rgba(107, 114, 128, 0.1)",
      icon: <AlertCircle className="w-5 h-5" />,
      label: status
    };
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleDownloadInvoice = () => {
    // Implement invoice download logic
    console.log("Downloading invoice...");
  };

  const planDetails = getPlanDetails(subscription?.plan_id || "");
  const statusConfig = getStatusConfig(subscription?.status || "");

  if (!userData) {
    return (
      <div className={`${oswald.className} min-h-screen flex flex-col justify-center items-center bg-white dark:bg-[#1C1C30] text-gray-900 dark:text-gray-100 p-8`}>
        <AlertCircle className="w-16 h-16 text-[#E8B85F] mb-4" />
        <h2 className="text-2xl font-bold mb-2">Authentication Required</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Please sign in to view your billing details.</p>
        <motion.a
          href="/login"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-[#E8B85F] text-[#1C1C30] rounded-full font-semibold shadow-lg"
        >
          Sign In
        </motion.a>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className={`${oswald.className} min-h-screen flex flex-col justify-center items-center bg-white dark:bg-[#1C1C30] text-gray-900 dark:text-gray-100 p-8`}>
        <CreditCard className="w-16 h-16 text-[#E8B85F] mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Active Subscription</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
          You don't have an active subscription. Upgrade to access premium academic services.
        </p>
        <div className="flex gap-4">
          <motion.a
            href="/pricing"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-[#E8B85F] text-[#1C1C30] rounded-full font-semibold shadow-lg"
          >
            View Plans
          </motion.a>
          <motion.a
            href="/services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 border-2 border-[#E8B85F] text-[#E8B85F] rounded-full font-semibold"
          >
            Our Services
          </motion.a>
        </div>
      </div>
    );
  }

  return (
    <main className={`${oswald.className} min-h-screen bg-white dark:bg-[#1C1C30] text-gray-900 dark:text-gray-100 transition-colors duration-500`}>
      {/* Header */}
      <section className="relative pt-24 pb-12 px-5 sm:px-8 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                Billing & Subscription
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Manage your academic support plan and billing details
              </p>
            </div>
            
            <motion.button
              onClick={handleRefresh}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1C1C30]/50 transition-colors"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Refresh
            </motion.button>
          </div>

          {/* Current Plan Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl p-8 mb-8"
            style={{ borderLeftColor: planDetails.color, borderLeftWidth: '8px' }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#E8B85F]/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="p-3 rounded-2xl"
                      style={{ backgroundColor: `${planDetails.color}20` }}
                    >
                      <CreditCard className="w-6 h-6" style={{ color: planDetails.color }} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{planDetails.name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span 
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold"
                          style={{ 
                            backgroundColor: statusConfig.bgColor,
                            color: statusConfig.color
                          }}
                        >
                          {statusConfig.icon}
                          {statusConfig.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Next billing: <strong className="text-gray-900 dark:text-gray-100">
                          {formatDate(subscription.next_billing_time)}
                        </strong>
                      </span>
                    </div>
                    <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-700" />
                    <div>
                      <span className="text-3xl font-bold" style={{ color: planDetails.color }}>
                        {planDetails.price}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={handleDownloadInvoice}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#E8B85F] text-[#E8B85F] font-semibold hover:bg-[#E8B85F] hover:text-[#1C1C30] transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Invoice
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-[#A52A2A] text-white rounded-full font-semibold shadow-lg"
                  >
                    Manage Plan
                  </motion.button>
                </div>
              </div>

              {/* Plan Features */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Plan Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {planDetails.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-[#1C1C30]/50"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#E8B85F]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Billing Details Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Billing Information */}
            <div className="rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#E8B85F]" />
                Billing Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Account Email</p>
                  <p className="font-semibold">{userData.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Billing Email</p>
                  <p className="font-semibold">{subscription.payer_email || userData.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Plan Quantity</p>
                  <p className="font-semibold">{subscription.quantity || 1} seat(s)</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                  <p className="font-semibold">{formatDate(userData.created_at)}</p>
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div className="rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#E8B85F]" />
                Payment History
              </h3>
              
              <div className="space-y-4">
                {subscription.last_payment && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-[#E8B85F]/10 to-transparent">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Last Payment</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(subscription.last_payment.time)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: planDetails.color }}>
                          {subscription.last_payment.amount.value} {subscription.last_payment.amount.currency_code}
                        </p>
                        <p className="text-sm text-green-600">Successful</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Next Payment</p>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-[#1C1C30]/50">
                    <span className="font-semibold">{formatDate(subscription.next_billing_time)}</span>
                    <span className="font-bold" style={{ color: planDetails.color }}>
                      {planDetails.price.split('/')[0]}
                    </span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-[#E8B85F] transition-colors"
                >
                  View Full Payment History
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Security & Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl p-8 bg-gradient-to-br from-[#1C1C30]/50 to-transparent"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-[#E8B85F]/10">
                  <Shield className="w-8 h-8 text-[#E8B85F]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Secure & Reliable Billing</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full border-2 border-[#E8B85F] text-[#E8B85F] font-semibold hover:bg-[#E8B85F] hover:text-[#1C1C30] transition-colors text-center"
                >
                  Contact Support
                </motion.a>
                <motion.a
                  href="/help/billing"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full bg-gray-900 dark:bg-gray-800 text-white font-semibold shadow-lg text-center"
                >
                  Billing FAQ
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}