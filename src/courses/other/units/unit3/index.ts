import { Unit, Quiz } from '@/types';

export const otherUnit3: Unit = {
  id: 'other-unit-3',
  courseId: 'other',
  unitNumber: 3,
  title: 'Build Systems, Toolchains & Linking',
  description: 'Understand multi-file compilation, automated Makefiles, modern CMake configurations, linkers, static archives (.a/.lib) vs dynamic shared libraries (.so/.dll).',
  estimatedHours: 5.5,
  quizId: 'quiz-other-3',
  published: true,
  topics: [
    {
      id: 'other-u3-t1',
      unitId: 'other-unit-3',
      courseId: 'other',
      order: 1,
      title: 'Automated Build Engineering with GNU Make & Makefiles',
      summary: 'Avoid redundant compilation by automating target dependency graphs, variables, and incremental builds with Make.',
      content: {
        definition: 'GNU Make is a build automation tool that automatically determines which pieces of a large multi-file software system need to be recompiled based on file timestamp modifications.',
        syntax: '# Typical Makefile structure\nCC = gcc\nCFLAGS = -Wall -Wextra -O2 -Iinclude\n\ntarget: dependency1.o dependency2.o\n\t$(CC) $(CFLAGS) -o $@ $^\n\n%.o: %.c\n\t$(CC) $(CFLAGS) -c $< -o $@\n\nclean:\n\trm -f *.o target',
        codeSnippet: `# Sample Automated Makefile
CC = gcc
CFLAGS = -Wall -Wextra -O2
TARGET = codeverse_engine
OBJS = main.o math_utils.o

# Default target
all: $(TARGET)

$(TARGET): $(OBJS)
	$(CC) $(OBJS) -o $(TARGET)
	@echo "Build successful: $(TARGET) generated."

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJS) $(TARGET)
	@echo "Workspace cleaned."`,
        lineByLineExplanation: [
          { line: 'CC = gcc', explanation: 'Defines the C compiler variable to facilitate easily switching to clang or cross-compilers.' },
          { line: '$(TARGET): $(OBJS)', explanation: 'Rule definition: target depends on object files. Make only recompiles modified source files.' },
          { line: '$@ and $^', explanation: 'Automatic variables: $@ evaluates to the target name, and $^ evaluates to all prerequisite dependencies.' }
        ],
        keyConcepts: [
          'Incremental compilation: only changed .c files are compiled to .o, drastically cutting build times',
          'Make rules require real TAB characters for indentation (not spaces)',
          '.PHONY targets (e.g. clean, all) do not represent physical files on disk'
        ],
        commonMistakes: [
          'Using spaces instead of tab characters at the beginning of recipe command lines',
          'Omitting header files from dependencies, causing make to skip recompilation when a header changes'
        ],
        quickRevision: [
          'Makefile = Target: Dependencies -> Recipe.',
          'Tab indentation is mandatory.',
          'Make rebuilds only what has changed based on file timestamps.'
        ]
      }
    },
    {
      id: 'other-u3-t2',
      unitId: 'other-unit-3',
      courseId: 'other',
      order: 2,
      title: 'Modern CMake: Multi-Platform Project Generation',
      summary: 'Cross-platform meta-build system generation with CMakeLists.txt, targets, and exported libraries.',
      content: {
        definition: 'CMake is an open-source, cross-platform family of tools designed to build, test, and package software. Rather than building directly, CMake generates native build scripts (Makefiles on Linux, Visual Studio solutions on Windows, Ninja files).',
        syntax: 'cmake_minimum_required(VERSION 3.20)\nproject(CodeverseApp LANGUAGES C CXX)\n\nadd_executable(my_app src/main.cpp)\ntarget_compile_features(my_app PRIVATE cxx_std_20)\ntarget_include_directories(my_app PRIVATE include)',
        codeSnippet: `# Sample CMakeLists.txt
cmake_minimum_required(VERSION 3.20)
project(CodeverseAcademy LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Define static library target
add_library(MathLib STATIC src/math.cpp)
target_include_directories(MathLib PUBLIC include)

# Define executable application target
add_executable(AcademyApp src/main.cpp)
# Link library target to application
target_link_libraries(AcademyApp PRIVATE MathLib)

message(STATUS "Configured Codeverse C++20 Academy build targets.")`,
        lineByLineExplanation: [
          { line: 'cmake_minimum_required(...)', explanation: 'Enforces minimum supported CMake version to ensure syntax compatibility.' },
          { line: 'add_library(MathLib STATIC ...)', explanation: 'Defines an independent static library compilation unit.' },
          { line: 'target_link_libraries(AcademyApp PRIVATE MathLib)', explanation: 'Modern target-based dependency linking resolving header paths and linker flags automatically.' }
        ],
        keyConcepts: [
          'Meta-build tool: writes Makefiles, Ninja build scripts, or IDE projects',
          'Modern target-based CMake: target_link_libraries, target_include_directories',
          'Out-of-source builds: keeps source trees pristine by building inside a separate build/ folder (cmake -B build)'
        ],
        commonMistakes: [
          'Using obsolete CMake 2 syntax like include_directories() instead of target_include_directories()',
          'Committing generated build/ artifacts into Git repositories'
        ],
        quickRevision: [
          'CMake generates Makefiles or Ninja scripts.',
          'Always use target-centric modern CMake (target_compile_features).',
          'Standard build flow: cmake -B build && cmake --build build.'
        ]
      }
    },
    {
      id: 'other-u3-t3',
      unitId: 'other-unit-3',
      courseId: 'other',
      order: 3,
      title: 'Static Libraries (.a) vs Dynamic Shared Libraries (.so/.dll)',
      summary: 'Explore code distribution formats, archive creation with ar, dynamic linkers, and runtime symbol loading.',
      content: {
        definition: 'Static libraries (.a on Unix, .lib on Windows) are archives of compiled object files bundled into the final executable at link time. Dynamic shared libraries (.so on Linux, .dll on Windows) are loaded into memory at program launch by the OS dynamic linker (ld.so), allowing multiple processes to share one copy in RAM.',
        syntax: '# Creating static library\nar rcs libmath.a math.o\ngcc main.o -L. -lmath -o app\n\n# Creating dynamic shared library\ngcc -shared -fPIC math.o -o libmath.so\ngcc main.o -L. -lmath -Wl,-rpath,. -o app',
        codeSnippet: `// Shared Library Header Example (math_export.h)
#ifndef MATH_EXPORT_H
#define MATH_EXPORT_H

#ifdef __cplusplus
extern "C" {
#endif

// Export function symbol for cross-language compatibility
int calculateFastFactorial(int n);

#ifdef __cplusplus
}
#endif

#endif // MATH_EXPORT_H`,
        lineByLineExplanation: [
          { line: 'extern "C"', explanation: 'Suppresses C++ name mangling, allowing C and other languages (Python/Rust) to call the compiled shared library functions.' },
          { line: '-fPIC (Position Independent Code)', explanation: 'Generates machine instructions with relative memory addressing so shared libraries can be loaded at any arbitrary address in virtual memory.' }
        ],
        keyConcepts: [
          'Static: Self-contained binary, larger executable size, no runtime dependencies',
          'Dynamic: Smaller binary size, shared memory caching, allows upgrading library without recompiling application',
          '-fPIC is required when compiling object files destined for shared libraries'
        ],
        commonMistakes: [
          'Forgetting -fPIC when compiling shared libraries on 64-bit Linux',
          'Runtime error "cannot open shared object file" when LD_LIBRARY_PATH does not include the library directory'
        ],
        quickRevision: [
          'Static (.a): Linked at build time into executable.',
          'Dynamic (.so/.dll): Loaded at runtime by the OS dynamic linker.',
          'extern "C" enables C linkage and FFI interop.'
        ]
      }
    }
  ]
};

