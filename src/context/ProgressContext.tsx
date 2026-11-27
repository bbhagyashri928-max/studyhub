import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { StudentProgress, Bookmark, QuizAttempt, CourseId } from '@/types';
import { db } from '@/services/db';
import { useAuth } from './AuthContext';

interface GlobalSearchResult {
  id: string;
  type: 'topic' | 'practical' | 'unit';
  title: string;
  courseId: CourseId;
  subtitle: string;
  link: string;
}

interface ProgressContextType {
  cProgress: StudentProgress;
  cppProgress: StudentProgress;
  bookmarks: Bookmark[];
  quizAttempts: QuizAttempt[];
  toggleTopicCompletion: (courseId: CourseId, topicId: string, unitId: string) => void;
  togglePracticalCompletion: (courseId: CourseId, practicalId: string) => void;
  recordLastVisited: (courseId: CourseId, unitId: string, topicId: string) => void;
  toggleBookmark: (item: { type: 'topic' | 'practical'; itemId: string; itemTitle: string; courseId: CourseId; subtitle?: string; category?: string }) => boolean;
  isBookmarked: (itemId: string) => boolean;
  submitQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'userId' | 'completedAt'>) => void;
  getCProgressPercentage: () => number;
  getCppProgressPercentage: () => number;
  getOverallProgressPercentage: () => number;
  searchAll: (query: string) => GlobalSearchResult[];
  refreshData: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.id || 'guest';

  const [cProgress, setCProgress] = useState<StudentProgress>(() => db.getProgress(userId, 'c'));
  const [cppProgress, setCppProgress] = useState<StudentProgress>(() => db.getProgress(userId, 'cpp'));
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => db.getBookmarks(userId));
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => db.getQuizAttempts(userId));

  const refreshData = useCallback(() => {
    if (!currentUser) return;
    setCProgress(db.getProgress(currentUser.id, 'c'));
    setCppProgress(db.getProgress(currentUser.id, 'cpp'));
    setBookmarks(db.getBookmarks(currentUser.id));
    setQuizAttempts(db.getQuizAttempts(currentUser.id));
  }, [currentUser]);

  // Sync on user change or external DB change
  useEffect(() => {
    refreshData();
    const handleDbChange = () => refreshData();
    window.addEventListener('codeverse_db_change', handleDbChange);
    return () => window.removeEventListener('codeverse_db_change', handleDbChange);
  }, [refreshData]);

  const getProgressState = (courseId: CourseId) => {
    if (courseId === 'cpp') return cppProgress;
    return cProgress;
  };

  const setProgressState = (courseId: CourseId, prog: StudentProgress) => {
    if (courseId === 'cpp') setCppProgress(prog);
    else setCProgress(prog);
  };

  // Toggle Topic Completion
  const toggleTopicCompletion = (courseId: CourseId, topicId: string, unitId: string) => {
    if (!currentUser) return;
    const current = getProgressState(courseId);
    const isCompleted = current.completedTopicIds.includes(topicId);

    const updatedTopics = isCompleted
      ? current.completedTopicIds.filter(id => id !== topicId)
      : [...current.completedTopicIds, topicId];

    // Check if entire unit is completed
    const unit = db.getUnit(unitId);
    let updatedUnits = [...current.completedUnitIds];
    if (unit) {
      const allTopicsInUnitDone = unit.topics.every(t => updatedTopics.includes(t.id));
      if (allTopicsInUnitDone && !updatedUnits.includes(unitId)) {
        updatedUnits.push(unitId);
      } else if (!allTopicsInUnitDone) {
        updatedUnits = updatedUnits.filter(id => id !== unitId);
      }
    }

    const updatedProgress: StudentProgress = {
      ...current,
      completedTopicIds: updatedTopics,
      completedUnitIds: updatedUnits,
      lastVisitedTopicId: topicId,
      lastVisitedUnitId: unitId,
      lastVisitedCourseId: courseId,
      lastActiveDate: new Date().toISOString().split('T')[0]
    };

    db.updateProgress(updatedProgress);
    setProgressState(courseId, updatedProgress);

    db.logActivity(
      currentUser.id,
      currentUser.fullName,
      isCompleted ? 'Topic Reset' : 'Topic Completed',
      `${isCompleted ? 'Unmarked' : 'Completed'} topic ${topicId} in ${courseId.toUpperCase()} course`
    );
  };

  // Toggle Practical Completion
  const togglePracticalCompletion = (courseId: CourseId, practicalId: string) => {
    if (!currentUser) return;
    const current = getProgressState(courseId);
    const isCompleted = current.completedPracticalIds.includes(practicalId);

    const updatedPracticals = isCompleted
      ? current.completedPracticalIds.filter(id => id !== practicalId)
      : [...current.completedPracticalIds, practicalId];

    const updatedProgress: StudentProgress = {
      ...current,
      completedPracticalIds: updatedPracticals,
      lastActiveDate: new Date().toISOString().split('T')[0]
    };

    db.updateProgress(updatedProgress);
    setProgressState(courseId, updatedProgress);

    db.logActivity(
      currentUser.id,
      currentUser.fullName,
      isCompleted ? 'Practical Unmarked' : 'Practical Completed',
      `${isCompleted ? 'Unmarked' : 'Marked completed'} practical program ${practicalId} in ${courseId.toUpperCase()}`
    );
  };

  // Record Last Visited
  const recordLastVisited = (courseId: CourseId, unitId: string, topicId: string) => {
    if (!currentUser) return;
    const current = getProgressState(courseId);
    const updatedProgress: StudentProgress = {
      ...current,
      lastVisitedTopicId: topicId,
      lastVisitedUnitId: unitId,
      lastVisitedCourseId: courseId,
      lastActiveDate: new Date().toISOString().split('T')[0]
    };
    db.updateProgress(updatedProgress);
    setProgressState(courseId, updatedProgress);
  };

  // Bookmark management
  const toggleBookmark = (item: { type: 'topic' | 'practical'; itemId: string; itemTitle: string; courseId: CourseId; subtitle?: string; category?: string }): boolean => {
    if (!currentUser) return false;
    const added = db.toggleBookmark({
      userId: currentUser.id,
      ...item
    });
    setBookmarks(db.getBookmarks(currentUser.id));
    return added;
  };

  const isBookmarked = (itemId: string): boolean => {
    return bookmarks.some(b => b.itemId === itemId);
  };

  // Quiz Attempt Recording
  const submitQuizAttempt = (attempt: Omit<QuizAttempt, 'id' | 'userId' | 'completedAt'>) => {
    if (!currentUser) return;
    const fullAttempt: QuizAttempt = {
      ...attempt,
      id: `attempt-${Date.now()}`,
      userId: currentUser.id,
      completedAt: new Date().toISOString()
    };
    db.saveQuizAttempt(fullAttempt);
    setQuizAttempts(db.getQuizAttempts(currentUser.id));

    // If passed, mark unit as completed if all topics also done
    if (fullAttempt.passed) {
      const current = getProgressState(attempt.courseId);
      if (!current.completedUnitIds.includes(attempt.unitId)) {
        const updatedProgress: StudentProgress = {
          ...current,
          completedUnitIds: [...current.completedUnitIds, attempt.unitId]
        };
        db.updateProgress(updatedProgress);
        setProgressState(attempt.courseId, updatedProgress);
      }
    }

    db.logActivity(
      currentUser.id,
      currentUser.fullName,
      'Quiz Attempt',
      `Scored ${fullAttempt.score}/${fullAttempt.totalQuestions} (${fullAttempt.passed ? 'PASSED' : 'RETRY'}) on ${attempt.unitId}`
    );
  };

  // Progress Percentages
  const getCProgressPercentage = (): number => {
    const cUnits = db.getUnits('c');
    let totalTopics = 0;
    cUnits.forEach(u => (totalTopics += u.topics.length));
    const totalPracticals = db.getPracticals('c').length;
    const totalItems = totalTopics + totalPracticals;
    if (totalItems === 0) return 0;

    const completed = cProgress.completedTopicIds.length + cProgress.completedPracticalIds.length;
    return Math.min(100, Math.round((completed / totalItems) * 100));
  };

  const getCppProgressPercentage = (): number => {
    const cppUnits = db.getUnits('cpp');
    let totalTopics = 0;
    cppUnits.forEach(u => (totalTopics += u.topics.length));
    const totalPracticals = db.getPracticals('cpp').length;
    const totalItems = totalTopics + totalPracticals;
    if (totalItems === 0) return 0;

    const completed = cppProgress.completedTopicIds.length + cppProgress.completedPracticalIds.length;
    return Math.min(100, Math.round((completed / totalItems) * 100));
  };

  const getOverallProgressPercentage = (): number => {
    return Math.round((getCProgressPercentage() + getCppProgressPercentage()) / 2);
  };

  // Global search across topics, units, and practicals
  const searchAll = (query: string): GlobalSearchResult[] => {
    if (!query || query.trim().length < 2) return [];
    const q = query.toLowerCase().trim();
    const results: GlobalSearchResult[] = [];

    // Search Units & Topics
    const allUnits = db.getUnits();
    for (const unit of allUnits) {
      if (unit.title.toLowerCase().includes(q) || unit.description.toLowerCase().includes(q)) {
        results.push({
          id: unit.id,
          type: 'unit',
          title: unit.title,
          courseId: unit.courseId,
          subtitle: `${unit.courseId.toUpperCase()} Course - Unit ${unit.unitNumber}`,
          link: `/courses/${unit.courseId}/unit/${unit.id}`
        });
      }

      for (const topic of unit.topics) {
        if (
          topic.title.toLowerCase().includes(q) ||
          topic.summary.toLowerCase().includes(q) ||
          topic.content.definition.toLowerCase().includes(q)
        ) {
          results.push({
            id: topic.id,
            type: 'topic',
            title: topic.title,
            courseId: topic.courseId,
            subtitle: `${unit.title} > Topic ${topic.order}`,
            link: `/courses/${topic.courseId}/unit/${unit.id}?topic=${topic.id}`
          });
        }
      }
    }

    // Search Practicals
    const allPracticals = db.getPracticals();
    for (const pr of allPracticals) {
      if (
        pr.title.toLowerCase().includes(q) ||
        pr.category.toLowerCase().includes(q) ||
        pr.problemStatement.toLowerCase().includes(q) ||
        pr.keyConcepts.some(k => k.toLowerCase().includes(q))
      ) {
        results.push({
          id: pr.id,
          type: 'practical',
          title: pr.title,
          courseId: pr.courseId,
          subtitle: `${pr.courseId.toUpperCase()} Lab - ${pr.category} (${pr.difficulty})`,
          link: `/courses/${pr.courseId}/practical?program=${pr.id}`
        });
      }
    }

    return results.slice(0, 8);
  };

  return (
    <ProgressContext.Provider
      value={{
        cProgress,
        cppProgress,
        bookmarks,
        quizAttempts,
        toggleTopicCompletion,
        togglePracticalCompletion,
        recordLastVisited,
        toggleBookmark,
        isBookmarked,
        submitQuizAttempt,
        getCProgressPercentage,
        getCppProgressPercentage,
        getOverallProgressPercentage,
        searchAll,
        refreshData
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within a ProgressProvider');
  return context;
};
