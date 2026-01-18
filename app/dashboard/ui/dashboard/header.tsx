import { oswald } from '@/app/fonts';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className={`${oswald.className} sticky top-0 z-20
      flex h-16 items-center justify-between px-6
      bg-white/90 dark:bg-[#1C1C30]/90 backdrop-blur-md
      border-b border-gray-200 dark:border-gray-700
      shadow-sm`}>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search dashboard..."
            className="pl-10 pr-4 py-2 w-64 rounded-xl
              bg-gray-100 dark:bg-[#0A0A1A]
              border border-gray-300 dark:border-gray-700
              focus:outline-none focus:ring-2 focus:ring-[#E8B85F] focus:border-transparent
              text-sm"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#0A0A1A]">
          <BellIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E8B85F] to-[#D8A84F] flex items-center justify-center">
            <span className="font-bold text-[#1C1C30]">J</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PhD Candidate</p>
          </div>
        </div>
      </div>
    </header>
  );
}