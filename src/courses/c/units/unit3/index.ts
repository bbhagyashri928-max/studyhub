import { Unit, Quiz } from '@/types';

export const cUnit3: Unit = {
  id: 'c-unit-3',
  courseId: 'c',
  unitNumber: 3,
  title: 'Arrays and Strings',
  description: 'Understand contiguous memory allocation, multi-dimensional matrices, null-terminated character sequences, and string manipulation libraries.',
  estimatedHours: 5.5,
  quizId: 'quiz-c-3',
  published: true,
  topics: [
    {
      id: 'c-u3-t1',
      unitId: 'c-unit-3',
      courseId: 'c',
      order: 1,
      title: 'Introduction to Arrays & One-Dimensional Arrays',
      summary: 'Explore contiguous fixed-size homogeneous data collections, zero-based indexing, and bounds safety in C.',
      content: {
        definition: 'An array is a collection of elements of the same data type stored in contiguous (adjacent) memory locations under a single variable name. Elements are accessed using zero-based indexing from 0 to (size - 1).',
        syntax: 'dataType arrayName[size]; // Declaration\nint numbers[5] = {10, 20, 30, 40, 50}; // Initialization',
        codeSnippet: `#include <stdio.h>

int main() {
    int scores[5] = {88, 92, 79, 95, 84};
    int total = 0;

    printf("Scores list:\\n");
    for (int i = 0; i < 5; i++) {
        printf("Index %d: %d (Address: %p)\\n", i, scores[i], (void*)&scores[i]);
        total += scores[i];
    }

    float average = (float)total / 5;
    printf("\\nTotal Score: %d | Class Average: %.2f\\n", total, average);
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int scores[5] = {88, 92, 79, 95, 84};', explanation: 'Allocates a contiguous block of 5 integers (5 * 4 = 20 bytes) in stack memory.' },
          { line: 'scores[i]', explanation: 'Subscript notation calculating address offset as: BaseAddress + (i * sizeof(int)).' },
          { line: '(float)total / 5', explanation: 'Explicit type casting total to float to prevent integer division truncation.' }
        ],
        keyConcepts: [
          'Elements occupy contiguous sequential bytes in memory',
          'Array index begins at 0 and ends at N - 1',
          'C does not perform bounds checking: accessing index N or -1 causes undefined behavior / memory corruption'
        ],
        commonMistakes: [
          'Off-by-one index error: accessing array[size] instead of array[size - 1]',
          'Trying to assign one array directly to another: arr1 = arr2 is invalid in C'
        ],
        quickRevision: [
          'Array name decays to a pointer to its first element in most expressions.',
          'Always keep track of array sizes manually; C arrays do not store their length.'
        ]
      }
    },
    {
      id: 'c-u3-t2',
      unitId: 'c-unit-3',
      courseId: 'c',
      order: 2,
      title: 'Two-Dimensional Arrays & Matrices',
      summary: 'Represent tabular grids, matrices, row-major memory layout, and nested loop iterations.',
      content: {
        definition: 'A two-dimensional array is an array of arrays organized as rows and columns. In C, 2D arrays are stored in memory using row-major order, where all elements of row 0 are followed immediately by row 1.',
        syntax: 'dataType matrix[rows][columns];\nint grid[2][3] = {\n    {1, 2, 3},\n    {4, 5, 6}\n};',
        codeSnippet: `#include <stdio.h>

int main() {
    int matrix[2][3] = {
        {10, 20, 30},
        {40, 50, 60}
    };

    printf("2x3 Matrix contents:\\n");
    for (int r = 0; r < 2; r++) {
        for (int c = 0; c < 3; c++) {
            printf("%4d", matrix[r][c]);
        }
        printf("\\n");
    }
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'int matrix[2][3]', explanation: 'Creates a 2D array with 2 rows and 3 columns, allocating 6 * sizeof(int) = 24 bytes in row-major layout.' },
          { line: 'for (int r = 0; r < 2; r++)', explanation: 'Outer loop iterates through each row sequentially.' },
          { line: 'for (int c = 0; c < 3; c++)', explanation: 'Inner loop traverses each column cell within the active row.' }
        ],
        keyConcepts: [
          'Row-major ordering: memory layout is contiguous row by row',
          'When passing a 2D array to a function, the column dimension must be specified (e.g. void display(int m[][3], int rows))',
          'Applications include matrices, 2D game grids, digital image pixel data'
        ],
        commonMistakes: [
          'Inverting row and column indices: matrix[col][row]',
          'Omitting column size in multidimensional function parameter declarations'
        ],
        quickRevision: [
          'Row-major order: matrix[row][col].',
          'Total elements = rows * columns.',
          'Memory address = Base + ((row * totalColumns + col) * elementSize).'
        ]
      }
    },
    {
      id: 'c-u3-t3',
      unitId: 'c-unit-3',
      courseId: 'c',
      order: 3,
      title: 'Strings in C: Null-Terminated Character Arrays',
      summary: 'Understand how C represents text as null-terminated character sequences, string literals, and buffer sizing.',
      content: {
        definition: 'In C, a string is a 1D sequence of characters terminated by a special null character \'\\0\' (ASCII value 0). There is no native primitive "string" type in C; strings are handled as char arrays.',
        syntax: 'char name[20] = "Codeverse"; // Allocates 20 bytes; stores \'C\',\'o\',...,\'e\',\'\\0\'\nchar explicit[] = {\'H\', \'i\', \'\\0\'};',
        codeSnippet: `#include <stdio.h>

int main() {
    char greeting[] = "Hello";
    
    printf("String text: %s\\n", greeting);
    printf("Total bytes reserved: %zu\\n", sizeof(greeting)); // 6 bytes (5 chars + '\\0')
    
    printf("Individual characters & ASCII values:\\n");
    for (int i = 0; greeting[i] != '\\0'; i++) {
        printf("Index %d: \'%c\' (ASCII %d)\\n", i, greeting[i], greeting[i]);
    }
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'char greeting[] = "Hello";', explanation: 'The compiler automatically appends a trailing \'\\0\' null terminator, sizing the array to 6 elements.' },
          { line: 'greeting[i] != \'\\0\'', explanation: 'Idiomatic C loop idiom iterating over characters until reaching the terminal null byte.' }
        ],
        keyConcepts: [
          'The null character \'\\0\' marks the logical end of a string in memory',
          'A char array holding N characters must have capacity of at least N + 1 for \'\\0\'',
          'String literals (e.g. "text") are stored in read-only data segments and should not be modified directly'
        ],
        commonMistakes: [
          'Forgetting space for \'\\0\' (e.g., char str[4] = "Code"; causes buffer overflow)',
          'Using == to compare strings in C: if (str1 == str2) compares memory addresses, not string contents!'
        ],
        quickRevision: [
          'Strings are null-terminated char arrays.',
          'Always allocate 1 extra byte for \'\\0\'.',
          'Never compare C strings with ==; use strcmp().'
        ]
      }
    },
    {
      id: 'c-u3-t4',
      unitId: 'c-unit-3',
      courseId: 'c',
      order: 4,
      title: 'String Handling Functions: strlen, strcpy, strcmp & strcat',
      summary: 'Master standard <string.h> functions to calculate length, copy memory, compare lexicographically, and concatenate strings.',
      content: {
        definition: '<string.h> provides essential utility functions to manipulate null-terminated character strings: strlen() for byte count, strcpy() for copying, strcmp() for lexicographical comparison, and strcat() for appending.',
        syntax: '#include <string.h>\nsize_t len = strlen(str);        // Count excluding \\0\nstrcpy(dest, src);              // Copy src into dest\nint cmp = strcmp(str1, str2);   // 0 if identical, <0 if str1 < str2\nstrcat(dest, src);              // Append src onto dest',
        codeSnippet: `#include <stdio.h>
#include <string.h>

int main() {
    char first[30] = "Code";
    char second[] = "verse";
    char copy[30];

    // 1. strlen
    printf("Length of first: %zu\\n", strlen(first));

    // 2. strcat
    strcat(first, second);
    printf("Concatenated result: %s\\n", first);

    // 3. strcpy
    strcpy(copy, first);
    printf("Copied buffer: %s\\n", copy);

    // 4. strcmp
    if (strcmp(first, copy) == 0) {
        printf("Strings are identical!\\n");
    }
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'strlen(first)', explanation: 'Counts characters in the string up to but not including the terminating \'\\0\'.' },
          { line: 'strcat(first, second)', explanation: 'Appends characters from second to the end of first, overwriting first\'s \'\\0\' and adding a new \'\\0\' at the end.' },
          { line: 'strcmp(first, copy) == 0', explanation: 'Compares ASCII values character by character; returns 0 if exact match.' }
        ],
        keyConcepts: [
          'Destination buffer in strcpy and strcat must be sufficiently large to hold the combined result plus \'\\0\'',
          'strcmp returns negative if str1 comes before str2 alphabetically, 0 if equal, positive if after',
          'Safer alternatives exist: strncpy, strncat, strncmp to guard against buffer overruns'
        ],
        commonMistakes: [
          'Destination buffer too small in strcat/strcpy leading to memory corruption or crashes',
          'Passing non-null-terminated buffers to <string.h> functions'
        ],
        quickRevision: [
          'strlen(): length excluding null byte.',
          'strcpy(): copies source into destination.',
          'strcmp(): returns 0 for equal strings.',
          'strcat(): concatenates source onto destination.'
        ]
      }
    }
  ]
};

