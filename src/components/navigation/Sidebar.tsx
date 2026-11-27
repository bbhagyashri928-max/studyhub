import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  Home, BookOpen, BarChart3, Bookmark, 
  User, Settings, LogOut, ChevronDown, ChevronRight, 
  Terminal, Award, FileText, HelpCircle, Trophy, Sparkles
} from 'lucide-react';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
}) => {
  const { currentUser, isAdmin, logout, switchDemoAccount } = useAuth();

  const handleItemClick = (id: string) => {
    onNavigate(id);
    onCloseMobile();
  };

  const isDashboardActive = currentRoute === 'dashboard';
  const isCoursesActive = currentRoute.startsWith('course') || currentRoute === 'courses';
  const isPracticeActive = currentRoute === 'practical-lab';
  const isNotesActive = currentRoute === 'bookmarks';
  const isAnalyticsActive = currentRoute === 'progress';
  const isSettingsActive = currentRoute === 'settings';

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-navy-950/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-[#091524] text-white flex flex-col border-r border-[#152B44] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo Header (StudyHub with Glowing Cyan Open Book Logo) */}
        <div className="px-6 py-5 border-b border-[#142A42] flex items-center justify-between">
          <div
            onClick={() => handleItemClick(isAdmin ? 'admin-overview' : 'dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Glowing Cyan Book Logo (Matches Reference Image) */}
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 44 40" className="w-9 h-9 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                <defs>
                  <linearGradient id="studyHubCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                {/* Left Book Page */}
                <path 
                  d="M 6 12 C 14 9 20 12 21 28 C 16 26 10 27 6 29 Z" 
                  fill="#0E384D" 
                  stroke="url(#studyHubCyan)" 
                  strokeWidth="2.5" 
                  strokeLinejoin="round" 
                />
                {/* Right Book Page */}
                <path 
                  d="M 38 12 C 30 9 24 12 23 28 C 28 26 34 27 38 29 Z" 
                  fill="#0E384D" 
                  stroke="url(#studyHubCyan)" 
                  strokeWidth="2.5" 
                  strokeLinejoin="round" 
                />
                {/* Center Spine */}
                <line x1="22" y1="12" x2="22" y2="28" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            <div>
              <span className="font-extrabold text-xl tracking-tight text-white block leading-tight">
                Study<span className="text-cyan-400">Hub</span>
              </span>
            </div>
          </div>
        </div>

        {/* Demo Switcher */}
        <div className="px-6 py-2 bg-[#06101C] border-b border-[#112338] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-coral-400' : 'bg-cyan-400'} animate-pulse`} />
            <span className="text-[10px] font-semibold text-slate-400">
              {isAdmin ? 'ADMIN' : 'STUDENT'}
            </span>
          </div>
          <button
            onClick={() => switchDemoAccount(isAdmin ? 'STUDENT' : 'ADMIN')}
            className="text-[10px] text-cyan-400 hover:text-cyan-300 font-mono"
          >
            Switch to {isAdmin ? 'Student' : 'Admin'}
          </button>
        </div>

        {/* Main Navigation List (Matches Reference Sidebar Items) */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          
          {/* 1. Dashboard (Active Highlight matching Reference) */}
          <button
            onClick={() => handleItemClick('dashboard')}
            className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              isDashboardActive
                ? 'bg-[#0E3D4C] text-cyan-300 shadow-sm border border-cyan-500/30'
                : 'text-slate-300 hover:bg-[#10233A] hover:text-white'
            }`}
          >
            <Home className={`w-4 h-4 ${isDashboardActive ? 'text-cyan-300' : 'text-slate-400'}`} />
            <span>Dashboard</span>
          </button>

          {/* 2. My Courses */}
          <button
            onClick={() => handleItemClick('course-c')}
            className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              isCoursesActive
                ? 'bg-[#0E3D4C] text-cyan-300 shadow-sm border border-cyan-500/30'
                : 'text-slate-300 hover:bg-[#10233A] hover:text-white'
            }`}
          >
            <BookOpen className={`w-4 h-4 ${isCoursesActive ? 'text-cyan-300' : 'text-slate-400'}`} />
            <span>My Courses</span>
          </button>

          {/* 3. Practice */}
          <button
            onClick={() => handleItemClick('practical-lab?course=c')}
            className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              isPracticeActive
                ? 'bg-[#0E3D4C] text-cyan-300 shadow-sm border border-cyan-500/30'
                : 'text-slate-300 hover:bg-[#10233A] hover:text-white'
            }`}
          >
            <Terminal className={`w-4 h-4 ${isPracticeActive ? 'text-cyan-300' : 'text-slate-400'}`} />
            <span>Practice</span>
          </button>

          {/* 4. Notes */}
          <button
            onClick={() => handleItemClick('bookmarks')}
            className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              isNotesActive
                ? 'bg-[#0E3D4C] text-cyan-300 shadow-sm border border-cyan-500/30'
                : 'text-slate-300 hover:bg-[#10233A] hover:text-white'
            }`}
          >
            <FileText className={`w-4 h-4 ${isNotesActive ? 'text-cyan-300' : 'text-slate-400'}`} />
            <span>Notes</span>
          </button>

          {/* 5. Analytics */}
          <button
            onClick={() => handleItemClick('progress')}
            className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              isAnalyticsActive
                ? 'bg-[#0E3D4C] text-cyan-300 shadow-sm border border-cyan-500/30'
                : 'text-slate-300 hover:bg-[#10233A] hover:text-white'
            }`}
          >
            <BarChart3 className={`w-4 h-4 ${isAnalyticsActive ? 'text-cyan-300' : 'text-slate-400'}`} />
            <span>Analytics</span>
          </button>

          {/* 6. Achievements */}
          <button
            onClick={() => handleItemClick('progress')}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-[#10233A] hover:text-white transition-all"
          >
            <Award className="w-4 h-4 text-slate-400" />
            <span>Achievements</span>
          </button>

          {/* 7. Settings */}
          <button
            onClick={() => handleItemClick('settings')}
            className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              isSettingsActive
                ? 'bg-[#0E3D4C] text-cyan-300 shadow-sm border border-cyan-500/30'
                : 'text-slate-300 hover:bg-[#10233A] hover:text-white'
            }`}
          >
            <Settings className={`w-4 h-4 ${isSettingsActive ? 'text-cyan-300' : 'text-slate-400'}`} />
            <span>Settings</span>
          </button>

          {/* 8. Help & Support */}
          <button
            onClick={() => handleItemClick('dashboard')}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-[#10233A] hover:text-white transition-all"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Help & Support</span>
          </button>
        </div>

        {/* Bottom Card (Matches Reference Screenshot: Golden Trophy + Keep Going! + Wave) */}
        <div className="p-4 mx-3 mb-3 rounded-2xl bg-gradient-to-b from-[#0E243B] to-[#0A1A2B] border border-[#183B59] relative overflow-hidden shadow-soft text-center">
          {/* Subtle teal wave at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-cyan-500/20 to-transparent pointer-events-none" />

          {/* Golden Trophy Icon */}
          <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-xl mx-auto shadow-xs">
            🏆
          </div>

          <p className="text-xs font-extrabold text-white mt-2 leading-tight">
            Keep Going!
          </p>
          <p className="text-[10px] text-slate-300 mt-0.5">
            You&apos;re doing great!
          </p>
        </div>

        {/* Logout Button */}
        <div className="p-3 border-t border-[#13263C]">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-full border border-slate-700/80 hover:border-rose-500/80 hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 text-xs font-semibold transition-all shadow-2xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>

      </aside>
    </>
  );
};
