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
import { oswald } from '@/app/(app)/fonts';

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'My Tutorials', href: '/dashboard/tutorials', icon: DocumentTextIcon },
  { name: 'Academic Work', href: '/dashboard/work', icon: AcademicCapIcon },
  { name: 'Progress', href: '/dashboard/progress', icon: ChartBarIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserCircleIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`${oswald.className} group relative flex h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium
              transition-all duration-300
              ${isActive 
                ? 'bg-gradient-to-r from-[#E8B85F]/20 via-[#E8B85F]/10 to-transparent text-[#E8B85F] dark:text-[#E8B85F] shadow-inner shadow-[#E8B85F]/10' 
                : 'text-gray-700 dark:text-gray-200 hover:text-[#E8B85F] dark:hover:text-[#E8B85F] hover:bg-white/50 dark:hover:bg-[#2C2C40]'
              }
              border ${isActive ? 'border-[#E8B85F]/30 dark:border-[#E8B85F]/20' : 'border-transparent hover:border-[#E8B85F]/10 dark:hover:border-[#E8B85F]/5'}
              hover:shadow-sm dark:hover:shadow-[0_2px_8px_rgba(232,184,95,0.1)]`}
          >
            {/* Active indicator line */}
            {isActive && (
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-[#E8B85F] to-[#D8A84F] rounded-r-full"></span>
            )}
            
            <LinkIcon className={`w-5 h-5 flex-shrink-0 transition-all duration-300
              ${isActive 
                ? 'text-[#E8B85F] dark:text-[#E8B85F]' 
                : 'text-gray-500 dark:text-gray-400 group-hover:text-[#E8B85F] dark:group-hover:text-[#E8B85F]'
              }`} />
            
            <p className="hidden md:block flex-1">{link.name}</p>
            
            {isActive && (
              <span className="ml-2 w-2 h-2 rounded-full bg-[#E8B85F] dark:bg-[#E8B85F] animate-pulse"></span>
            )}
            
            {/* Hover glow effect */}
            <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-[#E8B85F]/5 to-transparent dark:via-[#E8B85F]/2"></span>
          </Link>
        );
      })}
    </nav>
  );
}