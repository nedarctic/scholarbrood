"use client";
import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSupabaseUser } from "@/app/(app)/hooks/useSupabaseUser";
import { LogoutButton } from "./logout-button";

type NavItem = {
  label: string;
  href: string;
};

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  oswald: { className: string };
};

function MobileDrawer({ isOpen, onClose, navItems, oswald }: DrawerProps) {
  if (typeof document === "undefined") return null;

  const { user } = useSupabaseUser();

  const buttonVariants = {
    hover: { scale: 1.04, transition: { duration: 0.25 } },
    tap: { scale: 0.96, transition: { duration: 0.15 } },
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black lg:hidden z-[9998]"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.33, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-3/4 bg-white dark:bg-[#1C1C30] shadow-xl z-[9999] lg:hidden border-l border-gray-200 dark:border-gray-800 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* NAV ITEMS */}
            <div className="px-8 py-16 flex flex-col space-y-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`${oswald.className} text-xl font-semibold text-gray-800 dark:text-gray-200 hover:text-[#E8B85F] transition-colors duration-300`}
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* Auth Section + Footer */}
            <div className="px-8 pb-10 border-t border-gray-200 dark:border-gray-700 pt-6">
              {user ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`${oswald.className} text-sm font-medium text-gray-800 dark:text-gray-200`}>
                      {user.email}
                    </span>
                  </div>

                  {/* Logout Button */}
                  <LogoutButton />
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Link
                      href="/login"
                      onClick={onClose}
                      className={`${oswald.className} block text-center py-3.5 text-lg font-semibold text-[#E8B85F] border-2 border-[#E8B85F]/60 rounded-lg
                        hover:bg-[#E8B85F]/10 hover:border-[#E8B85F] transition-all duration-300`}
                    >
                      Login
                    </Link>
                  </motion.div>
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Link
                      href="/signup"
                      onClick={onClose}
                      className={`${oswald.className} block text-center py-3.5 text-lg font-semibold bg-gradient-to-r from-[#E8B85F] to-[#d4a44e] text-white rounded-lg shadow-md
                        hover:shadow-lg hover:shadow-[#E8B85F]/30 hover:brightness-110 transition-all duration-300`}
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                </div>
              )}

              {/* Footer */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className={`${oswald.className} mt-8 text-xs text-gray-500 dark:text-gray-500 text-center`}
              >
                © {new Date().getFullYear()} ScholarBrood. All Rights Reserved.
              </motion.p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default MobileDrawer;
