import { Unit, Quiz } from '@/types';

export const cUnit4: Unit = {
  id: 'c-unit-4',
  courseId: 'c',
  unitNumber: 4,
  title: 'Arrays and Strings',
  description: 'Master 1D and 2D arrays, compile-time and run-time initialization, matrix arithmetic (addition and multiplication), character arrays, null-terminated strings, safe terminal I/O, string handling functions (<string.h>), and classic string algorithms like palindrome checking.',
  estimatedHours: 8.0,
  quizId: 'quiz-c-4',
  published: true,
  topics: [
    {
      id: 'c-u4-t1',
      unitId: 'c-unit-4',
      courseId: 'c',
      order: 1,
      title: 'One-Dimensional Arrays: Declaration, Initialization & Core Operations',
      summary: 'Learn sequential contiguous data storage in 1D arrays, compile-time vs. run-time initialization, and master the 6 classic array algorithms (print, reverse, sum, average, largest, smallest).',
      content: {
        definition: 'An Array in C is a contiguous, fixed-size sequential collection of elements of the same data type (homogeneous elements) stored under a single variable name. A One-Dimensional (1D) array or vector represents a single row or column of elements, indexed starting from 0 to size - 1.',
        syntax: `/* 1. Declaration of 1-D Arrays:
   type variable_name [size];
   Examples:
   int rollnumbers[4];
   float height[30];
   char name[40]; */

/* 2. Compile-Time (Build-Time) Initialization:
   type array_name[size] = {list of values};
   int nums[4] = {2, 5, 6, 7};
   float area[5] = {23.4, 6.8, 5.5, 7.3, 2.4};
   char name[9] = {'T', 'u', 't', 'o', 'r', 'i', 'a', 'l', '\\0'}; */

/* 3. Run-Time (Dynamic) Initialization:
   Accepting values during program execution using loops and scanf():
   for (int i = 0; i < size; i++) {
       scanf("%d", &array[i]);
   } */`,
        codeSnippet: `/* Comprehensive 1D Array Demonstration: Sum, Average, Largest & Smallest */
#include <stdio.h>

int main(void) {
    int array[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 0};
    int size = 10;
    
    // 1. Forward Traversal
    printf("1. Forward Array Elements:\\n");
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    printf("\\n");

    // 2. Reverse Traversal
    printf("\\n2. Reverse Array Elements:\\n");
    for (int i = size - 1; i >= 0; i--) {
        printf("%d ", array[i]);
    }
    printf("\\n");

    // 3. Sum and Average
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += array[i];
    }
    float avg = (float)sum / size;
    printf("\\n3. Sum of elements     : %d\\n", sum);
    printf("   Average of elements : %.2f\\n", avg);

    // 4. Largest and Smallest
    int largest = array[0];
    int smallest = array[0];
    for (int i = 1; i < size; i++) {
        if (array[i] > largest)  largest = array[i];
        if (array[i] < smallest) smallest = array[i];
    }
    printf("\\n4. Largest element      : %d\\n", largest);
    printf("   Smallest element     : %d\\n", smallest);

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int array[10] = {1, 2, 3, ...};', explanation: 'Compile-time declaration and initialization of 10 contiguous 4-byte integers in RAM.' },
          { line: 'for (int i = size - 1; i >= 0; i--)', explanation: 'Reverse traversal starting from highest valid index (9) down to index 0.' },
          { line: 'avg = (float)sum / size;', explanation: 'Explicit type cast prevents integer division truncation, preserving fractional averages.' },
          { line: 'if (array[i] > largest) largest = array[i];', explanation: 'Iterative comparison algorithm tracking the maximum value observed.' }
        ],
        keyConcepts: [
          'Homogeneous Data: All elements in an array must share the exact same data type.',
          'Zero-Based Indexing: The first element is always at index 0, and the last is at index size - 1.',
          'Compile-Time Initialization occurs during compilation; Run-Time occurs via user input or loops.',
          'No Bounds Checking: C does not verify array boundaries; accessing array[10] in an array of size 10 accesses unauthorized memory.'
        ],
        commonMistakes: [
          'Off-by-one errors: attempting to access array[10] in an array of 10 elements (valid indices are 0 to 9)',
          'Performing integer division when calculating average (e.g. sum / size without float casting)'
        ],
        quickRevision: [
          'type name[size]; declares a 1D array.',
          'Indices range from 0 to size - 1.',
          'Initialize at compile-time: int a[3] = {1, 2, 3};'
        ]
      }
    },
    {
      id: 'c-u4-t2',
      unitId: 'c-unit-4',
      courseId: 'c',
      order: 2,
      title: 'Multi-Dimensional Arrays: 2D Matrices, Addition & Multiplication',
      summary: 'Represent tables, matrices, and grids using 2D arrays, master flat vs. row-bracket initializations, and implement matrix addition and multiplication.',
      content: {
        definition: 'A Multi-Dimensional Array has dimensions greater than one. A Two-Dimensional (2D) Array is an array of arrays, organized conceptually as a matrix or table with rows and columns. In C memory, 2D arrays are stored in Row-Major Order (row-by-row sequentially).',
        syntax: `/* 1. Declaration of 2D Arrays:
   type array_name [row_size] [column_size];
   int matrix[2][3]; // 2 rows, 3 columns

/* 2. Initialization Methods:
   Method 1 (Flat list):
   int a[4][3] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11};

   Method 2 (Nested row brackets - Recommended):
   int a[4][3] = {
       {0, 1, 2},
       {3, 4, 5},
       {6, 7, 8},
       {9, 10, 11}
   }; */

/* 3. 3-Dimensional Array Syntax:
   type array_name [size1] [size2] [size3];
   int cube[2][3][4]; // 2 layers of 3x4 matrices */`,
        codeSnippet: `/* Demonstrating Matrix Creation, 3x3 Matrix Addition, and Matrix Multiplication */
#include <stdio.h>

int main(void) {
    // 1. Matrix Creation and Display
    int a[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    int b[3][3] = {
        {9, 8, 7},
        {6, 5, 4},
        {3, 2, 1}
    };
    int sum[3][3];

    // 2. Matrix Addition: sum[i][j] = a[i][j] + b[i][j]
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            sum[i][j] = a[i][j] + b[i][j];
        }
    }

    printf("--- Result of 3x3 Matrix Addition ---\\n");
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", sum[i][j]);
        }
        printf("\\n");
    }

    // 3. 2x2 Matrix Multiplication: m[i][j] += a[i][k] * b[k][j]
    int m1[2][2] = {{1, 2}, {3, 4}};
    int m2[2][2] = {{5, 6}, {7, 8}};
    int product[2][2] = {{0, 0}, {0, 0}};

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            for (int k = 0; k < 2; k++) {
                product[i][j] += m1[i][k] * m2[k][j];
            }
        }
    }

    printf("\\n--- Result of 2x2 Matrix Multiplication ---\\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            printf("%d ", product[i][j]);
        }
        printf("\\n");
    }

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int a[3][3] = {{1, 2, 3}, ...};', explanation: 'Creates a 3x3 matrix initialized using nested row brackets.' },
          { line: 'sum[i][j] = a[i][j] + b[i][j];', explanation: 'Direct element-by-element addition of corresponding row and column indices.' },
          { line: 'product[i][j] += m1[i][k] * m2[k][j];', explanation: 'Triple-nested loop computing the dot product of row i and column j.' }
        ],
        keyConcepts: [
          'Row-Major Order: Element [i][j] is stored at memory address: Base + (i * COLS + j) * sizeof(type).',
          'Matrix Addition requires both matrices to have the exact same row and column dimensions.',
          'Matrix Multiplication requires columns of Matrix 1 to equal rows of Matrix 2.'
        ],
        commonMistakes: [
          'Omitting the column size in 2D array declarations (the column dimension is strictly mandatory)',
          'Confusing row index `i` with column index `j` inside nested loops'
        ],
        quickRevision: [
          'type mat[rows][cols]; declares a 2D matrix.',
          'Access elements using mat[row][col].',
          'Matrix multiplication uses 3 nested loops: i, j, and k.'
        ]
      }
    },
    {
      id: 'c-u4-t3',
      unitId: 'c-unit-4',
      courseId: 'c',
      order: 3,
      title: 'Character Arrays & Strings: Declaration, Memory Layout & Null Terminator',
      summary: 'Understand strings in C as null-terminated character sequences, memory byte allocation, and real-world applications in text processing and genome matching.',
      content: {
        definition: 'In C, String is not a built-in primitive data type. A String is a one-dimensional array of characters terminated by a special Null Character (\'\\0\', ASCII value 0). The null character tells the compiler and library routines where the string ends in memory.',
        syntax: `/* 1. Declaration of Character Arrays & Strings:
   char name[size]; // size must be at least: length of text + 1 (for '\\0')

/* 2. Initialization Variants:
   char s1[] = "HOME";                  // 4 chars + 1 '\\0' = 5 bytes in RAM
   char s2[10] = "HOME";                // 5 bytes used, 5 zero-filled bytes
   char s3[] = {'H','O','M','E','\\0'}; // Explicit character array with null byte
   char s4[] = {'c','h','a','r','$','*'}; // Raw character array (no null byte) */

/* 3. Uses and Importance:
   - Storing names, messages, and filenames
   - Text editors and word processors
   - Language processing and speech-to-text engines
   - DNA and genome sequence pattern matching */`,
        codeSnippet: `/* Demonstrating Character Arrays, String Sizing, and Null Terminator */
#include <stdio.h>
#include <string.h>

int main(void) {
    char str[] = "HOME";
    char letters[] = {'H', 'O', 'M', 'E', '\\0'};

    printf("String literal 'str'   : %s\\n", str);
    printf("Char array 'letters'   : %s\\n", letters);

    // Memory sizing demonstration
    printf("\\nMemory Footprint:\\n");
    printf("strlen(str)  = %zu characters (excludes '\\\\0')\\n", strlen(str));
    printf("sizeof(str)  = %zu bytes (includes '\\\\0')\\n", sizeof(str));

    // Inspecting characters and indices:
    printf("\\nCharacter Array Layout for \\"HOME\\":\\n");
    printf("Index  Char  ASCII\\n");
    for (int i = 0; i < 5; i++) {
        if (str[i] == '\\0') {
            printf("[%d]    '\\\\0'  0 (Null Terminator)\\n", i);
        } else {
            printf("[%d]    '%c'   %d\\n", i, str[i], str[i]);
        }
    }

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'char str[] = "HOME";', explanation: 'Allocates 5 bytes: \'H\'(0), \'O\'(1), \'M\'(2), \'E\'(3), and \'\\0\'(4).' },
          { line: 'strlen(str)', explanation: 'Returns 4 because strlen counts characters up to, but not including, \'\\0\'.' },
          { line: 'sizeof(str)', explanation: 'Returns 5 because sizeof counts all physical bytes allocated in RAM, including \'\\0\'.' }
        ],
        keyConcepts: [
          'C has no primitive `string` data type; strings are 1D character arrays ending with `\\0`.',
          'The null terminator `\\0` has an ASCII value of exactly 0.',
          'Always allocate array size at least `length + 1` to accommodate `\\0`.'
        ],
        commonMistakes: [
          'Allocating a 4-character array for a 4-letter word: char s[4] = "HOME"; leaves no room for \\0, causing buffer overruns and garbage output',
          'Confusing a single character \'A\' (1 byte) with a string "A" (2 bytes: \'A\' + \'\\0\')'
        ],
        quickRevision: [
          'String = 1D character array ending with `\\0`.',
          'strlen() excludes `\\0`; sizeof() includes `\\0`.',
          'Always size char arrays with `+ 1` extra byte.'
        ]
      }
    },
    {
      id: 'c-u4-t4',
      unitId: 'c-unit-4',
      courseId: 'c',
      order: 4,
      title: 'Reading Strings from Terminal & Writing to Screen',
      summary: 'Safely read user input from the console using scanf, fgets, and %[^\n], and output strings to screen using printf and puts.',
      content: {
        definition: 'Terminal String I/O involves accepting character streams from the keyboard (stdin) and displaying character strings on the monitor (stdout). C provides multiple functions: scanf("%s") reads single words, scanf("%[^\\n]") or fgets() reads whole sentences with spaces, and puts() writes strings with an automatic newline.',
        syntax: `/* 1. Reading with scanf("%s", str):
   - Reads a single word; STOPS on the first whitespace (space, tab, newline).
   - Does NOT require & operator: scanf("%s", name); (name is already a memory address!)

/* 2. Reading Lines with Spaces:
   - scanf("%[^\\n]", str);  -> Reads characters until user presses Enter (newline)
   - fgets(str, sizeof(str), stdin); -> Safe, modern function reading full lines with bounds checks
   - gets(str); -> DEPRECATED and dangerous (causes buffer overflow!)

/* 3. Writing Strings to Screen:
   - printf("%s", str);  -> Formatted string output
   - puts(str);          -> Prints string and automatically appends a newline character '\\n' */`,
        codeSnippet: `/* Demonstrating Terminal String Input & Output Techniques */
#include <stdio.h>
#include <string.h>

int main(void) {
    char singleWord[30];
    char fullLine[100];

    // 1. Single word input (simulated)
    printf("Simulating scanf(\"%%s\", name):\\n");
    strcpy(singleWord, "Dennis"); // scanf would stop here if input was "Dennis Ritchie"
    printf("Read single word: %s\\n", singleWord);

    // 2. Full line with spaces (simulated fgets)
    printf("\\nSimulating fgets(line, sizeof, stdin):\\n");
    strcpy(fullLine, "Dennis Ritchie created C in 1972\\n");
    
    // Strip trailing newline left by fgets:
    size_t len = strlen(fullLine);
    if (len > 0 && fullLine[len - 1] == '\\n') {
        fullLine[len - 1] = '\\0';
    }

    // 3. Output with printf vs puts
    printf("Output with printf: [%s]\\n", fullLine);
    printf("Output with puts  : ");
    puts(fullLine); // automatically adds \\n

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'scanf("%s", name);', explanation: 'No & operator is needed because the array name `name` decays to a pointer to its first element.' },
          { line: 'fgets(fullLine, sizeof, stdin);', explanation: 'Safely reads characters including whitespace up to the buffer limit, preventing memory corruption.' },
          { line: 'puts(fullLine);', explanation: 'Streams characters to stdout and appends a trailing newline.' }
        ],
        keyConcepts: [
          'scanf("%s") terminates input on the first whitespace encountered.',
          'Never use the gets() function: it lacks buffer bounds checking and was removed in modern C standards.',
          'fgets() keeps the trailing newline (\'\\n\') if buffer space allows; always check and strip it if needed.'
        ],
        commonMistakes: [
          'Using `&str` in `scanf("%s", &str)` (unnecessary and redundant; use `str`)',
          'Using `scanf("%s")` to read full names with spaces, resulting in only the first name being read'
        ],
        quickRevision: [
          'scanf("%s", str) reads until space.',
          'fgets(str, sizeof, stdin) reads whole line with spaces.',
          'puts(str) prints string + newline.'
        ]
      }
    },
    {
      id: 'c-u4-t5',
      unitId: 'c-unit-4',
      courseId: 'c',
      order: 5,
      title: 'String Handling Functions & Practice Programs (Palindrome, Reverse, Swap)',
      summary: 'Master the standard string manipulation library (<string.h>): strlen, strcpy, strcat, strcmp, strrev, character frequency counting, string swapping with pointers, and palindrome verification.',
      content: {
        definition: 'The C Standard Library `<string.h>` provides built-in functions to manipulate null-terminated strings: measuring length, copying buffers, concatenating strings, comparing lexicographical order, and inverting character sequences.',
        syntax: `/* Standard <string.h> Functions:
   strlen(str)         : Returns character count excluding null terminator '\\0'
   strcpy(dest, src)   : Copies src string into dest (overwrites dest)
   strcat(dest, src)   : Appends src string to the end of dest
   strcmp(s1, s2)      : Lexicographical comparison:
                         returns 0 if s1 == s2
                         returns <0 if s1 < s2
                         returns >0 if s1 > s2
   strrev(str)         : Reverses string in-place (available in many C runtimes) */`,
        codeSnippet: `/* Comprehensive Demonstration of String Functions, Palindrome & Character Frequency */
#include <stdio.h>
#include <string.h>
#include <stdbool.h>

// Function to check if a string is a palindrome
bool checkPalindrome(const char str[]) {
    int left = 0;
    int right = strlen(str) - 1;
    while (left < right) {
        if (str[left] != str[right]) return false;
        left++;
        right--;
    }
    return true;
}

int main(void) {
    printf("--- 1. String Functions (<string.h>) ---\\n");
    char s1[50] = "Hello, ";
    const char s2[] = "learners!";
    
    // strlen
    printf("Length of s1: %zu\\n", strlen(s1));
    
    // strcat: concatenate s2 to s1
    strcat(s1, s2);
    printf("After strcat : %s\\n", s1);

    // strcpy: copy into new buffer
    char duplicate[50];
    strcpy(duplicate, s1);
    printf("After strcpy : %s\\n", duplicate);

    // strcmp: comparison
    printf("strcmp(\"abc\", \"abc\") : %d (identical)\\n", strcmp("abc", "abc"));
    printf("strcmp(\"abc\", \"xyz\") : %d (abc < xyz)\\n", strcmp("abc", "xyz"));

    printf("\\n--- 2. Character Frequency Counter ---\\n");
    char text[] = "This website is awesome";
    char searchChar = 'e';
    int freq = 0;
    for (int i = 0; text[i] != '\\0'; i++) {
        if (text[i] == searchChar) freq++;
    }
    printf("Frequency of '%c' in \\"%s\\" = %d\\n", searchChar, text, freq);

    printf("\\n--- 3. Palindrome String Verification ---\\n");
    char testWord[] = "abbba";
    printf("Word \\"%s\\" is %s\\n", testWord, 
           checkPalindrome(testWord) ? "a PALINDROME" : "NOT a palindrome");

    return 0;
}`,
        lineByLineExplanation: [
          { line: 'strcat(s1, s2);', explanation: 'Locates \'\\0\' in s1, appends all characters of s2, and writes a final \'\\0\'.' },
          { line: 'strcpy(duplicate, s1);', explanation: 'Duplicates string content from s1 into destination buffer.' },
          { line: 'while (left < right) ...', explanation: 'Two-pointer palindrome check comparing symmetrical characters from both ends.' },
          { line: 'if (text[i] == searchChar) freq++;', explanation: 'Linear search iterating through character array until null terminator.' }
        ],
        keyConcepts: [
          'Destination buffer for strcat() and strcpy() must be large enough to hold combined characters plus \'\\0\'.',
          'strcmp() returns 0 when strings match; check if (strcmp(a, b) == 0).',
          'Never compare strings with `if (s1 == s2)` — that compares pointer memory addresses, not string text!'
        ],
        commonMistakes: [
          'Buffer overflow: calling strcat into an array that does not have enough unallocated space',
          'Using == to compare string contents instead of strcmp()'
        ],
        quickRevision: [
          'strlen(s) returns character length.',
          'strcpy(dest, src) copies string.',
          'strcat(dest, src) appends string.',
          'strcmp(s1, s2) == 0 means strings are identical.'
        ]
      }
    }
  ]
};

