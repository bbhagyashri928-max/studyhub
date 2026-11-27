import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/services/db';
import { CourseId } from '@/types';

// Components
import { Header } from '@/components/common/Header';
import { Sidebar } from '@/components/navigation/Sidebar';
import { TopicReader } from '@/components/learning/TopicReader';

// Pages
import { Login } from '@/pages/auth/Login';
import { Signup } from '@/pages/auth/Signup';
import { Dashboard } from '@/pages/user/Dashboard';
import { CourseView } from '@/pages/user/CourseView';
import { PracticalLab } from '@/pages/user/PracticalLab';
import { Bookmarks } from '@/pages/user/Bookmarks';
import { Progress } from '@/pages/user/Progress';
import { Profile } from '@/pages/user/Profile';
import { Settings } from '@/pages/user/Settings';
import { CGameView } from '@/pages/user/CGameView';
import { CppGameView } from '@/pages/user/CppGameView';
import { FccStepWorkspace } from '@/components/fcc-learn/FccStepWorkspace';

// Admin Pages
import { AdminOverview } from '@/pages/admin/AdminOverview';
import { StudentsManagement } from '@/pages/admin/StudentsManagement';
import { CourseManagement } from '@/pages/admin/CourseManagement';
import { PracticalManagement } from '@/pages/admin/PracticalManagement';
import { QuizManagement } from '@/pages/admin/QuizManagement';
import { AnnouncementsManagement } from '@/pages/admin/AnnouncementsManagement';
import { AnalyticsReports } from '@/pages/admin/AnalyticsReports';
import { StageManagement } from '@/pages/admin/StageManagement';

export const AppContent: React.FC = () => {
  const { isAuthenticated, isAdmin, currentUser } = useAuth();
  
  // Navigation State
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return isAdmin ? 'admin-overview' : 'dashboard';
  });
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [practicalLabCourse, setPracticalLabCourse] = useState<CourseId>('c');

  // Active Unit Reader State
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null);
  const [activeTopicId, setActiveTopicId] = useState<string | undefined>(undefined);

  // If user is not logged in, render authentication screens
  if (!isAuthenticated) {
    if (authView === 'signup') {
      return (
        <Signup
          onNavigateToLogin={() => setAuthView('login')}
          onSignupSuccess={() => setCurrentRoute('dashboard')}
        />
      );
    }
    return (
      <Login
        onNavigateToSignup={() => setAuthView('signup')}
        onLoginSuccess={() => setCurrentRoute(isAdmin ? 'admin-overview' : 'dashboard')}
      />
    );
  }

  // Handle generic navigation (including deep links from search)
  const handleNavigate = (route: string) => {
    // Check if it is a unit route, e.g. "courses/c/unit/c-unit-1?topic=c-u1-t2"
    if (route.includes('/unit/')) {
      const parts = route.split('/unit/');
      const unitAndQuery = parts[1].split('?topic=');
      const unitId = unitAndQuery[0];
      const topicId = unitAndQuery[1];
      setActiveUnitId(unitId);
      setActiveTopicId(topicId);
      setCurrentRoute('unit-reader');
      return;
    }

    // Check practical lab route with course param
    if (route.startsWith('practical-lab')) {
      if (route.includes('course=cpp')) {
        setPracticalLabCourse('cpp');
      } else {
        setPracticalLabCourse('c');
      }
      setCurrentRoute('practical-lab');
      return;
    }

    // Reset unit reader if navigating away
    setActiveUnitId(null);
    setActiveTopicId(undefined);

    // Route guard: if student attempts to navigate to admin route, fallback to dashboard
    if (!isAdmin && route.startsWith('admin-')) {
      setCurrentRoute('dashboard');
      return;
    }

    setCurrentRoute(route);
  };

  const handleOpenUnit = (unitId: string, topicId?: string) => {
    setActiveUnitId(unitId);
    setActiveTopicId(topicId);
    setCurrentRoute('unit-reader');
  };

  // Render current active screen
  const renderCurrentView = () => {
    // Full-screen distraction-free step learning mode (freeCodeCamp style)
    if (currentRoute === 'step-learn' || currentRoute === 'fcc-steps') {
      return (
        <FccStepWorkspace
          onNavigateBack={() => handleNavigate('dashboard')}
        />
      );
    }

    // 1. Interactive Topic Reader for specific Unit
    if (currentRoute === 'unit-reader' && activeUnitId) {
      const unit = db.getUnit(activeUnitId);
      if (unit) {
        return (
          <TopicReader
            unit={unit}
            initialTopicId={activeTopicId}
            onNavigateBack={() => handleNavigate(`course-${unit.courseId}`)}
          />
        );
      }
    }

    // 2. Admin Views (Protected)
    if (isAdmin) {
      switch (currentRoute) {
        case 'admin-overview':
          return <AdminOverview onNavigate={handleNavigate} />;
        case 'admin-students':
          return <StudentsManagement />;
        case 'admin-courses':
          return <CourseManagement />;
        case 'admin-stages':
          return <StageManagement />;
        case 'admin-practicals':
          return <PracticalManagement />;
        case 'admin-quizzes':
          return <QuizManagement />;
        case 'admin-announcements':
          return <AnnouncementsManagement />;
        case 'admin-analytics':
          return <AnalyticsReports />;
      }
    }

    // 3. Student & Shared Views
    switch (currentRoute) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'c-game':
      case 'game-c':
        return (
          <CGameView
            onNavigateToCourse={() => handleNavigate('course-c')}
            onNavigateToUnit={(unitId) => handleOpenUnit(unitId)}
          />
        );
      case 'cpp-game':
      case 'game-cpp':
        return (
          <CppGameView
            onNavigateToCourse={() => handleNavigate('course-cpp')}
            onNavigateToUnit={(unitId) => handleOpenUnit(unitId)}
          />
        );
      case 'courses':
      case 'course-c':
        return (
          <CourseView
            courseId="c"
            onNavigate={handleNavigate}
            onOpenUnit={handleOpenUnit}
          />
        );
      case 'course-cpp':
        return (
          <CourseView
            courseId="cpp"
            onNavigate={handleNavigate}
            onOpenUnit={handleOpenUnit}
          />
        );
      case 'practical-lab':
        return (
          <PracticalLab
            initialCourseId={practicalLabCourse}
            onNavigate={handleNavigate}
          />
        );
      case 'progress':
        return <Progress />;
      case 'bookmarks':
        return <Bookmarks onNavigate={handleNavigate} />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-ivory-200 dark:bg-navy-950 flex transition-colors">
      
      {/* Permanent / Drawer Sidebar */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        isOpenMobile={isMobileNavOpen}
        onCloseMobile={() => setIsMobileNavOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Header Bar */}
        <Header
          onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
          onNavigate={handleNavigate}
        />

        {/* Scrollable Page Body */}
        <main className="flex-1 pb-16">
          {renderCurrentView()}
        </main>
      </div>

    </div>
  );
};

export default function App() {
  return <AppContent />;
}
