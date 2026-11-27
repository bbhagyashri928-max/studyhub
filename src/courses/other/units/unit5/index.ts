import { Unit, Quiz } from '@/types';

export const otherUnit5: Unit = {
  id: 'other-unit-5',
  courseId: 'other',
  unitNumber: 5,
  title: 'Software Engineering, Git & Clean Architecture',
  description: 'Master production software engineering: Git branching models, merge conflicts, unit testing frameworks, clean architecture principles, and secure systems coding.',
  estimatedHours: 5.5,
  quizId: 'quiz-other-5',
  published: true,
  topics: [
    {
      id: 'other-u5-t1',
      unitId: 'other-unit-5',
      courseId: 'other',
      order: 1,
      title: 'Professional Git Workflows & Version Control',
      summary: 'Master branch management, staging index, interactive rebasing, merge conflicts, and commit hygiene.',
      content: {
        definition: 'Git is a distributed version control system tracking changes in source code during software development. Professional engineering teams utilize branching workflows (feature branches, pull requests) to develop and review code collaboratively without destabilizing main branches.',
        syntax: 'git checkout -b feature/kernel-driver\ngit add -A\ngit commit -m "feat(driver): implement zero-copy ring buffer"\ngit push origin feature/kernel-driver\ngit rebase -i HEAD~3 # Interactive rebase to squash commits',
        codeSnippet: `# Demonstration of essential Git CLI workflow
# 1. Check working directory status
git status

# 2. Stage modified files to the index
git add src/courses/other/index.ts

# 3. Create semantic commit
git commit -m "feat(courses): integrate third Other systems curriculum module"

# 4. View commit ancestry graph
git log --oneline --graph --decorate -n 5`,
        lineByLineExplanation: [
          { line: 'git checkout -b feature/branch-name', explanation: 'Creates and immediately switches to a new isolated feature branch.' },
          { line: 'git commit -m "feat: ..."', explanation: 'Records a permanent snapshot of staged changes into the local Git repository history.' }
        ],
        keyConcepts: [
          'Working Tree -> Staging Area (Index) -> Repository (Commit Object)',
          'Fast-forward vs 3-way merge commits',
          'Interactive rebase (git rebase -i) tidies commit history before submitting for code review'
        ],
        commonMistakes: [
          'Committing sensitive credentials or compiled binary binaries (.exe, .o, .so)',
          'Force-pushing (git push -f) to shared main branches, which overwrites teammates\' work'
        ],
        quickRevision: [
          'Commit often, write descriptive semantic commit messages.',
          'Always pull/rebase latest main before opening PRs.',
          'Use .gitignore to exclude build artifacts and editor caches.'
        ]
      }
    },
    {
      id: 'other-u5-t2',
      unitId: 'other-unit-5',
      courseId: 'other',
      order: 2,
      title: 'Automated Unit Testing & Test-Driven Development (TDD)',
      summary: 'Ensure regression-free code using unit testing frameworks, assertion libraries, and test fixtures.',
      content: {
        definition: 'Unit testing involves testing individual units or components of software in isolation to verify they perform as designed. In C and C++, frameworks such as Unity, Catch2, and GoogleTest provide rich assertions, test fixtures, and automated test runners.',
        syntax: '#include <assert.h>\nassert(calculateSum(2, 3) == 5); // Simple assertion\n\n// Catch2 style:\nTEST_CASE("Vector addition", "[math]") {\n    REQUIRE(vec.x == 5.0);\n}',
        codeSnippet: `#include <stdio.h>
#include <assert.h>

// Function under test
int clamp(int val, int min, int max) {
    if (val < min) return min;
    if (val > max) return max;
    return val;
}

// Automated Test Suite
void test_clamp_behavior() {
    // Normal in-range value
    assert(clamp(5, 0, 10) == 5);
    // Lower bound test
    assert(clamp(-5, 0, 10) == 0);
    // Upper bound test
    assert(clamp(15, 0, 10) == 10);
    // Edge case: equal bounds
    assert(clamp(4, 4, 4) == 4);

    printf(">> All 4 unit test assertions passed successfully!\\n");
}

int main() {
    printf("Executing automated test suite...\\n");
    test_clamp_behavior();
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'assert(...)', explanation: 'Macro from <assert.h> that tests a boolean condition; if false, aborts program with file and line diagnostics.' },
          { line: 'test_clamp_behavior()', explanation: 'Self-contained automated test fixture covering typical, boundary, and edge test cases.' }
        ],
        keyConcepts: [
          'TDD cycle: Red (write failing test) -> Green (write minimal code to pass) -> Refactor',
          'Boundary Value Analysis: test 0, negative, maximum limits, and empty inputs',
          'CI/CD automation: tests run automatically on every git push'
        ],
        commonMistakes: [
          'Writing tests that depend on execution order or global mutable state',
          'Disabling assertions in release builds with NDEBUG without verifying runtime error checks'
        ],
        quickRevision: [
          'assert() validates invariants.',
          'Test normal, boundary, and pathological edge cases.',
          'Automated tests prevent regression bugs.'
        ]
      }
    },
    {
      id: 'other-u5-t3',
      unitId: 'other-unit-5',
      courseId: 'other',
      order: 3,
      title: 'Secure Coding & Buffer Overflow Defenses',
      summary: 'Prevent common security vulnerabilities, buffer overruns, format string exploits, and integer wraps.',
      content: {
        definition: 'Secure systems programming involves writing software resilient to malicious attacks and memory corruption exploits. The CERT C Secure Coding Standard outlines rules to avoid buffer overflows, format string vulnerabilities, and integer overflows.',
        syntax: '/* Insecure: gets(buf); scanf("%s", buf); */\n/* Secure:   fgets(buf, sizeof(buf), stdin); snprintf(buf, sizeof(buf), "%s", src); */',
        codeSnippet: `#include <stdio.h>
#include <string.h>

void safeCopy(char* dest, size_t destSize, const char* src) {
    // snprintf guarantees null-termination and bounded write
    snprintf(dest, destSize, "%s", src);
}

int main() {
    char secureBuffer[16];
    const char* largeInput = "ThisIsAStringThatExceedsTheBufferCapacity";

    // Safely copies without buffer overflow!
    safeCopy(secureBuffer, sizeof(secureBuffer), largeInput);

    printf("Truncated safe buffer contents: \\"%s\\"\\n", secureBuffer);
    printf("Buffer size respected: exactly %zu bytes maximum\\n", sizeof(secureBuffer));
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'snprintf(dest, destSize, "%s", src);', explanation: 'Guarantees that at most destSize - 1 characters will be written, ensuring space for the trailing null byte.' },
          { line: 'secureBuffer[16]', explanation: 'Fixed-capacity buffer protected against overflow corruption.' }
        ],
        keyConcepts: [
          'Buffer Overflow: writing data past allocated buffer boundaries, overwriting return addresses',
          'Stack Canaries (-fstack-protector): compiler security mechanism to detect stack buffer corruption before return',
          'Never use banned C functions: gets(), strcpy(), sprintf(); use fgets(), strncpy(), snprintf()'
        ],
        commonMistakes: [
          'Passing user input directly as the first argument to printf: printf(userInput) triggers format string vulnerability',
          'Off-by-one errors in buffer bounds calculation'
        ],
        quickRevision: [
          'Always bound writes with buffer sizes (snprintf).',
          'Compile with -fstack-protector-strong and -D_FORTIFY_SOURCE=2.',
          'Validate all external inputs.'
        ]
      }
    }
  ]
};

