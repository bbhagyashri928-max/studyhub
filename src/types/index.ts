export type UserRole = 'STUDENT' | 'ADMIN';
export type CourseId = 'c' | 'cpp' | 'other';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  studentId?: string;
  role: UserRole;
  avatarUrl?: string;
  bio?: string;
  status: 'ACTIVE' | 'INACTIVE';
  streakDays: number;
  lastActiveDate: string;
  enrolledCourses: CourseId[];
  createdAt: string;
}

export interface Course {
  id: CourseId;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  icon: string;
  accentColor: string;
  totalUnits: number;
  totalPracticals: number;
}

export interface TopicLineExplanation {
  line: string;
  explanation: string;
}

export interface TopicContent {
  definition: string;
  syntax?: string;
  codeSnippet?: string;
  lineByLineExplanation?: TopicLineExplanation[];
  keyConcepts: string[];
  commonMistakes?: string[];
  quickRevision: string[];
  practicalLink?: string;
}

export interface Topic {
  id: string;
  unitId: string;
  courseId: CourseId;
  order: number;
  title: string;
  summary: string;
  content: TopicContent;
}

export interface Unit {
  id: string;
  courseId: CourseId;
  unitNumber: number;
  title: string;
  description: string;
  estimatedHours: number;
  topics: Topic[];
  quizId: string;
  published: boolean;
}

export interface PracticalProgram {
  id: string;
  courseId: CourseId;
  category: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  problemStatement: string;
  sourceCode: string;
  explanation: string[];
  sampleInput: string;
  expectedOutput: string;
  keyConcepts: string[];
  published: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  unitId: string;
  courseId: CourseId;
  unitTitle: string;
  title: string;
  passingScorePercent: number;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  unitId: string;
  courseId: CourseId;
  score: number;
  totalQuestions: number;
  passed: boolean;
  completedAt: string;
}

export interface StudentProgress {
  userId: string;
  courseId: CourseId;
  completedTopicIds: string[];
  completedUnitIds: string[];
  completedPracticalIds: string[];
  lastVisitedTopicId?: string;
  lastVisitedUnitId?: string;
  lastVisitedCourseId?: CourseId;
  streakDays: number;
  lastActiveDate: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  type: 'topic' | 'practical';
  itemId: string;
  itemTitle: string;
  courseId: CourseId;
  subtitle?: string;
  category?: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'academic' | 'feature' | 'urgent' | 'tip';
  author: string;
  targetCourse: 'all' | 'c' | 'cpp' | 'other';
  createdAt: string;
  isImportant?: boolean;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface ExecutionResult {
  stdout: string;
  stderr?: string;
  executionTimeMs?: number;
  exitCode: number;
}
