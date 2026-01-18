"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import { oswald } from "@/app/(app)/fonts";
import { createClient } from "@/app/(app)/lib/supabase/client";
import { signInWithGoogle } from "@/app/(app)/lib/oauth/auth";

export default function SignUpPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{
    type: "success" | "error" | null;
    message?: string;
  }>({ type: null });

  const closeModal = () => {
    setModal({ type: null });
    if (modal.type === "success") {
      router.push("/auth/login");
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModal({ type: null });

    if (password !== repeatPassword) {
      setModal({ type: "error", message: "Passwords do not match." });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });

      if (error) throw error;

      router.push("/auth/sign-up-success");
    } catch (err: unknown) {
      setModal({
        type: "error",
        message:
          err instanceof Error ? err.message : "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={`${oswald.className} min-h-screen bg-white dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900 relative overflow-hidden`}
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/3 -left-40 w-96 h-96 bg-[#E8B85F]/30 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -80, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 -right-40 w-96 h-96 bg-[#E8B85F]/30 rounded-full blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, 80, 0] }}
          transition={{ duration: 22, repeat: Infinity }}
        />
      </div>

      <div className="relative flex flex-col lg:flex-row min-h-screen px-6 lg:px-16 pt-40 pb-20">
        {/* LEFT — FORM */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#E8B85F] to-[#d4a44e] bg-clip-text text-transparent">
                ScholarBrood
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                Create your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-white/80 dark:bg-gray-800/80 focus:ring-2 focus:ring-[#E8B85F]/50"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 rounded-2xl border bg-white/80 dark:bg-gray-800/80 focus:ring-2 focus:ring-[#E8B85F]/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {/* Repeat Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showRepeatPassword ? "text" : "password"}
                  required
                  placeholder="Repeat password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 rounded-2xl border bg-white/80 dark:bg-gray-800/80 focus:ring-2 focus:ring-[#E8B85F]/50"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowRepeatPassword(!showRepeatPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showRepeatPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#E8B85F] to-[#d4a44e] text-white font-semibold shadow-lg"
              >
                {loading ? "Creating account..." : "Create account"}
              </motion.button>
            </form>
            {/* Google OAuth */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={signInWithGoogle}
              className="mt-4 w-full inline-flex justify-center items-center gap-3 py-3.5 px-4 border border-gray-300 dark:border-gray-700 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <FcGoogle className="w-5 h-5" />
              Signup with Google
            </motion.button>

            <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-[#E8B85F]"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>

        {/* RIGHT — VISUAL PANEL */}
        <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-[#E8B85F]/10 to-[#E8B85F]/20 dark:from-gray-800 dark:to-gray-900 p-16 rounded-2xl">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-lg relative"
          >
            {/* Floating info cards */}
            <motion.div
              whileHover={{ y: -10, rotateZ: -2 }}
              className="absolute -top-8 -left-8 w-64 p-6 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-20"
            >
              <Mail className="w-8 h-8 text-[#E8B85F] mb-3" />
              <h3 className="text-lg font-bold mb-2">Verified Learning</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Get instant access to premium tutorials
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, rotateZ: 2 }}
              className="absolute top-20 left-32 w-64 p-6 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-10"
            >
              <User className="w-8 h-8 text-[#E8B85F] mb-3" />
              <h3 className="text-lg font-bold mb-2">Personal Progress</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Track your academic growth journey
              </p>
            </motion.div>

            {/* Main welcome card */}
            <motion.div
              whileHover={{ y: -8 }}
              className="relative w-72 p-8 bg-gradient-to-br from-[#E8B85F]/90 to-[#E8B85F] rounded-3xl shadow-2xl text-white mt-32"
            >
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">✨</span>
              </div>
              <h2 className="text-2xl font-bold mb-3">Join ScholarBrood!</h2>
              <p className="opacity-90">
                Unlock expert tutorials, practical exercises, and grow your academic excellence today.
              </p>

              {/* Students avatars – you can replace with real images */}
              <div className="mt-6 flex -space-x-2">
                {["/student1.jpeg", "/student2.jpeg", "/student3.jpeg"].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Student ${i + 1}`}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold border-2 border-white">
                  +2.1k
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modal.type && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-[#E8B85F]/30 shadow-2xl p-8 text-center"
            >
              {/* Icon */}
              <div className="mb-4 flex justify-center">
                {modal.type === "success" ? (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E8B85F]/20">
                    <CheckCircle className="h-8 w-8 text-[#E8B85F]" />
                  </div>
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
                    <XCircle className="h-8 w-8 text-red-500" />
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-2">
                {modal.type === "success" ? "Welcome to ScholarBrood!" : "Something went wrong"}
              </h3>

              {/* Message */}
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {modal.message}
              </p>

              {/* Actions */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#E8B85F] to-[#d4a44e] text-white font-semibold shadow-lg hover:scale-105 transition-transform"
                >
                  {modal.type === "success" ? "Continue" : "Try again"}
                </button>
              </div>

              {/* Subtle glow */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-[#E8B85F]/20" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOADING OVERLAY */}
      <AnimatePresence>
        {loading && (
          <motion.div className="fixed inset-0 bg-black/30 backdrop-blur z-50 flex items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-[#E8B85F]" />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
