import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProgress } from '@/context/ProgressContext';
import { 
  Trophy, Medal, Crown, Flame, Zap, Award, Sparkles, Star, 
  ArrowUpRight, ShieldCheck, CheckCircle2, TrendingUp, Code2, 
  Terminal, BookOpen, ChevronRight, Users, Filter
} from 'lucide-react';

interface LeaderboardProps {
  onNavigate?: (route: string) => void;
}

interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  studentId: string;
  avatarUrl: string;
  xp: number;
  streakDays: number;
  solvedPracticals: number;
  completedUnits: number;
  tier: 'Grandmaster' | 'Master' | 'Diamond' | 'Platinum' | 'Gold';
  badge: string;
  isCurrentUser?: boolean;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { cProgress, cppProgress } = useProgress();
  const [activeTab, setActiveTab] = useState<'weekly' | 'alltime' | 'c' | 'cpp'>('weekly');

  const userCompletedPracticals = cProgress.completedPracticalIds.length + cppProgress.completedPracticalIds.length;
  const userCompletedUnits = cProgress.completedUnitIds.length + cppProgress.completedUnitIds.length;
  const userXP = 2450 + (userCompletedPracticals * 100) + (userCompletedUnits * 200);

  // Dynamic ranking list featuring current user and peer students
  const leaderboardData: LeaderboardUser[] = [
    {
      rank: 1,
      id: currentUser?.id || 'user-student-1',
      name: currentUser?.fullName || 'Bhagyashri Bhise',
      studentId: currentUser?.studentId || 'CV-2024-8841',
      avatarUrl: currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      xp: userXP,
      streakDays: currentUser?.streakDays || 7,
      solvedPracticals: Math.max(userCompletedPracticals, 12),
      completedUnits: Math.max(userCompletedUnits, 5),
      tier: 'Grandmaster',
      badge: '🏆 Top Scholar',
      isCurrentUser: true,
    },
    {
      rank: 2,
      id: 'user-student-2',
      name: 'Sophia Patel',
      studentId: 'CV-2024-9122',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      xp: 2280,
      streakDays: 7,
      solvedPracticals: 11,
      completedUnits: 4,
      tier: 'Master',
      badge: '⚡ Algo Wizard',
    },
    {
      rank: 3,
      id: 'user-student-3',
      name: 'Rohan Sharma',
      studentId: 'CV-2024-8530',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      xp: 2110,
      streakDays: 6,
      solvedPracticals: 10,
      completedUnits: 4,
      tier: 'Master',
      badge: '🎯 Precision Coder',
    },
    {
      rank: 4,
      id: 'user-student-4',
      name: 'Aarav Mehta',
      studentId: 'CV-2024-7944',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      xp: 1950,
      streakDays: 5,
      solvedPracticals: 9,
      completedUnits: 3,
      tier: 'Diamond',
      badge: '🔥 Streak Master',
    },
    {
      rank: 5,
      id: 'user-student-5',
      name: 'Ananya Deshmukh',
      studentId: 'CV-2024-8219',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      xp: 1820,
      streakDays: 5,
      solvedPracticals: 8,
      completedUnits: 3,
      tier: 'Diamond',
      badge: '💡 Bug Hunter',
    },
    {
      rank: 6,
      id: 'user-student-6',
      name: 'Vikram Joshi',
      studentId: 'CV-2024-6401',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      xp: 1690,
      streakDays: 4,
      solvedPracticals: 7,
      completedUnits: 3,
      tier: 'Platinum',
      badge: '🚀 Speed Runner',
    },
    {
      rank: 7,
      id: 'user-student-7',
      name: 'Pooja Kulkarni',
      studentId: 'CV-2024-9033',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
      xp: 1540,
      streakDays: 4,
      solvedPracticals: 6,
      completedUnits: 2,
      tier: 'Platinum',
      badge: '✨ Fast Learner',
    },
    {
      rank: 8,
      id: 'user-student-8',
      name: 'Aditya Rao',
      studentId: 'CV-2024-7128',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      xp: 1410,
      streakDays: 3,
      solvedPracticals: 5,
      completedUnits: 2,
      tier: 'Gold',
      badge: '📚 Dedicated',
    }
  ];

  const topThree = leaderboardData.slice(0, 3);
  const remainingRankers = leaderboardData.slice(3);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Grandmaster':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'Master':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30';
      case 'Diamond':
        return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30';
      case 'Platinum':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#071325] via-[#0C223E] to-[#0A2E44] border border-[#19365F] p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-10 -bottom-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide uppercase">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              CodeViva Hall of Fame
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              Leaderboard & Rankings
              <Sparkles className="w-6 h-6 text-amber-400 animate-pulse hidden sm:inline" />
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
              Celebrate academic excellence! Earn XP points by completing syllabus units, acing quizzes, writing clean code, and solving lab practicals.
            </p>
          </div>

          {/* Current User Quick Stat Highlight */}
          <div className="flex-shrink-0 bg-white/10 dark:bg-navy-900/60 backdrop-blur-md border border-white/15 dark:border-navy-700/60 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-lg">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-amber-400 shadow-md">
                <img 
                  src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
                  alt="Your Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-400 text-navy-950 font-black text-xs flex items-center justify-center shadow-md">
                #1
              </div>
            </div>
            <div>
              <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">Your Standing</div>
              <div className="text-lg font-black text-white">{currentUser?.fullName || 'Bhagyashri Bhise'}</div>
              <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
                <span className="flex items-center gap-1 font-bold text-amber-400">
                  <Zap className="w-3.5 h-3.5 fill-amber-400" /> {userXP.toLocaleString()} XP
                </span>
                <span className="flex items-center gap-1 font-bold text-orange-400">
                  <Flame className="w-3.5 h-3.5 fill-orange-400" /> {currentUser?.streakDays || 7}d Streak
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-navy-800 pb-4">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-navy-900/80 rounded-xl border border-slate-200/80 dark:border-navy-800">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'weekly'
                ? 'bg-white dark:bg-teal-500 text-teal-700 dark:text-navy-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white'
            }`}
          >
            Weekly Sprint
          </button>
          <button
            onClick={() => setActiveTab('alltime')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'alltime'
                ? 'bg-white dark:bg-teal-500 text-teal-700 dark:text-navy-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white'
            }`}
          >
            All-Time Legends
          </button>
          <button
            onClick={() => setActiveTab('c')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'c'
                ? 'bg-white dark:bg-teal-500 text-teal-700 dark:text-navy-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white'
            }`}
          >
            C Programming
          </button>
          <button
            onClick={() => setActiveTab('cpp')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'cpp'
                ? 'bg-white dark:bg-teal-500 text-teal-700 dark:text-navy-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white'
            }`}
          >
            C++ OOP
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Users className="w-4 h-4 text-teal-500" />
          <span>Active Batch: <strong>88 Enrolled Students</strong></span>
        </div>
      </div>

      {/* Top 3 Podium Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        
        {/* 2nd Place (Silver) */}
        {topThree[1] && (
          <div className="order-2 md:order-1 relative rounded-3xl bg-white dark:bg-navy-900/90 border border-slate-200 dark:border-navy-800 p-6 shadow-md flex flex-col items-center text-center group hover:shadow-lg transition-all">
            <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center font-black text-slate-600 dark:text-slate-300 text-xs">
              2nd
            </div>
            <div className="relative mb-4 mt-2">
              <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-slate-300 dark:ring-slate-600 shadow-md">
                <img src={topThree[1].avatarUrl} alt={topThree[1].name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-1 w-7 h-7 rounded-full bg-slate-300 text-slate-900 flex items-center justify-center text-sm shadow">
                🥈
              </div>
            </div>
            <h3 className="font-extrabold text-navy-900 dark:text-white text-base">{topThree[1].name}</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{topThree[1].studentId}</p>
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border mt-2 ${getTierColor(topThree[1].tier)}`}>
              {topThree[1].badge}
            </span>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-navy-800 w-full flex items-center justify-around text-xs">
              <div>
                <div className="text-slate-400 text-[10px] font-semibold uppercase">Total XP</div>
                <div className="font-black text-teal-600 dark:text-teal-400 text-sm">{topThree[1].xp.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] font-semibold uppercase">Streak</div>
                <div className="font-black text-orange-500 text-sm">🔥 {topThree[1].streakDays}d</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] font-semibold uppercase">Practicals</div>
                <div className="font-black text-navy-900 dark:text-white text-sm">{topThree[1].solvedPracticals}</div>
              </div>
            </div>
          </div>
        )}

        {/* 1st Place (Gold / Champion) - Elevated */}
        {topThree[0] && (
          <div className="order-1 md:order-2 relative rounded-3xl bg-gradient-to-b from-amber-500/10 via-white dark:via-navy-900 to-white dark:to-navy-900 border-2 border-amber-400/60 dark:border-amber-400/50 p-6 sm:p-7 shadow-xl flex flex-col items-center text-center group hover:scale-[1.02] transition-all md:-translate-y-4">
            <div className="absolute -top-3.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-navy-950 font-black text-xs tracking-wider uppercase shadow-md flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 fill-navy-950" />
              1st Champion
            </div>
            <div className="relative mb-4 mt-3">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-amber-400 shadow-xl">
                <img src={topThree[0].avatarUrl} alt={topThree[0].name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-1 w-8 h-8 rounded-full bg-amber-400 text-navy-950 flex items-center justify-center text-base shadow-lg animate-bounce">
                🥇
              </div>
            </div>
            <h3 className="font-black text-navy-900 dark:text-white text-lg flex items-center gap-1.5">
              {topThree[0].name}
              {topThree[0].isCurrentUser && (
                <span className="text-[10px] bg-teal-500 text-white font-bold px-1.5 py-0.5 rounded-full">YOU</span>
              )}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{topThree[0].studentId}</p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mt-2 ${getTierColor(topThree[0].tier)}`}>
              {topThree[0].badge}
            </span>
            <div className="mt-4 pt-4 border-t border-amber-200/50 dark:border-navy-700 w-full flex items-center justify-around text-xs">
              <div>
                <div className="text-slate-400 text-[10px] font-semibold uppercase">Total XP</div>
                <div className="font-black text-amber-500 text-base">{topThree[0].xp.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] font-semibold uppercase">Streak</div>
                <div className="font-black text-orange-500 text-base">🔥 {topThree[0].streakDays}d</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] font-semibold uppercase">Practicals</div>
                <div className="font-black text-teal-500 text-base">{topThree[0].solvedPracticals}</div>
              </div>
            </div>
          </div>
        )}

        {/* 3rd Place (Bronze) */}
        {topThree[2] && (
          <div className="order-3 relative rounded-3xl bg-white dark:bg-navy-900/90 border border-slate-200 dark:border-navy-800 p-6 shadow-md flex flex-col items-center text-center group hover:shadow-lg transition-all">
            <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-amber-900/10 dark:bg-amber-900/20 border border-amber-700/30 flex items-center justify-center font-black text-amber-700 dark:text-amber-400 text-xs">
              3rd
            </div>
            <div className="relative mb-4 mt-2">
              <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-amber-600/50 shadow-md">
                <img src={topThree[2].avatarUrl} alt={topThree[2].name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-1 w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm shadow">
                🥉
              </div>
            </div>
            <h3 className="font-extrabold text-navy-900 dark:text-white text-base">{topThree[2].name}</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{topThree[2].studentId}</p>
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border mt-2 ${getTierColor(topThree[2].tier)}`}>
              {topThree[2].badge}
            </span>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-navy-800 w-full flex items-center justify-around text-xs">
              <div>
                <div className="text-slate-400 text-[10px] font-semibold uppercase">Total XP</div>
                <div className="font-black text-teal-600 dark:text-teal-400 text-sm">{topThree[2].xp.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] font-semibold uppercase">Streak</div>
                <div className="font-black text-orange-500 text-sm">🔥 {topThree[2].streakDays}d</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] font-semibold uppercase">Practicals</div>
                <div className="font-black text-navy-900 dark:text-white text-sm">{topThree[2].solvedPracticals}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ranks 4+ Table List */}
      <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-navy-800 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-navy-800 flex items-center justify-between">
          <h2 className="text-base font-extrabold text-navy-900 dark:text-white flex items-center gap-2">
            <Medal className="w-5 h-5 text-teal-500" />
            Class Rankings & Milestones
          </h2>
          <span className="text-xs text-slate-400">Updated hourly from lab activities</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-navy-800/80">
          {leaderboardData.map((student) => (
            <div
              key={student.id}
              className={`flex items-center justify-between px-4 sm:px-6 py-3.5 transition-colors ${
                student.isCurrentUser
                  ? 'bg-teal-50/70 dark:bg-teal-950/20 border-l-4 border-teal-500'
                  : 'hover:bg-slate-50 dark:hover:bg-navy-800/40'
              }`}
            >
              {/* Rank & Student Info */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="w-8 flex-shrink-0 text-center font-black text-sm text-slate-500 dark:text-slate-400">
                  {student.rank === 1 ? '🥇' : student.rank === 2 ? '🥈' : student.rank === 3 ? '🥉' : `#${student.rank}`}
                </div>
                <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-slate-200 dark:ring-navy-700">
                  <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-navy-900 dark:text-white truncate">
                      {student.name}
                    </span>
                    {student.isCurrentUser && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-teal-500 text-white">
                        You
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <span>{student.studentId}</span>
                    <span>•</span>
                    <span className="text-teal-600 dark:text-teal-400 font-sans font-semibold">{student.tier}</span>
                  </div>
                </div>
              </div>

              {/* Stats: Streak & XP */}
              <div className="flex items-center gap-4 sm:gap-8 flex-shrink-0">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs font-bold text-orange-500 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-orange-500" /> {student.streakDays}d Streak
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {student.solvedPracticals} labs solved
                  </span>
                </div>

                <div className="flex flex-col items-end min-w-[70px]">
                  <span className="font-black text-sm sm:text-base text-navy-900 dark:text-white flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {student.xp.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">XP Points</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick XP Earning Tips & Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-transparent border border-teal-500/20 p-6 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-wider">
              <Zap className="w-4 h-4 fill-teal-500" />
              How to Earn More XP
            </div>
            <h3 className="text-lg font-extrabold text-navy-900 dark:text-white">
              Climb the Weekly Leaderboard Faster
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                <span><strong>+100 XP</strong> for each verified Lab Practical solved in the compiler.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                <span><strong>+200 XP</strong> for finishing all 6 stages of a syllabus Unit.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                <span><strong>+25 XP</strong> daily bonus for sustaining your daily study streak.</span>
              </li>
            </ul>
          </div>
          {onNavigate && (
            <div className="pt-4 mt-2">
              <button
                onClick={() => onNavigate('practical-lab')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs shadow-md transition-all"
              >
                <Terminal className="w-4 h-4" />
                Open Practical Lab & Earn XP
              </button>
            </div>
          )}
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20 p-6 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Award className="w-4 h-4 fill-amber-500" />
              Upcoming Tournament
            </div>
            <h3 className="text-lg font-extrabold text-navy-900 dark:text-white">
              Monthly C/C++ Sprint Championship
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              The top 3 students at the end of each sprint receive verified Certificates of Excellence and Grandmaster badges on their profile.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-2">
              <span>Sprint Ends: <strong>In 3 Days</strong></span>
              <span>•</span>
              <span className="text-amber-500 font-bold">1st Place Bonus: 500 XP</span>
            </div>
          </div>
          {onNavigate && (
            <div className="pt-4 mt-2">
              <button
                onClick={() => onNavigate('course-c')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-900 dark:bg-navy-800 hover:bg-navy-800 text-white font-bold text-xs border border-slate-700 shadow-md transition-all"
              >
                <BookOpen className="w-4 h-4 text-teal-400" />
                Continue Course Topics
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
