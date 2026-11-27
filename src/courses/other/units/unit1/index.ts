import { Unit, Quiz } from '@/types';

export const otherUnit1: Unit = {
  id: 'other-unit-1',
  courseId: 'other',
  unitNumber: 1,
  title: 'Data Structures & Algorithmic Complexity',
  description: 'Master core dynamic data structures: singly and doubly linked lists, binary search trees (BST), stack/queue internals, and asymptotic Big-O runtime analysis.',
  estimatedHours: 5.5,
  quizId: 'quiz-other-1',
  published: true,
  topics: [
    {
      id: 'other-u1-t1',
      unitId: 'other-unit-1',
      courseId: 'other',
      order: 1,
      title: 'Asymptotic Analysis & Big-O Notation',
      summary: 'Understand time and space complexity, analyzing algorithmic upper bounds, lower bounds, and average cases.',
      content: {
        definition: 'Asymptotic analysis evaluates how the runtime or memory requirements of an algorithm scale as the input size (N) grows toward infinity. Big-O notation, O(f(N)), describes the mathematical upper bound on execution growth.',
        syntax: '/* Complexity Growth Hierarchy */\nO(1) < O(log N) < O(N) < O(N log N) < O(N^2) < O(2^N) < O(N!)',
        codeSnippet: `// Linear Search: O(N) vs Binary Search: O(log N)
#include <stdio.h>

int binarySearch(int arr[], int low, int high, int target) {
    while (low <= high) {
        int mid = low + (high - low) / 2; // Guards against integer overflow
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1; // O(log N) runtime
}

int main() {
    int sortedData[] = {2, 7, 14, 21, 33, 49, 68, 85, 99};
    int n = sizeof(sortedData) / sizeof(sortedData[0]);
    int target = 49;
    int index = binarySearch(sortedData, 0, n - 1, target);
    printf("Binary search for %d found at index: %d\\n", target, index);
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int mid = low + (high - low) / 2;', explanation: 'Calculates the midpoint safely avoiding integer overflow that occurs with (low + high) / 2.' },
          { line: 'while (low <= high)', explanation: 'Halves the search space on each iteration, yielding logarithmic O(log N) steps.' }
        ],
        keyConcepts: [
          'Time Complexity: Number of machine operations executed as a function of input size N',
          'Space Complexity: Total auxiliary memory allocated dynamically or on the call stack',
          'Binary search requires sorted arrays and runs in logarithmic O(log N) time'
        ],
        commonMistakes: [
          'Confusing O(1) constant time with fast speed (an O(1) operation can take 10 seconds if it does 10 billion constant steps)',
          'Ignoring call stack space in recursive complexity calculations'
        ],
        quickRevision: [
          'O(1): Constant, O(log N): Logarithmic, O(N): Linear, O(N log N): Linearithmic (Sort).',
          'Always analyze worst-case, best-case, and average-case behaviors.'
        ]
      }
    },
    {
      id: 'other-u1-t2',
      unitId: 'other-unit-1',
      courseId: 'other',
      order: 2,
      title: 'Dynamic Linked Lists: Singly & Doubly Linked Chains',
      summary: 'Build pointer-linked dynamic structures with O(1) insertions, pointer rewiring, and memory allocation.',
      content: {
        definition: 'A linked list is a linear collection of data elements called nodes whose order is not given by their physical placement in memory. Instead, each node contains data and a pointer pointing to the memory address of the next node in sequence.',
        syntax: 'struct Node {\n    int data;\n    struct Node* next;\n};\nstruct Node* head = NULL;',
        codeSnippet: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int val;
    struct Node* next;
};

void insertFront(struct Node** headRef, int newVal) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->val = newVal;
    newNode->next = *headRef;
    *headRef = newNode;
}

int main() {
    struct Node* head = NULL;
    insertFront(&head, 30);
    insertFront(&head, 20);
    insertFront(&head, 10);

    printf("Linked List traversal: ");
    struct Node* curr = head;
    while (curr != NULL) {
        printf("%d -> ", curr->val);
        curr = curr->next;
    }
    printf("NULL\\n");
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'struct Node* newNode = (struct Node*)malloc(...)', explanation: 'Allocates dynamic heap memory for a new node instance.' },
          { line: 'newNode->next = *headRef;', explanation: 'Links the new node to the current start of the chain.' },
          { line: '*headRef = newNode;', explanation: 'Updates the caller\'s head pointer to point to the newly prepended node.' }
        ],
        keyConcepts: [
          'Dynamic sizing: grows and shrinks at runtime without memory reallocation',
          'O(1) insertion at the front (head)',
          'Requires traversing through pointers (O(N)) to access index i (no random access like arrays)'
        ],
        commonMistakes: [
          'Losing the head pointer, which leaks the entire list memory',
          'Dereferencing curr->next when curr is NULL'
        ],
        quickRevision: [
          'Array: Fast random access O(1), expensive insertion O(N).',
          'Linked List: Fast insertion O(1), sequential traversal O(N).',
          'Always free each node when cleaning up dynamic lists.'
        ]
      }
    },
    {
      id: 'other-u1-t3',
      unitId: 'other-unit-1',
      courseId: 'other',
      order: 3,
      title: 'Binary Search Trees (BST) & Hierarchical Structures',
      summary: 'Organize data hierarchically with BST invariant properties, insertion, searching, and traversal orders.',
      content: {
        definition: 'A Binary Search Tree (BST) is a node-based binary tree data structure where each node has at most two children. For every node, all values in its left subtree are strictly smaller, and all values in its right subtree are strictly greater.',
        syntax: 'struct TreeNode {\n    int val;\n    struct TreeNode* left;\n    struct TreeNode* right;\n};',
        codeSnippet: `#include <stdio.h>
#include <stdlib.h>

struct TreeNode {
    int key;
    struct TreeNode *left, *right;
};

struct TreeNode* insert(struct TreeNode* node, int key) {
    if (node == NULL) {
        struct TreeNode* temp = (struct TreeNode*)malloc(sizeof(struct TreeNode));
        temp->key = key;
        temp->left = temp->right = NULL;
        return temp;
    }
    if (key < node->key) node->left = insert(node->left, key);
    else if (key > node->key) node->right = insert(node->right, key);
    return node;
}

void inorder(struct TreeNode* root) {
    if (root != NULL) {
        inorder(root->left);
        printf("%d ", root->key); // Inorder yields sorted order
        inorder(root->right);
    }
}

int main() {
    struct TreeNode* root = NULL;
    root = insert(root, 50);
    insert(root, 30);
    insert(root, 70);
    insert(root, 20);
    insert(root, 40);

    printf("BST Inorder Traversal (Sorted): ");
    inorder(root);
    printf("\\n");
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'if (key < node->key) node->left = insert(...)', explanation: 'Traverses down left child branch if key is smaller than current node value.' },
          { line: 'inorder(root->left); printf(...); inorder(root->right);', explanation: 'Inorder traversal (Left, Root, Right) outputs BST keys in ascending numerical order.' }
        ],
        keyConcepts: [
          'Average search and insertion time complexity: O(log N)',
          'Worst-case complexity degenerates to O(N) if keys are inserted in sorted order (skewed tree)',
          'Self-balancing variants (AVL trees, Red-Black trees) guarantee O(log N) balance'
        ],
        commonMistakes: [
          'Forgetting that inorder traversal requires visiting left subtree before the node itself',
          'Not returning the updated root from recursive insert helper functions'
        ],
        quickRevision: [
          'Left < Root < Right.',
          'Inorder traversal yields sorted output.',
          'Average search = O(log N), Worst case = O(N).'
        ]
      }
    }
  ]
};