export const otherUnit5Quiz: Quiz = {
  id: 'quiz-other-5',
  unitId: 'other-unit-5',
  courseId: 'other',
  unitTitle: 'Unit 5: Software Engineering, Git & Clean Architecture',
  title: 'Unit 5 Mastery Quiz',
  passingScorePercent: 60,
  questions: [
    {
      id: 'q-o5-1',
      question: 'Which C standard library function was officially removed from modern C standards due to inherent buffer overflow vulnerabilities?',
      options: ['printf()', 'gets()', 'malloc()', 'strlen()'],
      correctIndex: 1,
      explanation: 'gets() has no parameter to specify buffer capacity, making buffer overflow unavoidable when input exceeds array size. It was removed from C11 onwards.'
    },
    {
      id: 'q-o5-2',
      question: 'What is the primary benefit of interactive git rebasing (git rebase -i)?',
      options: [
        'It converts C++ code into assembly',
        'It allows squashing, editing, and cleaning up local commits into a clean logical history before merging',
        'It automatically resolves all unit tests',
        'It compiles the binary'
      ],
      correctIndex: 1,
      explanation: 'Interactive rebasing allows developers to squash fixup commits and reword commit messages, providing a clean repository history for code review.'
    },
    {
      id: 'q-o5-3',
      question: 'Why is snprintf() preferred over standard sprintf() for formatting strings into buffers?',
      options: [
        'Because snprintf takes a maximum buffer size parameter to prevent buffer overruns',
        'Because snprintf is faster',
        'Because sprintf only works on integers',
        'Because snprintf allocates heap memory automatically'
      ],
      correctIndex: 0,
      explanation: 'snprintf() requires passing the destination buffer size, guaranteeing that output will never exceed bounds or trigger a buffer overflow.'
    }
  ]
};
