import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { Sun, Moon, Bell, Lock, Shield, Check, RefreshCw } from 'lucide-react';

export const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { currentUser, switchDemoAccount, isAdmin } = useAuth();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [labReminders, setLabReminders] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaved(true);
    setOldPassword('');
    setNewPassword('');
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="pb-6 border-b border-navy-100 dark:border-navy-800">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400">
          Platform Configuration
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mt-1">
          Settings & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Configure appearance theme, study notifications, and security credentials.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Appearance Section */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <div className="flex items-center gap-2 mb-4">
            <Sun className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-base text-navy-900 dark:text-white">Appearance & Theme</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            CodeViva defaults to a clean, high-contrast Soft Ivory academic light theme, with optional Dark Mode.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                theme === 'light'
                  ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-950/40 text-navy-900 font-bold shadow-sm'
                  : 'border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-950 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="text-sm font-bold">Soft Ivory (Default Light)</p>
                  <p className="text-[11px] text-slate-400">#F8F6F0 study-friendly palette</p>
                </div>
              </div>
              {theme === 'light' && <Check className="w-4 h-4 text-teal-600" />}
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                theme === 'dark'
                  ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-950/40 text-white font-bold shadow-sm'
                  : 'border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-950 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-indigo-400" />
                <div>
                  <p className="text-sm font-bold">Midnight Navy (Dark)</p>
                  <p className="text-[11px] text-slate-400">#14243A deep focus mode</p>
                </div>
              </div>
              {theme === 'dark' && <Check className="w-4 h-4 text-teal-600" />}
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-teal-500" />
            <h3 className="font-bold text-base text-navy-900 dark:text-white">Study Notifications</h3>
          </div>

          <div className="space-y-4 divide-y divide-navy-100 dark:divide-navy-800 text-xs">
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="font-bold text-navy-900 dark:text-white">Academy Announcements</p>
                <p className="text-slate-400">Receive alerts when instructors post course updates or new practicals.</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={e => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-teal-500 rounded"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <p className="font-bold text-navy-900 dark:text-white">Daily Streak Reminders</p>
                <p className="text-slate-400">Get gentle study notifications to preserve your active learning streak.</p>
              </div>
              <input
                type="checkbox"
                checked={labReminders}
                onChange={e => setLabReminders(e.target.checked)}
                className="w-4 h-4 accent-teal-500 rounded"
              />
            </div>
          </div>
        </div>

        {/* Role Demo Switching */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-coral-500" />
            <h3 className="font-bold text-base text-navy-900 dark:text-white">Academy Role Management</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Currently authenticated as <span className="font-bold text-navy-900 dark:text-white">{currentUser?.fullName} ({currentUser?.role})</span>.
          </p>

          <button
            onClick={() => switchDemoAccount(isAdmin ? 'STUDENT' : 'ADMIN')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-sm transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Switch to {isAdmin ? 'Student (Alex Morgan)' : 'Admin (Prof. Elena Vance)'}</span>
          </button>
        </div>

        {/* Password Reset */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 shadow-soft">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-lavender-600" />
            <h3 className="font-bold text-base text-navy-900 dark:text-white">Change Password</h3>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md text-xs">
            <div>
              <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 outline-none focus:border-teal-500 text-navy-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-slate-500 font-bold uppercase tracking-wider mb-1">
                New Secure Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 outline-none focus:border-teal-500 text-navy-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {passwordSaved && (
                <span className="text-emerald-600 font-bold">Password successfully updated!</span>
              )}
              <div className="flex-1" />
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-navy-950 font-bold transition-all shadow-sm"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
};
