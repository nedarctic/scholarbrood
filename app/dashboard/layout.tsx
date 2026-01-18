import SideNav from '@/app/dashboard/ui/dashboard/sidenav';
import Header from '@/app/dashboard/ui/dashboard/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {/* Sidebar positioned with proper z-index */}
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      
      {/* Main content area with header */}
      <div className="flex flex-1 flex-col">
        
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 dark:bg-[#0A0A1A]">
          {children}
        </div>
      </div>
    </div>
  );
}