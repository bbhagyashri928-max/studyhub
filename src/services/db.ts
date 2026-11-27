import { 
  UserProfile, Course, Unit, Topic, PracticalProgram, Quiz, QuizAttempt, 
  StudentProgress, Bookmark, Announcement, ActivityLog, CourseId,
  Stage, StudentStageProgress, StageSettings 
} from '@/types';
import { cCourse, cUnits, cQuizzes, cPracticals } from '@/courses/c';
import { cppCourse, cppUnits, cppQuizzes, cppPracticals } from '@/courses/cpp';
import { otherCourse, otherUnits, otherQuizzes, otherPracticals } from '@/courses/other';
import { buildMasterStageSeed } from './stageSeedData';

// Storage keys
const STORAGE_PREFIX = 'codeverse_';
const KEYS = {
  USERS: `${STORAGE_PREFIX}users`,
  COURSES: `${STORAGE_PREFIX}courses`,
  UNITS: `${STORAGE_PREFIX}units`,
  TOPICS: `${STORAGE_PREFIX}topics`,
  PRACTICALS: `${STORAGE_PREFIX}practicals`,
  QUIZZES: `${STORAGE_PREFIX}quizzes`,
  QUIZ_ATTEMPTS: `${STORAGE_PREFIX}quiz_attempts`,
  PROGRESS: `${STORAGE_PREFIX}progress`,
  BOOKMARKS: `${STORAGE_PREFIX}bookmarks`,
  ANNOUNCEMENTS: `${STORAGE_PREFIX}announcements`,
  ACTIVITY_LOGS: `${STORAGE_PREFIX}activity_logs`,
  CURRENT_USER: `${STORAGE_PREFIX}current_user`,
  STAGES: `${STORAGE_PREFIX}stages`,
  STAGE_PROGRESS: `${STORAGE_PREFIX}stage_progress`,
  STAGE_SETTINGS: `${STORAGE_PREFIX}stage_settings`,
};

// Initial Seed Users
export const SEED_USERS: (UserProfile & { passwordHash: string })[] = [
  {
    id: 'user-student-1',
    email: 'bhagyashri.bhise@codeverse.edu',
    fullName: 'Bhagyashri Bhise',
    studentId: 'CV-2024-8841',
    role: 'STUDENT',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Aspiring systems engineer and competitive programmer learning C, C++, and CS Systems fundamentals.',
    status: 'ACTIVE',
    streakDays: 7,
    lastActiveDate: new Date().toISOString().split('T')[0],
    enrolledCourses: ['c', 'cpp', 'other'],
    createdAt: '2024-09-01T08:00:00Z',
    passwordHash: 'student123'
  },
  {
    id: 'user-student-2',
    email: 'sophia.patel@codeverse.edu',
    fullName: 'Sophia Patel',
    studentId: 'CV-2024-9122',
    role: 'STUDENT',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    bio: 'Software engineering undergraduate focusing on data structures, algorithms, and systems tooling.',
    status: 'ACTIVE',
    streakDays: 7,
    lastActiveDate: new Date().toISOString().split('T')[0],
    enrolledCourses: ['c', 'cpp', 'other'],
    createdAt: '2024-09-05T10:15:00Z',
    passwordHash: 'student123'
  },
  {
    id: 'user-admin-1',
    email: 'admin@codeverse.edu',
    fullName: 'Prof. Elena Vance',
    studentId: 'FACULTY-001',
    role: 'ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    bio: 'Senior Director of Computer Science Curriculum at CODEVERSE Academy.',
    status: 'ACTIVE',
    streakDays: 14,
    lastActiveDate: new Date().toISOString().split('T')[0],
    enrolledCourses: ['c', 'cpp', 'other'],
    createdAt: '2024-08-01T00:00:00Z',
    passwordHash: 'admin123'
  }
];

