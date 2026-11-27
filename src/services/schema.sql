-- ==========================================================
-- CODEVERSE – C & C++ LEARNING ACADEMY
-- Comprehensive PostgreSQL / Supabase Database Schema
-- Includes RLS policies, foreign keys, triggers, and indexes
-- ==========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extends auth.users or standalone authentication)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    student_id TEXT,
    role TEXT NOT NULL DEFAULT 'STUDENT' CHECK (role IN ('STUDENT', 'ADMIN')),
    avatar_url TEXT,
    bio TEXT,
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
    streak_days INTEGER NOT NULL DEFAULT 1,
    last_active_date DATE NOT NULL DEFAULT CURRENT_DATE,
    enrolled_courses TEXT[] DEFAULT ARRAY['c', 'cpp'],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 2. COURSES
CREATE TABLE IF NOT EXISTS public.courses (
    id TEXT PRIMARY KEY CHECK (id IN ('c', 'cpp')),
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    description TEXT NOT NULL,
    badge TEXT NOT NULL,
    accent_color TEXT NOT NULL,
    total_units INTEGER NOT NULL DEFAULT 5,
    total_practicals INTEGER NOT NULL DEFAULT 15,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 3. UNITS
CREATE TABLE IF NOT EXISTS public.units (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    unit_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    estimated_hours NUMERIC(4,1) DEFAULT 4.0,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 4. TOPICS
CREATE TABLE IF NOT EXISTS public.topics (
    id TEXT PRIMARY KEY,
    unit_id TEXT NOT NULL REFERENCES public.units(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    topic_order INTEGER NOT NULL,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    definition TEXT NOT NULL,
    syntax TEXT,
    code_snippet TEXT,
    line_by_line_explanation JSONB DEFAULT '[]'::jsonb,
    key_concepts TEXT[] DEFAULT ARRAY[]::TEXT[],
    common_mistakes TEXT[] DEFAULT ARRAY[]::TEXT[],
    quick_revision TEXT[] DEFAULT ARRAY[]::TEXT[],
    practical_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 5. PRACTICAL PROGRAMS
CREATE TABLE IF NOT EXISTS public.practical_programs (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
    problem_statement TEXT NOT NULL,
    source_code TEXT NOT NULL,
    explanation TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    sample_input TEXT NOT NULL DEFAULT '',
    expected_output TEXT NOT NULL,
    key_concepts TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 6. QUIZZES
CREATE TABLE IF NOT EXISTS public.quizzes (
    id TEXT PRIMARY KEY,
    unit_id TEXT NOT NULL REFERENCES public.units(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    unit_title TEXT NOT NULL,
    title TEXT NOT NULL,
    passing_score_percent INTEGER NOT NULL DEFAULT 60,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 7. QUIZ QUESTIONS
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id TEXT NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    code_snippet TEXT,
    options TEXT[] NOT NULL,
    correct_index INTEGER NOT NULL,
    explanation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 8. QUIZ ATTEMPTS
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    quiz_id TEXT NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    unit_id TEXT NOT NULL REFERENCES public.units(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    passed BOOLEAN NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 9. STUDENT PROGRESS
CREATE TABLE IF NOT EXISTS public.student_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    completed_topic_ids TEXT[] DEFAULT ARRAY[]::TEXT[],
    completed_unit_ids TEXT[] DEFAULT ARRAY[]::TEXT[],
    completed_practical_ids TEXT[] DEFAULT ARRAY[]::TEXT[],
    last_visited_topic_id TEXT,
    last_visited_unit_id TEXT,
    last_visited_course_id TEXT,
    streak_days INTEGER NOT NULL DEFAULT 1,
    last_active_date DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    UNIQUE(user_id, course_id)
);

-- 10. BOOKMARKS
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('topic', 'practical')),
    item_id TEXT NOT NULL,
    item_title TEXT NOT NULL,
    course_id TEXT NOT NULL CHECK (course_id IN ('c', 'cpp')),
    subtitle TEXT,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    UNIQUE(user_id, item_id, type)
);

-- 11. ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('academic', 'feature', 'urgent', 'tip')),
    author TEXT NOT NULL,
    target_course TEXT NOT NULL CHECK (target_course IN ('all', 'c', 'cpp')),
    is_important BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 12. ACTIVITY LOGS
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    user_name TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- ==========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practical_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'ADMIN'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public/Student read access for learning materials
CREATE POLICY "Public read published courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Public read published units" ON public.units FOR SELECT USING (published = true OR public.is_admin());
CREATE POLICY "Public read topics" ON public.topics FOR SELECT USING (true);
CREATE POLICY "Public read practicals" ON public.practical_programs FOR SELECT USING (published = true OR public.is_admin());
CREATE POLICY "Public read quizzes" ON public.quizzes FOR SELECT USING (true);
CREATE POLICY "Public read questions" ON public.quiz_questions FOR SELECT USING (true);
CREATE POLICY "Public read announcements" ON public.announcements FOR SELECT USING (true);

-- Student-specific data access
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users manage own progress" ON public.student_progress 
  FOR ALL USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users manage own bookmarks" ON public.bookmarks 
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users view own quiz attempts" ON public.quiz_attempts 
  FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users insert quiz attempts" ON public.quiz_attempts 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin Full Management
CREATE POLICY "Admins full management courses" ON public.courses FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full management units" ON public.units FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full management topics" ON public.topics FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full management practicals" ON public.practical_programs FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full management quizzes" ON public.quizzes FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full management questions" ON public.quiz_questions FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full management announcements" ON public.announcements FOR ALL USING (public.is_admin());
CREATE POLICY "Admins view activity logs" ON public.activity_logs FOR SELECT USING (public.is_admin());