export const otherUnit3Quiz: Quiz = {
  id: 'quiz-other-3',
  unitId: 'other-unit-3',
  courseId: 'other',
  unitTitle: 'Unit 3: Build Systems, Toolchains & Linking',
  title: 'Unit 3 Mastery Quiz',
  passingScorePercent: 60,
  questions: [
    {
      id: 'q-o3-1',
      question: 'What character MUST be used to indent command recipe lines inside a GNU Makefile?',
      options: ['2 spaces', '4 spaces', 'A real TAB character', 'A semicolon'],
      correctIndex: 2,
      explanation: 'GNU Make requires recipe command lines to begin with an actual tab character. Using spaces causes a "missing separator" syntax error.'
    },
    {
      id: 'q-o3-2',
      question: 'What is the primary role of CMake in software engineering?',
      options: [
        'It is a compiler that replaces GCC and Clang',
        'It is a meta-build system that generates native build scripts like Makefiles or Visual Studio projects',
        'It executes C code directly in the browser',
        'It is a garbage collector'
      ],
      correctIndex: 1,
      explanation: 'CMake does not compile code directly; it generates native build files (Makefiles, Ninja, VS Solutions) based on high-level CMakeLists.txt specifications.'
    },
    {
      id: 'q-o3-3',
      question: 'Why must code compiled for dynamic shared libraries (.so) be compiled with the -fPIC flag?',
      options: [
        'To enable multi-threading',
        'To generate Position Independent Code so the library can load at any virtual memory address',
        'To strip all debugging symbols',
        'To convert C to C++'
      ],
      correctIndex: 1,
      explanation: '-fPIC generates Position Independent Code, which uses relative memory offsets so shared libraries can be loaded at differing addresses across different processes.'
    }
  ]
};
