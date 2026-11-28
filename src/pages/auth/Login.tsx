import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface LoginProps {
  onNavigateToSignup: () => void;
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigateToSignup, onLoginSuccess }) => {
  const { login, switchDemoAccount } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotMsg, setForgotMsg] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        onLoginSuccess();
      } else {
        setErrorMsg(result.message || 'Login failed. Please check your credentials.');
      }
    } catch {
      setErrorMsg('An unexpected authentication error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: 'STUDENT' | 'ADMIN') => {
    switchDemoAccount(role);
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-ivory-200 dark:bg-navy-950 flex flex-col justify-center items-center p-4 sm:p-6 transition-colors font-sans">
      
      {/* Brand Header */}
      <div className="text-center mb-6">
        <div className="inline-block p-1 rounded-2xl bg-navy-900/40 border border-slate-200 dark:border-navy-800 shadow-soft mb-2">
          <img 
            src="/logo.jpg" 
            alt="CodeViva - Learn • Practice • Grow" 
            className="w-48 sm:w-56 h-auto rounded-xl object-contain mx-auto"
          />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          C &amp; C++ Programming Academy
        </p>
      </div>

      {/* Main Login Card */}
      <div className="bg-white dark:bg-navy-900 rounded-3xl border border-navy-100 dark:border-navy-800 p-6 sm:p-8 max-w-md w-full shadow-soft-lg space-y-6">
        
        <div>
          <h2 className="text-xl font-bold text-navy-900 dark:text-white">Welcome Back</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sign in to continue your C and C++ programming certifications.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {forgotMsg && (
          <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 text-teal-800 dark:text-teal-300 text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>Password reset instructions dispatched to your academic inbox.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="student@codeviva.edu"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => setForgotMsg(true)}
                className="text-[11px] text-teal-600 dark:text-teal-400 hover:underline font-semibold"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white outline-none focus:border-teal-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1.5 text-slate-400 hover:text-slate-600 absolute right-2.5 top-2 rounded-lg"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-teal-500 rounded"
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 active:scale-95 text-navy-950 font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Login Option */}
        <div className="pt-2 border-t border-navy-100 dark:border-navy-800 space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">
            Instant Demo Sign-In
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemoLogin('STUDENT')}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-navy-800 hover:bg-teal-50 hover:text-teal-700 text-navy-900 dark:text-slate-200 font-semibold text-xs transition-colors border border-slate-200 dark:border-navy-700 text-center"
            >
              Sign in as Student
            </button>
            <button
              onClick={() => handleDemoLogin('ADMIN')}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-navy-800 hover:bg-coral-50 hover:text-coral-700 text-navy-900 dark:text-slate-200 font-semibold text-xs transition-colors border border-slate-200 dark:border-navy-700 text-center"
            >
              Sign in as Admin
            </button>
          </div>
        </div>

        {/* Register Footer Link */}
        <div className="text-center pt-2">
          <span className="text-xs text-slate-500">Don&apos;t have an academy account? </span>
          <button
            onClick={onNavigateToSignup}
            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
          >
            Sign up now
          </button>
        </div>

      </div>

    </div>
  );
};
