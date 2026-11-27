import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { db } from '@/services/db';
import { 
  Menu, Search, Flame, Moon, Sun, Bell, User, LogOut, 
  Settings, Award, Shield, CheckCircle2 
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
      <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-navy-900/90 backdrop-blur-md border-b border-navy-100 dark:border-navy-800 px-4 sm:px-6 flex items-center justify-between transition-colors">
        
        {/* Left: Mobile hamburger & Search bar trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileNav}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-xl lg:hidden transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Global Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-ivory-100 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-xs text-slate-400 hover:text-navy-900 dark:hover:text-white hover:border-teal-500 transition-all w-48 sm:w-72 justify-between"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>Search topics, lab...</span>
            </div>
            <kbd className="hidden sm:inline-block font-mono text-[10px] bg-white dark:bg-navy-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-navy-700 text-slate-500">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right: Actions, Streaks, Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Daily Streak Indicator */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-coral-50 dark:bg-coral-950/40 border border-coral-200/80 dark:border-coral-800/60 text-coral-600 dark:text-coral-400"
            title={`${currentUser?.streakDays || 1} day learning streak! Study daily to keep the fire going.`}
          >
            <Flame className="w-4 h-4 fill-current animate-bounce" />
            <span className="font-bold text-xs">{currentUser?.streakDays || 1}</span>
            <span className="text-[11px] font-medium hidden sm:inline">Streak</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:text-navy-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Announcements Popover */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-xl text-slate-500 hover:text-navy-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors relative"
              title="Academy Announcements"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-500 ring-2 ring-white dark:ring-navy-900" />
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-navy-900 rounded-2xl shadow-soft-lg border border-navy-100 dark:border-navy-800 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-navy-100 dark:border-navy-800">
                  <h4 className="font-bold text-xs text-navy-900 dark:text-white">Academy Announcements</h4>
                  <span className="text-[10px] text-teal-600 font-semibold">{announcements.length} New</span>
                </div>
                <div className="space-y-2.5">
                  {announcements.map(a => (
                    <div key={a.id} className="p-2.5 rounded-xl bg-ivory-100 dark:bg-navy-950 text-xs">
                      <p className="font-semibold text-navy-900 dark:text-slate-200">{a.title}</p>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{a.content}</p>
                      <span className="text-[9px] text-teal-600 font-medium block mt-1">From {a.author}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 p-1 pl-2 rounded-xl border border-slate-200 dark:border-navy-700 hover:border-teal-500 transition-all bg-white dark:bg-navy-900"
            >
              <span className="text-xs font-semibold text-navy-900 dark:text-white hidden md:inline max-w-[120px] truncate">
                {currentUser?.fullName?.split(' ')[0]}
              </span>
              <img
                src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={currentUser?.fullName || 'User'}
                className="w-7 h-7 rounded-lg object-cover"
              />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-navy-900 rounded-2xl shadow-soft-lg border border-navy-100 dark:border-navy-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-xs">
                <div className="p-2 border-b border-navy-100 dark:border-navy-800 mb-1">
                  <p className="font-bold text-navy-900 dark:text-white">{currentUser?.fullName}</p>
                  <p className="text-[10px] text-slate-400">{currentUser?.email}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    isAdmin ? 'bg-coral-100 text-coral-700' : 'bg-teal-100 text-teal-700'
                  }`}>
                    {currentUser?.role}
                  </span>
                </div>

                <button
                  onClick={() => {
                    onNavigate('profile');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Student Profile</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('settings');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Account Settings</span>
                </button>

                <div className="border-t border-navy-100 dark:border-navy-800 my-1 pt-1">
                  <button
                    onClick={() => {
                      switchDemoAccount(isAdmin ? 'STUDENT' : 'ADMIN');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/40 transition-colors font-medium"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Switch to {isAdmin ? 'Student' : 'Admin'}</span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
};
