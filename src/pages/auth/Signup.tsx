import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Lock, Hash, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SignupProps {
  onNavigateToLogin: () => void;
  onSignupSuccess: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onNavigateToLogin, onSignupSuccess }) => {
  const { signup } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify and re-enter.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (!termsAccepted) {
      setErrorMsg('You must accept the academy terms and conditions.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signup({
        fullName,
        email,
        studentId: studentId.trim() || undefined,
        passwordHash: password,
      });

      if (result.success) {
        onSignupSuccess();
      } else {
        setErrorMsg(result.message || 'Registration failed.');
      }
    } catch {
      setErrorMsg('An unexpected registration error occurred.');
    } finally {
      setIsLoading(false);
    }
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
          Student Enrollment Portal
        </p>
      </div>

      {/* Main Signup Card */}
      <div className="bg-white dark:bg-navy-900 rounded-3xl border border-navy-100 dark:border-navy-800 p-6 sm:p-8 max-w-md w-full shadow-soft-lg space-y-5">
        
        <div>
          <h2 className="text-xl font-bold text-navy-900 dark:text-white">Create Student Account</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Enroll to access 10 comprehensive C/C++ units and interactive practical labs.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          
          {/* Full Name */}
          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Marcus Sterling"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">
              Academic Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="marcus@university.edu"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* Student ID (Optional) */}
          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">
              Student ID / Roll Number <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <div className="relative">
              <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={studentId}
                onChange={e => setStudentId(e.target.value)}
                placeholder="CV-2024-XXXX"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">
              Password
            </label>
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

          {/* Confirm Password */}
          <div>
            <label className="block text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2 cursor-pointer text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                required
                checked={termsAccepted}
                onChange={e => setTermsAccepted(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-teal-500 rounded flex-shrink-0"
              />
              <span className="text-[11px] leading-tight">
                I agree to the CodeViva Academy academic integrity honor code and terms of service.
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 active:scale-95 text-navy-950 font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
          >
            <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center pt-2">
          <span className="text-xs text-slate-500">Already registered? </span>
          <button
            onClick={onNavigateToLogin}
            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
          >
            Log in to academy
          </button>
        </div>

      </div>

    </div>
  );
};
