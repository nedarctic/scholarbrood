'use client';

import {
  HomeIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { oswald } from '@/app/fonts';

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'My Orders', href: '/dashboard/orders', icon: DocumentTextIcon },
  { name: 'Academic Work', href: '/dashboard/work', icon: AcademicCapIcon },
  { name: 'Progress', href: '/dashboard/progress', icon: ChartBarIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserCircleIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`${oswald.className} flex h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium
              transition-all duration-300
              ${isActive 
                ? 'bg-gradient-to-r from-[#E8B85F]/20 to-[#E8B85F]/10 text-[#E8B85F] border border-[#E8B85F]/30 shadow-md' 
                : 'text-gray-700 dark:text-gray-300 hover:text-[#E8B85F] hover:bg-gray-100 dark:hover:bg-[#1C1C30]/50'
              }`}
          >
            <LinkIcon className={`w-5 h-5 ${isActive ? 'text-[#E8B85F]' : 'text-gray-500 dark:text-gray-400'}`} />
            <p className="hidden md:block">{link.name}</p>
            {isActive && (
              <span className="ml-auto w-2 h-2 rounded-full bg-[#E8B85F] animate-pulse"></span>
            )}
          </Link>
        );
      })}
    </>
  );
}