// Initial Seed Announcements
export const SEED_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Welcome to CODEVERSE Academy Fall Semester',
    content: 'All C, C++, and Systems & Essentials curriculum modules, interactive practical labs, and unit certification quizzes are now live.',
    category: 'academic',
    author: 'Prof. Elena Vance',
    targetCourse: 'all',
    isImportant: true,
    createdAt: '2024-11-20T09:00:00Z'
  },
  {
    id: 'ann-2',
    title: 'New: Systems & Academy Essentials Module Launched',
    content: 'Master tools not covered in C/C++ alone: GDB & Valgrind memory debugging, Makefiles & CMake, POSIX system calls, and Data Structures.',
    category: 'feature',
    author: 'Department of Systems Software',
    targetCourse: 'other',
    isImportant: true,
    createdAt: '2024-11-26T10:00:00Z'
  },
  {
    id: 'ann-3',
    title: 'C Practical Lab: Unit 4 Pointers & Memory Safety',
    content: 'Review the newly added line-by-line pointer dereferencing walkthroughs before tackling the Practical Lab exercises.',
    category: 'tip',
    author: 'Department of Systems Software',
    targetCourse: 'c',
    isImportant: false,
    createdAt: '2024-11-24T14:30:00Z'
  }
];

// Initial Seed Activity Logs
export const SEED_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act-1',
    userId: 'user-student-1',
    userName: 'Alex Morgan',
    action: 'Completed Topic',
    details: 'Completed C Unit 1: Introduction to C, History & Features',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'act-2',
    userId: 'user-student-1',
    userName: 'Alex Morgan',
    action: 'Passed Unit Quiz',
    details: 'Scored 100% on C Unit 1 Mastery Quiz',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: 'act-3',
    userId: 'user-student-2',
    userName: 'Sophia Patel',
    action: 'Practical Lab Run',
    details: 'Completed Systems Lab: Singly Linked List Insertion',
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString()
  }
];

// Helper to safely load or initialize storage
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item) as T;
  } catch (err) {
    console.error(`Error loading key "${key}" from localStorage:`, err);
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event('codeverse_db_change'));
  } catch (err) {
    console.error(`Error saving key "${key}" to localStorage:`, err);
  }
}

