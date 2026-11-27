import { Unit, Quiz } from '@/types';

export const cUnit5: Unit = {
  id: 'c-unit-5',
  courseId: 'c',
  unitNumber: 5,
  title: 'Structures, Unions and File Handling',
  description: 'Master heterogeneous composite records, memory-shared unions, enumerations, persistent disk I/O, file pointers, and streaming modes.',
  estimatedHours: 6.5,
  quizId: 'quiz-c-5',
  published: true,
  topics: [
    {
      id: 'c-u5-t1',
      unitId: 'c-unit-5',
      courseId: 'c',
      order: 1,
      title: 'Structures: Declaration, Initialization & Member Access',
      summary: 'Package heterogeneous data types into cohesive composite records using the struct keyword and the dot (.) operator.',
      content: {
        definition: 'A structure (struct) is a user-defined composite data type in C that groups logically related variables of different data types under a single unified name. Each variable within a structure is called a member.',
        syntax: 'struct Student {\n    int id;\n    char name[50];\n    float gpa;\n};\n\nstruct Student s1 = {101, "Alice", 3.85};\nprintf("Name: %s\\n", s1.name);',
        codeSnippet: `#include <stdio.h>
#include <string.h>

struct Student {
    int rollNumber;
    char name[30];
    float marks;
};

int main() {
    struct Student s1;
    s1.rollNumber = 1001;
    strcpy(s1.name, "Marcus Sterling");
    s1.marks = 94.5f;

    // Structure pointer with arrow operator (->)
    struct Student *sPtr = &s1;

    printf("--- Student Details ---\\n");
    printf("Roll:  %d\\n", s1.rollNumber);
    printf("Name:  %s\\n", s1.name);
    printf("Marks: %.1f\\n", s1.marks);
    printf("Accessed via Pointer: %s (Marks: %.1f)\\n", sPtr->name, sPtr->marks);
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'struct Student s1;', explanation: 'Instantiates a structure variable allocating combined memory for rollNumber, name array, and marks.' },
          { line: 's1.rollNumber = 1001;', explanation: 'Direct member access using the dot (.) operator.' },
          { line: 'sPtr->name', explanation: 'Arrow (->) operator provides shorthand notation for dereferencing a structure pointer: (*sPtr).name.' }
        ],
        keyConcepts: [
          'Heterogeneous: can contain ints, floats, strings, arrays, and other structures',
          'Memory size is equal to or greater than the sum of its member sizes due to compiler structure padding / alignment',
          'Arrow operator (->) is used when accessing members via a structure pointer'
        ],
        commonMistakes: [
          'Using the assignment operator to assign strings to char array members: s1.name = "text" (must use strcpy)',
          'Omitting the terminating semicolon after the closing brace of a struct definition'
        ],
        quickRevision: [
          'struct: groups different data types.',
          '. operator: accesses members of a struct variable.',
          '-> operator: accesses members through a struct pointer.'
        ]
      }
    },
    {
      id: 'c-u5-t2',
      unitId: 'c-unit-5',
      courseId: 'c',
      order: 2,
      title: 'Array of Structures & Nested Structures',
      summary: 'Manage database-like collections of records and model complex hierarchical real-world data.',
      content: {
        definition: 'An array of structures represents a collection where every element is a structure instance, ideal for tracking multiple records (such as a class roster). A nested structure is a structure that contains another structure as one of its members.',
        syntax: 'struct Address {\n    char city[20];\n    int pin;\n};\n\nstruct Employee {\n    int id;\n    struct Address addr; // Nested structure\n};\n\nstruct Employee staff[10]; // Array of structures',
        codeSnippet: `#include <stdio.h>

struct Date {
    int day;
    int month;
    int year;
};

struct StudentRecord {
    int id;
    char name[20];
    struct Date dob; // Nested struct member
};

int main() {
    struct StudentRecord roster[2] = {
        {101, "Emma", {15, 8, 2003}},
        {102, "Liam", {22, 11, 2002}}
    };

    printf("=== ACADEMY ROSTER ===\\n");
    for (int i = 0; i < 2; i++) {
        printf("ID: %d | Name: %-6s | DOB: %02d/%02d/%d\\n",
            roster[i].id, roster[i].name,
            roster[i].dob.day, roster[i].dob.month, roster[i].dob.year);
    }
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'struct Date dob;', explanation: 'Nesting: embedding the Date structure as a member inside StudentRecord.' },
          { line: 'struct StudentRecord roster[2]', explanation: 'Allocates an array storing 2 distinct StudentRecord instances.' },
          { line: 'roster[i].dob.day', explanation: 'Chained dot notation to access a member inside the nested structure.' }
        ],
        keyConcepts: [
          'Array of structures scales to thousands of student, product, or inventory records',
          'Nested structures model hierarchical real-world entities (e.g., student -> address, person -> birthday)',
          'Passed to functions cleanly as pointers for zero-copy performance'
        ],
        commonMistakes: [
          'Trying to access inner members without specifying the outer member (e.g. roster[i].day instead of roster[i].dob.day)',
          'Stack overflow when declaring excessively large structure arrays locally on the stack'
        ],
        quickRevision: [
          'Array of structs: struct Type arrayName[size].',
          'Nested structs: struct inside another struct.',
          'Chain dots for access: obj.nestedObj.field.'
        ]
      }
    },
    {
      id: 'c-u5-t3',
      unitId: 'c-unit-5',
      courseId: 'c',
      order: 3,
      title: 'Unions & Enumerations (enum)',
      summary: 'Explore memory-sharing unions, size optimization, and type-safe named constant enumerations.',
      content: {
        definition: 'A union is similar to a structure, but all its members share the exact same memory location. The total size of a union is equal to the size of its largest member. An enumeration (enum) is a user-defined type consisting of a set of named integer constants.',
        syntax: 'union Data {\n    int i;\n    float f;\n    char str[20];\n};\n\nenum Status { PENDING, APPROVED, REJECTED }; // 0, 1, 2',
        codeSnippet: `#include <stdio.h>

union Payload {
    int intVal;
    float floatVal;
    char charVal;
};

enum Priority { LOW = 1, MEDIUM, HIGH, CRITICAL };

int main() {
    union Payload p;
    printf("Size of union Payload: %zu bytes\\n", sizeof(p)); // Matches largest member (4 bytes)

    p.intVal = 1050;
    printf("Written intVal = %d\\n", p.intVal);

    p.floatVal = 3.1415f; // Overwrites the shared memory space!
    printf("Written floatVal = %.4f (intVal is now corrupted: %d)\\n", p.floatVal, p.intVal);

    enum Priority taskLevel = HIGH;
    printf("\\nTask Priority Level: %d\\n", taskLevel); // Prints 3
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'union Payload p;', explanation: 'Allocates memory equal to the largest member (4 bytes) shared by all members.' },
          { line: 'p.floatVal = 3.1415f;', explanation: 'Writing to floatVal overwrites the bits previously stored by intVal.' },
          { line: 'enum Priority taskLevel = HIGH;', explanation: 'Assigns named constant HIGH, which evaluates to integer 3.' }
        ],
        keyConcepts: [
          'Union: memory is shared; only one member can hold a meaningful value at any given time',
          'Struct: each member has its own distinct memory offset',
          'enum: improves code readability by replacing magic numbers with meaningful labels'
        ],
        commonMistakes: [
          'Attempting to read from multiple union members simultaneously expecting independent values',
          'Confusing enum values with string literals: enum names are integers, not text strings'
        ],
        quickRevision: [
          'Union size = size of largest member.',
          'Struct size >= sum of all member sizes.',
          'enum values auto-increment by 1 starting from 0 unless explicitly initialized.'
        ]
      }
    },
    {
      id: 'c-u5-t4',
      unitId: 'c-unit-5',
      courseId: 'c',
      order: 4,
      title: 'File Handling: Opening, Closing & Modes',
      summary: 'Master file streams, the FILE pointer, fopen(), fclose(), and file operation access modes.',
      content: {
        definition: 'File handling in C allows programs to persist data across execution sessions on secondary storage (disks). Files are managed via a stream controlled by a FILE pointer defined in <stdio.h>.',
        syntax: 'FILE *fp = fopen("data.txt", "w"); // "r" (read), "w" (write), "a" (append)\nif (fp == NULL) {\n    perror("File open failed");\n}\nfclose(fp);',
        codeSnippet: `#include <stdio.h>

int main() {
    FILE *filePtr = fopen("academy_log.txt", "w");

    if (filePtr == NULL) {
        printf("Error: Could not create or open file!\\n");
        return 1;
    }

    printf("File opened successfully in WRITE mode.\\n");
    fprintf(filePtr, "CODEVERSE Session Log\\n");
    fprintf(filePtr, "Platform: C Academy\\nStatus: Verified\\n");

    fclose(filePtr);
    printf("File flushed and closed safely.\\n");
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'FILE *filePtr = fopen("academy_log.txt", "w");', explanation: 'Opens the file stream for writing. Creates the file if it does not exist, or truncates it to 0 bytes if it does.' },
          { line: 'if (filePtr == NULL)', explanation: 'Crucial safety check: fopen returns NULL if the file cannot be opened (e.g. permission denied or missing disk).' },
          { line: 'fclose(filePtr);', explanation: 'Flushes any unwritten buffer data to disk and releases OS file descriptor resources.' }
        ],
        keyConcepts: [
          'Modes: "r" (read, must exist), "w" (write, overwrites), "a" (append to end), "r+" (read/write)',
          'Binary modes: "rb", "wb", "ab" for raw non-text binary data',
          'Always close files with fclose() to prevent file descriptor leaks and data loss'
        ],
        commonMistakes: [
          'Failing to verify if fopen returned NULL before reading or writing',
          'Forgetting to call fclose(), which can leave disk writes unflushed in memory'
        ],
        quickRevision: [
          'FILE *fp: handle to file stream.',
          'fopen(): opens file; returns NULL on error.',
          'fclose(): closes file and flushes buffers.',
          '"w" truncates existing files; "a" preserves existing content.'
        ]
      }
    },
    {
      id: 'c-u5-t5',
      unitId: 'c-unit-5',
      courseId: 'c',
      order: 5,
      title: 'Reading and Writing Files: fprintf, fscanf, fputs & fgets',
      summary: 'Perform text stream operations with formatted I/O and line-based buffer-safe reading functions.',
      content: {
        definition: 'C provides specialized functions for reading from and writing to file streams: fprintf() and fscanf() for formatted data, fputs() for writing text lines, and fgets() for buffer-safe string reading.',
        syntax: 'fprintf(fp, "Format: %d\\n", val);\nfscanf(fp, "%d", &val);\nfgets(buffer, sizeof(buffer), fp);\nfputs("Hello\\n", fp);',
        codeSnippet: `#include <stdio.h>

int main() {
    // 1. Write structured data
    FILE *fpWrite = fopen("students.dat", "w");
    if (fpWrite) {
        fprintf(fpWrite, "101 Dennis 98.5\\n");
        fprintf(fpWrite, "102 Ken 96.0\\n");
        fclose(fpWrite);
    }

    // 2. Read structured data back
    FILE *fpRead = fopen("students.dat", "r");
    if (fpRead) {
        int id;
        char name[30];
        float score;

        printf("Records read from file:\\n");
        while (fscanf(fpRead, "%d %s %f", &id, name, &score) == 3) {
            printf("Student #%d: %s | Score: %.1f\\n", id, name, score);
        }
        fclose(fpRead);
    }
    return 0;
}`,
        lineByLineExplanation: [
          { line: 'fprintf(fpWrite, ...)', explanation: 'Writes formatted string output directly into the file stream pointed to by fpWrite.' },
          { line: 'while (fscanf(...) == 3)', explanation: 'Reads until EOF (End Of File) is encountered, validating that all 3 tokens were successfully matched.' }
        ],
        keyConcepts: [
          'fgets() is buffer-safe because it accepts a maximum buffer size parameter',
          'EOF is a special macro (-1) returned when the end of a file stream is reached',
          'ferror() and feof() check error conditions and EOF status respectively'
        ],
        commonMistakes: [
          'Using gets() instead of fgets(): gets() has no buffer limit and was removed from the C standard for causing security vulnerabilities',
          'Testing feof() before attempting a read (feof only flags true AFTER a read has failed past the end of the file)'
        ],
        quickRevision: [
          'fprintf() and fscanf() work like printf and scanf on file streams.',
          'fgets(buf, size, fp) is the gold standard for reading lines safely.',
          'Always check return codes when reading files.'
        ]
      }
    }
  ]
};