export const cUnit4Quiz: Quiz = {
  id: 'quiz-c-4',
  unitId: 'c-unit-4',
  courseId: 'c',
  unitTitle: 'Unit 4: Arrays and Strings',
  title: 'Arrays & Strings Certification Quiz',
  passingScorePercent: 80,
  questions: [
    {
      id: 'q-c4-1',
      question: 'What is the index of the final element in an array declared as "int rollnumbers[10];"?',
      options: ['10', '9', '11', '0'],
      correctIndex: 1,
      explanation: 'C arrays use zero-based indexing. For an array of size 10, valid indices are 0 through 9.'
    },
    {
      id: 'q-c4-2',
      question: 'How are two-dimensional (2D) arrays stored sequentially in computer RAM in C?',
      options: [
        'Row-Major Order (row by row sequentially)',
        'Column-Major Order',
        'Diagonal Linked Order',
        'Segment Block Order'
      ],
      correctIndex: 0,
      explanation: 'In C, 2D arrays are stored in Row-Major Order, where all elements of row 0 are stored, followed immediately by row 1, etc.'
    },
    {
      id: 'q-c4-3',
      question: 'How many bytes of memory are allocated for the string literal "HOME" in C?',
      options: ['4 bytes', '5 bytes', '8 bytes', '10 bytes'],
      correctIndex: 1,
      explanation: 'The string literal "HOME" contains 4 characters (\'H\', \'O\', \'M\', \'E\') plus 1 byte for the terminating null character (\'\\0\'), occupying 5 bytes total.'
    },
    {
      id: 'q-c4-4',
      question: 'Why does scanf("%s", str) stop reading when the user types "Dennis Ritchie"?',
      options: [
        'scanf("%s") terminates input upon encountering the first whitespace character (space)',
        'The name is longer than 10 characters',
        'C forbids uppercase characters in input',
        'Ritchie is a reserved word'
      ],
      correctIndex: 0,
      explanation: 'The %s format specifier in scanf terminates reading when it reaches whitespace (space, tab, or newline).'
    },
    {
      id: 'q-c4-5',
      question: 'What does the standard function call "strcmp(str1, str2)" return when both strings are identical?',
      options: ['1', '0', '-1', 'true'],
      correctIndex: 1,
      explanation: 'strcmp() returns integer 0 when both strings have identical characters and lengths.'
    }
  ]
};