// Master DB Service
export const db = {
  // Initialization
  init: () => {
    const DB_VERSION = 'codeverse_cpp_unit5_syllabus_v6';
    if (localStorage.getItem('codeverse_curriculum_version') !== DB_VERSION) {
      saveToStorage(KEYS.UNITS, [...cUnits, ...cppUnits, ...otherUnits]);
      saveToStorage(KEYS.QUIZZES, [...cQuizzes, ...cppQuizzes, ...otherQuizzes]);
      saveToStorage(KEYS.COURSES, [cCourse, cppCourse, otherCourse]);
      saveToStorage(KEYS.STAGES, buildMasterStageSeed());
      localStorage.setItem('codeverse_curriculum_version', DB_VERSION);
    }

    // Check and seed stages
    if (!localStorage.getItem(KEYS.STAGES)) {
      saveToStorage(KEYS.STAGES, buildMasterStageSeed());
    }
    // Check and seed stage settings
    if (!localStorage.getItem(KEYS.STAGE_SETTINGS)) {
      saveToStorage(KEYS.STAGE_SETTINGS, { sequentialLockEnabled: true });
    }
    // Check and seed stage progress
    if (!localStorage.getItem(KEYS.STAGE_PROGRESS)) {
      saveToStorage(KEYS.STAGE_PROGRESS, []);
    }

    // Check and seed users
    if (!localStorage.getItem(KEYS.USERS)) {
      saveToStorage(KEYS.USERS, SEED_USERS);
    }
    // Check and seed courses
    if (!localStorage.getItem(KEYS.COURSES)) {
      saveToStorage(KEYS.COURSES, [cCourse, cppCourse, otherCourse]);
    }
    // Check and seed units
    if (!localStorage.getItem(KEYS.UNITS)) {
      saveToStorage(KEYS.UNITS, [...cUnits, ...cppUnits, ...otherUnits]);
    }
    // Check and seed practicals
    if (!localStorage.getItem(KEYS.PRACTICALS)) {
      saveToStorage(KEYS.PRACTICALS, [...cPracticals, ...cppPracticals, ...otherPracticals]);
    }
    // Check and seed quizzes
    if (!localStorage.getItem(KEYS.QUIZZES)) {
      saveToStorage(KEYS.QUIZZES, [...cQuizzes, ...cppQuizzes, ...otherQuizzes]);
    }
    // Check and seed announcements
    if (!localStorage.getItem(KEYS.ANNOUNCEMENTS)) {
      saveToStorage(KEYS.ANNOUNCEMENTS, SEED_ANNOUNCEMENTS);
    }
    // Check and seed activities
    if (!localStorage.getItem(KEYS.ACTIVITY_LOGS)) {
      saveToStorage(KEYS.ACTIVITY_LOGS, SEED_ACTIVITIES);
    }
    // Check progress
    if (!localStorage.getItem(KEYS.PROGRESS)) {
      const initialProgress: StudentProgress[] = [
        {
          userId: 'user-student-1',
          courseId: 'c',
          completedTopicIds: ['c-u1-t1', 'c-u1-t2'],
          completedUnitIds: [],
          completedPracticalIds: ['c-pr-1', 'c-pr-2'],
          lastVisitedTopicId: 'c-u1-t3',
          lastVisitedUnitId: 'c-unit-1',
          lastVisitedCourseId: 'c',
          streakDays: 4,
          lastActiveDate: new Date().toISOString().split('T')[0]
        },
        {
          userId: 'user-student-1',
          courseId: 'cpp',
          completedTopicIds: ['cpp-u1-t1'],
          completedUnitIds: [],
          completedPracticalIds: ['cpp-pr-1'],
          lastVisitedTopicId: 'cpp-u1-t2',
          lastVisitedUnitId: 'cpp-unit-1',
          lastVisitedCourseId: 'cpp',
          streakDays: 4,
          lastActiveDate: new Date().toISOString().split('T')[0]
        },
        {
          userId: 'user-student-1',
          courseId: 'other',
          completedTopicIds: ['other-u1-t1'],
          completedUnitIds: [],
          completedPracticalIds: ['other-pr-1'],
          lastVisitedTopicId: 'other-u1-t1',
          lastVisitedUnitId: 'other-unit-1',
          lastVisitedCourseId: 'other',
          streakDays: 4,
          lastActiveDate: new Date().toISOString().split('T')[0]
        }
      ];
      saveToStorage(KEYS.PROGRESS, initialProgress);
    }
    // Check bookmarks
    if (!localStorage.getItem(KEYS.BOOKMARKS)) {
      const initialBookmarks: Bookmark[] = [
        {
          id: 'bm-1',
          userId: 'user-student-1',
          type: 'topic',
          itemId: 'c-u1-t1',
          itemTitle: 'Introduction to C, History & Features',
          courseId: 'c',
          subtitle: 'Unit 1: Introduction to C Programming',
          createdAt: new Date().toISOString()
        },
        {
          id: 'bm-2',
          userId: 'user-student-1',
          type: 'practical',
          itemId: 'c-pr-8',
          itemTitle: 'Prime Number Verification',
          courseId: 'c',
          category: 'Loops',
          createdAt: new Date().toISOString()
        },
        {
          id: 'bm-3',
          userId: 'user-student-1',
          type: 'topic',
          itemId: 'other-u2-t2',
          itemTitle: 'Valgrind & Memcheck: Eliminating Memory Leaks',
          courseId: 'other',
          subtitle: 'Unit 2: Debugging & Tooling',
          createdAt: new Date().toISOString()
        }
      ];
      saveToStorage(KEYS.BOOKMARKS, initialBookmarks);
    }
  },

  // USERS
  getUsers: (): (UserProfile & { passwordHash?: string })[] => {
    return loadFromStorage(KEYS.USERS, SEED_USERS);
  },
  getUser: (id: string): UserProfile | undefined => {
    const users = db.getUsers();
    return users.find(u => u.id === id);
  },
  updateUser: (id: string, updates: Partial<UserProfile>): UserProfile | null => {
    const users = db.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...updates };
    saveToStorage(KEYS.USERS, users);
    return users[index];
  },
  toggleUserStatus: (id: string): boolean => {
    const users = db.getUsers();
    const user = users.find(u => u.id === id);
    if (!user) return false;
    user.status = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    saveToStorage(KEYS.USERS, users);
    db.logActivity('system', 'System Admin', 'User Status Updated', `Account status for ${user.fullName} changed to ${user.status}`);
    return true;
  },
  createUser: (user: UserProfile & { passwordHash: string }): void => {
    const users = db.getUsers();
    users.push(user);
    saveToStorage(KEYS.USERS, users);
  },

  // COURSES
  getCourses: (): Course[] => {
    return loadFromStorage(KEYS.COURSES, [cCourse, cppCourse, otherCourse]);
  },
  getCourse: (id: CourseId): Course | undefined => {
    const courses = db.getCourses();
    return courses.find(c => c.id === id);
  },

  // UNITS
  getUnits: (courseId?: CourseId): Unit[] => {
    const units = loadFromStorage<Unit[]>(KEYS.UNITS, [...cUnits, ...cppUnits, ...otherUnits]);
    if (courseId) return units.filter(u => u.courseId === courseId);
    return units;
  },
  getUnit: (id: string): Unit | undefined => {
    const units = db.getUnits();
    return units.find(u => u.id === id);
  },
  saveUnit: (unit: Unit): void => {
    const units = db.getUnits();
    const index = units.findIndex(u => u.id === unit.id);
    if (index >= 0) {
      units[index] = unit;
    } else {
      units.push(unit);
    }
    saveToStorage(KEYS.UNITS, units);
  },
  deleteUnit: (id: string): void => {
    const units = db.getUnits().filter(u => u.id !== id);
    saveToStorage(KEYS.UNITS, units);
  },

  // TOPICS
  getTopic: (topicId: string): { topic: Topic; unit: Unit } | null => {
    const units = db.getUnits();
    for (const unit of units) {
      const topic = unit.topics.find(t => t.id === topicId);
      if (topic) return { topic, unit };
    }
    return null;
  },
  saveTopic: (unitId: string, topic: Topic): void => {
    const units = db.getUnits();
    const unit = units.find(u => u.id === unitId);
    if (!unit) return;
    const tIndex = unit.topics.findIndex(t => t.id === topic.id);
    if (tIndex >= 0) {
      unit.topics[tIndex] = topic;
    } else {
      unit.topics.push(topic);
    }
    saveToStorage(KEYS.UNITS, units);
  },
  deleteTopic: (unitId: string, topicId: string): void => {
    const units = db.getUnits();
    const unit = units.find(u => u.id === unitId);
    if (!unit) return;
    unit.topics = unit.topics.filter(t => t.id !== topicId);
    saveToStorage(KEYS.UNITS, units);
  },

  // PRACTICALS
  getPracticals: (courseId?: CourseId, category?: string): PracticalProgram[] => {
    let practicals = loadFromStorage<PracticalProgram[]>(KEYS.PRACTICALS, [...cPracticals, ...cppPracticals, ...otherPracticals]);
    if (courseId) practicals = practicals.filter(p => p.courseId === courseId);
    if (category && category !== 'All') practicals = practicals.filter(p => p.category === category);
    return practicals;
  },
  getPractical: (id: string): PracticalProgram | undefined => {
    const practicals = db.getPracticals();
    return practicals.find(p => p.id === id);
  },
  savePractical: (practical: PracticalProgram): void => {
    const practicals = db.getPracticals();
    const index = practicals.findIndex(p => p.id === practical.id);
    if (index >= 0) {
      practicals[index] = practical;
    } else {
      practicals.push(practical);
    }
    saveToStorage(KEYS.PRACTICALS, practicals);
  },
  deletePractical: (id: string): void => {
    const practicals = db.getPracticals().filter(p => p.id !== id);
    saveToStorage(KEYS.PRACTICALS, practicals);
  },

  // QUIZZES
  getQuizzes: (courseId?: CourseId): Quiz[] => {
    const quizzes = loadFromStorage<Quiz[]>(KEYS.QUIZZES, [...cQuizzes, ...cppQuizzes, ...otherQuizzes]);
    if (courseId) return quizzes.filter(q => q.courseId === courseId);
    return quizzes;
  },
  getQuiz: (unitId: string): Quiz | undefined => {
    const quizzes = db.getQuizzes();
    return quizzes.find(q => q.unitId === unitId);
  },
  saveQuiz: (quiz: Quiz): void => {
    const quizzes = db.getQuizzes();
    const index = quizzes.findIndex(q => q.id === quiz.id);
    if (index >= 0) {
      quizzes[index] = quiz;
    } else {
      quizzes.push(quiz);
    }
    saveToStorage(KEYS.QUIZZES, quizzes);
  },

  // QUIZ ATTEMPTS
  getQuizAttempts: (userId: string): QuizAttempt[] => {
    const attempts = loadFromStorage<QuizAttempt[]>(KEYS.QUIZ_ATTEMPTS, []);
    return attempts.filter(a => a.userId === userId);
  },
  saveQuizAttempt: (attempt: QuizAttempt): void => {
    const attempts = loadFromStorage<QuizAttempt[]>(KEYS.QUIZ_ATTEMPTS, []);
    attempts.push(attempt);
    saveToStorage(KEYS.QUIZ_ATTEMPTS, attempts);
  },

  // PROGRESS
  getProgress: (userId: string, courseId: CourseId): StudentProgress => {
    const allProgress = loadFromStorage<StudentProgress[]>(KEYS.PROGRESS, []);
    let userCourseProg = allProgress.find(p => p.userId === userId && p.courseId === courseId);
    if (!userCourseProg) {
      userCourseProg = {
        userId,
        courseId,
        completedTopicIds: [],
        completedUnitIds: [],
        completedPracticalIds: [],
        streakDays: 1,
        lastActiveDate: new Date().toISOString().split('T')[0]
      };
      allProgress.push(userCourseProg);
      saveToStorage(KEYS.PROGRESS, allProgress);
    }
    return userCourseProg;
  },
  updateProgress: (progress: StudentProgress): void => {
    const allProgress = loadFromStorage<StudentProgress[]>(KEYS.PROGRESS, []);
    const index = allProgress.findIndex(p => p.userId === progress.userId && p.courseId === progress.courseId);
    if (index >= 0) {
      allProgress[index] = progress;
    } else {
      allProgress.push(progress);
    }
    saveToStorage(KEYS.PROGRESS, allProgress);
  },

  // BOOKMARKS
  getBookmarks: (userId: string): Bookmark[] => {
    const bookmarks = loadFromStorage<Bookmark[]>(KEYS.BOOKMARKS, []);
    return bookmarks.filter(b => b.userId === userId);
  },
  toggleBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>): boolean => {
    const bookmarks = loadFromStorage<Bookmark[]>(KEYS.BOOKMARKS, []);
    const existingIndex = bookmarks.findIndex(
      b => b.userId === bookmark.userId && b.itemId === bookmark.itemId && b.type === bookmark.type
    );
    if (existingIndex >= 0) {
      bookmarks.splice(existingIndex, 1);
      saveToStorage(KEYS.BOOKMARKS, bookmarks);
      return false;
    } else {
      const newBm: Bookmark = {
        ...bookmark,
        id: `bm-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        createdAt: new Date().toISOString()
      };
      bookmarks.push(newBm);
      saveToStorage(KEYS.BOOKMARKS, bookmarks);
      return true;
    }
  },
  isBookmarked: (userId: string, itemId: string): boolean => {
    const bookmarks = db.getBookmarks(userId);
    return bookmarks.some(b => b.itemId === itemId);
  },

  // ANNOUNCEMENTS
  getAnnouncements: (courseFilter?: 'all' | CourseId): Announcement[] => {
    const announcements = loadFromStorage<Announcement[]>(KEYS.ANNOUNCEMENTS, SEED_ANNOUNCEMENTS);
    if (!courseFilter || courseFilter === 'all') return announcements;
    return announcements.filter(a => a.targetCourse === 'all' || a.targetCourse === courseFilter);
  },
  saveAnnouncement: (announcement: Announcement): void => {
    const announcements = loadFromStorage<Announcement[]>(KEYS.ANNOUNCEMENTS, SEED_ANNOUNCEMENTS);
    const index = announcements.findIndex(a => a.id === announcement.id);
    if (index >= 0) {
      announcements[index] = announcement;
    } else {
      announcements.unshift(announcement);
    }
    saveToStorage(KEYS.ANNOUNCEMENTS, announcements);
  },
  deleteAnnouncement: (id: string): void => {
    let announcements = loadFromStorage<Announcement[]>(KEYS.ANNOUNCEMENTS, SEED_ANNOUNCEMENTS);
    announcements = announcements.filter(a => a.id !== id);
    saveToStorage(KEYS.ANNOUNCEMENTS, announcements);
  },

  // ACTIVITY LOGS
  getActivityLogs: (limit: number = 20): ActivityLog[] => {
    const logs = loadFromStorage<ActivityLog[]>(KEYS.ACTIVITY_LOGS, SEED_ACTIVITIES);
    return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, limit);
  },
  logActivity: (userId: string, userName: string, action: string, details: string): void => {
    const logs = loadFromStorage<ActivityLog[]>(KEYS.ACTIVITY_LOGS, SEED_ACTIVITIES);
    logs.unshift({
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      userId,
      userName,
      action,
      details,
      timestamp: new Date().toISOString()
    });
    saveToStorage(KEYS.ACTIVITY_LOGS, logs.slice(0, 100));
  },

  // OVERVIEW STATS
  getGlobalStats: () => {
    const users = db.getUsers();
    const students = users.filter(u => u.role === 'STUDENT');
    const activeStudents = students.filter(u => u.status === 'ACTIVE');
    const cUnitsCount = db.getUnits('c').length;
    const cppUnitsCount = db.getUnits('cpp').length;
    const otherUnitsCount = db.getUnits('other').length;
    const cPracticalsCount = db.getPracticals('c').length;
    const cppPracticalsCount = db.getPracticals('cpp').length;
    const otherPracticalsCount = db.getPracticals('other').length;
    const attempts = loadFromStorage<QuizAttempt[]>(KEYS.QUIZ_ATTEMPTS, []);
    const progressList = loadFromStorage<StudentProgress[]>(KEYS.PROGRESS, []);

    let totalPracticalCompletions = 0;
    progressList.forEach(p => {
      totalPracticalCompletions += p.completedPracticalIds.length;
    });

    return {
      totalStudents: students.length,
      activeStudents: activeStudents.length,
      cEnrollments: students.filter(s => s.enrolledCourses.includes('c')).length,
      cppEnrollments: students.filter(s => s.enrolledCourses.includes('cpp')).length,
      otherEnrollments: students.filter(s => s.enrolledCourses.includes('other')).length,
      totalUnits: cUnitsCount + cppUnitsCount + otherUnitsCount,
      totalPracticals: cPracticalsCount + cppPracticalsCount + otherPracticalsCount,
      totalPracticalCompletions,
      totalQuizAttempts: attempts.length,
      recentUsers: students.slice(-5).reverse(),
      recentActivities: db.getActivityLogs(8)
    };
  },

  // ================= STAGE LEARNING SYSTEM =================
  getStages: (topicId?: string): Stage[] => {
    const allStages = loadFromStorage<Stage[]>(KEYS.STAGES, []);
    if (!topicId) return allStages;
    return allStages
      .filter(s => s.topicId === topicId)
      .sort((a, b) => a.stageNumber - b.stageNumber);
  },

  getStage: (stageId: string): Stage | undefined => {
    const allStages = loadFromStorage<Stage[]>(KEYS.STAGES, []);
    return allStages.find(s => s.id === stageId);
  },

  saveStage: (stage: Stage): void => {
    const allStages = loadFromStorage<Stage[]>(KEYS.STAGES, []);
    const idx = allStages.findIndex(s => s.id === stage.id);
    if (idx >= 0) {
      allStages[idx] = { ...stage, updatedAt: new Date().toISOString() };
    } else {
      allStages.push({
        ...stage,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    saveToStorage(KEYS.STAGES, allStages);
  },

  deleteStage: (stageId: string): void => {
    const allStages = loadFromStorage<Stage[]>(KEYS.STAGES, []);
    const filtered = allStages.filter(s => s.id !== stageId);
    saveToStorage(KEYS.STAGES, filtered);
  },

  reorderStages: (topicId: string, orderedStageIds: string[]): void => {
    const allStages = loadFromStorage<Stage[]>(KEYS.STAGES, []);
    orderedStageIds.forEach((id, idx) => {
      const stage = allStages.find(s => s.id === id);
      if (stage) {
        stage.stageNumber = idx + 1;
        stage.updatedAt = new Date().toISOString();
      }
    });
    saveToStorage(KEYS.STAGES, allStages);
  },

  getStageSettings: (): StageSettings => {
    return loadFromStorage<StageSettings>(KEYS.STAGE_SETTINGS, { sequentialLockEnabled: true });
  },

  updateStageSettings: (settings: Partial<StageSettings>): void => {
    const current = db.getStageSettings();
    saveToStorage(KEYS.STAGE_SETTINGS, { ...current, ...settings });
  },

  getStudentStageProgress: (userId: string, courseId: CourseId): StudentStageProgress => {
    const allProgress = loadFromStorage<StudentStageProgress[]>(KEYS.STAGE_PROGRESS, []);
    let userProgress = allProgress.find(p => p.userId === userId && p.courseId === courseId);
    if (!userProgress) {
      userProgress = {
        userId,
        courseId,
        completedStageIds: [],
        updatedAt: new Date().toISOString()
      };
    }
    return userProgress;
  },

  markStageCompleted: (userId: string, courseId: CourseId, stageId: string): { success: boolean; progress: StudentStageProgress } => {
    const allProgress = loadFromStorage<StudentStageProgress[]>(KEYS.STAGE_PROGRESS, []);
    let userProgress = allProgress.find(p => p.userId === userId && p.courseId === courseId);
    if (!userProgress) {
      userProgress = {
        userId,
        courseId,
        completedStageIds: [stageId],
        lastVisitedStageId: stageId,
        updatedAt: new Date().toISOString()
      };
      allProgress.push(userProgress);
    } else {
      if (!userProgress.completedStageIds.includes(stageId)) {
        userProgress.completedStageIds.push(stageId);
      }
      userProgress.lastVisitedStageId = stageId;
      userProgress.updatedAt = new Date().toISOString();
    }
    saveToStorage(KEYS.STAGE_PROGRESS, allProgress);
    return { success: true, progress: userProgress };
  },

  isStageUnlocked: (userId: string, courseId: CourseId, stage: Stage, allTopicStages: Stage[]): boolean => {
    const settings = db.getStageSettings();
    if (!settings.sequentialLockEnabled) return true; // sequential lock disabled by admin

    // Stage 1 is always unlocked
    if (stage.stageNumber === 1) return true;

    // Check if the immediately preceding stage is completed
    const sorted = [...allTopicStages].sort((a, b) => a.stageNumber - b.stageNumber);
    const stageIdx = sorted.findIndex(s => s.id === stage.id);
    if (stageIdx <= 0) return true;

    const prevStage = sorted[stageIdx - 1];
    const progress = db.getStudentStageProgress(userId, courseId);
    return progress.completedStageIds.includes(prevStage.id);
  },

  getTopicStageStats: (topicId: string, userId: string, courseId: CourseId): { total: number; completed: number; percent: number } => {
    const stages = db.getStages(topicId).filter(s => s.published);
    if (stages.length === 0) return { total: 0, completed: 0, percent: 0 };
    const progress = db.getStudentStageProgress(userId, courseId);
    const completed = stages.filter(s => progress.completedStageIds.includes(s.id)).length;
    const percent = Math.round((completed / stages.length) * 100);
    return { total: stages.length, completed, percent };
  }
};

// Initialize database schema on load
db.init();
