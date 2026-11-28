import { PracticalProgram } from '@/types';

export const cPracticals: PracticalProgram[] = [
  {
    id: 'c-pr-1',
    courseId: 'c',
    category: 'Basic Programs',
    title: 'Hello World and Console Output',
    difficulty: 'Beginner',
    problemStatement: 'Write a C program to print "Hello, World! Welcome to CODEVIVA Academy" on the console with newline formatting.',
    sourceCode: `#include <stdio.h>

int main() {
    // Print formal greeting to standard output
    printf("Hello, World!\\n");
    printf("Welcome to CODEVIVA C Programming Academy.\\n");
    return 0;
}`,
    explanation: [
      'Include <stdio.h> for printf() standard library functions.',
      'main() serves as the initial execution entry point returning int.',
      'printf() sends formatted character streams to stdout.',
      '\\n creates a line break.',
      'return 0 signals clean termination to the operating system.'
    ],
    sampleInput: '(None required)',
    expectedOutput: `Hello, World!\nWelcome to CODEVIVA C Programming Academy.`,
    keyConcepts: ['#include directive', 'main() entrypoint', 'printf() formatting', 'Return code 0'],
    published: true
  },
  {
    id: 'c-pr-2',
    courseId: 'c',
    category: 'Basic Programs',
    title: 'Addition of Two Numbers',
    difficulty: 'Beginner',
    problemStatement: 'Write a C program that prompts the user for two integers, calculates their arithmetic sum, and outputs the result.',
    sourceCode: `#include <stdio.h>

int main() {
    int num1 = 25;
    int num2 = 17;
    int sum = num1 + num2;

    printf("Number 1: %d\\n", num1);
    printf("Number 2: %d\\n", num2);
    printf("Sum = %d + %d = %d\\n", num1, num2, sum);
    return 0;
}`,
    explanation: [
      'Declare three integer variables: num1, num2, and sum.',
      'Apply the binary addition (+) operator to add the values.',
      'Assign the computed result to variable sum.',
      'Output formatted integers using %d placeholders in printf.'
    ],
    sampleInput: '25 17',
    expectedOutput: `Number 1: 25\nNumber 2: 17\nSum = 25 + 17 = 42`,
    keyConcepts: ['Variable declaration', 'Binary addition operator', '%d format specifier'],
    published: true
  },
  {
    id: 'c-pr-3',
    courseId: 'c',
    category: 'Operators',
    title: 'Compound Assignment and Bitwise Operations',
    difficulty: 'Beginner',
    problemStatement: 'Demonstrate compound assignment operators (+=, *=) and bitwise operations (AND, OR, Left Shift).',
    sourceCode: `#include <stdio.h>

int main() {
    int val = 12; // Binary: 0000 1100
    int mask = 5; // Binary: 0000 0101

    printf("Initial val: %d\\n", val);
    val += 8; // val = val + 8
    printf("After val += 8: %d\\n", val);

    int bitAnd = 12 & 5; // 0000 0100 -> 4
    int bitOr = 12 | 5;  // 0000 1101 -> 13
    int bitShift = 3 << 2; // 3 * 2^2 = 12

    printf("Bitwise AND (12 & 5) = %d\\n", bitAnd);
    printf("Bitwise OR  (12 | 5) = %d\\n", bitOr);
    printf("Left Shift  (3 << 2) = %d\\n", bitShift);
    return 0;
}`,
    explanation: [
      'Compound assignment operators modify and update the variable in place.',
      '& operator evaluates bitwise AND between corresponding binary bits.',
      '| operator evaluates bitwise OR.',
      '<< shifts binary bits to the left, multiplying the integer by powers of 2.'
    ],
    sampleInput: '(None)',
    expectedOutput: `Initial val: 12\nAfter val += 8: 20\nBitwise AND (12 & 5) = 4\nBitwise OR  (12 | 5) = 13\nLeft Shift  (3 << 2) = 12`,
    keyConcepts: ['Bitwise operators', 'Compound assignment', 'Binary logic representation'],
    published: true
  },
  {
    id: 'c-pr-4',
    courseId: 'c',
    category: 'Conditional Statements',
    title: 'Even or Odd Number Check',
    difficulty: 'Beginner',
    problemStatement: 'Determine whether a given integer is even or odd using the modulo (%) operator and an if-else decision structure.',
    sourceCode: `#include <stdio.h>

int main() {
    int number = 47;

    if (number % 2 == 0) {
        printf("%d is an EVEN number.\\n", number);
    } else {
        printf("%d is an ODD number.\\n", number);
    }
    return 0;
}`,
    explanation: [
      'Modulo operator (%) returns the remainder of integer division by 2.',
      'If remainder equals 0, the number divides evenly by 2 and is even.',
      'Otherwise, the number is odd.'
    ],
    sampleInput: '47',
    expectedOutput: `47 is an ODD number.`,
    keyConcepts: ['Modulo division', 'if-else branching', 'Relational equality (==)'],
    published: true
  },
  {
    id: 'c-pr-5',
    courseId: 'c',
    category: 'Conditional Statements',
    title: 'Largest of Three Numbers',
    difficulty: 'Beginner',
    problemStatement: 'Write a program to find the largest of three given numbers using nested if-else or logical AND (&&) conditions.',
    sourceCode: `#include <stdio.h>

int main() {
    int a = 64, b = 89, c = 32;

    printf("Numbers given: a = %d, b = %d, c = %d\\n", a, b, c);

    if (a >= b && a >= c) {
        printf("The largest number is a = %d\\n", a);
    } else if (b >= a && b >= c) {
        printf("The largest number is b = %d\\n", b);
    } else {
        printf("The largest number is c = %d\\n", c);
    }
    return 0;
}`,
    explanation: [
      'Compare first number against second and third using logical AND (&&).',
      'If both comparisons are true, the first is greatest.',
      'Repeat test for the second number; otherwise, the third is automatically the greatest.'
    ],
    sampleInput: '64 89 32',
    expectedOutput: `Numbers given: a = 64, b = 89, c = 32\nThe largest number is b = 89`,
    keyConcepts: ['Logical AND (&&)', 'Chained if-else ladder', 'Relational comparison (>=)'],
    published: true
  },
  {
    id: 'c-pr-6',
    courseId: 'c',
    category: 'Loops',
    title: 'Factorial of a Number',
    difficulty: 'Beginner',
    problemStatement: 'Compute the factorial of a positive integer N (N! = N * (N - 1) * ... * 1) iteratively using a for loop.',
    sourceCode: `#include <stdio.h>

int main() {
    int n = 6;
    unsigned long long fact = 1;

    for (int i = 1; i <= n; i++) {
        fact *= i;
    }

    printf("Factorial of %d (%d!) = %llu\\n", n, n, fact);
    return 0;
}`,
    explanation: [
      'Initialize factorial accumulator to 1 (multiplicative identity).',
      'Iterate a loop counter i from 1 up to n inclusive.',
      'Multiply accumulator fact by each successive i.',
      'Use unsigned long long to avoid rapid overflow from large factorial growth.'
    ],
    sampleInput: '6',
    expectedOutput: `Factorial of 6 (6!) = 720`,
    keyConcepts: ['Iterative loops', 'Accumulator pattern', 'unsigned long long type sizing'],
    published: true
  },
  {
    id: 'c-pr-7',
    courseId: 'c',
    category: 'Loops',
    title: 'Fibonacci Series Generation',
    difficulty: 'Beginner',
    problemStatement: 'Generate the first N terms of the Fibonacci sequence where each term is the sum of the preceding two terms (0, 1, 1, 2, 3, 5, 8, ...).',
    sourceCode: `#include <stdio.h>

int main() {
    int terms = 8;
    int t1 = 0, t2 = 1, nextTerm;

    printf("First %d terms of Fibonacci sequence:\\n", terms);
    for (int i = 1; i <= terms; i++) {
        printf("%d ", t1);
        nextTerm = t1 + t2;
        t1 = t2;
        t2 = nextTerm;
    }
    printf("\\n");
    return 0;
}`,
    explanation: [
      'Initialize seed values: t1 = 0, t2 = 1.',
      'In each iteration, print current term t1.',
      'Calculate nextTerm as t1 + t2, then advance t1 to t2 and t2 to nextTerm.'
    ],
    sampleInput: '8',
    expectedOutput: `First 8 terms of Fibonacci sequence:\n0 1 1 2 3 5 8 13`,
    keyConcepts: ['Variable swapping and shifting', 'Sequence generation', 'Loop counter'],
    published: true
  },
  {
    id: 'c-pr-8',
    courseId: 'c',
    category: 'Loops',
    title: 'Prime Number Verification',
    difficulty: 'Intermediate',
    problemStatement: 'Check whether a given integer N is a prime number by testing divisibility up to its square root.',
    sourceCode: `#include <stdio.h>
#include <stdbool.h>

int main() {
    int num = 29;
    bool isPrime = true;

    if (num <= 1) {
        isPrime = false;
    } else {
        for (int i = 2; i * i <= num; i++) {
            if (num % i == 0) {
                isPrime = false;
                break;
            }
        }
    }

    if (isPrime) {
        printf("%d is a PRIME number.\\n", num);
    } else {
        printf("%d is NOT a prime number.\\n", num);
    }
    return 0;
}`,
    explanation: [
      'Numbers <= 1 are not prime by definition.',
      'Divisibility only needs to be verified up to sqrt(N) (i * i <= num) for optimal O(sqrt(N)) time complexity.',
      'If any factor divides num with remainder 0, flag isPrime as false and break.'
    ],
    sampleInput: '29',
    expectedOutput: `29 is a PRIME number.`,
    keyConcepts: ['Algorithmic optimization (i * i <= N)', 'Boolean flags', 'break statement'],
    published: true
  },
  {
    id: 'c-pr-9',
    courseId: 'c',
    category: 'Loops',
    title: 'Palindrome and Armstrong Number Check',
    difficulty: 'Intermediate',
    problemStatement: 'Check if an integer reads the same backward as forward (Palindrome) and if the sum of the cubes of its digits equals the number (Armstrong).',
    sourceCode: `#include <stdio.h>

int main() {
    int num = 153;
    int temp = num, reversed = 0, armstrongSum = 0, remainder;

    while (temp > 0) {
        remainder = temp % 10;
        reversed = reversed * 10 + remainder;
        armstrongSum += remainder * remainder * remainder; // 3-digit cube
        temp /= 10;
    }

    printf("Original: %d | Reversed: %d\\n", num, reversed);
    printf("Is Palindrome? %s\\n", (num == reversed) ? "YES" : "NO");
    printf("Armstrong Sum: %d\\n", armstrongSum);
    printf("Is Armstrong Number? %s\\n", (num == armstrongSum) ? "YES" : "NO");
    return 0;
}`,
    explanation: [
      'Extract least significant digit using modulo 10 (temp % 10).',
      'Shift reversed integer by 10 and add the extracted digit.',
      'Accumulate digit cubes for Armstrong check.',
      'Reduce temp by dividing by 10 until 0.'
    ],
    sampleInput: '153',
    expectedOutput: `Original: 153 | Reversed: 351\nIs Palindrome? NO\nArmstrong Sum: 153\nIs Armstrong Number? YES`,
    keyConcepts: ['Digit extraction (n % 10)', 'Integer arithmetic (n / 10)', 'Ternary operator'],
    published: true
  },
  {
    id: 'c-pr-10',
    courseId: 'c',
    category: 'Patterns',
    title: 'Right-Angled and Inverted Star Patterns',
    difficulty: 'Beginner',
    problemStatement: 'Print a right-angled star pyramid pattern and its inverted counterpart using nested loops.',
    sourceCode: `#include <stdio.h>

int main() {
    int rows = 5;

    printf("1. Right-Angled Star Triangle:\\n");
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= i; j++) {
            printf("* ");
        }
        printf("\\n");
    }

    printf("\\n2. Inverted Star Triangle:\\n");
    for (int i = rows; i >= 1; i--) {
        for (int j = 1; j <= i; j++) {
            printf("* ");
        }
        printf("\\n");
    }
    return 0;
}`,
    explanation: [
      'Outer loop controls row index from 1 to rows.',
      'Inner loop controls number of stars printed per row.',
      'Print newline character after each inner row loop finishes.'
    ],
    sampleInput: '5',
    expectedOutput: `1. Right-Angled Star Triangle:\n* \n* * \n* * * \n* * * * \n* * * * * \n\n2. Inverted Star Triangle:\n* * * * * \n* * * * \n* * * \n* * \n* `,
    keyConcepts: ['Nested loops', 'Pattern coordinate mapping', 'Console formatting'],
    published: true
  },
  {
    id: 'c-pr-11',
    courseId: 'c',
    category: 'Arrays',
    title: 'Bubble Sort on 1D Array',
    difficulty: 'Intermediate',
    problemStatement: 'Sort an array of unsorted integers in ascending order using the Bubble Sort comparison algorithm.',
    sourceCode: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap adjacent out-of-order elements
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int data[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(data) / sizeof(data[0]);

    printf("Original array: ");
    for (int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("\\n");

    bubbleSort(data, n);

    printf("Sorted array:   ");
    for (int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("\\n");
    return 0;
}`,
    explanation: [
      'Bubble sort repeatedly steps through the list, comparing adjacent items.',
      'If elements are in the wrong order, they are swapped.',
      'Larger elements "bubble" to the end of the array on each pass.'
    ],
    sampleInput: '64 34 25 12 22 11 90',
    expectedOutput: `Original array: 64 34 25 12 22 11 90\nSorted array:   11 12 22 25 34 64 90`,
    keyConcepts: ['Bubble sort algorithm', 'Array traversal', 'Element swapping'],
    published: true
  },
  {
    id: 'c-pr-12',
    courseId: 'c',
    category: 'Arrays',
    title: 'Linear Search in Array',
    difficulty: 'Beginner',
    problemStatement: 'Search for a target key element in an array and report its index position or state it was not found.',
    sourceCode: `#include <stdio.h>

int linearSearch(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            return i; // Return matched index position
        }
    }
    return -1; // Target not found
}

int main() {
    int list[] = {45, 12, 89, 73, 23, 67};
    int size = sizeof(list) / sizeof(list[0]);
    int key = 73;

    int resultIndex = linearSearch(list, size, key);

    if (resultIndex != -1) {
        printf("Element %d discovered at index %d!\\n", key, resultIndex);
    } else {
        printf("Element %d is not present in array.\\n", key);
    }
    return 0;
}`,
    explanation: [
      'Iterate through the array sequentially from index 0.',
      'Compare each element with the target search key.',
      'Return the index as soon as a match is discovered; return -1 if loop concludes without match.'
    ],
    sampleInput: '73',
    expectedOutput: `Element 73 discovered at index 3!`,
    keyConcepts: ['Linear search O(N)', 'Sentinel return code (-1)', 'Sequential indexing'],
    published: true
  },
  {
    id: 'c-pr-13',
    courseId: 'c',
    category: 'Arrays',
    title: 'Matrix Addition (2D Arrays)',
    difficulty: 'Intermediate',
    problemStatement: 'Add two 2x3 matrices of equal dimensions element by element and print the resulting matrix.',
    sourceCode: `#include <stdio.h>

int main() {
    int A[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int B[2][3] = {{9, 8, 7}, {6, 5, 4}};
    int C[2][3];

    for (int r = 0; r < 2; r++) {
        for (int c = 0; c < 3; c++) {
            C[r][c] = A[r][c] + B[r][c];
        }
    }

    printf("Result of Matrix A + Matrix B:\\n");
    for (int r = 0; r < 2; r++) {
        for (int c = 0; c < 3; c++) {
            printf("%4d", C[r][c]);
        }
        printf("\\n");
    }
    return 0;
}`,
    explanation: [
      'Two matrices can be added only if they possess identical row and column dimensions.',
      'Nested loops traverse each cell (r, c).',
      'The sum C[r][c] is computed as A[r][c] + B[r][c].'
    ],
    sampleInput: '(Static 2x3 matrices)',
    expectedOutput: `Result of Matrix A + Matrix B:\n  10  10  10\n  10  10  10`,
    keyConcepts: ['2D array indexing', 'Matrix arithmetic', 'Formatted tabular display'],
    published: true
  },
  {
    id: 'c-pr-14',
    courseId: 'c',
    category: 'Strings',
    title: 'String Reversal in Place',
    difficulty: 'Intermediate',
    problemStatement: 'Reverse a C string in place using two-pointer swap logic without allocating auxiliary string arrays.',
    sourceCode: `#include <stdio.h>
#include <string.h>

void reverseString(char str[]) {
    int left = 0;
    int right = strlen(str) - 1;

    while (left < right) {
        char temp = str[left];
        str[left] = str[right];
        str[right] = temp;
        left++;
        right--;
    }
}

int main() {
    char word[] = "CODEVIVA";
    printf("Original String: %s\\n", word);

    reverseString(word);

    printf("Reversed String: %s\\n", word);
    return 0;
}`,
    explanation: [
      'Set left pointer to 0 and right pointer to strlen(str) - 1.',
      'Swap characters at left and right positions.',
      'Increment left and decrement right until they cross in the middle.',
      'Operates in-place with O(1) auxiliary memory.'
    ],
    sampleInput: '"CODEVIVA"',
    expectedOutput: `Original String: CODEVIVA\nReversed String: ESREVEDOC`,
    keyConcepts: ['Two-pointer technique', 'In-place string modification', 'strlen() computation'],
    published: true
  },
  {
    id: 'c-pr-15',
    courseId: 'c',
    category: 'Functions',
    title: 'Function-Based Modular Calculator',
    difficulty: 'Beginner',
    problemStatement: 'Implement a modular arithmetic calculator with separate functions for addition, subtraction, multiplication, and division.',
    sourceCode: `#include <stdio.h>

double add(double a, double b) { return a + b; }
double subtract(double a, double b) { return a - b; }
double multiply(double a, double b) { return a * b; }
double divide(double a, double b) { 
    if (b == 0) {
        printf("Error: Div by zero\\n");
        return 0;
    }
    return a / b; 
}

int main() {
    double x = 20.0, y = 4.0;
    printf("%.1f + %.1f = %.1f\\n", x, y, add(x, y));
    printf("%.1f - %.1f = %.1f\\n", x, y, subtract(x, y));
    printf("%.1f * %.1f = %.1f\\n", x, y, multiply(x, y));
    printf("%.1f / %.1f = %.1f\\n", x, y, divide(x, y));
    return 0;
}`,
    explanation: [
      'Each mathematical operation is isolated into its own dedicated function.',
      'Functions take parameters by value and return computed double values.',
      'Division includes zero-divisor validation.'
    ],
    sampleInput: '20.0 4.0',
    expectedOutput: `20.0 + 4.0 = 24.0\n20.0 - 4.0 = 16.0\n20.0 * 4.0 = 80.0\n20.0 / 4.0 = 5.0`,
    keyConcepts: ['Modular decomposition', 'Parameter passing', 'Error guarding'],
    published: true
  },
  {
    id: 'c-pr-16',
    courseId: 'c',
    category: 'Pointers',
    title: 'Variable Swapping via Pointers (Pass-by-Reference)',
    difficulty: 'Intermediate',
    problemStatement: 'Demonstrate how pointers enable functions to modify caller variables directly by implementing a swap function.',
    sourceCode: `#include <stdio.h>

void swap(int *p1, int *p2) {
    int temp = *p1;
    *p1 = *p2;
    *p2 = temp;
}

int main() {
    int a = 100, b = 500;
    printf("Prior to swap: a = %d, b = %d\\n", a, b);

    // Pass addresses of a and b
    swap(&a, &b);

    printf("After swap:    a = %d, b = %d\\n", a, b);
    return 0;
}`,
    explanation: [
      'In C, arguments are passed by value. To alter caller variables, addresses are passed using &.',
      'The swap function accepts integer pointers int *p1 and int *p2.',
      'Dereferencing with * writes the swapped values directly into the original caller memory.'
    ],
    sampleInput: '100 500',
    expectedOutput: `Prior to swap: a = 100, b = 500\nAfter swap:    a = 500, b = 100`,
    keyConcepts: ['Address-of (&)', 'Dereferencing (*)', 'Pass-by-reference simulation'],
    published: true
  },
  {
    id: 'c-pr-17',
    courseId: 'c',
    category: 'Structures and Unions',
    title: 'Student Record Management System',
    difficulty: 'Intermediate',
    problemStatement: 'Create an array of structures to store student IDs, names, and test percentages, and calculate the highest scorer.',
    sourceCode: `#include <stdio.h>

struct Student {
    int id;
    char name[30];
    float percentage;
};

int main() {
    struct Student batch[3] = {
        {101, "Lucas Vance", 88.5},
        {102, "Sophia Patel", 95.0},
        {103, "Ethan Cole", 91.2}
    };

    int topIndex = 0;
    printf("=== STUDENT DATABASE ===\\n");
    for (int i = 0; i < 3; i++) {
        printf("ID: %d | Name: %-14s | Score: %.1f%%\\n", 
               batch[i].id, batch[i].name, batch[i].percentage);
        if (batch[i].percentage > batch[topIndex].percentage) {
            topIndex = i;
        }
    }

    printf("\\nTop Achiever: %s with %.1f%%!\\n", 
           batch[topIndex].name, batch[topIndex].percentage);
    return 0;
}`,
    explanation: [
      'Define struct Student containing integer, string array, and float members.',
      'Initialize array of structures with 3 student records.',
      'Traverse with a loop and track index of highest percentage score.'
    ],
    sampleInput: '(Pre-populated batch of 3 students)',
    expectedOutput: `=== STUDENT DATABASE ===\nID: 101 | Name: Lucas Vance    | Score: 88.5%\nID: 102 | Name: Sophia Patel   | Score: 95.0%\nID: 103 | Name: Ethan Cole     | Score: 91.2%\n\nTop Achiever: Sophia Patel with 95.0%!`,
    keyConcepts: ['struct declaration', 'Array of structs', 'Record search algorithms'],
    published: true
  },
  {
    id: 'c-pr-18',
    courseId: 'c',
    category: 'File Handling',
    title: 'Writing and Reading Persistent Files',
    difficulty: 'Intermediate',
    problemStatement: 'Write academy log entries to a text file using fprintf(), close it, then read the entries back line by line using fgets().',
    sourceCode: `#include <stdio.h>

int main() {
    // 1. Write file
    FILE *fOut = fopen("CODEVIVA_sample.txt", "w");
    if (fOut == NULL) {
        printf("Could not create file!\\n");
        return 1;
    }
    fprintf(fOut, "CODEVIVA Master Academy\\nC Programming Module\\nStatus: Verified\\n");
    fclose(fOut);

    // 2. Read file back
    FILE *fIn = fopen("CODEVIVA_sample.txt", "r");
    if (fIn == NULL) {
        printf("Could not open file for reading!\\n");
        return 1;
    }

    char line[128];
    printf("Content read from disk:\\n");
    while (fgets(line, sizeof(line), fIn) != NULL) {
        printf(">> %s", line);
    }
    fclose(fIn);
    return 0;
}`,
    explanation: [
      'Open file in "w" write mode; verify pointer is non-null.',
      'Write lines using formatted fprintf().',
      'Close with fclose() to commit changes to disk.',
      'Reopen in "r" read mode and read each line securely using fgets() into a buffer.'
    ],
    sampleInput: '(File stream I/O)',
    expectedOutput: `Content read from disk:\n>> CODEVIVA Master Academy\n>> C Programming Module\n>> Status: Verified`,
    keyConcepts: ['fopen() modes ("w", "r")', 'fprintf()', 'fgets() buffer safety', 'fclose()'],
    published: true
  }
];
