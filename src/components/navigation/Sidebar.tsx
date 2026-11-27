import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  Home, BarChart3, Bookmark, 
  User, Settings, LogOut, ChevronDown, ChevronRight, 
  Rocket, Code, Terminal, Sparkles
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
  const [isCDropdownOpen, setIsCDropdownOpen] = useState(true);
  const [isCppDropdownOpen, setIsCppDropdownOpen] = useState(false);

  const handleItemClick = (id: string) => {
    onNavigate(id);
    onCloseMobile();
  };

  const isCDashboardActive = currentRoute === 'course-c' || currentRoute.startsWith('c-unit-');
  const isDashboardActive = currentRoute === 'dashboard';

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
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-[#0B1528] text-white flex flex-col border-r border-[#192A47] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo Header (Matches Reference) */}
        <div className="px-6 py-5 border-b border-[#1A2B49] flex items-center justify-between">
          <div
            onClick={() => handleItemClick(isAdmin ? 'admin-overview' : 'dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center text-navy-950 font-black text-base shadow-sm">
              &lt;/&gt;
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-wider text-white block leading-tight">
                CODE<span className="text-amber-300">VERSE</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider font-semibold block uppercase">
                Learn. Practice. Master.
              </span>
            </div>
          </div>
        </div>

        {/* Quick Demo Switcher Strip */}
        <div className="px-6 py-2 bg-[#08101E] border-b border-[#15233C] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-coral-400' : 'bg-teal-400'} animate-pulse`} />
            <span className="text-[10px] font-semibold text-slate-400">
              {isAdmin ? 'ADMIN' : 'STUDENT'}
            </span>
          </div>
          <button
            onClick={() => switchDemoAccount(isAdmin ? 'STUDENT' : 'ADMIN')}
            className="text-[10px] text-teal-400 hover:text-teal-300 font-mono"
          >
            Switch to {isAdmin ? 'Student' : 'Admin'}
          </button>
        </div>

        {/* Main Navigation List */}
        <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
          
          {/* 1. Dashboard (Matches Golden highlight in Reference Mockup) */}
          <button
            onClick={() => handleItemClick('dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              isDashboardActive
                ? 'bg-[#FCEFD8] text-[#784606] font-bold shadow-sm'
                : 'text-slate-300 hover:bg-[#13223B] hover:text-white'
            }`}
          >
            <Home className={`w-4 h-4 ${isDashboardActive ? 'text-[#784606]' : 'text-slate-400'}`} />
            <span>Dashboard</span>
          </button>

          {/* 2. C Programming (Collapsible Dropdown matching Reference Screenshot) */}
          <div className="space-y-1">
            <button
              onClick={() => {
                handleItemClick('course-c');
                setIsCDropdownOpen(!isCDropdownOpen);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isCDashboardActive
                  ? 'text-white bg-[#152745]'
                  : 'text-slate-300 hover:bg-[#13223B] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold text-[10px]">
                  C
                </span>
                <span>C Programming</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isCDropdownOpen ? 'rotate-0' : '-rotate-90'}`} />
            </button>

            {/* Sub-menu with vertical guide line (Reference Layout) */}
            {isCDropdownOpen && (
              <div className="ml-5 pl-3 border-l-2 border-[#1E3356] space-y-1 py-0.5">
                {[
                  { id: 'c-unit-1', label: 'Unit 1' },
                  { id: 'c-unit-2', label: 'Unit 2' },
                  { id: 'c-unit-3', label: 'Unit 3' },
                  { id: 'c-unit-4', label: 'Unit 4' },
                  { id: 'c-unit-5', label: 'Unit 5' },
                ].map((u) => (
                  <button
                    key={u.id}
                    onClick={() => handleItemClick('course-c')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-teal-300 hover:bg-[#12233D] transition-colors block"
                  >
                    {u.label}
                  </button>
                ))}
                <button
                  onClick={() => handleItemClick('practical-lab?course=c')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-teal-400 hover:text-teal-300 hover:bg-[#12233D] transition-colors flex items-center gap-1.5 font-medium"
                >
                  <Terminal className="w-3 h-3" />
                  <span>Practical Lab</span>
                </button>
              </div>
            )}
          </div>

          {/* 4. C++ Programming */}
          <button
            onClick={() => handleItemClick('course-cpp')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              currentRoute === 'course-cpp'
                ? 'bg-[#192E52] text-white'
                : 'text-slate-300 hover:bg-[#13223B] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-purple-600/30 text-purple-400 border border-purple-500/40 flex items-center justify-center font-bold text-[9px]">
                C++
              </span>
              <span>C++ Programming</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* 5. My Progress */}
          <button
            onClick={() => handleItemClick('progress')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              currentRoute === 'progress'
                ? 'bg-[#192E52] text-white font-bold'
                : 'text-slate-300 hover:bg-[#13223B] hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-slate-400" />
            <span>My Progress</span>
          </button>

          {/* 6. Bookmarks */}
          <button
            onClick={() => handleItemClick('bookmarks')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              currentRoute === 'bookmarks'
                ? 'bg-[#192E52] text-white font-bold'
                : 'text-slate-300 hover:bg-[#13223B] hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4 text-slate-400" />
            <span>Bookmarks</span>
          </button>

          {/* 7. Profile */}
          <button
            onClick={() => handleItemClick('profile')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              currentRoute === 'profile'
                ? 'bg-[#192E52] text-white font-bold'
                : 'text-slate-300 hover:bg-[#13223B] hover:text-white'
            }`}
          >
            <User className="w-4 h-4 text-slate-400" />
            <span>Profile</span>
          </button>

          {/* 8. Settings */}
          <button
            onClick={() => handleItemClick('settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              currentRoute === 'settings'
                ? 'bg-[#192E52] text-white font-bold'
                : 'text-slate-300 hover:bg-[#13223B] hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings</span>
          </button>
        </div>

        {/* Bottom Rocket Card (Exact Match to Reference Screenshot) */}
        <div className="p-3 mx-3 mb-2 rounded-2xl bg-gradient-to-br from-[#121E36] to-[#0A1325] border border-[#21355A]/60 relative overflow-hidden shadow-soft">
          <div className="absolute right-0 bottom-0 translate-x-2 translate-y-2 opacity-80 pointer-events-none">
            <span className="text-4xl">🚀</span>
          </div>
          <p className="text-[11px] font-bold text-white tracking-wide">
            Code Today...
          </p>
          <p className="text-[10px] text-amber-300/90 font-medium">
            Build Tomorrow...
          </p>
        </div>

        {/* Logout Button (Pill Button matching Reference) */}
        <div className="p-3 border-t border-[#162744]">
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
