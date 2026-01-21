"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Loader2, Zap, Brain, Sparkles } from "lucide-react";
import { oswald } from "@/app/(app)/fonts";
import { createClient } from "@/app/(app)/lib/supabase/client";
import { signInWithGoogle } from "@/app/(app)/lib/oauth/auth";

export const dynamic = "force-dynamic"

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (k: keyof typeof form, v: string) =>
    setForm((s) => ({ ...s, [k]: v }));

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;

      router.push("/subscriptions");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={`${oswald.className} py-10 sm:py-20 bg-white dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 min-h-screen overflow-hidden`}
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 -left-40 w-96 h-96 bg-gradient-to-r from-[#E8B85F]/90 to-[#E8B85F] rounded-full blur-3xl opacity-20"
          animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/3 -right-40 w-96 h-96 bg-gradient-to-r from-[#E8B85F]/90 to-yellow-400 rounded-full blur-3xl opacity-20"
          animate={{ x: [0, -80, 0], y: [0, 100, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen pt-20 px-6 sm:px-10 md:px-16">
        {/* ── Left – Form Section ── */}
        <div className="flex-1 flex items-center justify-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md relative z-10"
          >
            {/* Logo & Title */}
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#E8B85F]/90 to-[#E8B85F] bg-clip-text text-transparent">
                ScholarBrood
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                Continue your journey to academic excellence
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl bg-white/80 dark:bg-gray-800/80 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E8B85F]/50 transition-all"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/3 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => onChange("password", e.target.value)}
                  className="block w-full pl-12 pr-12 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl bg-white/80 dark:bg-gray-800/80 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E8B85F]/50 transition-all"
                  required
                />
                <div className="flex mt-4 items-center">
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              {/* Login Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#E8B85F]/90 to-[#E8B85F] text-white py-4 px-6 font-semibold shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </motion.button>

              {/* Google OAuth */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={signInWithGoogle}
                className="mt-4 w-full inline-flex justify-center items-center gap-3 py-3.5 px-4 border border-gray-300 dark:border-gray-700 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <FcGoogle className="w-5 h-5" />
                Continue with Google
              </motion.button>

              <p className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
                Don’t have an account?{" "}
                <Link href="/auth/sign-up" className="font-semibold text-[#E8B85F] hover:text-[#E8B85F]/90">
                  Sign up now
                </Link>
              </p>
            </form>
          </motion.div>
        </div>

        {/* ── Right – Visual Panel (Desktop Only) ── */}
        <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-[#E8B85F]/10 to-[#E8B85F]/20 dark:from-gray-800 dark:to-gray-900 p-16 rounded-2xl relative">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-lg relative"
          >
            <motion.div
              whileHover={{ y: -10, rotateZ: -2 }}
              className="absolute -top-8 -left-8 w-64 p-6 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-20"
            >
              <Zap className="w-8 h-8 text-yellow-500 mb-3" />
              <h3 className="text-lg font-bold mb-2">Learn Quickly</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Concise tutorials with practical exercises
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, rotateZ: 2 }}
              className="absolute top-20 left-32 w-64 p-6 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-10"
            >
              <Brain className="w-8 h-8 text-[#E8B85F] mb-3" />
              <h3 className="text-lg font-bold mb-2">Expert Techniques</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Proven strategies for professional writing
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="relative w-72 p-8 bg-gradient-to-br from-[#E8B85F]/90 to-[#E8B85F] rounded-3xl shadow-2xl text-white mt-32"
            >
              <Sparkles className="w-10 h-10 mb-4" />
              <h2 className="text-2xl font-bold mb-3">Welcome Back!</h2>
              <p className="opacity-90">
                Continue your journey to master professional writing with expert-led tutorials.
              </p>

              <div className="mt-6 flex -space-x-2">
                {["/student1.jpeg", "/student2.jpeg", "/student3.jpeg"].map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Learner ${i + 1}`}
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

        {/* Loading Overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div className="flex flex-col items-center gap-4 text-white">
                <Loader2 className="animate-spin w-12 h-12 text-[#E8B85F]" />
                <p className="text-lg font-medium">Signing you in…</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
