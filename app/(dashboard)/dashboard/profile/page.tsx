import { redirect } from "next/navigation";
import { createClient } from "@/app/(app)/lib/supabase/server";
import { Suspense } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Calendar, 
  CheckCircle, 
  Globe, 
  Key,
  Clock,
  Verified,
  Edit,
  LucideIcon
} from "lucide-react";
import { oswald } from "@/app/(app)/fonts";

// Type definitions based on Supabase Auth responses
type UserMetadata = {
  avatar_url?: string;
  email?: string;
  email_verified?: boolean;
  full_name?: string;
  iss?: string;
  name?: string;
  phone_verified?: boolean;
  picture?: string;
  provider_id?: string;
  sub?: string;
};

type AppMetadata = {
  provider?: string;
  providers?: string[];
};

// Supabase User type
type SupabaseUser = {
  id: string;
  email?: string;
  phone?: string;
  created_at: string; // ISO string
  last_sign_in_at?: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
};

type Session = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  token_type: string;
  user: SupabaseUser;
};

type SessionResponse = {
  session: Session | null;
};

type UserResponse = SupabaseUser;

type InfoCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  subtext?: string;
};

type VerificationBadgeProps = {
  verified: boolean;
  label: string;
};

type ActivityItem = {
  action: string;
  timestamp: string;
  icon: LucideIcon;
};

const supabase = async () => await createClient();

async function getUserData(): Promise<UserResponse> {
  const { data, error } = await (await supabase()).auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return data.user;
}

async function getSessionData(): Promise<SessionResponse> {
  const { data } = await (await supabase()).auth.getSession();
  return data;
}

function formatDate(dateString: string | number | undefined): string {
  if (!dateString) return "Unknown";
  
  try {
    const date = typeof dateString === 'string' 
      ? new Date(dateString) 
      : new Date(dateString * 1000);
    
    if (isNaN(date.getTime())) return "Invalid date";
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return "Invalid date";
  }
}

