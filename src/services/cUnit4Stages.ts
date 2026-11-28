import { Stage } from '@/types';

/**
 * High-fidelity, syllabus-accurate stages for C Unit 4:
 * "Arrays and Strings"
 * Directly derived from university syllabus and lecture notes (Unit- 4: ARRAYS).
 */
export const cUnit4CustomStages: Stage[] = [
  // =========================================================================
  // TOPIC 1: One-Dimensional Arrays -> Stages 1 to 6
  // =========================================================================
  {
    id: 'c-u4-t1-s1',
    topicId: 'c-u4-t1',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 1,
    title: 'Stage 1: Introduction to Arrays — Definition & Homogeneous Data',
    subtitle: 'Array Foundations Level 1',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'An Array in C is a data structure that can store a fixed-size sequential collection of elements of the same data type. Instead of declaring 50 separate variables for 50 students, we declare a single array variable.',
      definitions: [
        'Array: A contiguous, fixed-size collection of homogeneous (same data type) variables stored under one identifier name.',
        'Homogeneous: All elements inside an array must be of the identical data type (e.g. all int, all float, or all char).',
        'Real-world Examples: List of employees in an organization, list of product prices in a store, test scores of students, customer records.'
      ],
      syntax: `1D Array Concept:
Instead of: int score1, score2, score3, score4, score5;
We write  : int scores[5]; // Stores 5 integer scores sequentially in RAM`,
      realLifeExample: 'An egg carton: a single physical container with 12 identical slots designed to hold 12 eggs of the same kind.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    // Array storing 5 student exam scores
    int scores[5] = {85, 92, 78, 90, 88};
    
    printf("Total scores stored in array: 5\\n");
    printf("First score : %d\\n", scores[0]);
    printf("Last score  : %d\\n", scores[4]);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int scores[5] = {85, 92, 78, 90, 88};', explanation: 'Allocates a contiguous block of 5 integers (20 bytes total) in RAM.' }
      ],
      expectedOutput: `Total scores stored in array: 5\nFirst score : 85\nLast score  : 88`,
      pointsToRemember: [
        'An array stores elements of the same data type only.',
        'Array size is fixed at declaration and cannot be resized dynamically in standard C.'
      ]
    },
    quiz: {
      question: 'Which of the following is a fundamental characteristic of arrays in C?',
      options: [
        'All elements must be of the same data type (homogeneous)',
        'Elements can be of mixed data types (int and float together)',
        'Arrays can automatically grow and shrink in size during execution',
        'Arrays are stored randomly across different RAM locations'
      ],
      correctIndex: 0,
      explanation: 'Arrays in C are homogeneous data structures; every element must share the exact same data type.'
    }
  },
  {
    id: 'c-u4-t1-s2',
    topicId: 'c-u4-t1',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 2,
    title: 'Stage 2: Declaration of 1-D Arrays & Zero-Based Indexing',
    subtitle: 'Declaration & Memory Level 2',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'A one-dimensional array has just one dimension (a single row or column of elements, also called a vector). In C, arrays strictly follow zero-based indexing: the first element is at index 0, and the last is at index size - 1.',
      definitions: [
        'Declaration Syntax: `type variable_name [size];`',
        'Zero-Based Indexing: Index values start at 0, not 1. For size 10, valid indices are 0 to 9.',
        'Subscript / Index: The integer inside square brackets `[i]` specifying element position.'
      ],
      syntax: `1D Array Declaration Syntax:
type variable_name [size];

Examples from Syllabus:
float height[30];  // Array of 30 floats
char name[40];     // Array of 40 characters
int rollno[10];    // Indices: 0, 1, 2, ..., 9`,
      realLifeExample: 'Hotel room numbering starting at floor 0 (Ground Floor): Room 0 is the first room, Room 1 is the second room, etc.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int nums[5]; // declared with size 5
    // Valid indices: nums[0], nums[1], nums[2], nums[3], nums[4]
    nums[0] = 11;
    nums[1] = 22;
    nums[2] = 33;
    nums[3] = 44;
    nums[4] = 55;
    
    printf("nums[0] = %d (First element)\\n", nums[0]);
    printf("nums[4] = %d (Last element: size - 1)\\n", nums[4]);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int nums[5];', explanation: 'Reserves 5 contiguous integer slots in memory.' },
        { line: 'nums[0] = 11;', explanation: 'Assigns 11 to the 0th index (first slot).' }
      ],
      expectedOutput: `nums[0] = 11 (First element)\nnums[4] = 55 (Last element: size - 1)`,
      pointsToRemember: [
        'The last element in an array of size N is ALWAYS at index N - 1.',
        'Accessing index N (e.g. nums[5] in size 5) leads to buffer overflow / memory corruption.'
      ]
    },
    quiz: {
      question: 'What is the index of the first and last element in an array declared as "float height[30];"?',
      options: ['First: 0, Last: 29', 'First: 1, Last: 30', 'First: 0, Last: 30', 'First: 1, Last: 29'],
      correctIndex: 0,
      explanation: 'Under C zero-based indexing, the first element is at index 0 and the 30th element is at index 29 (size - 1).'
    }
  },
  {
    id: 'c-u4-t1-s3',
    topicId: 'c-u4-t1',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 3,
    title: 'Stage 3: Compile-Time vs. Run-Time (Dynamic) Initialization',
    subtitle: 'Initialization Modes Level 3',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'An array can be initialized at two distinct stages: at Compile-Time (build-time with initializer list `{ ... }`) or at Run-Time (dynamically by reading user input with `scanf()` inside a loop).',
      definitions: [
        'Compile-Time Initialization: Values are hardcoded at build time: `int nums[3] = {0, 1, 2};`.',
        'Run-Time (Dynamic) Initialization: Values are populated during execution via keyboard input: `scanf("%d", &nums[i]);`.'
      ],
      syntax: `1. Compile-Time:
int rollnumbers[4] = {2, 5, 6, 7};
float area[5] = {23.4, 6.8, 5.5, 7.3, 2.4};

2. Run-Time:
for (int i = 0; i < 5; i++) {
    scanf("%d", &nums[i]);
}`,
      realLifeExample: 'Compile-Time is a pre-printed form with fixed instructions. Run-Time is handing a blank form to a customer to fill in their details at the counter.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    // Compile-time initialization
    int compileNums[3] = {10, 20, 30};
    printf("Compile-Time Initialized Elements:\\n");
    printf("%d %d %d\\n", compileNums[0], compileNums[1], compileNums[2]);

    // Run-time simulated dynamic initialization
    int dynamicNums[5];
    printf("\\nSimulating Run-Time Dynamic Initialization (10 20 30 40 50):\\n");
    for (int i = 0; i < 5; i++) {
        dynamicNums[i] = (i + 1) * 10; // simulates user typing inputs
    }
    for (int i = 0; i < 5; i++) {
        printf("%d ", dynamicNums[i]);
    }
    printf("\\n");
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int compileNums[3] = {10, 20, 30};', explanation: 'Initialized by compiler before runtime.' },
        { line: 'scanf("%d", &nums[i]);', explanation: 'Run-time initialization writing user input into the address of slot i.' }
      ],
      expectedOutput: `Compile-Time Initialized Elements:\n10 20 30\n\nSimulating Run-Time Dynamic Initialization (10 20 30 40 50):\n10 20 30 40 50 `,
      pointsToRemember: [
        'Uninitialized local arrays contain random garbage memory!',
        'Run-time initialization allows different data sets on each program run.'
      ]
    },
    quiz: {
      question: 'Which method of array initialization allows user input from the keyboard during program execution?',
      options: ['Run-time (dynamic) initialization using loops and scanf()', 'Compile-time initialization', 'Preprocessor initialization', 'Header initialization'],
      correctIndex: 0,
      explanation: 'Run-time initialization accepts data dynamically from the user or files while the program is running.'
    }
  },
  {
    id: 'c-u4-t1-s4',
    topicId: 'c-u4-t1',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 4,
    title: 'Stage 4: Core Array Traversal: Printing in Forward and Reverse Order',
    subtitle: 'Traversal Algorithms Level 4',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Traversal visits each element of an array sequentially. Forward traversal loops from index `0` up to `size - 1`. Reverse traversal loops backward from index `size - 1` down to `0`.',
      definitions: [
        'Traversal: Visiting every element of a data structure exactly once to read or process its value.',
        'Forward Loop: `for (i = 0; i < size; i++)`',
        'Reverse Loop: `for (i = size - 1; i >= 0; i--)`'
      ],
      syntax: `Traversal Algorithms:
Forward Traversal : Loop i from 0 to size - 1
Reverse Traversal : Loop i from size - 1 down to 0`,
      realLifeExample: 'Walking down a hallway and reading apartment door numbers 1 to 10 on the way in, and reading 10 down to 1 on the way out.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int array[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 0};
    
    // Forward traversal
    printf("Forward traversal : ");
    for (int i = 0; i < 10; i++) {
        printf("%d ", array[i]);
    }
    printf("\\n");

    // Reverse traversal
    printf("Reverse traversal : ");
    for (int i = 9; i >= 0; i--) {
        printf("%d ", array[i]);
    }
    printf("\\n");
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'for (int i = 0; i < 10; i++)', explanation: 'Visits indices 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.' },
        { line: 'for (int i = 9; i >= 0; i--)', explanation: 'Visits indices 9, 8, 7, 6, 5, 4, 3, 2, 1, 0.' }
      ],
      expectedOutput: `Forward traversal : 1 2 3 4 5 6 7 8 9 0 \nReverse traversal : 0 9 8 7 6 5 4 3 2 1 `,
      pointsToRemember: [
        'Reverse loops must start at size - 1 and stop at i >= 0 with i--.',
        'Starting reverse loop at size (e.g. i = 10) causes out-of-bounds access.'
      ]
    },
    quiz: {
      question: 'In an array of 10 elements, what should be the initial value of loop counter "i" for reverse traversal?',
      options: ['9', '10', '0', '1'],
      correctIndex: 0,
      explanation: 'For size 10, the last element is at index 9 (size - 1), so the loop begins at i = 9.'
    }
  },
  {
    id: 'c-u4-t1-s5',
    topicId: 'c-u4-t1',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 5,
    title: 'Stage 5: Array Mathematics: Calculating Sum and Average of Elements',
    subtitle: 'Array Accumulation Level 5',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'To compute the sum, an accumulator variable is initialized to 0, and each element is added inside a loop. The average is calculated by dividing sum by the number of elements, casting to float to preserve decimals.',
      definitions: [
        'Accumulator (`sum`): Variable initialized to 0 that accumulates array values.',
        'Type Casting `(float)sum`: Ensures floating-point division is used so decimals are not truncated.'
      ],
      syntax: `Algorithm for Sum and Average:
1. sum = 0
2. For each element in array: sum = sum + array[i]
3. avg = (float)sum / size
4. Display sum and avg`,
      realLifeExample: 'Calculating your grade point average: adding up scores across all subjects and dividing by the total number of subjects.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int array[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 0};
    int sum = 0;
    
    for (int i = 0; i < 10; i++) {
        sum += array[i];
    }
    float avg = (float)sum / 10;
    
    printf("Sum of array elements = %d\\n", sum);
    printf("Average of array      = %.2f\\n", avg);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'sum += array[i];', explanation: 'Adds each element to the running total sum.' },
        { line: 'float avg = (float)sum / 10;', explanation: 'Casts sum to float to avoid integer truncation: 45 / 10 = 4.50.' }
      ],
      expectedOutput: `Sum of array elements = 45\nAverage of array      = 4.50`,
      pointsToRemember: [
        'Always initialize sum to 0 before the loop!',
        'Cast sum to float before division to preserve fractional averages.'
      ]
    },
    quiz: {
      question: 'What happens if you calculate average as "avg = sum / 10;" when sum is an int (e.g. sum = 45)?',
      options: [
        'Integer division truncates the result to 4.00, losing the decimal fraction .50',
        'C automatically keeps the decimals',
        'It causes a runtime crash',
        'It rounds up to 5.00'
      ],
      correctIndex: 0,
      explanation: 'In C, int / int produces an int. 45 / 10 truncates to 4, which is then assigned as 4.00.'
    }
  },
  {
    id: 'c-u4-t1-s6',
    topicId: 'c-u4-t1',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 6,
    title: 'Stage 6: Array Search Extremes: Finding Largest & Smallest Elements',
    subtitle: 'Extremes Search Level 6',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'To find the largest or smallest element in an array, assume the first element `array[0]` is the extreme. Then iterate through the rest of the array (from index 1 to size - 1), updating the extreme whenever a larger (or smaller) element is found.',
      definitions: [
        'Element Extremes: Iterating through an array to record the minimum and maximum stored values.'
      ],
      syntax: `// C Array Min & Max Traversal Syntax:
int min = array[0], max = array[0];
for (int i = 1; i < size; i++) {
    if (array[i] > max) max = array[i];
    if (array[i] < min) min = array[i];
}`,
      realLifeExample: 'Looking for the tallest student in a classroom: you start with the first student, compare their height to each classmate one by one, and track whoever is taller.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int array[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 0};
    int largest = array[0];
    int smallest = array[0];
    
    for (int i = 1; i < 10; i++) {
        if (array[i] > largest)  largest = array[i];
        if (array[i] < smallest) smallest = array[i];
    }
    
    printf("Largest element  = %d\\n", largest);
    printf("Smallest element = %d\\n", smallest);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int largest = array[0];', explanation: 'Assumes first element is initially the largest candidate.' },
        { line: 'for (int i = 1; i < 10; i++)', explanation: 'Loops through remaining elements starting at index 1.' }
      ],
      expectedOutput: `Largest element  = 9\nSmallest element = 0`,
      pointsToRemember: [
        'Always initialize `largest` and `smallest` with `array[0]`, NOT with 0 (which breaks for all-negative numbers!).',
        'Start the comparison loop at index 1 since index 0 is already the candidate.'
      ]
    },
    quiz: {
      question: 'Why should "largest" be initialized to array[0] instead of 0?',
      options: [
        'If all numbers in the array are negative (e.g. -5, -10, -2), initializing to 0 would give an incorrect answer of 0',
        'Because index 0 is always positive',
        'Because C does not allow variables initialized to 0',
        'To speed up CPU clock cycles'
      ],
      correctIndex: 0,
      explanation: 'If an array contains only negative numbers, initializing largest to 0 would falsely report 0 as the largest element.'
    }
  },

  // =========================================================================
  // TOPIC 2: Multi-Dimensional Arrays & Matrices -> Stages 1 to 5
  // =========================================================================
  {
    id: 'c-u4-t2-s1',
    topicId: 'c-u4-t2',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 1,
    title: 'Stage 1: Multi-Dimensional Concept: 2-D & 3-D Arrays as Tables',
    subtitle: 'Matrix Concepts Level 1',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'The dimension of an array refers to the number of indices needed to locate an element. A Two-Dimensional (2D) Array is an array of arrays, visualized as a matrix or grid with rows and columns. A 3D array adds depth, visualized as a cube or stack of 2D matrices.',
      definitions: [
        '2D Array (Matrix): An array organized in rows and columns: `type matrix[rows][cols];`.',
        '3D Array: A collection of 2D arrays organized one on top of the other: `type cube[layers][rows][cols];`.'
      ],
      syntax: `Declaration:
2D Array: type array_name [row_size] [column_size];
3D Array: type array_name [size1] [size2] [size3];

Example:
int matrix[2][3]; // 2 rows and 3 columns = 6 elements total`,
      realLifeExample: 'A chess board is an $8 \times 8$ 2D grid. A Rubik\'s Cube is a $3 \times 3 \times 3$ 3D array of small colored squares.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    // 2D Array with 2 rows and 3 columns
    int matrix[2][3] = {
        {1, 4, 2},
        {3, 6, 8}
    };
    printf("Matrix element at row 0, col 1: %d\\n", matrix[0][1]); // 4
    printf("Matrix element at row 1, col 2: %d\\n", matrix[1][2]); // 8
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'int matrix[2][3] = ...', explanation: 'Creates 2 rows and 3 columns with zero-based indexing.' }
      ],
      expectedOutput: `Matrix element at row 0, col 1: 4\nMatrix element at row 1, col 2: 8`,
      pointsToRemember: [
        '2D arrays require two subscripts: [row][column].',
        'Both rows and columns start at index 0.'
      ]
    },
    quiz: {
      question: 'How many total elements are allocated in an array declared as "int matrix[3][4];"?',
      options: ['12 elements', '7 elements', '34 elements', '6 elements'],
      correctIndex: 0,
      explanation: 'A 2D array contains row_size * col_size elements: 3 * 4 = 12 total elements.'
    }
  },
  {
    id: 'c-u4-t2-s2',
    topicId: 'c-u4-t2',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 2,
    title: 'Stage 2: Declaration & Initialization of 2-D Arrays',
    subtitle: 'Matrix Syntax Level 2',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'A 2D array can be initialized using an initializer list in two ways: Method 1 (writing all numbers in a single flat list) or Method 2 (using nested curly braces `{}` for each row, which is clearer and recommended).',
      definitions: [
        'Method 1 (Flat list): `int a[4][3] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11};`',
        'Method 2 (Row brackets): `int a[4][3] = {{0, 1, 2}, {3, 4, 5}, {6, 7, 8}, {9, 10, 11}};`'
      ],
      syntax: `Method 2 Initialization:
int a[4][3] = {
    {0, 1, 2},   // Row 0
    {3, 4, 5},   // Row 1
    {6, 7, 8},   // Row 2
    {9, 10, 11}  // Row 3
};`,
      realLifeExample: 'A spreadsheet with 4 rows and 3 columns where each cell holds an integer value.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    // Nested row brackets initialization
    int a[4][3] = {
        {0, 1, 2},
        {3, 4, 5},
        {6, 7, 8},
        {9, 10, 11}
    };
    
    printf("Row 2, Column 1 value: %d\\n", a[2][1]); // 7
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'printf("%d", a[2][1]);', explanation: 'Accesses row index 2 (third row) and column index 1 (second column) = 7.' }
      ],
      expectedOutput: `Row 2, Column 1 value: 7`,
      pointsToRemember: [
        'Nested braces explicitly show the boundary of each row.',
        'If fewer values are provided than the total size, remaining elements default to 0.'
      ]
    },
    quiz: {
      question: 'In the array "int a[4][3] = {{0,1,2},{3,4,5},{6,7,8},{9,10,11}};", what is the value of a[1][2]?',
      options: ['5', '4', '6', '2'],
      correctIndex: 0,
      explanation: '`a[1][2]` refers to row index 1 `{3, 4, 5}` and column index 2, which is 5.'
    }
  },
  {
    id: 'c-u4-t2-s3',
    topicId: 'c-u4-t2',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 3,
    title: 'Stage 3: Creating and Displaying a Matrix Using Nested Loops',
    subtitle: 'Matrix Traversal Level 3',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Traversing a 2D matrix requires two nested `for` loops: the outer loop iterates over the rows (index `i`), and the inner loop iterates over the columns (index `j`).',
      definitions: [
        'Outer Loop (`i`): Controls current row number.',
        'Inner Loop (`j`): Controls current column element within that row.',
        'Row-Major Traversal: Accesses elements row by row: `matrix[i][j]`.'
      ],
      syntax: `Nested Loop Matrix Pattern:
for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
        printf("%d ", matrix[i][j]);
    }
    printf("\\n"); // newline after each row
}`,
      realLifeExample: 'Reading a book: you read line by line from left to right (inner loop) and move down page line by line (outer loop).',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    
    printf("Matrix created using an array:\\n");
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'for (int i = 0; i < 3; i++)', explanation: 'Iterates through rows 0, 1, and 2.' },
        { line: 'printf("%d ", matrix[i][j]);', explanation: 'Prints each column element separated by a space.' },
        { line: 'printf("\\n");', explanation: 'Prints a newline after completing each row to create a visual matrix grid.' }
      ],
      expectedOutput: `Matrix created using an array:\n1 2 3 \n4 5 6 \n7 8 9 `,
      pointsToRemember: [
        'Outer loop handles rows; inner loop handles columns.',
        'Always print `\\n` after the inner loop finishes to display the matrix grid format.'
      ]
    },
    quiz: {
      question: 'Why is "printf(\"\\n\");" placed outside the inner loop but inside the outer loop in matrix printing?',
      options: [
        'To move to a new line after printing all columns of the current row',
        'To clear the computer screen',
        'To reset the inner loop counter to zero',
        'To terminate the program'
      ],
      correctIndex: 0,
      explanation: 'Printing `\\n` after the inner loop finishes formats the console output into rows and columns.'
    }
  },
  {
    id: 'c-u4-t2-s4',
    topicId: 'c-u4-t2',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 4,
    title: 'Stage 4: Matrix Arithmetic: Addition of Two 3x3 Matrices',
    subtitle: 'Matrix Math Level 4',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Two matrices can be added if and only if they have the same dimensions. Addition is performed by adding corresponding elements at the same row and column: `c[i][j] = a[i][j] + b[i][j]`.',
      definitions: [
        'Matrix Addition: Element-by-element addition: $C_{ij} = A_{ij} + B_{ij}$.'
      ],
      syntax: `Matrix Addition Loop:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        c[i][j] = a[i][j] + b[i][j];
    }
}`,
      realLifeExample: 'Adding monthly sales totals: adding January store revenue grid to February store revenue grid to get two-month totals.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    int a[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    int b[3][3] = {{9, 8, 7}, {6, 5, 4}, {3, 2, 1}};
    int c[3][3];

    // Compute sum: c[i][j] = a[i][j] + b[i][j]
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            c[i][j] = a[i][j] + b[i][j];
        }
    }

    printf("Result of 3x3 Matrix Addition:\\n");
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", c[i][j]);
        }
        printf("\\n");
    }
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'c[i][j] = a[i][j] + b[i][j];', explanation: 'Adds elements at index [i][j]: e.g. 1 + 9 = 10, 2 + 8 = 10, etc.' }
      ],
      expectedOutput: `Result of 3x3 Matrix Addition:\n10 10 10 \n10 10 10 \n10 10 10 `,
      pointsToRemember: [
        'Matrix addition requires identical dimensions for both input matrices.',
        'The resulting sum matrix has the same dimensions.'
      ]
    },
    quiz: {
      question: 'What is the required condition for performing matrix addition on two matrices A and B in C?',
      options: [
        'Both matrices must have the exact same number of rows and columns',
        'Matrix A must have more columns than Matrix B has rows',
        'Both matrices must be 3x3 only',
        'All elements must be positive'
      ],
      correctIndex: 0,
      explanation: 'Matrix addition is an element-wise operation that requires both matrices to have matching dimensions.'
    }
  },
  {
    id: 'c-u4-t2-s5',
    topicId: 'c-u4-t2',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 5,
    title: 'Stage 5: Matrix Multiplication: The Triple-Nested Loop Algorithm',
    subtitle: 'Matrix Algorithms Level 5',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Matrix multiplication calculates the dot product of rows from Matrix A with columns of Matrix B. It requires 3 nested loops: loop `i` for rows of A, loop `j` for columns of B, and loop `k` to accumulate the dot product.',
      definitions: [
        'Matrix Multiplication Formula: $M_{ij} = \\sum_{k=0}^{cols-1} (A_{ik} \\times B_{kj})$',
        'Condition: Number of columns in Matrix A must equal number of rows in Matrix B.'
      ],
      syntax: `// C 2D Matrix Multiplication Syntax:
for (int i = 0; i < r; i++) {
    for (int j = 0; j < c; j++) {
        m[i][j] = 0;
        for (int k = 0; k < common; k++) {
            m[i][j] += a[i][k] * b[k][j];
        }
    }
}`,
      realLifeExample: 'Calculating a shopping bill for multiple people: multiplying quantities of each item by their individual prices and adding them up.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    // 2x2 Matrix Multiplication from Syllabus
    // A = [[2, 3], [4, 5]], B = [[5, 6], [7, 8]]
    int a[2][2] = {{2, 3}, {4, 5}};
    int b[2][2] = {{5, 6}, {7, 8}};
    int m[2][2] = {{0, 0}, {0, 0}};

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            for (int k = 0; k < 2; k++) {
                m[i][j] += a[i][k] * b[k][j];
            }
        }
    }

    printf("Result of Matrix Multiplication:\\n");
    // Row 0: 2*5 + 3*7 = 10+21=31 | 2*6 + 3*8 = 12+24=36
    // Row 1: 4*5 + 5*7 = 20+35=55 | 4*6 + 5*8 = 24+40=64
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            printf("%d ", m[i][j]);
        }
        printf("\\n");
    }
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'm[i][j] += a[i][k] * b[k][j];', explanation: 'Computes sum of products for row i of A and column j of B.' }
      ],
      expectedOutput: `Result of Matrix Multiplication:\n31 36 \n55 64 `,
      pointsToRemember: [
        'Matrix multiplication requires 3 nested loops (i, j, k).',
        'Always initialize each `m[i][j]` accumulator to 0 before the k loop.'
      ]
    },
    quiz: {
      question: 'How many nested loops are required to implement matrix multiplication in C?',
      options: ['3 loops', '2 loops', '1 loop', '4 loops'],
      correctIndex: 0,
      explanation: 'Matrix multiplication requires 3 loops: rows of A (i), columns of B (j), and the dot-product accumulator index (k).'
    }
  },

  // =========================================================================
  // TOPIC 3: Character Arrays & Strings -> Stages 1 to 4
  // =========================================================================
  {
    id: 'c-u4-t3-s1',
    topicId: 'c-u4-t3',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 1,
    title: 'Stage 1: Character Arrays vs. Strings — Why C Has No String Type',
    subtitle: 'String Representation Level 1',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'In C, there is no primitive `string` data type (unlike Python or Java). Instead, a string is represented as a one-dimensional character array terminated by a special null character (`\\0`).',
      definitions: [
        'Character Array: A derived data type in C that stores a sequence of characters.',
        'String: A sequence of characters treated as a single data item terminated by a null character `\\0`.'
      ],
      syntax: `String Representation in C:
char str[] = "HOME";
Memory allocation:
Index:   0    1    2    3    4
Char : ['H', 'O', 'M', 'E', '\\0']
Total: 5 bytes in RAM!`,
      realLifeExample: 'A train with passenger cars: each letter sits in its own car, and the caboose at the very end is the null terminator `\\0` signaling the end of the train.',
      codeSnippet: `#include <stdio.h>

int main(void) {
    char greeting[] = "Hello";
    printf("String text: %s\\n", greeting);
    printf("C stores strings as arrays of char terminated by '\\\\0'\\n");
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'char greeting[] = "Hello";', explanation: 'Creates a character array with 6 bytes: \'H\',\'e\',\'l\',\'l\',\'o\', and implicit \'\\0\'.' }
      ],
      expectedOutput: `String text: Hello\nC stores strings as arrays of char terminated by '\\0'`,
      pointsToRemember: [
        'C has no native `string` keyword; strings are character arrays.',
        'Strings are always terminated by the null character `\\0`.'
      ]
    },
    quiz: {
      question: 'Is "string" a built-in primitive data type in the C programming language?',
      options: ['No, strings are 1D character arrays terminated by "\\0"', 'Yes, string is a primitive type', 'Only in C99', 'Only when using <stdio.h>'],
      correctIndex: 0,
      explanation: 'C does not have a primitive string type; strings are implemented as character arrays terminated by `\\0`.'
    }
  },
  {
    id: 'c-u4-t3-s2',
    topicId: 'c-u4-t3',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 2,
    title: 'Stage 2: The Null Character (\\0) — Role & Memory Allocation',
    subtitle: 'Null Terminator Level 2',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'The null character `\\0` (ASCII code 0) marks the exact end of a string. Functions like `printf("%s")` and `strlen()` read memory until they hit `\\0`. Without `\\0`, functions continue reading random garbage in RAM.',
      definitions: [
        'Null Character (`\\0`): An escape sequence representing byte value 0, used to identify the end of a string in memory.'
      ],
      syntax: `Size vs Length:
String literal "home"
- Length (visible letters) = 4 characters
- Size (RAM allocation)    = 5 bytes (includes '\\0')`,
      realLifeExample: 'A period `.` at the end of a sentence. Without the period, a reader doesn\'t know where one sentence ends and the next begins.',
      codeSnippet: `#include <stdio.h>
#include <string.h>

int main(void) {
    char word[] = "home";
    printf("Word: %s\\n", word);
    printf("strlen (visible letters)   : %zu\\n", strlen(word)); // 4
    printf("sizeof (allocated in memory): %zu bytes\\n", sizeof(word)); // 5
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'strlen(word)', explanation: 'Counts characters excluding \'\\0\', returning 4.' },
        { line: 'sizeof(word)', explanation: 'Measures total bytes in RAM including \'\\0\', returning 5.' }
      ],
      expectedOutput: `Word: home\nstrlen (visible letters)   : 4\nsizeof (allocated in memory): 5 bytes`,
      pointsToRemember: [
        '`\\0` has an ASCII value of 0.',
        'Always allocate array size >= length of text + 1.'
      ]
    },
    quiz: {
      question: 'How many bytes of memory are allocated for the string literal "computer" in C?',
      options: ['9 bytes', '8 bytes', '16 bytes', '7 bytes'],
      correctIndex: 0,
      explanation: '"computer" has 8 visible characters plus 1 byte for the terminating null character (`\\0`), totaling 9 bytes.'
    }
  },
  {
    id: 'c-u4-t3-s3',
    topicId: 'c-u4-t3',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 3,
    title: 'Stage 3: Declaration & Initialization of String Variables',
    subtitle: 'String Syntax Level 3',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Strings can be initialized using string literals in double quotes (which automatically add `\\0`) or as a character array with explicit single quotes.',
      definitions: [
        'String Literal: Enclosed in double quotes `"abcd"`; compiler automatically appends `\\0`.',
        'Character List: Enclosed in curly braces `{\'a\', \'b\', \'c\', \'d\', \'\\0\'}`; `\\0` must be explicitly included.'
      ],
      syntax: `Syntax Variations:
char c[] = "abcd";                         // 5 bytes (automatic '\\0')
char c[50] = "abcd";                       // 50 bytes buffer
char c[] = {'a', 'b', 'c', 'd', '\\0'};    // Explicit null byte
char c[5] = {'a', 'b', 'c', 'd', '\\0'};   // Explicit with size 5`,
      realLifeExample: 'Buying a pre-made sandwich (double quotes, wrapped with a napkin included) vs assembling the sandwich ingredient by ingredient (single quotes, must add wrapper yourself).',
      codeSnippet: `#include <stdio.h>

int main(void) {
    char s1[] = "abcd";
    char s2[] = {'a', 'b', 'c', 'd', '\\0'};
    
    printf("s1: %s\\n", s1);
    printf("s2: %s\\n", s2);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'char s1[] = "abcd";', explanation: 'Creates 5-byte array: \'a\',\'b\',\'c\',\'d\',\'\\0\'.' }
      ],
      expectedOutput: `s1: abcd\ns2: abcd`,
      pointsToRemember: [
        'Double quotes automatically add `\\0`.',
        'If using single quotes, you MUST write `\'\\0\'` at the end.'
      ]
    },
    quiz: {
      question: 'What happens if you initialize a character array as: char s[] = {\'a\', \'b\', \'c\'}; without \'\\0\'?',
      options: [
        'It is a raw character array, not a valid C string; printing it with %s may output trailing memory garbage',
        'The compiler automatically adds \'\\0\'',
        'The program fails to compile',
        'It becomes an integer array'
      ],
      correctIndex: 0,
      explanation: 'Without `\'\\0\'`, string functions cannot find where the string ends and will continue reading adjacent memory.'
    }
  },
  {
    id: 'c-u4-t3-s4',
    topicId: 'c-u4-t3',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 4,
    title: 'Stage 4: Real-World Applications of Character Arrays',
    subtitle: 'Industrial Relevance Level 4',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Character arrays power essential software infrastructure: text editors, compilers, file systems, speech-to-text processing, and bioinformatics DNA genome pattern matching.',
      definitions: [
        'Text Processing: Searching, replacing, and parsing text in files and editors.',
        'Genome Matching: Representing DNA nucleotide bases (A, C, G, T) as character arrays for sequence alignment.'
      ],
      syntax: `Applications from Syllabus:
1. File systems and text editors (Vim, Notepad, VS Code)
2. Natural language processing and speech recognition
3. DNA and genome sequence analysis (matching "ATCGGCTA")
4. Web URL parsing and network packets`,
      realLifeExample: 'Searching for a specific gene sequence ("GATTACA") in a patient\'s DNA data represented as a character array of 3 billion letters.',
      codeSnippet: `#include <stdio.h>
#include <string.h>

int main(void) {
    char dnaSequence[] = "ATGCGATCGTAA";
    printf("Analyzing DNA Sequence: %s\\n", dnaSequence);
    printf("Total base pairs: %zu\\n", strlen(dnaSequence));
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'char dnaSequence[] = "ATGCGATCGTAA";', explanation: 'Stores genetic letters as a character array.' }
      ],
      expectedOutput: `Analyzing DNA Sequence: ATGCGATCGTAA\nTotal base pairs: 12`,
      pointsToRemember: [
        'Character arrays are fundamental for storing text across all operating systems.',
        'Bioinformatics relies on character arrays for genomic sequence analysis.'
      ]
    },
    quiz: {
      question: 'Which of the following fields heavily utilizes character arrays for pattern matching?',
      options: ['DNA and genome sequence analysis', 'Hardware power voltage testing', 'Analog radio tuning', 'Thermal sensor readings'],
      correctIndex: 0,
      explanation: 'DNA analysis represents genetic sequences as strings of characters (A, C, G, T) for pattern matching.'
    }
  },

  // =========================================================================
  // TOPIC 4: Reading Strings from Terminal & Writing to Screen -> Stages 1 to 3
  // =========================================================================
  {
    id: 'c-u4-t4-s1',
    topicId: 'c-u4-t4',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 1,
    title: 'Stage 1: Reading Strings with scanf("%s") — Whitespace Limitation',
    subtitle: 'Terminal Input Level 1',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'The `scanf("%s", name);` function reads a string from standard input. However, `scanf` terminates input on the very first whitespace character (space, tab, or newline). If a user inputs "Dennis Ritchie", `scanf` only reads "Dennis".',
      definitions: [
        'scanf("%s"): Reads a single word from keyboard.',
        'Address-of (&): NOT needed for strings in scanf because an array name already represents a memory address!'
      ],
      syntax: `scanf Syntax for Strings:
char name[20];
scanf("%s", name); // No '&' operator needed!`,
      realLifeExample: 'A form field that only allows a single first name; if you type your full name with a space, it cuts off everything after the space.',
      codeSnippet: `#include <stdio.h>
#include <string.h>

int main(void) {
    char name[30];
    // Simulating user entering "Dennis Ritchie"
    // scanf("%s", name) would stop at the space:
    strcpy(name, "Dennis");
    
    printf("Simulated scanf(\"%%s\", name) output:\\n");
    printf("Your name is: %s\\n", name);
    printf("(Notice: 'Ritchie' was truncated due to whitespace!)\\n");
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'scanf("%s", name);', explanation: 'Reads characters until the first space, tab, or newline.' }
      ],
      expectedOutput: `Simulated scanf("%s", name) output:\nYour name is: Dennis\n(Notice: 'Ritchie' was truncated due to whitespace!)`,
      pointsToRemember: [
        'Do NOT write `&name` in `scanf("%s", name)`.',
        '`scanf("%s")` CANNOT read strings with spaces.'
      ]
    },
    quiz: {
      question: 'What does "scanf(\"%s\", name);" read if the user types "Dennis Ritchie"?',
      options: ['Only "Dennis"', '"Dennis Ritchie"', 'Nothing', 'An error occurs'],
      correctIndex: 0,
      explanation: 'scanf("%s") stops reading at the first whitespace, capturing only the first word "Dennis".'
    }
  },
  {
    id: 'c-u4-t4-s2',
    topicId: 'c-u4-t4',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 2,
    title: 'Stage 2: Reading Full Lines: fgets() vs. scanf("%[^\\n]") vs. gets()',
    subtitle: 'Line Input Level 2',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'To read an entire line including spaces, C provides `fgets(str, sizeof, stdin)` and `scanf("%[^\\n]", str)`. The old `gets()` function is deprecated and dangerous because it lacks boundary checking.',
      definitions: [
        'fgets(): Safe function that reads a line of text with spaces up to a specified buffer size.',
        'scanf("%[^\\n]", str): Reads all characters until a newline character is encountered.',
        'gets(): Deprecated and forbidden due to severe buffer overflow vulnerabilities.'
      ],
      syntax: `Line Reading Syntaxes:
1. Recommended:
   fgets(str, sizeof(str), stdin);

2. Format specifier:
   scanf("%[^\\n]", str);`,
      realLifeExample: 'An envelope that only holds 10 pages (`fgets` with size limit) vs an envelope with no bottom (`gets`) where extra pages spill over and corrupt other files.',
      codeSnippet: `#include <stdio.h>
#include <string.h>

int main(void) {
    char fullName[50];
    // Simulating fgets reading a full line with spaces:
    strcpy(fullName, "Dennis Ritchie\\n");
    
    // Strip trailing newline left by fgets:
    size_t len = strlen(fullName);
    if (len > 0 && fullName[len - 1] == '\\n') {
        fullName[len - 1] = '\\0';
    }
    
    printf("Read full name with spaces: [%s]\\n", fullName);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'fgets(fullName, sizeof(fullName), stdin);', explanation: 'Safely reads characters including whitespace up to 49 chars + \'\\0\'.' }
      ],
      expectedOutput: `Read full name with spaces: [Dennis Ritchie]`,
      pointsToRemember: [
        'Use `fgets()` for safe line reading.',
        'Never use `gets()` in modern C.'
      ]
    },
    quiz: {
      question: 'Why should programmers use "fgets()" instead of the older "gets()" function?',
      options: [
        'fgets() prevents buffer overflow by requiring a buffer size limit',
        'fgets() runs twice as fast',
        'fgets() only works on numbers',
        'gets() is only available on Mac'
      ],
      correctIndex: 0,
      explanation: 'fgets() enforces a maximum buffer size, preventing buffer overflow attacks that plague gets().'
    }
  },
  {
    id: 'c-u4-t4-s3',
    topicId: 'c-u4-t4',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 3,
    title: 'Stage 3: Writing Strings to Screen: printf("%s") vs. puts()',
    subtitle: 'Terminal Output Level 3',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'C provides two primary functions for writing strings to the screen: `printf("%s", str)` and `puts(str)`. The key difference is that `puts()` automatically appends a newline character (`\\n`) at the end, while `printf` does not.',
      definitions: [
        'printf("%s", str): Prints the string formatted; does not add a newline unless `\\n` is included.',
        'puts(str): Prints string to stdout and automatically adds a trailing newline (`\\n`).'
      ],
      syntax: `Comparison:
printf("%s", str); // No automatic newline
puts(str);         // Automatically appends '\\n'`,
      realLifeExample: 'Sending a text message: pressing Enter automatically moves to the next message (`puts`), whereas continuing to type in the same bubble stays on the same line (`printf`).',
      codeSnippet: `#include <stdio.h>

int main(void) {
    char message[] = "Learning C Strings";
    
    printf("Using printf (no newline): ");
    printf("%s", message);
    printf(" -> Same line!\\n");
    
    printf("Using puts (automatic newline):\\n");
    puts(message);
    puts("Next line starts here!");
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'puts(message);', explanation: 'Outputs "Learning C Strings" and moves cursor to the beginning of the next line.' }
      ],
      expectedOutput: `Using printf (no newline): Learning C Strings -> Same line!\nUsing puts (automatic newline):\nLearning C Strings\nNext line starts here!`,
      pointsToRemember: [
        'puts() automatically appends a newline.',
        'printf() gives you exact control over formatting.'
      ]
    },
    quiz: {
      question: 'What is the main difference between "puts(str)" and "printf(\"%s\", str)"?',
      options: [
        'puts() automatically appends a newline character (\\n) at the end',
        'printf() automatically appends a newline',
        'puts() can only print numbers',
        'puts() reverses the string before printing'
      ],
      correctIndex: 0,
      explanation: 'puts() automatically outputs a newline character after printing the string.'
    }
  },

  // =========================================================================
  // TOPIC 5: String Handling Functions & Practice Programs -> Stages 1 to 6
  // =========================================================================
  {
    id: 'c-u4-t5-s1',
    topicId: 'c-u4-t5',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 1,
    title: 'Stage 1: Measuring String Length: strlen() & Null Exclusion',
    subtitle: 'String Functions Level 1',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'The `strlen()` function in `<string.h>` calculates the number of characters in a string. It counts every character from index 0 up to, but NOT including, the terminating null character (`\\0`).',
      definitions: [
        'strlen(str): Returns the number of characters in the string, excluding `\\0`. Returns type `size_t`.'
      ],
      syntax: `#include <string.h>
size_t len = strlen(str);`,
      realLifeExample: 'Counting words in an essay: you count the visible words you wrote, not the blank space at the very bottom of the page.',
      codeSnippet: `#include <stdio.h>
#include <string.h>

int main(void) {
    char a[20] = "Program";
    char b[20] = {'P','r','o','g','r','a','m','\\0'};
    
    printf("Length of string a = %zu\\n", strlen(a)); // 7
    printf("Length of string b = %zu\\n", strlen(b)); // 7
    printf("Note: strlen() does NOT count the '\\\\0' character!\\n");
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'printf("Length of string a = %zu", strlen(a));', explanation: 'Counts P-r-o-g-r-a-m (7 characters) and stops at \'\\0\'.' }
      ],
      expectedOutput: `Length of string a = 7\nLength of string b = 7\nNote: strlen() does NOT count the '\\0' character!`,
      pointsToRemember: [
        'strlen() excludes `\\0`.',
        'sizeof() includes `\\0`.'
      ]
    },
    quiz: {
      question: 'What does "strlen(\"C Programming\")" return?',
      options: ['13', '14', '12', '15'],
      correctIndex: 0,
      explanation: '"C Programming" has 1 letter + 1 space + 11 letters = 13 characters. `\\0` is excluded.'
    }
  },
  {
    id: 'c-u4-t5-s2',
    topicId: 'c-u4-t5',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 2,
    title: 'Stage 2: Concatenating Strings: strcat() for Two & Multiple Strings',
    subtitle: 'String Concatenation Level 2',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'The `strcat(dest, src)` function appends the source string (`src`) onto the end of the destination string (`dest`). The destination string must have enough allocated memory to hold both strings combined plus the terminating null character.',
      definitions: [
        'strcat(dest, src): Appends `src` to `dest`. Overwrites `\\0` of `dest`, appends `src`, and adds a new `\\0` at the end.'
      ],
      syntax: `strcat Syntax:
strcat(destination, source);
Example:
char str1[50] = "Hello, ";
const char str2[] = "learners!";
strcat(str1, str2); // str1 becomes "Hello, learners!"`,
      realLifeExample: 'Coupling two train cars together: latching Car B onto the end of Car A.',
      codeSnippet: `#include <stdio.h>
#include <string.h>

int main(void) {
    char str1[50] = "Hello, ";
    const char str2[] = "how are you";
    const char str3[] = "?";
    
    // Concatenating two strings
    strcat(str1, str2);
    // Concatenating a third string
    strcat(str1, str3);
    
    printf("Result of strcat: %s\\n", str1);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'strcat(str1, str2);', explanation: 'Appends "how are you" to "Hello, ".' },
        { line: 'strcat(str1, str3);', explanation: 'Appends "?" to the end of the combined string.' }
      ],
      expectedOutput: `Result of strcat: Hello, how are you?`,
      pointsToRemember: [
        'The destination array MUST be large enough, or a buffer overflow crash occurs.',
        'The source string is not modified.'
      ]
    },
    quiz: {
      question: 'What is the danger of calling "strcat(dest, src)" if dest was declared as "char dest[5] = \"Hi\";"?',
      options: [
        'If src contains more than 2 characters, it will overflow dest, corrupting adjacent memory',
        'It will reverse the string',
        'It converts all letters to uppercase',
        'It deletes src from memory'
      ],
      correctIndex: 0,
      explanation: 'If the combined length exceeds the allocated capacity of `dest`, a buffer overflow occurs.'
    }
  },
  {
    id: 'c-u4-t5-s3',
    topicId: 'c-u4-t5',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 3,
    title: 'Stage 3: Copying Strings: strcpy(dest, src)',
    subtitle: 'String Copying Level 3',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'In C, you CANNOT assign strings with the assignment operator (writing `s2 = s1;` is a compiler error). Instead, use `strcpy(dest, src)` from `<string.h>` to copy characters from source to destination.',
      definitions: [
        'strcpy(dest, src): Copies characters from `src` into `dest`, including the terminating `\\0`.'
      ],
      syntax: `strcpy Syntax:
char s1[50], s2[50];
strcpy(s1, "StudyTonight");
strcpy(s2, s1); // copies s1 into s2`,
      realLifeExample: 'Photocopying a document: creating an exact second copy on a fresh sheet of paper.',
      codeSnippet: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s1[50], s2[50];
    strcpy(s1, "StudyTonight");
    strcpy(s2, s1);
    
    printf("Original s1 : %s\\n", s1);
    printf("Copied s2   : %s\\n", s2);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'strcpy(s1, "StudyTonight");', explanation: 'Copies string literal into character array s1.' },
        { line: 'strcpy(s2, s1);', explanation: 'Duplicates all characters from s1 into s2.' }
      ],
      expectedOutput: `Original s1 : StudyTonight\nCopied s2   : StudyTonight`,
      pointsToRemember: [
        'Writing `str2 = str1;` is a syntax error because array identifiers are constant pointers.',
        'Always use `strcpy()` to duplicate strings.'
      ]
    },
    quiz: {
      question: 'Why is the statement "char s2[20]; s2 = \"Hello\";" illegal in C?',
      options: [
        'Array names in C are non-modifiable constant pointers; strings must be copied using strcpy()',
        'Because "Hello" is too long',
        'Because C requires single quotes for all assignments',
        'Because s2 was not declared as an integer'
      ],
      correctIndex: 0,
      explanation: 'Array names represent constant memory addresses and cannot be used as l-values in assignment statements.'
    }
  },
  {
    id: 'c-u4-t5-s4',
    topicId: 'c-u4-t5',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 4,
    title: 'Stage 4: Comparing Strings Lexicographically: strcmp(s1, s2)',
    subtitle: 'String Comparison Level 4',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: '`strcmp(s1, s2)` compares two strings character by character based on their ASCII values. Writing `if (s1 == s2)` is a classic mistake because it compares memory addresses, not the text!',
      definitions: [
        'strcmp(s1, s2) Return Values: 0 if strings are identical; negative (< 0) if s1 < s2; positive (> 0) if s1 > s2.'
      ],
      syntax: `strcmp Rules:
int res = strcmp(s1, s2);
if (res == 0) -> Strings are IDENTICAL
if (res < 0)  -> s1 comes BEFORE s2 alphabetically
if (res > 0)  -> s1 comes AFTER s2 alphabetically`,
      realLifeExample: 'Looking up words in an alphabetical dictionary: "Apple" comes before "Banana".',
      codeSnippet: `#include <stdio.h>
#include <string.h>

int main(void) {
    char str1[] = "apple";
    char str2[] = "apple";
    char str3[] = "banana";
    
    printf("strcmp(\"apple\", \"apple\")  = %d (identical)\\n", strcmp(str1, str2));
    printf("strcmp(\"apple\", \"banana\") = %d (apple < banana)\\n", strcmp(str1, str3));
    printf("strcmp(\"banana\", \"apple\") = %d (banana > apple)\\n", strcmp(str3, str1));
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'strcmp(str1, str2)', explanation: 'Returns 0 because all characters match identically.' },
        { line: 'strcmp("apple", "banana")', explanation: '\'a\' (ASCII 97) - \'b\' (ASCII 98) = -1 (< 0).' }
      ],
      expectedOutput: `strcmp("apple", "apple")  = 0 (identical)\nstrcmp("apple", "banana") = -1 (apple < banana)\nstrcmp("banana", "apple") = 1 (banana > apple)`,
      pointsToRemember: [
        'Check exact string match with: `if (strcmp(s1, s2) == 0)`',
        'Never use `==` to compare strings.'
      ]
    },
    quiz: {
      question: 'What does "strcmp(\"cat\", \"cat\")" return in C?',
      options: ['0', '1', '-1', 'true'],
      correctIndex: 0,
      explanation: 'strcmp() returns 0 when both strings match identically.'
    }
  },
  {
    id: 'c-u4-t5-s5',
    topicId: 'c-u4-t5',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 5,
    title: 'Stage 5: Reversing Strings (strrev) & Character Frequency Counting',
    subtitle: 'String Algorithms Level 5',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'Counting the occurrences of a specific character involves iterating through the string until `\\0`. Reversing a string flips character order so the first character becomes the last.',
      definitions: [
        'Frequency Count: Iterating over `str[i] != \'\\0\'` and incrementing a counter when `str[i] == target`.',
        'strrev(str): Built-in function in `<string.h>` that reverses a string in-place.'
      ],
      syntax: `// C String Character Frequency Counting Syntax:
int count = 0;
for (int i = 0; str[i] != '\\0'; i++) {
    if (str[i] == ch) count++;
}`,
      realLifeExample: 'Counting how many times the letter "e" appears on a page of text.',
      codeSnippet: `#include <stdio.h>
#include <string.h>

int main(void) {
    char str[] = "This website is awesome";
    char ch = 'e';
    int count = 0;
    
    // 1. Finding frequency of character
    for (int i = 0; str[i] != '\\0'; i++) {
        if (str[i] == ch) count++;
    }
    printf("Text: \\"%s\\"\\n", str);
    printf("Frequency of '%c' = %d\\n", ch, count);
    
    // 2. Manual reverse logic:
    char word[] = "studytonight";
    int len = strlen(word);
    printf("\\nOriginal word : %s\\n", word);
    printf("Reversed word : ");
    for (int i = len - 1; i >= 0; i--) {
        printf("%c", word[i]);
    }
    printf("\\n");
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'if (str[i] == ch) count++;', explanation: 'Increments counter whenever the current character matches target ch.' }
      ],
      expectedOutput: `Text: "This website is awesome"\nFrequency of 'e' = 4\n\nOriginal word : studytonight\nReversed word : thginotyduts`,
      pointsToRemember: [
        'Character comparisons use `==` (e.g. `str[i] == \'e\'`).',
        'Loops can terminate at `str[i] == \'\\0\'`.'
      ]
    },
    quiz: {
      question: 'How many times does the letter \'e\' appear in the string "This website is awesome"?',
      options: ['4 times', '3 times', '5 times', '2 times'],
      correctIndex: 0,
      explanation: 'In "This w[e]bsit[e] is aw[e]som[e]", \'e\' appears 4 times.'
    }
  },
  {
    id: 'c-u4-t5-s6',
    topicId: 'c-u4-t5',
    unitId: 'c-unit-4',
    courseId: 'c',
    stageNumber: 6,
    title: 'Stage 6: String Swapping with Pointers & Palindromes',
    subtitle: 'Advanced Strings & Pointers Level 6',
    published: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    content: {
      explanation: 'A Palindrome string reads the exact same forward and backward (e.g. "abbba", "radar", "madam"). String swapping with pointers exchanges memory addresses in $O(1)$ constant time without copying individual characters.',
      definitions: [
        'Palindrome: A string that is identical when read forward or in reverse order.',
        'Pointer Swap: Exchanging the memory addresses of two pointer variables: `char *temp = str1; str1 = str2; str2 = temp;`.'
      ],
      syntax: `// C Two-Pointer Palindrome Verification Syntax:
int l = 0, h = strlen(str) - 1;
while (l < h) {
    if (str[l] != str[h]) return false;
    l++; h--;
}
return true;`,
      realLifeExample: 'The word "RACECAR": read forward it is R-A-C-E-C-A-R, and read backward it is also R-A-C-E-C-A-R.',
      codeSnippet: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

bool isPalindrome(const char str[]) {
    int l = 0;
    int h = strlen(str) - 1;
    while (l < h) {
        if (str[l] != str[h]) return false;
        l++;
        h--;
    }
    return true;
}

int main(void) {
    char test1[] = "abbba";
    char test2[] = "program";
    
    printf("\\"%s\\" is palindrome: %s\\n", test1, isPalindrome(test1) ? "YES" : "NO");
    printf("\\"%s\\" is palindrome: %s\\n", test2, isPalindrome(test2) ? "YES" : "NO");

    // String pointer swapping
    char *s1 = "science";
    char *s2 = "technology";
    printf("\\nBefore swap: s1=%s, s2=%s\\n", s1, s2);
    char *temp = s1;
    s1 = s2;
    s2 = temp;
    printf("After swap : s1=%s, s2=%s\\n", s1, s2);
    return 0;
}`,
      lineByLineExplanation: [
        { line: 'while (l < h)', explanation: 'Simultaneously tests characters from beginning and end towards center.' },
        { line: 'char *temp = s1; s1 = s2; s2 = temp;', explanation: 'Exchanges pointer memory addresses instantaneously in O(1) time.' }
      ],
      expectedOutput: `"abbba" is palindrome: YES\n"program" is palindrome: NO\n\nBefore swap: s1=science, s2=technology\nAfter swap : s1=technology, s2=science`,
      pointsToRemember: [
        'A palindrome reads identically in both directions.',
        'Swapping string pointers is much faster than copying strings.'
      ]
    },
    quiz: {
      question: 'Which of the following strings is a valid palindrome?',
      options: ['"abbba"', '"program"', '"science"', '"cprogramming"'],
      correctIndex: 0,
      explanation: '"abbba" reads identically forward and backward, making it a palindrome.'
    }
  }
];
