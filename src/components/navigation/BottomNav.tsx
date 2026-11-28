import React from 'react';
import { 
  Trophy, BookOpen, Home, BarChart3, User, Sparkles
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface BottomNavProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentRoute, onNavigate }) => {
  const { isAdmin } = useAuth();

  // Helper to determine if an option is active
  const isLeaderboardActive = currentRoute === 'leaderboard';
  const isCourseActive = 
    currentRoute === 'course-c' || 
    currentRoute === 'course-cpp' || 
    currentRoute === 'courses' || 
    currentRoute === 'unit-reader' ||
    currentRoute === 'practical-lab';
  const isHomeActive = currentRoute === 'dashboard' || currentRoute === 'admin-overview';
  const isReportActive = currentRoute === 'progress' || currentRoute === 'admin-analytics';
  const isProfileActive = currentRoute === 'profile';

  // Navigation handlers
  const handleLeaderboard = () => onNavigate('leaderboard');
  const handleCourse = () => {
    // If currently on cpp, retain cpp, otherwise default to course-c
    if (currentRoute === 'course-cpp') {
      onNavigate('course-cpp');
    } else {
      onNavigate('course-c');
    }
  };
  const handleHome = () => onNavigate(isAdmin ? 'admin-overview' : 'dashboard');
  const handleReport = () => onNavigate(isAdmin ? 'admin-analytics' : 'progress');
  const handleProfile = () => onNavigate('profile');

  const navItems = [
    {
      id: 'leaderboard',
      label: 'Leaderboard',
      icon: Trophy,
      isActive: isLeaderboardActive,
      onClick: handleLeaderboard,
      activeColor: 'text-amber-500 dark:text-amber-400',
      activeBg: 'bg-amber-500/10 dark:bg-amber-400/15 text-amber-600 dark:text-amber-300 ring-1 ring-amber-400/30',
      iconGlow: 'drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]',
      hasBadge: true,
      badgeText: 'XP',
    },
    {
      id: 'course',
      label: 'Course',
      icon: BookOpen,
      isActive: isCourseActive,
      onClick: handleCourse,
      activeColor: 'text-teal-600 dark:text-teal-400',
      activeBg: 'bg-teal-500/10 dark:bg-teal-400/15 text-teal-700 dark:text-teal-300 ring-1 ring-teal-400/30',
      iconGlow: 'drop-shadow-[0_0_8px_rgba(36,184,166,0.5)]',
      hasBadge: false,
      badgeText: '',
    },
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      isActive: isHomeActive,
      onClick: handleHome,
      isCenter: true,
      activeColor: 'text-white',
      activeBg: 'bg-gradient-to-tr from-teal-500 via-cyan-400 to-teal-400 text-white shadow-lg shadow-teal-500/40 ring-2 ring-teal-300/40',
      iconGlow: 'drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]',
      hasBadge: false,
      badgeText: '',
    },
    {
      id: 'report',
      label: 'Report',
      icon: BarChart3,
      isActive: isReportActive,
      onClick: handleReport,
      activeColor: 'text-cyan-600 dark:text-cyan-400',
      activeBg: 'bg-cyan-500/10 dark:bg-cyan-400/15 text-cyan-700 dark:text-cyan-300 ring-1 ring-cyan-400/30',
      iconGlow: 'drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]',
      hasBadge: false,
      badgeText: '',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      isActive: isProfileActive,
      onClick: handleProfile,
      activeColor: 'text-indigo-600 dark:text-indigo-400',
      activeBg: 'bg-indigo-500/10 dark:bg-indigo-400/15 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-400/30',
      iconGlow: 'drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]',
      hasBadge: false,
      badgeText: '',
    },
  ];

  return (
    <div className="fixed bottom-3 sm:bottom-5 left-0 right-0 lg:left-64 z-40 flex justify-center items-center pointer-events-none px-3 sm:px-6">
      {/* Floating Modern Glass Dock */}
      <nav 
        role="navigation"
        aria-label="Bottom Navigation"
        className="pointer-events-auto w-full max-w-lg md:max-w-xl bg-white/95 dark:bg-[#0B1728]/95 backdrop-blur-xl border border-slate-200/90 dark:border-[#1E3255] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.18)] dark:shadow-[0_18px_50px_-10px_rgba(0,0,0,0.7)] rounded-2xl sm:rounded-full px-2 sm:px-4 py-1.5 sm:py-2 transition-all duration-300"
      >
        {/* Single Row 5 Horizontal Options */}
        <div className="flex flex-row items-center justify-between sm:justify-around gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            
            // Special Center "Home" Button Styling
            if (item.isCenter) {
              return (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  title={item.label}
                  className="group relative flex flex-col items-center justify-center -translate-y-2 sm:-translate-y-2.5 focus:outline-none transition-all duration-200"
                >
                  <div
                    className={`w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 active:scale-95 ${
                      item.isActive
                        ? 'bg-gradient-to-tr from-teal-500 via-teal-400 to-cyan-400 text-white shadow-lg shadow-teal-500/40 ring-4 ring-teal-400/25 ring-offset-2 ring-offset-white dark:ring-offset-[#0B1728]'
                        : 'bg-gradient-to-tr from-[#132644] to-[#1E3964] text-slate-200 hover:text-white shadow-md hover:shadow-cyan-500/20 border border-slate-600/40'
                    }`}
                  >
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${item.isActive ? item.iconGlow : ''}`} />
                  </div>
                  <span
                    className={`text-[10px] sm:text-[11px] font-extrabold tracking-tight mt-1 transition-colors ${
                      item.isActive
                        ? 'text-teal-600 dark:text-teal-400'
                        : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            }

            // Standard Options (Leaderboard, Course, Report, Profile)
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                title={item.label}
                className={`group relative flex-1 flex flex-col items-center justify-center py-1 sm:py-1.5 px-2 rounded-xl sm:rounded-2xl transition-all duration-200 transform active:scale-95 focus:outline-none ${
                  item.isActive
                    ? item.activeBg
                    : 'text-slate-500 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-navy-800/40'
                }`}
              >
                {/* Active Indicator Top Pill */}
                {item.isActive && (
                  <span className="absolute -top-1 w-5 h-1 rounded-full bg-current opacity-80 animate-pulse hidden sm:block" />
                )}

                {/* Icon Wrapper */}
                <div className="relative flex items-center justify-center">
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                      item.isActive ? `${item.activeColor} ${item.iconGlow}` : ''
                    }`}
                  />

                  {/* Badge (e.g. XP on Leaderboard) */}
                  {item.hasBadge && (
                    <span className="absolute -top-1.5 -right-3 px-1 py-0.2 rounded-full text-[8px] font-black uppercase bg-amber-500 text-navy-950 shadow-xs">
                      {item.badgeText}
                    </span>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-[10px] sm:text-[11px] mt-0.5 tracking-tight transition-all font-semibold ${
                    item.isActive
                      ? `font-bold ${item.activeColor}`
                      : 'text-slate-500 dark:text-slate-400 group-hover:text-navy-900 dark:group-hover:text-white'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
export default BottomNav;
