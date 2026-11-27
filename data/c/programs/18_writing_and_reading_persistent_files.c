/**
 * CODEVERSE Practical Lab Exercise
 * ID: c-pr-18
 * Category: File Handling
 * Title: Writing and Reading Persistent Files
 */

#include <stdio.h>

int main() {
    // 1. Write file
    FILE *fOut = fopen("codeverse_sample.txt", "w");
    if (fOut == NULL) {
        printf("Could not create file!\\n");
        return 1;
    }
    fprintf(fOut, "CODEVERSE Master Academy\\nC Programming Module\\nStatus: Verified\\n");
    fclose(fOut);

    // 2. Read file back
    FILE *fIn = fopen("codeverse_sample.txt", "r");
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
}