export const otherUnit1Quiz: Quiz = {
  id: 'quiz-other-1',
  unitId: 'other-unit-1',
  courseId: 'other',
  unitTitle: 'Unit 1: Data Structures & Algorithmic Complexity',
  title: 'Unit 1 Mastery Quiz',
  passingScorePercent: 60,
  questions: [
    {
      id: 'q-o1-1',
      question: 'What is the time complexity of Binary Search on a sorted array of size N?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
      correctIndex: 1,
      explanation: 'Binary Search halves the remaining search interval on every comparison, resulting in logarithmic O(log N) time.'
    },
    {
      id: 'q-o1-2',
      question: 'What is a major advantage of a linked list over a contiguous static array?',
      options: [
        'O(1) random index access',
        'Dynamic size that grows and shrinks easily at runtime with O(1) front insertion',
        'Lower memory usage per element',
        'Better cache locality'
      ],
      correctIndex: 1,
      explanation: 'Linked lists do not need contiguous pre-allocated memory and can insert nodes at the front in O(1) constant time.'
    },
    {
      id: 'q-o1-3',
      question: 'Which tree traversal order visits nodes in ascending sorted order for a Binary Search Tree (BST)?',
      options: ['Preorder (Root, Left, Right)', 'Inorder (Left, Root, Right)', 'Postorder (Left, Right, Root)', 'Level-order'],
      correctIndex: 1,
      explanation: 'Inorder traversal visits Left subtree, then current Root, then Right subtree, guaranteeing sorted order in a BST.'
    }
  ]
};
