/**
 * CODEVIVA Practical Lab Exercise
 * ID: c-pr-7
 * Category: Loops
 * Title: Fibonacci Series Generation
 */

#include <stdio.h>

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
}
