/**
 * CODEVIVA Practical Lab Exercise
 * ID: c-pr-10
 * Category: Patterns
 * Title: Right-Angled and Inverted Star Patterns
 */

#include <stdio.h>

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
}