export const cUnit5Quiz: Quiz = {
  id: 'quiz-c-5',
  unitId: 'c-unit-5',
  courseId: 'c',
  unitTitle: 'Unit 5: Structures, Unions and File Handling',
  title: 'Unit 5 Mastery Quiz',
  passingScorePercent: 60,
  questions: [
    {
      id: 'q-c5-1',
      question: 'What operator is used to access structure members through a structure pointer?',
      options: ['. (dot)', '-> (arrow)', ':: (scope)', '* (asterisk only)'],
      correctIndex: 1,
      explanation: 'The arrow operator (->) is syntactic shorthand for dereferencing a pointer and accessing the member: (*ptr).member.'
    },
    {
      id: 'q-c5-2',
      question: 'What is the principal difference between a struct and a union in C?',
      options: [
        'A struct can only contain integers, while a union can contain any type',
        'In a struct, each member has its own memory; in a union, all members share the same memory space',
        'Unions can have methods, while structs cannot',
        'Structs are allocated on the heap, unions on the stack'
      ],
      correctIndex: 1,
      explanation: 'A union shares a single block of memory among all its members (sized to the largest member), whereas a struct allocates distinct memory for each member.'
    },
    {
      id: 'q-c5-3',
      question: 'What does fopen("report.txt", "w") do if "report.txt" already exists on disk?',
      options: [
        'It opens the file and appends content to the end',
        'It generates a runtime exception',
        'It truncates the file content to 0 bytes (overwriting it)',
        'It opens the file in read-only mode'
      ],
      correctIndex: 2,
      explanation: 'Opening an existing file in "w" (write) mode truncates its contents to zero length, erasing existing data.'
    },
    {
      id: 'q-c5-4',
      question: 'What value does fopen() return when it fails to open a requested file?',
      options: ['0', 'NULL', '-1', 'EOF'],
      correctIndex: 1,
      explanation: 'fopen() returns a NULL pointer when an error occurs while attempting to open a file stream.'
    },
    {
      id: 'q-c5-5',
      question: 'Which function is the safest choice for reading a line of text from a file without risking buffer overflow?',
      options: ['gets()', 'scanf("%s")', 'fgets()', 'getc()'],
      correctIndex: 2,
      explanation: 'fgets() requires passing the maximum buffer size as an argument, preventing buffer overruns by guaranteeing it will never read more characters than the buffer can hold.'
    }
  ]
};
