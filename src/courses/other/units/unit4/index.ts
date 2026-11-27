import { Unit, Quiz } from '@/types';

export const otherUnit4: Unit = {
  id: 'other-unit-4',
  courseId: 'other',
  unitNumber: 4,
  title: 'POSIX Systems Programming & Multithreading',
  description: 'Understand low-level operating system interfaces: process creation with fork() and exec(), inter-process pipes, signal handling, and POSIX threads (pthread) concurrency.',
  estimatedHours: 6.0,
  quizId: 'quiz-other-4',
  published: true,
  topics: [
    {
      id: 'other-u4-t1',
      unitId: 'other-unit-4',
      courseId: 'other',
      order: 1,
      title: 'Process Lifecycle: fork(), exec() & waitpid()',
      summary: 'Spawn child processes, replace address spaces with exec, and synchronize process termination.',
      content: {
        definition: 'In POSIX systems (Linux/macOS), fork() creates a new child process by duplicating the calling process\'s virtual memory address space. execvp() replaces the current process image with a new executable program, and waitpid() allows the parent process to wait for child termination and retrieve its exit status code.',
        syntax: 'pid_t pid = fork();\nif (pid == 0) {\n    // Child process code\n    execlp("ls", "ls", "-l", NULL);\n} else if (pid > 0) {\n    // Parent process code\n    waitpid(pid, &status, 0);\n}',
        codeSnippet: `#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main() {
    printf("Parent process started (PID: %d)\\n", getpid());
    pid_t pid = fork();

    if (pid < 0) {
        perror("Fork failed");
        return 1;
    } else if (pid == 0) {
        // Executed solely by the child process
        printf(">> Child process running (PID: %d, Parent: %d)\\n", getpid(), getppid());
        _exit(42); // Child exits with return code 42
    } else {
        // Executed solely by the parent process
        int status;
        waitpid(pid, &status, 0); // Wait for child to exit
        if (WIFEXITED(status)) {
            printf("Parent reaped child %d with exit status: %d\\n", pid, WEXITSTATUS(status));
        }
    }
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'pid_t pid = fork();', explanation: 'fork() returns once in the parent (returning child PID) and once in the child (returning 0).' },
          { line: 'waitpid(pid, &status, 0);', explanation: 'Reaps the child process upon exit, preventing the creation of a zombie process.' },
          { line: 'WEXITSTATUS(status)', explanation: 'Macro extracting the 8-bit exit code returned by the child process.' }
        ],
        keyConcepts: [
          'fork() returns 0 to the child and child\'s PID to the parent',
          'Copy-on-Write (CoW): memory pages are shared between parent and child until one attempts a write',
          'Zombie process: a terminated child whose parent has not yet called wait() or waitpid()'
        ],
        commonMistakes: [
          'Fork bomb: calling fork() inside an unbounded loop crashing the operating system',
          'Neglecting waitpid(), causing orphaned or zombie processes in long-running servers'
        ],
        quickRevision: [
          'fork(): duplicates process.',
          'exec(): replaces process image.',
          'waitpid(): collects exit status and reaps child.',
          'Child PID in parent > 0, in child == 0.'
        ]
      }
    },
    {
      id: 'other-u4-t2',
      unitId: 'other-unit-4',
      courseId: 'other',
      order: 2,
      title: 'Multithreading with POSIX Threads (pthreads) & Mutexes',
      summary: 'Execute concurrent threads, share address space safely, and eliminate race conditions with mutex synchronization.',
      content: {
        definition: 'Unlike processes which have isolated memory spaces, threads within the same process share the heap, global variables, and open file descriptors. POSIX Threads (pthreads) is the standard C concurrency library. Mutexes (mutual exclusions) ensure only one thread can access critical shared data at any instant.',
        syntax: '#include <pthread.h>\npthread_t thread;\npthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;\n\npthread_mutex_lock(&lock);\n// Critical Section\npthread_mutex_unlock(&lock);\n\npthread_create(&thread, NULL, workerFunc, NULL);\npthread_join(thread, NULL);',
        codeSnippet: `#include <stdio.h>
#include <pthread.h>

#define NUM_ITERATIONS 100000

int sharedCounter = 0;
pthread_mutex_t counterMutex = PTHREAD_MUTEX_INITIALIZER;

void* incrementCounter(void* arg) {
    for (int i = 0; i < NUM_ITERATIONS; i++) {
        pthread_mutex_lock(&counterMutex); // Acquire lock
        sharedCounter++;                  // Protected critical section
        pthread_mutex_unlock(&counterMutex); // Release lock
    }
    return NULL;
}

int main() {
    pthread_t t1, t2;

    pthread_create(&t1, NULL, incrementCounter, NULL);
    pthread_create(&t2, NULL, incrementCounter, NULL);

    pthread_join(t1, NULL); // Wait for thread 1
    pthread_join(t2, NULL); // Wait for thread 2

    printf("Final Synchronized Counter: %d (Expected: %d)\\n", 
           sharedCounter, 2 * NUM_ITERATIONS);
    pthread_mutex_destroy(&counterMutex);
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'pthread_mutex_lock(&counterMutex);', explanation: 'Guarantees exclusive atomicity: blocks other threads until the lock is released.' },
          { line: 'pthread_join(t1, NULL);', explanation: 'Suspends the calling main thread until thread t1 completes execution.' }
        ],
        keyConcepts: [
          'Race Condition: concurrent unsynchronized reads/writes to shared state leading to nondeterministic data corruption',
          'Deadlock: two or more threads permanently blocked waiting for locks held by each other',
          'Threads are lightweight: much lower overhead than spawning whole processes'
        ],
        commonMistakes: [
          'Forgetting to unlock a mutex when exiting via early return, causing deadlocks',
          'Passing pointers to local loop variables to pthread_create without heap allocation or copying'
        ],
        quickRevision: [
          'Threads share process memory.',
          'Always protect shared mutable state with mutexes.',
          'Link with -pthread when compiling on Linux.'
        ]
      }
    },
    {
      id: 'other-u4-t3',
      unitId: 'other-unit-4',
      courseId: 'other',
      order: 3,
      title: 'Inter-Process Communication (Pipes) & Unix Signals',
      summary: 'Transmit data streams between separate processes using pipe() and handle asynchronous OS signals.',
      content: {
        definition: 'An anonymous pipe provides a unidirectional data channel for inter-process communication (IPC) between related processes. Unix signals (such as SIGINT, SIGTERM, SIGUSR1) are asynchronous notifications dispatched by the operating system kernel to a process to notify it of events.',
        syntax: 'int pipefd[2];\npipe(pipefd); // pipefd[0] is read end, pipefd[1] is write end\nsignal(SIGINT, signalHandler);',
        codeSnippet: `#include <stdio.h>
#include <unistd.h>
#include <string.h>

int main() {
    int pipefd[2];
    char writeMsg[] = "Pipelined message from CODEVERSE IPC";
    char readBuffer[64];

    if (pipe(pipefd) == -1) {
        perror("Pipe creation failed");
        return 1;
    }

    // Write data to pipe (write end: pipefd[1])
    write(pipefd[1], writeMsg, strlen(writeMsg) + 1);
    close(pipefd[1]); // Close write end

    // Read data from pipe (read end: pipefd[0])
    read(pipefd[0], readBuffer, sizeof(readBuffer));
    close(pipefd[0]); // Close read end

    printf("Received from IPC pipe: \\"%s\\"\\n", readBuffer);
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int pipefd[2]; pipe(pipefd);', explanation: 'Creates a kernel-managed unidirectional FIFO buffer returning two file descriptors.' },
          { line: 'write(pipefd[1], ...); read(pipefd[0], ...);', explanation: 'Direct POSIX write and read system calls on the pipe ends.' }
        ],
        keyConcepts: [
          'Unidirectional: one end strictly writes (pipefd[1]), other end reads (pipefd[0])',
          'Signals allow graceful shutdown: catching SIGINT (Ctrl+C) to flush files before exiting',
          'Signal handlers must be reentrant and only call async-signal-safe functions'
        ],
        commonMistakes: [
          'Calling printf() or malloc() inside a signal handler (they are not async-signal-safe and can deadlock)',
          'Leaving unused pipe ends open in child or parent processes'
        ],
        quickRevision: [
          'pipefd[0] = Read, pipefd[1] = Write.',
          'Pipes communicate between related processes (e.g. parent/child).',
          'Handle SIGINT for clean application shutdown.'
        ]
      }
    }
  ]
};

export const otherUnit4Quiz: Quiz = {
  id: 'quiz-other-4',
  unitId: 'other-unit-4',
  courseId: 'other',
  unitTitle: 'Unit 4: POSIX Systems Programming & Multithreading',
  title: 'Unit 4 Mastery Quiz',
  passingScorePercent: 60,
  questions: [
    {
      id: 'q-o4-1',
      question: 'What does fork() return to the newly created child process upon success?',
      options: ['The parent\'s PID', '0', '1', 'A null pointer'],
      correctIndex: 1,
      explanation: 'fork() returns 0 to the newly spawned child process, and returns the child\'s PID to the parent.'
    },
    {
      id: 'q-o4-2',
      question: 'What problem occurs when multiple concurrent threads read and write to the same shared variable without synchronization?',
      options: ['Segmentation fault', 'Race condition', 'Compilation error', 'Memory leak'],
      correctIndex: 1,
      explanation: 'A race condition occurs when concurrent threads access and mutate shared data simultaneously, leading to unpredictable, corrupted values.'
    },
    {
      id: 'q-o4-3',
      question: 'In an anonymous pipe array created via int fd[2]; pipe(fd); which index represents the reading end?',
      options: ['fd[0]', 'fd[1]', 'fd[2]', 'Both ends read and write'],
      correctIndex: 0,
      explanation: 'In POSIX pipes, fd[0] is designated as the read end, while fd[1] is the write end.'
    }
  ]
};