export const cUnit3Quiz: Quiz = {
  id: 'quiz-c-3',
  unitId: 'c-unit-3',
  courseId: 'c',
  unitTitle: 'Unit 3: Arrays and Strings',
  title: 'Unit 3 Mastery Quiz',
  passingScorePercent: 60,
  questions: [
    {
      id: 'q-c3-1',
      question: 'What is the index of the last element in an array declared as int data[10];?',
      options: ['10', '9', '11', '0'],
      correctIndex: 1,
      explanation: 'Arrays in C use zero-based indexing. For a size of 10, valid indices range from 0 to 9.'
    },
    {
      id: 'q-c3-2',
      question: 'How many bytes are allocated in total for char phrase[] = "Academy"; on a 64-bit system?',
      options: ['7 bytes', '8 bytes', '16 bytes', '4 bytes'],
      correctIndex: 1,
      explanation: '"Academy" contains 7 visible characters plus 1 invisible trailing null terminator (\'\\0\'), making 8 bytes in total.'
    },
    {
      id: 'q-c3-3',
      question: 'What does strcmp(str1, str2) return if both strings are identical in content?',
      options: ['1', 'true', '0', '-1'],
      correctIndex: 2,
      explanation: 'strcmp() returns 0 when both strings have identical characters up to their null terminators.'
    },
    {
      id: 'q-c3-4',
      question: 'Why should you NOT use (str1 == str2) to check if two C strings have identical text?',
      options: [
        'Because C does not support the == operator',
        'Because it compares the memory addresses of the pointers, not the character contents',
        'Because == modifies the strings during evaluation',
        'Because it throws a compile error'
      ],
      correctIndex: 1,
      explanation: 'In C, array names and string pointers evaluate to memory addresses. The == operator tests whether both pointers point to the exact same memory address.'
    },
    {
      id: 'q-c3-5',
      question: 'In C, in which order are elements of a 2D array arranged in physical memory?',
      options: [
        'Column-major order',
        'Row-major order',
        'Diagonal order',
        'Random order determined at runtime'
      ],
      correctIndex: 1,
      explanation: 'C stores multidimensional arrays in Row-major order, where complete rows are placed one after another in contiguous memory.'
    }
  ]
};
