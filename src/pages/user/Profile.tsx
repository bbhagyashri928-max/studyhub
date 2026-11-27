import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProgress } from '@/context/ProgressContext';
import { User, Mail, Hash, BookOpen, Flame, Award, Save, Check } from 'lucide-react';

export const Profile: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const { cProgress, cppProgress } = useProgress();

  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [studentId, setStudentId] = useState(currentUser?.studentId || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatarUrl || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateProfile({
      fullName,
      studentId,
      bio,
      avatarUrl,
    });
    if (success) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  ];

  const totalCertifiedUnits = cProgress.completedUnitIds.length + cppProgress.completedUnitIds.length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="pb-6 border-b border-navy-100 dark:border-navy-800">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400">
          Academic Identity
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mt-1">
          Student Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your personal academy records, student identification, bio, and avatar.
        </p>
      </div>

      {/* Main Profile Card & Form */}
      <div className="bg-white dark:bg-navy-900 rounded-3xl border border-navy-100 dark:border-navy-800 p-6 sm:p-8 shadow-soft">
        
        {/* Profile Stats Quick Banner */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-navy-100 dark:border-navy-800">
          <img
            src={avatarUrl || sampleAvatars[0]}
            alt={fullName}
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-teal-500/20 shadow-soft"
          />
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold text-navy-900 dark:text-white">{fullName}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400">
                {currentUser?.role}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{currentUser?.email} • ID: {studentId || 'Not assigned'}</p>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs">
              <span className="flex items-center gap-1.5 font-bold text-coral-600">
                <Flame className="w-4 h-4 fill-current" /> {currentUser?.streakDays || 1} Day Streak
              </span>
              <span className="flex items-center gap-1.5 font-bold text-teal-600">
                <Award className="w-4 h-4" /> {totalCertifiedUnits} Units Certified
              </span>
              <span className="flex items-center gap-1.5 font-bold text-slate-500">
                <BookOpen className="w-4 h-4" /> 2 Enrolled Tracks
              </span>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="mt-6 space-y-6">
          
          {/* Avatar Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Academy Avatar
            </label>
            <div className="flex items-center gap-3">
              {sampleAvatars.map((url, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setAvatarUrl(url)}
                  className={`relative rounded-xl overflow-hidden ring-2 transition-all ${
                    avatarUrl === url ? 'ring-teal-500 scale-105' : 'ring-transparent hover:scale-100 opacity-70'
                  }`}
                >
                  <img src={url} alt={`Avatar ${idx + 1}`} className="w-12 h-12 object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Student ID / Roll Number
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={studentId}
                  onChange={e => setStudentId(e.target.value)}
                  placeholder="e.g. CV-2024-8841"
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Email Address (Permanent Academic ID)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                disabled
                value={currentUser?.email || ''}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-navy-950/40 border border-slate-200 dark:border-navy-800 text-slate-400 cursor-not-allowed outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Personal Learning Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Tell the academy instructors about your programming goals and interests..."
              className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white outline-none focus:border-teal-500 leading-relaxed"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-between">
            {savedSuccess && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold animate-in fade-in">
                <Check className="w-4 h-4" /> Profile updated successfully!
              </span>
            )}
            <div className="flex-1" />
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 active:scale-95 text-navy-950 font-bold text-xs shadow-sm transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
