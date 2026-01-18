'use client';

import Link from 'next/link';
import NavLinks from '@/app/dashboard/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { oswald } from '@/app/fonts';
import { Suspense } from 'react';
import { useEffect, useState } from 'react';

export default function SideNav() {

    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <div className={`${oswald.className} fixed left-0 top-0 h-screen w-64 z-30
      flex flex-col px-3 py-6 md:px-4
      bg-white dark:bg-[#1C1C30]
      border-r border-gray-200 dark:border-gray-700
      shadow-xl
      transition-all duration-300`}>

            {/* Logo Section */}
            <Link
                className="mb-8 flex items-center justify-start p-4
          bg-gradient-to-r from-[#1C1C30] to-[#2C2C40] dark:from-[#0A0A1A] dark:to-[#1C1C30]
          rounded-2xl
          shadow-lg hover:shadow-2xl transition-all duration-300"
                href="/"
            >
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E8B85F] to-[#D8A84F] flex items-center justify-center shadow-md">
                        <span className="text-[#1C1C30] font-bold text-xl">SB</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">ScholarBrood</h1>
                        <p className="text-xs text-gray-300 mt-1">Academic Dashboard</p>
                    </div>
                </div>
            </Link>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto">
                <div className="space-y-2">
                    <NavLinks />
                </div>

                {/* Empty content area - styled to match */}
                <div className="mt-8 hidden h-auto w-full rounded-2xl 
          bg-gradient-to-b from-gray-50/50 to-transparent 
          dark:from-[#1C1C30]/30 dark:to-transparent
          border border-gray-100 dark:border-gray-700/50
          p-4 md:block">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Your academic workspace
                    </p>
                </div>
            </div>

            {/* Sign Out Button */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <form>
                    <button className="flex h-12 w-full items-center justify-center gap-3 
            rounded-xl p-3 text-sm font-semibold
            bg-gradient-to-r from-[#E8B85F] to-[#D8A84F] text-[#1C1C30]
            hover:from-[#D8A84F] hover:to-[#C8983F] hover:scale-[1.02]
            shadow-lg hover:shadow-xl
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-[#E8B85F] focus:ring-offset-2
            dark:focus:ring-offset-[#1C1C30]">
                        <PowerIcon className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </form>

                {/* User info */}
                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        © {year} ScholarBrood
                    </p>
                </div>
            </div>
        </div>
    );
}