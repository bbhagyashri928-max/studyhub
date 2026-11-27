import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '@/types';
import { db, SEED_USERS } from '@/services/db';

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, passwordHash: string) => Promise<{ success: boolean; message?: string }>;
  signup: (data: { fullName: string; email: string; studentId?: string; passwordHash: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  switchDemoAccount: (role: UserRole) => void;
  updateProfile: (updates: Partial<UserProfile>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_USER_KEY = 'codeverse_current_user_id';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sync daily streaks
  const processStreak = (user: UserProfile): UserProfile => {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = user.lastActiveDate;

    if (lastActive === today) {
      return user; // already active today
    }

    const lastDate = new Date(lastActive);
    const currDate = new Date(today);
    const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

    let updatedStreak = user.streakDays;
    if (diffDays === 1) {
      updatedStreak += 1; // Consecutive active day!
    } else if (diffDays > 1) {
      updatedStreak = 1; // Streak broken, reset
    }

    const updatedUser: UserProfile = {
      ...user,
      streakDays: updatedStreak,
      lastActiveDate: today
    };

    db.updateUser(user.id, updatedUser);
    return updatedUser;
  };

  useEffect(() => {
    const savedUserId = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUserId) {
      const user = db.getUser(savedUserId);
      if (user && user.status === 'ACTIVE') {
        const userWithStreak = processStreak(user);
        setCurrentUser(userWithStreak);
      } else {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    } else {
      // Default to student demo user for immediate high-frictionless testing
      const defaultStudent = SEED_USERS[0];
      const userWithStreak = processStreak(defaultStudent);
      setCurrentUser(userWithStreak);
      localStorage.setItem(CURRENT_USER_KEY, defaultStudent.id);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, passwordHash: string): Promise<{ success: boolean; message?: string }> => {
    const users = db.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return { success: false, message: 'No registered account found with this email address.' };
    }

    if (user.status === 'INACTIVE') {
      return { success: false, message: 'This account has been deactivated. Please contact the academy administration.' };
    }

    if (user.passwordHash && user.passwordHash !== passwordHash) {
      return { success: false, message: 'Incorrect password. Please verify and try again.' };
    }

    const userWithStreak = processStreak(user);
    setCurrentUser(userWithStreak);
    localStorage.setItem(CURRENT_USER_KEY, user.id);
    db.logActivity(user.id, user.fullName, 'User Sign In', `${user.fullName} logged into CODEVERSE Academy`);
    return { success: true };
  };

  const signup = async (data: { fullName: string; email: string; studentId?: string; passwordHash: string }): Promise<{ success: boolean; message?: string }> => {
    const users = db.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === data.email.toLowerCase());

    if (existing) {
      return { success: false, message: 'An account with this email address is already registered.' };
    }

    const newUser: UserProfile & { passwordHash: string } = {
      id: `user-${Date.now()}`,
      email: data.email,
      fullName: data.fullName,
      studentId: data.studentId || `CV-${Math.floor(1000 + Math.random() * 9000)}`,
      role: 'STUDENT', // Prompt requirement: "Do not allow users to choose the admin role during normal registration."
      status: 'ACTIVE',
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      enrolledCourses: ['c', 'cpp'],
      createdAt: new Date().toISOString(),
      passwordHash: data.passwordHash,
      bio: 'New student enrolled in CODEVERSE Academy.'
    };

    db.createUser(newUser);
    setCurrentUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, newUser.id);
    db.logActivity(newUser.id, newUser.fullName, 'New Student Registration', `New student ${newUser.fullName} registered for C and C++ programs`);
    return { success: true };
  };

  const logout = () => {
    if (currentUser) {
      db.logActivity(currentUser.id, currentUser.fullName, 'User Logout', `${currentUser.fullName} signed out`);
    }
    setCurrentUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const switchDemoAccount = (role: UserRole) => {
    const users = db.getUsers();
    const target = role === 'ADMIN' 
      ? users.find(u => u.role === 'ADMIN') || SEED_USERS[2]
      : users.find(u => u.role === 'STUDENT') || SEED_USERS[0];

    if (target) {
      const userWithStreak = processStreak(target);
      setCurrentUser(userWithStreak);
      localStorage.setItem(CURRENT_USER_KEY, target.id);
      db.logActivity(target.id, target.fullName, 'Demo Account Switch', `Switched active session to ${role}: ${target.fullName}`);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<boolean> => {
    if (!currentUser) return false;
    const updated = db.updateUser(currentUser.id, updates);
    if (updated) {
      setCurrentUser(updated);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'ADMIN',
        isLoading,
        login,
        signup,
        logout,
        switchDemoAccount,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
