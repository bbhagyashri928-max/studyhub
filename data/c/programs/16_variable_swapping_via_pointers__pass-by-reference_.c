/**
 * CODEVIVA Practical Lab Exercise
 * ID: c-pr-16
 * Category: Pointers
 * Title: Variable Swapping via Pointers (Pass-by-Reference)
 */

#include <stdio.h>

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
}
