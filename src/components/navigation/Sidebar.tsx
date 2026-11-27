import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, BookOpen, Terminal, CheckCircle2, Bookmark, 
  User, Settings, LogOut, Code2, Users, FileEdit, Award, Bell, 
  BarChart3, Sparkles, Cpu 
} from 'lucide-react';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
}) => {
  const { currentUser, isAdmin, logout, switchDemoAccount } = useAuth();

  const studentNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'course-c', label: 'C Programming', icon: Terminal, badge: '5 Units' },
    { id: 'course-cpp', label: 'C++ Programming', icon: Code2, badge: '5 Units' },
    { id: 'course-other', label: 'Systems & Essentials', icon: Cpu, badge: '5 Units' },
    { id: 'practical-lab', label: 'Practical Lab', icon: Terminal },
    { id: 'progress', label: 'My Progress', icon: CheckCircle2 },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const adminNavItems: NavItem[] = [
    { id: 'admin-overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'admin-students', label: 'Student Management', icon: Users },
    { id: 'admin-courses', label: 'Course Management', icon: BookOpen },
    { id: 'course-c', label: 'C Programming', icon: Terminal },
    { id: 'course-cpp', label: 'C++ Programming', icon: Code2 },
    { id: 'course-other', label: 'Systems & Essentials', icon: Cpu },
    { id: 'admin-practicals', label: 'Practical Management', icon: FileEdit },
    { id: 'admin-quizzes', label: 'Quiz Management', icon: Award },
    { id: 'admin-announcements', label: 'Announcements', icon: Bell },
    { id: 'admin-analytics', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const navItems = isAdmin ? adminNavItems : studentNavItems;

  const handleItemClick = (id: string) => {
    onNavigate(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-navy-950/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-navy-900 text-white flex flex-col border-r border-navy-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo Header */}
        <div className="p-6 border-b border-navy-800/80 flex items-center justify-between">
          <div
            onClick={() => handleItemClick(isAdmin ? 'admin-overview' : 'dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-teal-400 flex items-center justify-center text-navy-950 font-black text-xl shadow-soft">
              C
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white block group-hover:text-teal-400 transition-colors">
                CODE<span className="text-teal-400">VERSE</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider font-semibold block uppercase">
                Learn. Practice. Master.
              </span>
            </div>
          </div>
        </div>

        {/* User Role Badge Card */}
        <div className="px-5 py-3 border-b border-navy-800/60 bg-navy-950/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-coral-400' : 'bg-teal-400'} animate-pulse`} />
              <span className="text-xs font-semibold text-slate-300">
                {isAdmin ? 'ADMIN PORTAL' : 'STUDENT ACADEMY'}
              </span>
            </div>
            {/* Quick Demo Switcher */}
            <button
              onClick={() => switchDemoAccount(isAdmin ? 'STUDENT' : 'ADMIN')}
              className="text-[10px] text-teal-400 hover:text-teal-300 bg-navy-800/80 hover:bg-navy-800 px-2 py-0.5 rounded transition-colors font-mono"
              title="Click to switch between Student and Admin views instantly"
            >
              Switch to {isAdmin ? 'Student' : 'Admin'}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-teal-500 text-navy-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:bg-navy-800/70 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-navy-950' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-navy-900 text-teal-300'
                        : 'bg-navy-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* User Profile Mini Footer */}
        <div className="p-4 border-t border-navy-800/80 bg-navy-950/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={currentUser?.fullName || 'User'}
                className="w-8 h-8 rounded-full object-cover border border-teal-500/40"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">
                  {currentUser?.fullName}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {currentUser?.studentId || currentUser?.email}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-navy-800 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>
    </>
  );
};
