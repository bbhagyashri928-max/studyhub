/**
 * CODEVERSE Practical Lab Exercise
 * ID: c-pr-6
 * Category: Loops
 * Title: Factorial of a Number
 */

#include <stdio.h>

int main() {
    int n = 6;
    unsigned long long fact = 1;

    for (int i = 1; i <= n; i++) {
        fact *= i;
    }

    printf("Factorial of %d (%d!) = %llu\\n", n, n, fact);
    return 0;
}