function SessionStatus({ isActive = true }: { isActive?: boolean }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
      ${isActive 
        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
      }`}>
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
}

function InfoCard({ title, value, icon: Icon, subtext }: InfoCardProps) {
  return (
    <div className="p-6 bg-white dark:bg-[#1C1C30]/60 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E8B85F]/10 to-[#E8B85F]/5 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#E8B85F]" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
          {subtext && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtext}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function VerificationBadge({ verified, label }: VerificationBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      {verified ? (
        <CheckCircle className="w-4 h-4 text-green-500" />
      ) : (
        <Clock className="w-4 h-4 text-amber-500" />
      )}
      <span className="text-sm">{label}</span>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className={`${oswald.className} space-y-8`}>
      {/* Profile Header */}
      <div className="p-8 bg-gradient-to-r from-[#1C1C30] to-[#2C2C40] dark:from-[#0A0A1A] dark:to-[#1C1C30] rounded-3xl shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Suspense fallback={
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse" />
              }>
                <ProfileAvatar />
              </Suspense>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#E8B85F] rounded-full flex items-center justify-center">
                <Verified className="w-5 h-5 text-[#1C1C30]" />
              </div>
            </div>
            <div>
              <Suspense fallback={
                <div className="h-8 w-48 bg-gray-700/50 animate-pulse rounded mb-3" />
              }>
                <ProfileName />
              </Suspense>
              <div className="flex items-center gap-4 mt-3">
                <Suspense fallback={
                  <div className="h-6 w-64 bg-gray-700/50 animate-pulse rounded" />
                }>
                  <ProfileEmail />
                </Suspense>
                <SessionStatus />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Personal Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information Section */}
          <div className="p-8 bg-white dark:bg-[#1C1C30]/80 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E8B85F]/20 to-[#E8B85F]/10 flex items-center justify-center">
                <User className="w-5 h-5 text-[#E8B85F]" />
              </div>
              <h3 className="text-2xl font-bold">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Suspense fallback={<InfoCardSkeleton />}>
                <UserInfoCards />
              </Suspense>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#E8B85F]" />
                Account Security
              </h4>
              <div className="space-y-4">
                <Suspense fallback={<SecurityInfoSkeleton />}>
                  <SecurityInfo />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-8 bg-white dark:bg-[#1C1C30]/80 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-[#E8B85F]" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              <Suspense fallback={<ActivitySkeleton />}>
                <ActivityTimeline />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Right Column - Account Status */}
        <div className="space-y-8">
          {/* Account Status */}
          <div className="p-8 bg-white dark:bg-[#1C1C30]/80 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl">
            <h3 className="text-2xl font-bold mb-6">Account Status</h3>
            <div className="space-y-6">
              <Suspense fallback={<StatusSkeleton />}>
                <AccountStatus />
              </Suspense>
            </div>
          </div>

          {/* Providers */}
          <div className="p-8 bg-white dark:bg-[#1C1C30]/80 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Key className="w-6 h-6 text-[#E8B85F]" />
              Connected Accounts
            </h3>
            <Suspense fallback={<ProvidersSkeleton />}>
              <ProvidersList />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components for async data
async function ProfileAvatar() {
  const user = await getUserData();
  const initials = user.user_metadata?.full_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';
  
  return (
    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#E8B85F] to-[#D8A84F] flex items-center justify-center text-3xl font-bold text-[#1C1C30]">
      {initials}
    </div>
  );
}

async function ProfileName() {
  const user = await getUserData();
  return (
    <h2 className="text-3xl font-bold text-white">
      {user.user_metadata?.full_name || user.user_metadata?.name || 'ScholarBrood User'}
    </h2>
  );
}

async function ProfileEmail() {
  const user = await getUserData();
  return (
    <p className="text-gray-300 flex items-center gap-2">
      <Mail className="w-4 h-4" />
      {user.email || 'No email provided'}
    </p>
  );
}

async function UserInfoCards() {
  const user = await getUserData();
  
  return (
    <>
      <InfoCard 
        title="Email Address" 
        value={user.email || 'Not provided'} 
        icon={Mail}
        subtext={user.user_metadata?.email_verified ? "Verified" : "Unverified"}
      />
      <InfoCard 
        title="Phone Number" 
        value={user.phone || "Not provided"} 
        icon={Phone}
      />
      <InfoCard 
        title="Account Created" 
        value={formatDate(user.created_at)} 
        icon={Calendar}
      />
      <InfoCard 
        title="User ID" 
        value={user.id.substring(0, 8) + '...'} 
        icon={Key}
        subtext="Unique identifier"
      />
    </>
  );
}

async function SecurityInfo() {
  const sessionData = await getSessionData();
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-[#1C1C30]/50 rounded-xl">
        <div>
          <p className="font-medium">Session Active</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {sessionData.session ? "Currently active" : "No active session"}
          </p>
        </div>
        <div className={`w-3 h-3 rounded-full ${sessionData.session ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
      </div>
      <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-[#1C1C30]/50 rounded-xl">
        <div>
          <p className="font-medium">Authentication Level</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Standard security</p>
        </div>
        <Shield className="w-5 h-5 text-[#E8B85F]" />
      </div>
    </div>
  );
}

async function ActivityTimeline() {
  const user = await getUserData();
  const sessionData = await getSessionData();
  
  const activities: ActivityItem[] = [
    {
      action: 'Account Created',
      timestamp: formatDate(user.created_at),
      icon: User
    },
    {
      action: 'Email Verified',
      timestamp: user.user_metadata?.email_verified 
        ? formatDate(new Date().toISOString()) // Use current time if verified
        : "Not verified",
      icon: CheckCircle
    },
    {
      action: 'Last Login',
      timestamp: user.last_sign_in_at ? formatDate(user.last_sign_in_at) : "Never",
      icon: Clock
    },
    {
      action: 'Current Session',
      timestamp: sessionData.session ? "Active now" : "No active session",
      icon: Shield
    }
  ];
  
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E8B85F] via-[#E8B85F]/50 to-transparent"></div>
      {activities.map((activity, index) => {
        const Icon = activity.icon;
        return (
          <div key={index} className="relative flex items-start gap-4 pl-12 pb-8 last:pb-0">
            <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-[#E8B85F] border-4 border-white dark:border-[#1C1C30]"></div>
            <div className="flex-1">
              <p className="font-medium">{activity.action}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{activity.timestamp}</p>
            </div>
            <Icon className="w-5 h-5 text-[#E8B85F]" />
          </div>
        );
      })}
    </div>
  );
}

async function AccountStatus() {
  const user = await getUserData();
  
  const statuses = [
    {
      label: 'Email Verification',
      verified: user.user_metadata?.email_verified || false
    },
    {
      label: 'Phone Verification',
      verified: user.user_metadata?.phone_verified || false
    },
    {
      label: 'Account Active',
      verified: true
    },
    {
      label: 'Two-Factor Auth',
      verified: false
    }
  ];
  
  return (
    <div className="space-y-4">
      {statuses.map((status, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1C1C30]/50 rounded-xl">
          <span className="font-medium">{status.label}</span>
          <VerificationBadge verified={status.verified} label={status.verified ? 'Verified' : 'Pending'} />
        </div>
      ))}
    </div>
  );
}

async function ProvidersList() {
  const user = await getUserData();
  const providers = user.app_metadata?.providers || ['email'];
  
  return (
    <div className="space-y-4">
      {providers.map((provider) => (
        <div key={provider} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1C1C30]/50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E8B85F]/10 to-[#E8B85F]/5 flex items-center justify-center">
              {provider === 'google' ? (
                <Globe className="w-5 h-5 text-[#E8B85F]" />
              ) : (
                <Mail className="w-5 h-5 text-[#E8B85F]" />
              )}
            </div>
            <div>
              <p className="font-medium capitalize">{provider}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Connected</p>
            </div>
          </div>
          <CheckCircle className="w-5 h-5 text-green-500" />
        </div>
      ))}
    </div>
  );
}

// Skeleton loaders (keep these as they were, they're fine)
function InfoCardSkeleton() {
  return (
    <>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-6 bg-gray-100 dark:bg-[#1C1C30]/50 rounded-2xl animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex-1">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function SecurityInfoSkeleton() {
  return (
    <>
      {[1, 2].map((i) => (
        <div key={i} className="p-4 bg-gray-100 dark:bg-[#1C1C30]/50 rounded-xl animate-pulse">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-3 w-40 bg-gray-200 dark:bg-gray-800 rounded"></div>
            </div>
            <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      ))}
    </>
  );
}

function ActivitySkeleton() {
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="relative flex items-start gap-4 pl-12 pb-8 last:pb-0">
          <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="flex-1">
            <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-3 w-32 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
          <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  );
}

function StatusSkeleton() {
  return (
    <>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-4 bg-gray-100 dark:bg-[#1C1C30]/50 rounded-xl animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      ))}
    </>
  );
}

function ProvidersSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2].map((i) => (
        <div key={i} className="p-4 bg-gray-100 dark:bg-[#1C1C30]/50 rounded-xl animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
              <div>
                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
              </div>
            </div>
            <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}