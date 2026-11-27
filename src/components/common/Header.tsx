import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { db } from '@/services/db';
import { 
  Menu, Search, Moon, Sun, Bell, User, LogOut, 
  Settings, Award, Shield, ChevronDown
} from 'lucide-react';
import { GlobalSearchModal } from './GlobalSearchModal';

interface HeaderProps {
  onToggleMobileNav: () => void;
  onNavigate: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileNav, onNavigate }) => {
  const { currentUser, isAdmin, logout, switchDemoAccount } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const announcements = db.getAnnouncements().slice(0, 3);

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-white/95 dark:bg-[#091524]/95 backdrop-blur-md border-b border-slate-100 dark:border-navy-800 px-4 sm:px-6 flex items-center justify-between transition-colors">
        
        {/* Left: Mobile hamburger & Search bar trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileNav}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-xl lg:hidden transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Button (Matches Reference: "Search courses, topics...") */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50 dark:bg-[#0C1B2E] border border-slate-200/90 dark:border-navy-700/80 text-xs text-slate-400 hover:text-navy-900 dark:hover:text-white hover:border-cyan-500 transition-all w-52 sm:w-80 md:w-[380px] shadow-2xs"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="truncate">Search courses, topics...</span>
          </button>
        </div>

        {/* Right: Theme Switcher Pill, Notifications & Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Sleek Dual Sun / Moon Switcher Pill (Matches Reference Screenshot) */}
          <div 
            onClick={toggleTheme}
            className="flex items-center gap-1 p-1 rounded-full bg-slate-100 dark:bg-[#0E2036] border border-slate-200/80 dark:border-navy-700/80 cursor-pointer shadow-2xs transition-colors"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            <div className={`p-1 rounded-full transition-all ${
              theme === 'light' 
                ? 'bg-amber-400 text-white shadow-2xs' 
                : 'text-slate-400 hover:text-slate-200'
            }`}>
              <Sun className="w-3.5 h-3.5" />
            </div>

            <div className={`p-1 rounded-full transition-all ${
              theme === 'dark' 
                ? 'bg-cyan-500 text-navy-950 shadow-2xs' 
                : 'text-slate-400 hover:text-slate-600'
            }`}>
              <Moon className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Announcements Notification Bell with Badge "3" (Matches Reference) */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-full text-slate-600 hover:text-navy-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors relative"
              title="Academy Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center ring-2 ring-white dark:ring-[#091524] shadow-xs">
                3
              </span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0C1B2E] rounded-2xl shadow-soft-lg border border-slate-200 dark:border-navy-800 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-navy-800">
                  <h4 className="font-bold text-xs text-navy-900 dark:text-white">Academy Announcements</h4>
                  <span className="text-[10px] text-cyan-500 font-semibold">{announcements.length} New</span>
                </div>
                <div className="space-y-2.5">
                  {announcements.map(a => (
                    <div key={a.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#091524] text-xs">
                      <p className="font-semibold text-navy-900 dark:text-slate-200">{a.title}</p>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{a.content}</p>
                      <span className="text-[9px] text-cyan-600 font-medium block mt-1">From {a.author}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Student Profile Pill: Avatar + Bhagyashri Bhise + Student + Chevron (Matches Reference) */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2.5 p-1 sm:pr-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-navy-800/80 transition-colors group select-none"
            >
              {/* Profile Avatar */}
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-tr from-cyan-400 to-blue-500 p-0.5 ring-2 ring-slate-200 dark:ring-navy-700 flex-shrink-0 shadow-2xs">
                {currentUser?.avatarUrl ? (
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.fullName}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full bg-navy-900 text-cyan-300 font-bold text-xs flex items-center justify-center rounded-full">
                    BB
                  </div>
                )}
              </div>

              {/* Name & Role Text */}
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-navy-900 dark:text-white leading-tight">
                  {currentUser?.fullName || 'Bhagyashri Bhise'}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                  {isAdmin ? 'Administrator' : 'Student'}
                </p>
              </div>

              {/* Chevron Down */}
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#0C1B2E] rounded-2xl shadow-soft-lg border border-slate-200 dark:border-navy-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-navy-800">
                  <p className="text-xs font-bold text-navy-900 dark:text-white">{currentUser?.fullName}</p>
                  <p className="text-[10px] text-slate-500 truncate">{currentUser?.email}</p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onNavigate('profile');
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-800 flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onNavigate('settings');
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-800 flex items-center gap-2"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>Settings</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-100 dark:border-navy-800">
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      logout();
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </header>

      {/* Global Search Dialog */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
};
