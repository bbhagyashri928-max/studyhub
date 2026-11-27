import { PracticalProgram } from '@/types';

export const otherPracticals: PracticalProgram[] = [
  {
    id: 'other-pr-1',
    courseId: 'other',
    category: 'Data Structures',
    title: 'Singly Linked List Insertion & Traversal',
    difficulty: 'Intermediate',
    problemStatement: 'Implement dynamic node insertion at the beginning and end of a singly linked list with sequential traversal.',
    sourceCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void insertAtHead(struct Node** headRef, int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = *headRef;
    *headRef = newNode;
}

void printList(struct Node* node) {
    printf("List elements: ");
    while (node != NULL) {
        printf("[%d] -> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main() {
    struct Node* list = NULL;
    insertAtHead(&list, 40);
    insertAtHead(&list, 30);
    insertAtHead(&list, 20);
    insertAtHead(&list, 10);

    printList(list);

    // Free all allocated nodes
    struct Node* curr = list;
    while (curr != NULL) {
        struct Node* temp = curr;
        curr = curr->next;
        free(temp);
    }
    printf("Memory cleanly deallocated.\\n");
    return 0;
}`,
    explanation: [
      'Define struct Node with integer payload and pointer to next node.',
      'insertAtHead takes double pointer struct Node** to mutate caller head address.',
      'Sequential while loop traverses until null pointer is encountered.',
      'Explicit free loop releases all heap allocations.'
    ],
    sampleInput: '(Predefined node insertions)',
    expectedOutput: `List elements: [10] -> [20] -> [30] -> [40] -> NULL\nMemory cleanly deallocated.`,
    keyConcepts: ['Dynamic heap memory', 'Double pointer indirection', 'Traversal', 'Memory deallocation'],
    published: true
  },
  {
    id: 'other-pr-2',
    courseId: 'other',
    category: 'Data Structures',
    title: 'Binary Search Tree (BST) Inorder Search',
    difficulty: 'Intermediate',
    problemStatement: 'Create a Binary Search Tree (BST) inserting elements dynamically, and print them in ascending order using Inorder traversal.',
    sourceCode: `#include <stdio.h>
#include <stdlib.h>

struct BSTNode {
    int val;
    struct BSTNode *left, *right;
};

struct BSTNode* insertBST(struct BSTNode* root, int val) {
    if (root == NULL) {
        struct BSTNode* node = (struct BSTNode*)malloc(sizeof(struct BSTNode));
        node->val = val;
        node->left = node->right = NULL;
        return node;
    }
    if (val < root->val) root->left = insertBST(root->left, val);
    else root->right = insertBST(root->right, val);
    return root;
}

void inorderPrint(struct BSTNode* root) {
    if (root != NULL) {
        inorderPrint(root->left);
        printf("%d ", root->val);
        inorderPrint(root->right);
    }
}

int main() {
    struct BSTNode* tree = NULL;
    int items[] = {45, 12, 89, 7, 33, 56, 99};

    for (int i = 0; i < 7; i++) {
        tree = insertBST(tree, items[i]);
    }

    printf("BST Inorder Traversal (Ascending Sort):\\n");
    inorderPrint(tree);
    printf("\\n");
    return 0;
}`,
    explanation: [
      'Nodes smaller than current node are routed to the left child branch.',
      'Nodes larger are routed to the right child branch.',
      'Inorder traversal (Left, Root, Right) automatically generates sorted outputs in O(N) time.'
    ],
    sampleInput: '45, 12, 89, 7, 33, 56, 99',
    expectedOutput: `BST Inorder Traversal (Ascending Sort):\n7 12 33 45 56 89 99`,
    keyConcepts: ['Binary Search Tree', 'Recursive insertion', 'Inorder traversal'],
    published: true
  },
  {
    id: 'other-pr-3',
    courseId: 'other',
    category: 'Systems & OS',
    title: 'Process Creation with fork() and Exit Reaping',
    difficulty: 'Intermediate',
    problemStatement: 'Demonstrate process cloning via fork(), distinct parent/child branches, and parent process status reaping via waitpid().',
    sourceCode: `#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main() {
    printf("[Main] Initial parent process PID: %d\\n", getpid());

    pid_t pid = fork();

    if (pid < 0) {
        perror("Fork failed");
        return 1;
    } else if (pid == 0) {
        // Child branch
        printf("[Child] Running child process (PID: %d, Parent PID: %d)\\n", getpid(), getppid());
        _exit(15); // Return exit code 15
    } else {
        // Parent branch
        int status;
        waitpid(pid, &status, 0);
        if (WIFEXITED(status)) {
            printf("[Parent] Child %d terminated with exit status: %d\\n", pid, WEXITSTATUS(status));
        }
    }
    return 0;
}`,
    explanation: [
      'fork() returns 0 to child, and child PID to parent.',
      'Child calls _exit() with status code 15.',
      'Parent calls waitpid() to synchronously collect the exit code, preventing zombie process state.'
    ],
    sampleInput: '(Process lifecycle test)',
    expectedOutput: `[Main] Initial parent process PID: 1042\n[Child] Running child process (PID: 1043, Parent PID: 1042)\n[Parent] Child 1043 terminated with exit status: 15`,
    keyConcepts: ['fork() system call', 'waitpid() reaping', 'WEXITSTATUS macro', 'Process IDs'],
    published: true
  },
  {
    id: 'other-pr-4',
    courseId: 'other',
    category: 'Concurrency',
    title: 'Multithreaded Counter with Mutex Lock (pthreads)',
    difficulty: 'Advanced',
    problemStatement: 'Spawn two concurrent threads incrementing a shared variable 50,000 times each, synchronized with a pthread_mutex to prevent race conditions.',
    sourceCode: `#include <stdio.h>
#include <pthread.h>

#define TARGET_OPS 50000

int counter = 0;
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

void* worker(void* arg) {
    for (int i = 0; i < TARGET_OPS; i++) {
        pthread_mutex_lock(&lock);
        counter++;
        pthread_mutex_unlock(&lock);
    }
    return NULL;
}

int main() {
    pthread_t t1, t2;

    printf("Starting 2 concurrent worker threads...\\n");
    pthread_create(&t1, NULL, worker, NULL);
    pthread_create(&t2, NULL, worker, NULL);

    pthread_join(t1, NULL);
    pthread_join(t2, NULL);

    printf("Final Synchronized Counter: %d (Expected: %d)\\n", counter, 2 * TARGET_OPS);
    pthread_mutex_destroy(&lock);
    return 0;
}`,
    explanation: [
      'Shared global variable counter is accessed by two parallel threads.',
      'pthread_mutex_lock guarantees only one thread enters the critical section at a time.',
      'pthread_join blocks until each thread finishes.'
    ],
    sampleInput: '(Concurrent counter test)',
    expectedOutput: `Starting 2 concurrent worker threads...\nFinal Synchronized Counter: 100000 (Expected: 100000)`,
    keyConcepts: ['pthread_create', 'pthread_mutex_lock', 'Critical section', 'Race condition prevention'],
    published: true
  },
  {
    id: 'other-pr-5',
    courseId: 'other',
    category: 'Systems & OS',
    title: 'Inter-Process Communication via Anonymous Pipe',
    difficulty: 'Intermediate',
    problemStatement: 'Send a formatted message between parent and child processes using an anonymous unidirectional pipe.',
    sourceCode: `#include <stdio.h>
#include <unistd.h>
#include <string.h>

int main() {
    int pfd[2];
    char message[] = "IPC Data Stream from CODEVERSE";
    char buffer[128];

    if (pipe(pfd) == -1) {
        perror("Pipe failed");
        return 1;
    }

    // Write to pipe
    write(pfd[1], message, strlen(message) + 1);
    close(pfd[1]); // Close write end

    // Read from pipe
    read(pfd[0], buffer, sizeof(buffer));
    close(pfd[0]); // Close read end

    printf("Buffer received from pipe: \\"%s\\"\\n", buffer);
    return 0;
}`,
    explanation: [
      'pipe(pfd) creates a kernel FIFO stream with two file descriptors.',
      'pfd[1] is the write end, pfd[0] is the read end.',
      'Unidirectional byte stream communication.'
    ],
    sampleInput: '(Pipe stream)',
    expectedOutput: `Buffer received from pipe: "IPC Data Stream from CODEVERSE"`,
    keyConcepts: ['pipe() system call', 'File descriptors', 'Inter-process communication'],
    published: true
  },
  {
    id: 'other-pr-6',
    courseId: 'other',
    category: 'Secure Coding',
    title: 'Buffer Overflow Defense with snprintf()',
    difficulty: 'Beginner',
    problemStatement: 'Demonstrate safe bounded string formatting using snprintf() to prevent buffer overflow vulnerabilities.',
    sourceCode: `#include <stdio.h>
#include <string.h>

int main() {
    char smallBuffer[16];
    char userInput[] = "This_is_a_very_long_input_payload_that_would_crash_unsafe_code";

    // Unsafe sprintf(smallBuffer, "%s", userInput); would corrupt stack memory!
    // Safe snprintf guarantees truncation to fit sizeof(smallBuffer):
    int written = snprintf(smallBuffer, sizeof(smallBuffer), "%s", userInput);

    printf("Truncated Buffer: \\"%s\\"\\n", smallBuffer);
    printf("Total Length Attempted: %d characters\\n", written);
    printf("Actual Stored (including '\\\\0'): %zu bytes\\n", sizeof(smallBuffer));
    return 0;
}`,
    explanation: [
      'snprintf specifies maximum destination buffer size as second argument.',
      'Guarantees output will not overflow boundaries.',
      'Ensures trailing null terminator byte.'
    ],
    sampleInput: '"This_is_a_very_long_input_payload..."',
    expectedOutput: `Truncated Buffer: "This_is_a_very_"\nTotal Length Attempted: 62 characters\nActual Stored (including '\\0'): 16 bytes`,
    keyConcepts: ['snprintf() bounded writes', 'Buffer overflow prevention', 'Secure coding standards'],
    published: true
  },
  {
    id: 'other-pr-7',
    courseId: 'other',
    category: 'Software Engineering',
    title: 'Automated Unit Testing with assert()',
    difficulty: 'Beginner',
    problemStatement: 'Write automated unit test cases with assert() verifying absolute value, maximum, and clamping functions.',
    sourceCode: `#include <stdio.h>
#include <assert.h>

int maxInt(int a, int b) {
    return (a > b) ? a : b;
}

int absVal(int n) {
    return (n < 0) ? -n : n;
}

int main() {
    // Unit tests for maxInt
    assert(maxInt(5, 10) == 10);
    assert(maxInt(-3, -8) == -3);
    assert(maxInt(0, 0) == 0);

    // Unit tests for absVal
    assert(absVal(-42) == 42);
    assert(absVal(42) == 42);
    assert(absVal(0) == 0);

    printf(">> All 6 automated unit test assertions passed! [100%% Test Success]\\n");
    return 0;
}`,
    explanation: [
      'assert() macro tests boolean invariant expressions at runtime.',
      'Aborts with file and line diagnostics if any test fails.',
      'Essential building block for regression testing.'
    ],
    sampleInput: '(Automated test suite)',
    expectedOutput: `>> All 6 automated unit test assertions passed! [100% Test Success]`,
    keyConcepts: ['<assert.h>', 'Unit testing', 'Invariant verification'],
    published: true
  }
];
