"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  CheckCircle,
  XCircle,
  Mail,
} from "lucide-react";

import { createClient } from "@/app/lib/supabase/client";
import { oswald } from "@/app/fonts";

type Status = "loading" | "success" | "error";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState<string>(
    "Finishing signing you in…"
  );

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code");

        if (!code) {
          throw new Error("Missing authentication code.");
        }

        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) throw error;

        setStatus("success");
        setMessage("You're successfully signed in. Redirecting…");

        setTimeout(() => {
          router.replace("/protected");
        }, 1800);
      } catch (err) {
        setStatus("error");
        setMessage(
          err instanceof Error
            ? err.message
            : "Authentication failed."
        );
      }
    };

    handleCallback();
  }, [router, searchParams, supabase]);

  return (
    <main
      className={`${oswald.className} pt-40 pb-20 min-h-screen flex items-center justify-center bg-white dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900 relative overflow-hidden`}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/3 -left-40 w-96 h-96 bg-[#E8B85F]/30 rounded-full blur-3xl"
          animate={{ x: [0, 120, 0], y: [0, -80, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 -right-40 w-96 h-96 bg-[#E8B85F]/30 rounded-full blur-3xl"
          animate={{ x: [0, -120, 0], y: [0, 80, 0] }}
          transition={{ duration: 22, repeat: Infinity }}
        />
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-10/12 max-w-md rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-[#E8B85F]/30 shadow-2xl p-10 text-center"
        >
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            {status === "loading" && (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8B85F]/20">
                <Loader2 className="h-8 w-8 animate-spin text-[#E8B85F]" />
              </div>
            )}

            {status === "success" && (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8B85F]/20">
                <CheckCircle className="h-9 w-9 text-[#E8B85F]" />
              </div>
            )}

            {status === "error" && (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                <XCircle className="h-9 w-9 text-red-500" />
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold mb-2">
            {status === "loading" && "Signing you in"}
            {status === "success" && "Welcome back!"}
            {status === "error" && "Authentication failed"}
          </h1>

          {/* Message */}
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {message}
          </p>

          {/* Extra hint */}
          {status === "loading" && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Mail className="h-4 w-4" />
              Securely verifying your account
            </div>
          )}

          {/* Error action */}
          {status === "error" && (
            <button
              onClick={() => router.replace("/auth/login")}
              className="mt-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#E8B85F] to-[#d4a44e] text-white font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              Back to login
            </button>
          )}

          {/* Subtle border glow */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-[#E8B85F]/20" />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
