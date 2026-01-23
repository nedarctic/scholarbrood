"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X, LogOut } from "lucide-react";
import { oswald } from "@/app/fonts";
import Image from "next/image";
import MobileDrawer from "./MobileDrawer";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";
import { useSupabaseUser } from "@/app/hooks/useSupabaseUser";

export const dynamic = "force-dynamic"

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const client = createClient();

  const { user, loading } = useSupabaseUser();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Services", href: "/services" },
    { label: "Tutorials", href: "/tutorials" },
    { label: "Dashboard", href: "/dashboard" },
    // { label: "Blogs & Insight", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const handleLogout = async () => {
    await client.auth.signOut();
    router.push("/auth/login");
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.25 } },
    tap: { scale: 0.97, transition: { duration: 0.15 } },
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/80 dark:bg-[#1C1C30]/90 border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex gap-4 justify-end items-end">
          <Image
            src="/logo/scholarbrood-light-logo.svg"
            alt="Header logo"
            width={40}
            height={40}
            className="dark:hidden"
          />
          <Image
            src="/logo/scholarbrood-dark-logo-1.svg"
            alt="Header logo dark"
            width={40}
            height={40}
            className="hidden dark:block"
          />
          <div className="flex flex-col">
            <Link
              href="/"
              className={`${oswald.className} text-xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-[#E8B85F] to-[#d4a44e] bg-clip-text text-transparent`}
            >
              ScholarBrood
            </Link>
            <p className={`${oswald.className} text-[10px] text-black dark:text-white`}>
              Learn, Pursue & Grow Academic Excellence!
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <nav className="flex items-center space-x-10">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className={`${oswald.className} relative text-gray-700 dark:text-gray-300 font-medium text-sm tracking-wide transition-all duration-300
                    after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-0 after:h-0.5 after:bg-[#E8B85F] after:transition-all after:duration-300
                    hover:text-[#E8B85F] hover:after:w-full`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Auth Buttons */}
          {!loading && (
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  {/* <span className="text-sm font-medium">Hi, {user.email}</span> */}
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleLogout}
                    className={`${oswald.className} px-6 py-2.5 text-base font-semibold text-[#E8B85F] border-2 border-[#E8B85F] rounded-lg
                      hover:bg-[#E8B85F]/10 hover:border-[#E8B85F] transition-all duration-300 flex items-center gap-2`}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </motion.button>
                </div>
              ) : (
                <>
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Link
                      href="/auth/login"
                      className={`${oswald.className} px-6 py-2.5 text-base font-semibold text-[#E8B85F] border-2 border-[#E8B85F]/70 rounded-lg
                        hover:bg-[#E8B85F]/10 hover:border-[#E8B85F] transition-all duration-300`}
                    >
                      Login
                    </Link>
                  </motion.div>
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Link
                      href="/auth/sign-up"
                      className={`${oswald.className} px-7 py-2.5 text-base font-semibold bg-gradient-to-r from-[#E8B85F] to-[#d4a44e] text-white rounded-lg shadow-md
                        hover:shadow-lg hover:shadow-[#E8B85F]/30 hover:brightness-110 transition-all duration-300`}
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-[#E8B85F]/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-7 h-7 text-[#E8B85F]" /> : <Menu className="w-7 h-7 text-gray-700 dark:text-gray-300" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navItems={navItems}
        oswald={oswald}
      />
    </header>
  );
}
